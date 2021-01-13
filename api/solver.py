from pulp import *
from api.schedule import Schedule
import api.input_creator as input_creator
import api.graph as graph
import api.helpers as helpers
import api.constants as constants

# -------------------------------------------------------------------------------
# Linear Program Solver Functions
# -------------------------------------------------------------------------------


def solve_wbm(
    from_nodes,
    to_nodes,
    wt,
    df,
    slotdict,
    min_exp,
    min_skill,
    stress_slots,
    target_delta,
    flex_shifts,
    slot_duration,
):
    """ A wrapper function that uses pulp to formulate and solve a WBM"""

    exp_dict = helpers.get_dict(df, "experience")
    skill_dict = helpers.get_dict(df, "skill")
    gap_dict = helpers.get_dict(df, "gap")
    prev_slot = input_creator.get_prev_slots(df, slot_duration)

    prob = LpProblem("WBM Problem", LpMaximize)

    # Create The Decision variables
    choices = LpVariable.dicts("e", (from_nodes, to_nodes), 0, 1, LpInteger)

    # Add the objective function
    prob += (
        lpSum([wt[u][v] * choices[u][v] for u in from_nodes for v in to_nodes]),
        "Total weights of selected edges",
    )

    # For all s, j, \sum_k x(s,k,j,1) + x(s,k,j,0) \leq 1. Guarantees that each slot is used at most once.
    for u in from_nodes:
        for v in helpers.get_slots_of_type(to_nodes, 0):
            x = helpers.get_alt_slot(
                v, prev_slot
            )  # sees if slot is potential 4hr (has alternate node)
            if x != None:
                prob += lpSum([choices[u][v] + choices[u][x]]) <= 1, ""
            else:
                prob += lpSum([choices[u][v]]) <= 1, ""

    # For all s,k, \sum_j x(s,k,j,1) + x(s,k,j,0)+ x(s,k-1,j,1) + x(s,k-1,j,0) \leq 1. Guarantees that each slot is used at most once, and also no overlapping slots.
    for u in from_nodes:
        name = u.split("_")[:1][0]
        j_nodes = helpers.get_student_nodes(name, from_nodes)
        # get student's overlap dict
        min_gap = gap_dict[name]
        slots = slotdict.keys()
        overlaps = input_creator.get_overlaps(slots, min_gap, slot_duration)
        for v in helpers.get_slots_of_type(to_nodes, 0):
            x = helpers.get_alt_slot(
                v, prev_slot
            )  # sees if slot is potential 4hr (has alternate node)
            k = helpers.get_slot(v)
            if x != None and k in overlaps.keys():
                overlap_slots = overlaps[k]  # get overlap nodes as list
                overlap_nodes = []
                for slot in overlap_slots:
                    node_0 = str(slot) + constants.SINGLE_SLOT_SUFFIX
                    overlap_nodes.append(node_0)
                    if helpers.is_double(slot, prev_slot):
                        node_1 = str(slot) + constants.DOUBLE_SLOT_SUFFIX
                        overlap_nodes.append(node_1)
                for k in overlap_nodes:
                    k_x = helpers.get_alt_slot(k, prev_slot)
                    if k_x != None:
                        prob += (
                            lpSum(
                                [
                                    choices[u][v]
                                    + choices[u][x]
                                    + choices[u][k]
                                    + choices[u][k_x]
                                    for u in j_nodes
                                ]
                            )
                            <= 1,
                            "",
                        )
                    else:
                        prob += (
                            lpSum(
                                [
                                    choices[u][v] + choices[u][x] + choices[u][k]
                                    for u in j_nodes
                                ]
                            )
                            <= 1,
                            "",
                        )
            if x != None:
                prob += lpSum([choices[u][v] + choices[u][x] for u in j_nodes]) <= 1, ""
            if k in overlaps.keys():
                overlap_slots = overlaps[k]  # get overlap nodes as list
                overlap_nodes = []
                for slot in overlap_slots:
                    node_0 = str(slot) + constants.SINGLE_SLOT_SUFFIX
                    overlap_nodes.append(node_0)
                    if helpers.is_double(slot, prev_slot):
                        node_1 = str(slot) + constants.DOUBLE_SLOT_SUFFIX
                        overlap_nodes.append(node_1)
                for l in overlap_nodes:
                    prob += (
                        lpSum([choices[u][v] + choices[u][l] for u in j_nodes]) <= 1,
                        "",
                    )

    # Guarantees that total sum of shifts is slotdict sum + flex_shifts
    total_shifts = 0
    for slot in slotdict:
        total_shifts += int(slotdict[slot])
    total_shifts += flex_shifts
    all_single_shifts = helpers.get_slots_of_type(to_nodes, 0)
    all_double_shifts = helpers.get_slots_of_type(to_nodes, 1)
    all_shifts = all_single_shifts + all_double_shifts
    prob += (
        lpSum([choices[u][v] for u in from_nodes for v in all_shifts]) <= total_shifts,
        "",
    )

    # For all k, \sum_{s,j} x(s,k,j,1) + x(s,k,j,0) \leq c_k. Guarantees that each slot is within +target_delta ta of slotdict amount
    for v in helpers.get_slots_of_type(to_nodes, 0):
        slot = helpers.get_slot(v)
        x = helpers.get_alt_slot(
            v, prev_slot
        )  # sees if slot is potential 4hr (has alternate node) and returns node if yes
        if x != None:
            prob += (
                lpSum([choices[u][v] + choices[u][x] for u in from_nodes])
                <= (slotdict[slot] + target_delta),
                "",
            )
        else:
            prob += (
                lpSum([choices[u][v] for u in from_nodes])
                <= (slotdict[slot] + target_delta),
                "",
            )
    # for v in helpers.get_slots_of_type(to_nodes, 0):
    #     slot = helpers.get_slot(v)
    #     x = helpers.get_alt_slot(v, prev_slot) #sees if slot is potential 4hr (has alternate node) and returns node if yes
    #     if x != None:
    #         prob += lpSum([choices[u][v] + choices[u][x] for u in from_nodes]) >= slotdict[slot], ""
    #     else:
    #         prob += lpSum([choices[u][v] for u in from_nodes]) >= slotdict[slot], ""

    # For all s,k,j x(s,k,j,1) \leq \sum_\ell x(s,k-2,\ell,0)+x(s,k-2,\ell,1). Guarantees that you get to be the end of a 4-hour slot only if you're actually part of the slot before it.
    for u in from_nodes:
        # make list of student nodes
        name = u.split("_")[:1][0]
        j_nodes = helpers.get_student_nodes(name, from_nodes)
        for x in helpers.get_slots_of_type(to_nodes, 1):
            prev = helpers.get_prev_slot(x, prev_slot)
            prev_x = helpers.get_alt_slot(prev, prev_slot)
            if prev_x != None:
                prob += (
                    lpSum(
                        [
                            choices[j][x] - choices[j][prev] - choices[j][prev_x]
                            for j in j_nodes
                        ]
                    )
                    <= 0,
                    "",
                )
            else:
                prob += (
                    lpSum([choices[j][x] - choices[j][prev] for j in j_nodes]) <= 0,
                    "",
                )

    # For all s,k, j x(s,k,j,0) \leq 1-\sum_\ell x(s,k-2,\ell,0)+x(s,k-2,\ell,1). Guarantees that you only get an isolated 2-hour slot if you're not part of the slot before it.
    for u in from_nodes:
        # make list of student nodes
        name = u.split("_")[:1][0]
        j_nodes = helpers.get_student_nodes(name, from_nodes)
        for v in helpers.get_slots_of_type(to_nodes, 0):
            prev = helpers.get_prev_slot(v, prev_slot)
            if prev != None:
                prev_x = helpers.get_alt_slot(prev, prev_slot)
                if prev_x != None:
                    prob += (
                        lpSum(
                            [
                                choices[j][v] + choices[j][prev] + choices[j][prev_x]
                                for j in j_nodes
                            ]
                        )
                        <= 1,
                        "",
                    )
                else:
                    prob += (
                        lpSum([choices[j][v] + choices[j][prev] for j in j_nodes]) <= 1,
                        "",
                    )

    # make sure each student's shift is used once
    for u in from_nodes:
        prob += lpSum([choices[u][v] for v in to_nodes]) <= 1, ""

    # make sure each slot has >=2 experienced TA's
    for v in helpers.get_slots_of_type(to_nodes, 0):
        slot = helpers.get_slot(v)
        x = helpers.get_alt_slot(
            v, prev_slot
        )  # sees if slot is potential 4hr (has alternate node) and returns node if yes
        exp_studs_nodes = []
        for student in exp_dict:
            if exp_dict[student] > 0:  # if experienced, add their nodes to list
                j_nodes = helpers.get_student_nodes(student, from_nodes)
                exp_studs_nodes.extend(j_nodes)
        if x != None:
            prob += (
                lpSum([choices[u][v] + choices[u][x] for u in exp_studs_nodes])
                >= min_exp,
                "",
            )
        else:
            prob += lpSum([choices[u][v] for u in exp_studs_nodes]) >= min_exp, ""

    # make sure each stress slot has min_skill skilled ta's
    stress_nodes = []
    for slot in stress_slots:
        stress_nodes.append(slot + constants.SINGLE_SLOT_SUFFIX)
    for v in helpers.get_slots_of_type(stress_nodes, 0):
        slot = helpers.get_slot(v)
        x = helpers.get_alt_slot(v, prev_slot)
        skill_studs_nodes = []
        for student in skill_dict:
            if (
                skill_dict[student] > 2
            ):  # if highly skilled student, add their nodes to list
                j_nodes = helpers.get_student_nodes(student, from_nodes)
                skill_studs_nodes.extend(j_nodes)
        if x != None:
            prob += (
                lpSum([choices[u][v] + choices[u][x] for u in skill_studs_nodes])
                >= min_skill,
                "",
            )
        else:
            prob += lpSum([choices[u][v] for u in skill_studs_nodes]) >= min_skill, ""

    # The problem data is written to an .lp file
    # prob.writeLP("WBM.lp")
    # The problem is solved using PuLP's choice of Solver
    prob.solve()
    # The status of the solution is printed to the screen
    print("Status:", LpStatus[prob.status])
    return prob


