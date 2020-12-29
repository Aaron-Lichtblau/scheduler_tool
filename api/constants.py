#-------------------------------------------------------------------------------
# This file contains deep copies of original settings (not to be altered by user)
#-------------------------------------------------------------------------------

MINUTES_IN_HOUR = 60
SINGLE_SLOT_SUFFIX = '_0'
DOUBLE_SLOT_SUFFIX = '_1'
FOUR_HOUR_SLOT = 4
TWO_HOUR_SLOT = 2
SOFT_CONSTRAINT = 5
OUT_FILE = 'output_file.yaml'
WEIGHTS = ['slot_type', 'no_1', 'guarantee_shift', 'avail', 'shift_cap', 'equality']
CONSTRAINTS = ['stress_slots', 'min_exp', 'min_skill', 'target_delta', 'flex_shifts']

#-------------------------------------------------------------------------------
# Default values of basic input parameters
#-------------------------------------------------------------------------------
IN_FILE = "default_input.csv"

#dict of target number of students in each slot
SLOTDICT = {"Mo_1900" : 8, "Mo_2100" : 6,"Tu_1900" : 5, "Tu_2100" : 4,"We_1900" : 4, "We_2100" : 4,"Th_1900" : 4, "Th_2100" : 4,"Fr_1900" : 4, "Fr_2100" : 4,"Sa_1500" : 5, "Sa_1600" : 6,"Sa_1700" : 5,"Su_1700" : 4,"Su_1800" : 3,"Su_1900" : 6,"Su_2000" : 4, "Su_2100" : 6}

#preference for schedule creation by Justin Chang (head labTA 2020-21)
WEIGHT_DICT = {'slot_type' : 8, 'no_1' : 6, 'guarantee_shift' : 7, 'avail' : 6, 'shift_cap' : 5, 'equality' : 3}

DURATION = 120 #length of slots (in minutes)

#-------------------------------------------------------------------------------
# Default values of advanced input parameters
#-------------------------------------------------------------------------------
# column values in dataframe
GAP = 180 #minimum gap between shifts that a student can work (in minutes)
CAP = 2 #number of shifts that a student can work
EXP = 3 #experience score (>0 means 'experienced')
SKILL = 4 #skill score (>2 means 'skilled')

#default constraint values
TARGET_DELTA = 1 #numeric value indicating how many TAs the scheduler can hire above the targeted value for any given slot
STRESS_SLOTS = [] #list of slots to put extra skill constraint on
FLEX_SHIFTS = 3 #number of shifts the scheduler can assign in addition to the slotdict shift numbers
MIN_EXP = 1 #sets minimum number of experienced TA's per slot
MIN_SKILL = 2 #sets minimum number of skilled TA's per stress slot
