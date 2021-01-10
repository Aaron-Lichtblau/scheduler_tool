from flask import send_from_directory, Flask, request, jsonify
import api.input_creator
import api.helpers
import numpy as np
import api.default_run
import api.settings

app = Flask(__name__, static_folder='./build')
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def index():
    # return "<h1>Welcome Lab Scheduler</h1>"
    return app.send_from_directory('src','index.js')
    # return app.send_static_file('index.js')

@app.route('/schedule')
def get_schedule():
    return {schedule: schedule_object}

@app.route('/file', methods=['GET','POST'])
def get_slotDict():
    data = request.get_json()
    # for now using path of csv file --> will be:
    df = input_creator.get_df(data['file'])
    settings.file = data['file']
    print(settings.file)
    df = input_creator.get_df(settings.file)

    settings.df = df
    settings.slotdict = {x: 1 for x in helpers.get_slots(df)}
    return jsonify({'slotdict': settings.slotdict})

@app.route('/file/df', methods=['GET'])
def send_df():
    return jsonify({'slotdict': settings.slotdict})

@app.route('/slotdict', methods=['POST'])
def get_Userslots():
    data = request.get_json()
    slotdict = data['slotdict']
    print(slotdict)
    for slot in slotdict:
        if slotdict[slot] == None:
            slotdict[slot] = 1
        else:
            slotdict[slot] = int(slotdict[slot])
    settings.slotdict = slotdict
    settings.duration = int(data['duration'])
    # print(settings.slotdict)
    return jsonify({'slotdict': settings.slotdict})

@app.route('/basic', methods = ['POST'])
def get_Basic():
    data = request.get_json()
    settings.weightdict = input_creator.convert_userWeights(data['weightdict'])
    # print(settings.weightdict)
    return jsonify({'weightdict': settings.weightdict})

@app.route('/slots', methods = ['GET'])
def get_Slots():
    slots = list(settings.slotdict.keys())
    # print(slots)
    return jsonify(slots)

@app.route('/advanced', methods = ['POST'])
def get_Advanced():
    data = request.get_json()
    settings.min_exp = int(data['min_exp'])
    settings.min_skill = int(data['min_skill'])
    settings.stress_slots = data['stress_slots']
    settings.target_delta = int(data['target_delta'])
    settings.flex_shifts = int(data['flex_shifts'])
    resp = {
    'min_exp': settings.min_exp,
    'min_skill': settings.min_skill,
    'stress_slots': settings.stress_slots,
    'target_delta': settings.target_delta,
    'flex_shifts': settings.flex_shifts
    }
    # print(resp)

    return jsonify(resp)

@app.route('/results', methods=['GET'])
def display_results():

    file = settings.file
    df = settings.df
    slotdict = settings.slotdict
    weightdict = settings.weightdict
    duration = settings.duration
    min_exp = settings.min_exp
    min_skill = settings.min_skill
    stress_slots = settings.stress_slots
    target_delta = settings.target_delta
    flex_shifts = settings.flex_shifts

    default_input = [file, df, slotdict, duration]
    print(default_input)
    advanced_input = [weightdict, min_exp, min_skill, stress_slots, target_delta, flex_shifts]
    print(advanced_input)
    cleaned_input = input_creator.process_input(default_input, advanced_input)
    output_data = default_run.run(cleaned_input)

    # // props.df: [headers, rows]
    #   // headers: [col headers]
    #   // rows: {index: list(values)}
    print(output_data['df'])
    outdf = output_data['df'].astype(dtype=str)
    headers = list(outdf.columns)
    rows = {str(i): list(outdf.iloc[i]) for i in outdf.index}
    print(headers)
    print(rows)
    output_data['df'] = [headers, rows]
    return(jsonify(output_data))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
    # host='0.0.0.0', port=5000, debug=False
