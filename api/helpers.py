from api.schedule import Schedule
import api.constants as constants

# -------------------------------------------------------------------------------
# Node Manipulation Helper Functions
# Parameter formats:
# student_nodes = e_name_shift
#   name - student's name without special characters
#   shift - integer number representing jth shift. (if student's cap = 3, the student will have 3 nodes: student_0, student_1, student_2)
# slot_nodes = day_starttime_slottype
#   day - day of week from list: [Mo, Tu, We, Th, Fr, Sa, Su]
#   starttime - in 4 digit military time: 2100
#   slottype - 0 or 1, representing a single (2hr) slot or a double (4hr) slot
# -------------------------------------------------------------------------------


def get_student_nodes(name, student_nodes):
    """given a student name, returns that student's nodes"""
    name_nodes = []
    for node in student_nodes:
        if node.split("_")[:1][0] == name:
            name_nodes.append(node)
    return name_nodes


def get_slot(slot_node):
    """gets the slot given the slot node"""
    slot = slot_node[:-2]
    return slot


def get_hours(slot_node, slot_duration):
    """gets the node type (2hr vs 4hr) given the node. slot_duration is time length of slots in minutes"""
    hours = slot_duration // constants.MINUTES_IN_HOUR
    slot_type = slot_node[-1]
    if int(slot_type) == 1:
        return 2 * hours
    else:
        return hours


def get_slots_of_type(to_nodes, slot_type):
    """gets all slots of a given type (0 or 1). to_nodes are all slot_nodes"""
    all_slot_type = []
    for slot_node in to_nodes:
        if int(slot_node[-1]) == int(slot_type):
            all_slot_type.append(slot_node)
    return all_slot_type


def get_alt_slot(slot_node, prev_slot):
    """gets the slot node's other node type (ending with 1)"""
    slot = get_slot(slot_node)
    if is_double(slot, prev_slot):
        alt_slot = str(slot) + constants.DOUBLE_SLOT_SUFFIX
        return alt_slot
    else:
        return None


def is_double(slot, prev_slot):
    """checks whether a slot is potentially a double (4hr) slot"""
    if slot in prev_slot.keys():
        return True
    else:
        return False


def get_prev_slot(slot_node, prev_slot):
    """gets the previous slot node in schedule (possibly None)"""
    slot = get_slot(slot_node)
    if is_double(slot, prev_slot):
        prev_slot = prev_slot[slot]
        prev_slot_node = str(prev_slot) + constants.SINGLE_SLOT_SUFFIX
        return prev_slot_node
    else:
        return None


def get_day_slots(day, slot_nodes_2, slot_nodes_4):
    """gets all slot nodes of the given day"""
    day_slots = []
    for slot_node in slot_nodes_2:
        slot = get_slot(slot_node)
        slot_day = slot[:-2]
        if str(slot_day) == str(day):
            day_slots.append(slot_node)
    for slot_node in slot_nodes_4:
        slot_day = slot[:-2]
        if str(slot_day) == str(day):
            day_slots.append(slot_node)
    return day_slots


# -------------------------------------------------------------------------------
# Dataframe Manipulation Helper Functions
# -------------------------------------------------------------------------------


def order_sched(df, unordered_sched_dict, slotdict):
    """takes unordered sched dict and returns an ordered Schedule object"""
    ordered_sched = {k: unordered_sched_dict[k] for k in slotdict.keys()}
    max_weight_dict = {}
    for slot in ordered_sched:
        max_weight_dict[slot] = []
        for student in ordered_sched[slot]:
            name = student.split("_")[0]
            max_weight_dict[slot].append(name)

    max_weight_sched = Schedule(max_weight_dict)
    return max_weight_sched


def update_df(df, student, slot, slot_duration):
    """updates the dataframe in place. Given the student (name) and slot (e.g. 'Mo_2100'),
    this function adds (slot duration / 60) hours to the student's hours column and updates their happiness column of the dataframe"""
    try:
        index = df.loc[df["name"] == student].index[0]
    except:
        print("student not found in df: ", student)
    # update preference table
    score = df.at[index, slot]
    cap = df.at[index, "cap"]
    df.at[index, slot] = -(score)
    # update hours worked and happiness
    temp_work = df.at[index, "hours"]
    temp_hap = df.at[index, "happiness"]
    hap = (score * 100) / (3 * cap)
    if df.at[index, slot] < 0:  # shows they added slot
        df.at[index, "hours"] = temp_work + slot_duration // constants.MINUTES_IN_HOUR
        df.at[index, "happiness"] = temp_hap + hap
    else:
        df.at[index, "hours"] = temp_work - slot_duration // constants.MINUTES_IN_HOUR
        df.at[index, "happiness"] = temp_hap + hap


