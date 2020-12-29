from flask import Flask, request, jsonify
import input_creator
import helpers
import settings

app = Flask(__name__)

@app.route('/schedule')
def get_schedule():
    return {schedule: schedule_object}

@app.route('/file', methods=['GET', 'POST'])
def get_slotDict():
    data = request.get_json()
    # for now using path of csv file --> will be:
    # df = input_creator.get_df(data['file'])
    df = input_creator.get_df("/Users/aaronlichtblau/Desktop/Projects/lab-scheduler/api/default_input.csv")
    # students = list(df['name'])
    # input_creator.check_col(df, gap, cap, exp, skill)

    #dict of slots to check as keys, and overlapping slots as values (student won't be placed in overlap)
    settings.slots = {x: None for x in helpers.get_slots(df)}

    return jsonify({'slots': settings.slots})

@app.route('/file/df', methods=['GET'])
def send_df():
    return jsonify({'slots': settings.slots})
