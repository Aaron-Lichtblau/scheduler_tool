# import json

class Schedule:

    def __init__(self, schedule = None):
        """initialize schedule from given schedule, default is blank"""
        if schedule == None:
            schedule = {"M_7" : [], "M_9" : [],"Tu_7" : [], "Tu_9" : [],"W_7" : [], "W_9" : [],"Th_7" : [], "Th_9" : [],"F_7" : [], "F_9" : [],"Sa_3" : [], "Sa_4" : [],"Sa_5" : [],"Su_5" : [],"Su_6" : [],"Su_7" : [],"Su_8" : [], "Su_9" : []}
        self.schedule = schedule

    def __iter__(self):
        """allow for iterating over schedule dict"""
        return iter(self.schedule)

    def __getitem__(self, key):
        """allow for getting slot details"""
        return (self.schedule[key])

    def num_students(self, slot):
        """returns number of students in given slot"""
        return(len(self.schedule[slot]))

    def add_student(self, slot, student):
        """adds a student to slot in schedule"""
        if student in self.schedule[slot]:
            print('this student: ', student, " is already in the schedule at this slot: ", slot)
        self.schedule[slot].append(student)

    def remove_student(self, slot, student):
        """remove a student from slot in schedule"""
        if student not in self.schedule[slot]:
            print('this student: ', student, " is already not in the schedule at this slot: ", slot)
        self.schedule[slot].remove(student)

    def print_sched(self):
        """prints out the schedule"""
        for slot in self.schedule:
            print(slot, ": ")
            print(self.schedule[slot])
        # print(json.dumps(self.schedule, indent=3))
