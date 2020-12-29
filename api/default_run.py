from schedule import Schedule
import input_creator
# import output_creator
import stats
import graph
import solver


# a full run of the default program
def run(clean_input):
    #unpack the cleaned input
    csv_file = clean_input[0]
    df = clean_input[1]
    slotdict = clean_input[2]
    duration = clean_input[3]
    num_shifts = clean_input[4]
    prev_slot = clean_input[5]
    weight_dict = clean_input[6]
    stress_slots = clean_input[7]
    target_delta = clean_input[8]
    flex_shifts = clean_input[9]
    min_exp = clean_input[10]
    min_skill = clean_input[11]

    #create graph nodes and weight edges
    graph_data = graph.create_graph(df, weight_dict, slotdict, prev_slot, num_shifts, duration)
    student_nodes = graph_data[0]
    slot_nodes = graph_data[1]
    wt = graph_data[2]

    #solve the problem, get the ordered schedule and updated df
    results = solver.run_solver(student_nodes, slot_nodes, wt, df, slotdict, min_exp, min_skill, stress_slots, target_delta, flex_shifts, duration)
    schedule = results[0]
    df = results[1]

    #get stats
    happiness_stats = stats.hap_stats(df, schedule)
    corr_stats = stats.corr_stats(df, schedule)
    student_stats = stats.stud_stats(df, schedule, prev_slot)
    slot_stats = stats.slotsize_stats(schedule, slotdict)
    #format output
    # format_weights = {'weights used': weight_dict}
    sched_stats = {'avg hap': happiness_stats[0], 'std dev of hap': happiness_stats[1], 'min hap stud outliers': happiness_stats[2], 'avail to hap corr': corr_stats[0], 'skill to hap corr': corr_stats[1], 'experience to hap corr': corr_stats[2], 'studs who got 1s': student_stats[0], 'studs without shift': student_stats[2], 'wrong shift type studs': student_stats[1]}
    output_data = {"weights": weight_dict, "schedule": schedule.schedule, "stats": sched_stats}
    #print the output
    # for output in output_data:
        # print(output)

    return(output_data)


# def add_output(output_data):
#     weights = output_data[0]
#     schedule = output_data[1]
#     df = output_data[2]
#     sched_stats = output_data[3]
#     file = output_creator.add_file()
#     output_creator.add_output(file, weights, schedule, sched_stats)

def main():
    default_input = input_creator.process_input(None, None)
    output_data = run(default_input)

    weights = output_data[0]
    schedule = output_data[1]
    df = output_data[2]
    sched_stats = output_data[3]

    print(schedule)
    print(df)
    print(sched_stats)


if __name__ == "__main__":
    main()
