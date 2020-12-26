from flask import Flask, request, jsonify
import input_creator
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
    settings.df = df.to_json()
    return jsonify({'file': settings.df})

@app.route('/file/df', methods=['GET'])
def send_df():
    return jsonify({'df': settings.df})
