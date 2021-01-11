#-------------------------------------------------------------------------------
# This file contains shallow copies of original settings (to be altered by user)
#-------------------------------------------------------------------------------

slotdict= None
weightdict= {'slot_type' : 8, 'no_1' : 6, 'guarantee_shift' : 7, 'avail' : 6, 'shift_cap' : 5, 'equality' : 3}
df = None
# file to be None
file = None
duration=120


gap = 180 #minimum gap between shifts that a student can work (in minutes)
cap = 2 #number of shifts that a student can work
exp = 3 #experience score (>0 means 'experienced')
skill = 4 #skill score (>2 means 'skilled')

target_delta = 1 #numeric value indicating how many TAs the scheduler can hire above the targeted value for any given slot
stress_slots = [] #list of slots to put extra skill constraint on
flex_shifts = 3 #number of shifts the scheduler can assign in addition to the slotdict shift numbers
min_exp = 1 #sets minimum number of experienced TA's per slot
min_skill = 2 #sets minimum number of skilled TA's per stress slot
