import csv
import pandas as pd
import helpers
import constants

#-------------------------------------------------------------------------------
# Creation of settings.yaml
#-------------------------------------------------------------------------------



#-------------------------------------------------------------------------------
# Input Creation and Processing
#-------------------------------------------------------------------------------
def convert_userWeights(userWeights):
    for key in userWeights:
        userWeights[key] = (int(userWeights[key]) + 2)
    return userWeights


def get_num_shifts(slotdict):
    '''gets the number of shifts in the entire schedule'''
    num_shifts = 0
    for slot in slotdict:
        num_shifts += int(slotdict[slot])
    return num_shifts

def get_overlaps(slots, min_gap, duration):
    '''gets the dict of form: {slot: [overlapping slot1, overlapping slot2, ...], etc.}'''
    OVERLAPS = {}
    for i_slot in slots:
        i_start_time = helpers.get_start_time(i_slot)
        i_end_time = helpers.add_time(i_start_time, duration)
        i_day = i_slot[:2]
        for j_slot in slots:
            j_start_time = helpers.get_start_time(j_slot)
            j_day = j_slot[:2]
            if (i_start_time < j_start_time) and (i_day == j_day) and ((i_end_time != j_start_time) and (j_start_time < helpers.add_time(i_end_time, min_gap))):
                if j_slot not in OVERLAPS.keys():
                    OVERLAPS[j_slot] = [i_slot]
                else:
                    OVERLAPS[j_slot].append(i_slot)
    return(OVERLAPS)

def get_prev_slots(df, duration):
    '''gets the dict of form: {slot : previous slot, ...}'''
    slots = helpers.get_slots(df)
    prev_slot = {}
    for i_slot in slots:
        i_start_time = helpers.get_start_time(i_slot)
        i_end_time = helpers.add_time(i_start_time, duration)
        i_day = i_slot[:2]
        for j_slot in slots:
            j_start_time = helpers.get_start_time(j_slot)
            j_day = j_slot[:2]
            if (i_start_time < j_start_time) and (i_day == j_day) and (i_end_time == j_start_time):
                prev_slot[j_slot] = i_slot

    return(prev_slot)


def get_df(csv_file):
    '''gets the dataframe from csv file'''

    if csv_file is None:
        csv_file = 'default_input.csv'
    df = pd.read_csv(csv_file) #df should have cols: name, slots, slot_type, cap
    row_nums = len(df['name'])
    students = list(df['name'])
    slots = helpers.get_slots(df)


    #add availability col (sum of prefs)
    availability_col = []
    for student in df['name']:
        student_id = df.loc[df['name'] == student].index[0]
        stud_avail = 0
        for slot in slots:
            stud_avail += df.at[student_id, slot]
        availability_col.append(stud_avail)
    df['availability'] = availability_col

    #add hours and happiness col (initialized to all 0's)
    hours_col = [0] * row_nums
    df['hours'] = hours_col
    happiness_col = [0] * row_nums
    df['happiness'] = happiness_col

    return(df)

def check_col(df):
    '''checks whether advanced columns have been added to the input csv file. If they aren't this fills in default values
    returns [bool, bool] of whether or not to make exp and skill displays for stats output'''
    students = list(df['name'])
    exp_display = True
    skill_display = True
    #check if gap, cap, exp, skill cols are in df
    if 'gap' not in list(df.columns):
        #add gap col
        gap_list = [constants.GAP] * len(students)
        df['gap'] = gap_list
    else:
        df.fillna(constants.GAP, inplace=True)
    if 'cap' not in list(df.columns):
        #add cap col
        shift_cap_list = [constants.CAP] * len(students)
        df['cap'] = shift_cap_list #add cap column to df
    else:
        df.fillna(constants.CAP, inplace=True)
    if 'experience' not in list(df.columns):
        #add experience col
        exp_list = [constants.EXP] * len(students)
        df['experience'] = exp_list #add experience column to df
        exp_display = False #if using default exp, don't make a display
    else:
        df.fillna(constants.EXP, inplace=True)
    if 'skill' not in list(df.columns):
        skill_list = [constants.SKILL] * len(students)
        df['skill'] = skill_list
        skill_display = False #if using default skill, don't make a display
    else:
        df.fillna(constants.SKILL, inplace=True)

    return [exp_display, skill_display]

def process_input(default_input, advanced_input):
    '''takes the users input and puts in defaults for missing values'''
    if default_input == None:
        csv_file = constants.IN_FILE
        df = get_df(csv_file)
        slotdict = constants.SLOTDICT
        duration = constants.DURATION
    else:
        csv_file = default_input[0]
        df = default_input[1]
        slotdict = default_input[2]
        duration = default_input[3]

    if csv_file == None:
        csv_file = constants.IN_FILE

    if slotdict == None:
        slotdict = constants.SLOTDICT

    if duration == None:
        duration = contants.DURATION #length of slots (in minutes)

    num_shifts = get_num_shifts(slotdict)
    bonus_cols = check_col(df)

    #dict of slots and their prev slots
    prev_slot = get_prev_slots(df, duration)

    if advanced_input == None:
        weight_dict = constants.WEIGHT_DICT
        min_exp = constants.MIN_EXP
        min_skill = constants.MIN_SKILL
        stress_slots = constants.STRESS_SLOTS
        target_delta = constants.TARGET_DELTA
        flex_shifts = constants.FLEX_SHIFTS
    else:
        weight_dict = advanced_input[0]
        min_exp = advanced_input[1]
        if min_exp != None and bonus_cols[0] == False:
            print('NOTE: Your input file does not include an \'experience\' column. Thus, your min exp constraint will not be effective.')
        min_skill = advanced_input[2]
        stress_slots = advanced_input[3]
        if stress_slots != None and bonus_cols[1] == False:
            print('NOTE: Your input file does not include a \'skill\' column. Thus, your stress slots constraint will not be effective.')
        target_delta = advanced_input[4]
        flex_shifts = advanced_input[5]

    if weight_dict == None:
        weight_dict = constants.WEIGHT_DICT

    if stress_slots == None:
        stress_slots = constants.STRESS_SLOTS

    if target_delta == None:
        target_delta = constants.TARGET_DELTA

    if flex_shifts == None:
        flex_shifts = constants.FLEX_SHIFTS

    if min_exp == None:
        min_exp = constants.MIN_EXP

    if min_skill == None:
        min_skill = constants.MIN_SKILL

    cleaned_input = [csv_file, df, slotdict, duration, num_shifts, prev_slot, weight_dict, stress_slots, target_delta, flex_shifts, min_exp, min_skill]
    return cleaned_input


# TO BE USED IF HISTORICAL DATA CAN BE PULLED FROM SOMEWHERE
# def get_exp(exp_file, students):
#     '''returns a list of given students' semesters of past labTA experience'''
#     exp_dict = {}
#     for student in students:
#         exp_dict[student] = 0
#     with open(str(exp_file), newline='') as csvfile:
#         reader = csv.DictReader(csvfile)
#         for row in reader:
#             firstname = row['First Name']
#             lastname = row['Last Name']
#             position = row['Position']
#             student = firstname + " " + lastname
#             #if student is in dict and if their position was 'labta', increase their exp count
#             if ((student in exp_dict.keys()) and (position == 'Lab TA')):
#                  exp_dict[student] += 1
#
#     exp_list = []
#     for student in students:
#         exp_list.append(exp_dict[student])
#
#     return(exp_list)