def schedule_to_df(df, schedule, slot_duration):
    """given a schedule, this updates the starting dataframe of preferences"""
    for slot in schedule:
        if len(slot) == 0:
            print("empty slot in schedule ERROR!")
        for student in schedule[slot]:
            update_df(df, student, slot, slot_duration)


def get_slots(df):
    """gets the slot names from the df"""
    slots = df.columns.tolist()
    non_slots = [
        "name",
        "slot_type",
        "availability",
        "cap",
        "experience",
        "skill",
        "hours",
        "happiness",
        "gap",
    ]
    for val in non_slots:
        try:
            slots.remove(val)
        except:
            continue
    for slot in slots:
        if len(slot) != 7:
            print(slot, " is not correctly formatted: should be (ex: Mo_1900)")
    return slots


def get_dict(df, col):
    """makes a dict of names (keys) and col values (values)"""
    col_dict = {}
    for name in df["name"]:
        index = df.loc[df["name"] == name].index[0]
        col_dict[name] = df.at[index, col]
    return col_dict


def color_schedule(val):
    """color the shifts being worked. 3 = green, 2 = yellow, 1 = red"""
    if int(val) == -3.0:
        background_color = "green"
    elif int(val) == -2.0:
        background_color = "yellow"
    elif int(val) == -1.0:
        background_color = "red"
    else:
        background_color = ""
    return "background-color: %s" % background_color


def color_wrong_type(s):
    """
    highlight the wrong types dark orange
    """
    is_wrong = s == True
    return ["background-color: darkorange" if v else "" for v in is_wrong]


# -------------------------------------------------------------------------------
# Slot Time Manipulation Helper Functions
# -------------------------------------------------------------------------------


def get_start_time(slot):
    '''given a slot "Mo_1900", it returns the start time: "1900"'''
    start_time = int(slot[-4:])
    return start_time


def add_time(start_time, added_minutes):
    """return the start time plus added minutes (does not wrap around i.e. 2500 is valid end_time)
    start_time is 4 digit military time i.e. 2100
    added_minutes is integer number of minutes"""
    start_hour = int(str(start_time)[:2])
    start_minute = int(str(start_time)[2:4])
    hours_added = int((start_minute + int(added_minutes)) / constants.MINUTES_IN_HOUR)
    min_added = int((start_minute + int(added_minutes)) % constants.MINUTES_IN_HOUR)
    if min_added < 10:
        min_added = "0" + str(min_added)
    end_hour = start_hour + hours_added
    end_time = str(end_hour) + str(min_added)

    return int(end_time)


# -------------------------------------------------------------------------------
# Interactive Command Helper Functions
# -------------------------------------------------------------------------------
def get_target(val):
    text = "{} : ".format(val)
    print(text)
    target = int(input())
    return target


def get_slotdict(df):
    print("Enter the number of desired TA's for each slot: ")
    slots = get_slots(df)
    slotdict = {}
    for slot in slots:
        slotdict[slot] = get_target(slot)
    return slotdict


def get_duration():
    print("Enter the duration of slots in minutes: ", end="")
    duration = int(input())
    return duration


def get_weightdict():
    print("Enter the value you want to give to each weight: ")
    weight_dict = {}
    for weight in constants.WEIGHTS:
        weight_dict[weight] = get_target(weight)
    return weight_dict


def get_stress_slots(slots):
    print(
        "Enter the slot names separated by commas, that you want to guarantee to have min_skill number of 'skilled' TAs:"
    )
    stress_slots = str(input()).replace(" ", "").split(",")

    print(stress_slots)
    if len(stress_slots) != 1 or stress_slots[0] != "":
        invalid = []
        for slot in stress_slots:
            if slot not in slots:
                print(slot, " is not a valid slot and is being removed.")
                invalid.append(slot)
        for slot in invalid:
            stress_slots.remove(slot)
        return stress_slots
    else:
        return []


def get_constraints(slots):
    constraints = []
    constraints.append(get_stress_slots(slots))
    constraints.append(get_target("min_exp"))
    constraints.append(get_target("min_skill"))
    constraints.append(get_target("target_delta"))
    constraints.append(get_target("flex_shifts"))

    return constraints