def get_solution(prob):
    # Each of the variables is printed with it's resolved optimum value
    sched_dict = {}
    for v in prob.variables():
        if v.varValue > 1e-3:
            stud_slot = str(v).split("_")[1:]
            length = len(stud_slot)
            slot = stud_slot[length - 3] + "_" + stud_slot[length - 2]
            stud = ""
            for i in range(int(length - 4)):
                stud += stud_slot[i] + " "
            stud = stud[:-1]

            if slot in sched_dict:
                sched_dict[slot].append(stud)
            else:
                sched_dict[slot] = [stud]
            # print(f'{v.name} = {v.varValue}')
    # print(f"Sum of wts of selected edges = {round(value(prob.objective), 4)}")
    return sched_dict


def run_solver(
    student_nodes,
    slot_nodes,
    wt,
    df,
    slotdict,
    min_exp,
    min_skill,
    stress_slots,
    target_delta,
    flex_shifts,
    duration,
):
    """runs the full solver program and outputs a list: [schedule, df]"""
    p = solve_wbm(
        student_nodes,
        slot_nodes,
        wt,
        df,
        slotdict,
        min_exp,
        min_skill,
        stress_slots,
        target_delta,
        flex_shifts,
        duration,
    )
    unordered_sched_dict = get_solution(p)
    max_weight_sched = helpers.order_sched(df, unordered_sched_dict, slotdict)
    helpers.schedule_to_df(df, max_weight_sched, duration)
    return [max_weight_sched, df]
