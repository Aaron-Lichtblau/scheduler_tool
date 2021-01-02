import math
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
import constants

def exp_stats(exp_dict, schedule):
    """prints stats on experience per slot"""
    slot_exp_dict = {} #dict of slots and their avg exp

    for slot in schedule:
        slot_exp = 0
        for student in schedule[slot]:
            student_exp = exp_dict[student]
            slot_exp += student_exp
        ave_exp = float(slot_exp) / float(len(schedule[slot]))
        slot_exp_dict[str(slot)] = ave_exp
    plt.figure(figsize=(15, 3))
    plt.bar(list(slot_exp_dict.keys()), slot_exp_dict.values(), color='b', align='edge', width=0.3)
    plt.title('Avg Experience of TAs per Slot')
    plt.ylabel('Past Semesters Worked')
    plt.xlabel('Slot')
    plt.show()

def skill_stats(skill_dict, schedule):
    """prints stats on skill per slot"""
    slot_skill_dict = {} #dict of slots and their avg exp

    for slot in schedule:
        slot_skill = 0
        for student in schedule[slot]:
            student_skill = skill_dict[student]
            slot_skill += student_skill
        ave_skill = float(slot_skill) / float(len(schedule[slot]))
        slot_skill_dict[str(slot)] = ave_skill
    plt.figure(figsize=(15, 3))
    plt.bar(list(slot_skill_dict.keys()), slot_skill_dict.values(), color='b', align='edge', width=0.3)
    plt.title('Avg Skill of TAs per Slot')
    plt.ylabel('Past Semesters Worked')
    plt.xlabel('Slot')
    plt.show()

def slotsize_stats(schedule, slotdict):
    '''gets understaffed and overstaffed slots in schedule as: [understaffed_slots_list, overstaffed_slots_list]'''
    understaffed = {}
    overstaffed = {}
    for slot in slotdict.keys():
        sched_size = len(schedule.schedule[slot])
        target_size = slotdict[slot]
        if  sched_size < target_size:
            understaffed[slot] = target_size - sched_size
        if sched_size > target_size:
            overstaffed[slot] = sched_size - target_size
    return [understaffed, overstaffed]

#1. happiness stats: avg, std dev, outliers
def hap_stats(df, schedule):
    """returns avg hap, std dev of hap, and minimum hap outliers of the given schedule"""
    #sum happiness of every TA
    total_happiness = 0
    length = len(df.index)
    studhap = [0] * length #list of student happiness
    studslot = [[] for _ in range(length)] #list of lists of student's slots

    for slot in schedule:
        for student in schedule[slot]:
            index = df.loc[df['name'] == student].index[0]
            score = float(math.fabs(df.at[index, slot]))
            hap = float(score / (3 * float(df.at[index, 'cap'])))
            studslot[index].append(slot)
            # if hap == 1: print('gave out a 1')
            total_happiness += hap #update total happiness
            studhap[index] += hap #update each students' happiness

    avg_hap = float(total_happiness) * 100 / float(length)
    #create a df from student happiness
    df_hap = pd.DataFrame(studhap, columns =['happiness'])

    # get standard deviation of happiness
    std = df_hap.std()
    std = 100 * float(std[0])
    # get min and max happiness outlier students using z-value
    z = stats.zscore(df_hap)
    min_hap_df = df_hap[(z < (-3)).all(axis=1)]
    min_ids = min_hap_df.index
    min_students = []
    for id in min_ids:
        min_students.append(df.at[id, 'name'])

    hap_stats = [avg_hap, std, min_students]
    return(hap_stats)

#2. avail-hap correlation, skill-hap correlation, exp-hap correlation
def corr_stats(df, schedule):
    """returns correlations: 1. avail-hap 2. skill-hap 3. exp-hap of the given schedule"""
    #get correlation of availability and Happiness
    avail_corr = float(df['availability'].corr(df['happiness'], method='pearson'))
    skill_corr = float(df['skill'].corr(df['happiness'], method='pearson'))
    exp_corr = float(df['experience'].corr(df['happiness'], method='pearson'))
    corr_stats = [avail_corr, skill_corr, exp_corr]
    for i in range(len(corr_stats)):
        if math.isnan(corr_stats[i]):
            corr_stats[i] = "N/A"
    return(corr_stats)

#3. studs got 1's, studs got wrong slot type, studs without shift
def stud_stats(df, schedule, prev_slot):
    """returns students who got 1's, students who got wrong slot type, and students who didn't get a shift of the given schedule"""
    stud_1s = [] #list of students who got 1's
    num_studs = len(df.index)
    wrong_type = [False] * num_studs #get students who got wrong slot_type

    for slot in schedule:
        for student in schedule[slot]:
            index = df.loc[df['name'] == student].index[0]
            score = float(math.fabs(df.at[index, slot]))
            slot_type = int(df.at[index, 'slot_type'])

            # update students who got 1's
            if score == 1:
                stud_1s.append(df.at[index, 'name'])

            #check for matching slot_type and what they got in sched
            if slot_type == constants.FOUR_HOUR_SLOT:
                wrong_type[index] = True
                for i_slot in prev_slot.keys():
                    if student in schedule[i_slot] and student in schedule[prev_slot[i_slot]]:
                        wrong_type[index] = False
                        break
            if slot_type == constants.TWO_HOUR_SLOT:
                if slot in prev_slot.keys():
                    if student in schedule[prev_slot[slot]]:
                        wrong_type[index] = True

    #get number of students without shift
    shiftless = []
    for id in range(num_studs):
        if float(df.at[id, 'happiness']) == 0.0:
            shiftless.append(df.at[id, 'name'])

    #get students who got wrong type from their ids
    wrong_type_studs = []
    for id in range(num_studs):
        if wrong_type[id] == True:
            wrong_type_studs.append(df.at[id, 'name'])

    stud_stats = [stud_1s, wrong_type_studs, shiftless, wrong_type]
    return(stud_stats)
