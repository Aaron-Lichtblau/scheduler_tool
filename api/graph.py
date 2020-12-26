import helpers
import constants
#-------------------------------------------------------------------------------
# Weight Edge Functions
#-------------------------------------------------------------------------------

def get_tier_emph(weight_dict):
    '''splits the input weights into tiers (strict preference) and emphasis (soft preference).'''

    tier_dict = {}
    emph_dict = {}
    for weight in weight_dict:
        if int(weight_dict[weight]) > constants.SOFT_CONSTRAINT:
            tier_dict[weight] = weight_dict[weight]
            emph_dict[weight] = 0
        else:
            tier_dict[weight] = 0
            emph_dict[weight] = weight_dict[weight]
    return [tier_dict, emph_dict]

def weight_edge(df, student_node, slot_node, weight_dict, num_slots, slot_duration):
    '''calculates the weight to be given to the edge between student and slot. Returns the weight as an int'''
    #returns the student-slot edge weight

    student = student_node.split("_")[0]
    slot = helpers.get_slot(slot_node)
    slot_hours = helpers.get_hours(slot_node, slot_duration)
    j = student_node.split("_")[1]
    student_index = df.loc[df['name'] == student].index[0]
    weight = 0

    tier_dict = get_tier_emph(weight_dict)[0]
    emph_dict = get_tier_emph(weight_dict)[1]

    # preprocess weights to avoid infeasible solutions
    if tier_dict['avail'] > 7:
        tier_dict['avail'] = 7
    # for weight in tier_dict:
    #     if tier_dict[weight] > 9:
    #         tier_dict[weight] = 9


    #collect tier information
    slot_type_tier = 100 ** int(tier_dict['slot_type'])
    no_1_tier = 100 ** int(tier_dict['no_1'])
    guarantee_shift_tier = 100 ** int(tier_dict['guarantee_shift'])
    avail_tier = 100 ** int(tier_dict['avail'])
    shift_cap_tier = 100 ** int(tier_dict['shift_cap'])
    equality_tier = 100 ** int(tier_dict['equality'])
    pref_tier = 1000000

    #collect emphasis information
    slot_type_emph = 10 * int(emph_dict['slot_type'])
    no_1_emph = 10 * int(emph_dict['no_1'])
    guarantee_shift_emph = 10 * int(emph_dict['guarantee_shift'])
    avail_emph = 10 * int(emph_dict['avail'])
    shift_cap_emph = 10 * int(emph_dict['shift_cap'])
    equality_emph = 10 * int(emph_dict['equality'])

    # wants a 2hr vs 4hr?
    hour_pref = df.at[student_index, "slot_type"]
    if int(slot_hours) == int(hour_pref):
        weight += slot_type_tier
        weight += slot_type_emph

    # is pref a 2 or 3?
    pref = abs(df.at[student_index, slot])
    if pref == 2 or pref == 3:
        weight += no_1_tier
        weight += no_1_emph

    # is it their first shift?
    if int(j) == 0:
        weight += guarantee_shift_tier
        weight += guarantee_shift_emph

    # rewards availability
    avail = 1 + float(df.at[student_index, "availability"]) / float(3 * num_slots) #num in range [1, 2]
    weight += (avail * avail_tier)
    weight += (avail * avail_emph)

    #reward shift num caps
    shift_cap = df.at[student_index, "cap"] #num in range [2, 10]
    weight += (shift_cap * shift_cap_tier)
    weight += (shift_cap * shift_cap_emph)

    # equality of shifts
    jth_shift = float(11 - int(j)) #num in range [1, 11]
    weight += (jth_shift * equality_tier)
    weight += (jth_shift * equality_emph)

    # # weight based on preference
    weight += (pref *  pref_tier)

    return (weight)

#-------------------------------------------------------------------------------
# Graph Creaton Functions
#-------------------------------------------------------------------------------

def create_graph(df, weight_dict, slotdict, prev_slot, num_slots, slot_duration):
    ''''returns student nodes, slot nodes and dict of weights'''
    student_nodes = []
    students = list(df['name'])

    for student in students:
        index = df.loc[df['name'] == student].index[0]
        shift_cap = int(df.at[index, 'cap'])
        for shift in range(shift_cap):
            student_nodes.append(str(student) + "_" + str(shift))

    slot_nodes = []
    for slot in slotdict.keys():
        slot_0 = str(slot) + constants.SINGLE_SLOT_SUFFIX
        slot_nodes.append(slot_0)
        #check if slot is potential 4 hr
        if helpers.is_double(slot, prev_slot):
            slot_1 = str(slot) + constants.DOUBLE_SLOT_SUFFIX
            slot_nodes.append(slot_1)

    weights = {}
    for student in student_nodes:
        for slot in slot_nodes:
            weights[(student, slot)] = weight_edge(df, student, slot, weight_dict, num_slots, slot_duration)

    wt = create_wt_doubledict(student_nodes, slot_nodes, weights)
    return(student_nodes, slot_nodes, wt)


def create_wt_doubledict(from_nodes, to_nodes, weights):
    '''just a convenience function to generate a dict of dicts'''
    wt = {}
    for u in from_nodes:
        wt[u] = {}
        for v in to_nodes:
            wt[u][v] = 0

    for k,val in weights.items():
        u,v = k[0], k[1]
        wt[u][v] = val

    return(wt)

def get_selected_edges(prob):
    '''gets the edges selected by the max weight matching subroutine'''
    selected_from = [v.name.split("_")[1] for v in prob.variables() if v.value() > 1e-3]
    selected_to   = [v.name.split("_")[2] for v in prob.variables() if v.value() > 1e-3]

    selected_edges = []
    for su, sv in list(zip(selected_from, selected_to)):
        selected_edges.append((su, sv))
    return(selected_edges)
