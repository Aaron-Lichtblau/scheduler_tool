import flask from Flask

app = Flask(__name__)

@app.route('/schedule')
def get_schedule():
    return {schedule: schedule_object}
