from flask import Flask, request, jsonify
import input_creator
import helpers
import default_run
import settings

app = Flask(__name__)

@app.route('/schedule')
def get_schedule():
    return {schedule: schedule_object}

@app.route('/file', methods=['GET','POST'])
def get_slotDict():
    data = request.get_json()
    # for now using path of csv file --> will be:
    # df = input_creator.get_df(data['file'])
    # settings.file = data['file']
    df = input_creator.get_df(settings.file)

    settings.df = df
    settings.slots = {x: None for x in helpers.get_slots(df)}
    return jsonify({'slots': settings.slots})

@app.route('/file/df', methods=['GET'])
def send_df():
    return jsonify({'slots': settings.slots})

@app.route('/slotdict', methods=['POST'])
def get_Userslots():
    data = request.get_json()
    slotdict = data['slotdict']
    for slot in slotdict:
        slotdict[slot] = int(slotdict[slot])
    settings.slotdict = slotdict
    settings.duration = int(data['duration'])
    # print(settings.slotdict)
    return jsonify({'slotdict': settings.slotdict})

@app.route('/basic', methods = ['POST'])
def get_Basic():
    data = request.get_json()
    settings.weightdict = data['weightdict']
    return jsonify({'weightdict': settings.weightdict})

@app.route('/results', methods=['GET'])
def display_results():

    file = settings.file
    df = settings.df
    slotdict = settings.slotdict
    weightdict = input_creator.convert_userWeights(settings.weightdict)
    duration = settings.duration
    min_exp = settings.min_exp
    min_skill = settings.min_skill
    stress_slots = settings.stress_slots
    target_delta = settings.target_delta
    flex_shifts = settings.flex_shifts

    default_input = [file, df, slotdict, duration]
    advanced_input = [weightdict, min_exp, min_skill, stress_slots, target_delta, flex_shifts]

    cleaned_input = input_creator.process_input(default_input, advanced_input)
    output_data = default_run.run(cleaned_input)

    print(settings.weightdict)
    print(output_data['schedule'])
    print(output_data['stats'])

    return(jsonify(output_data))
