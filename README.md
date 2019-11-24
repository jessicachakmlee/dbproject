# **dbproject**

## Rubric TODO's:

#### GUI Bugs:
Vehicle View
- Error handling and display for invalid time inputs by user.

Reservations 

(maybe we need an additional method for checking inputs and passing info to reservations)
- Error message displayed when attempting to make reservation without a time period selected doesn't make sense to user
    - happens when searching for vehicles without time interval
- Error handling for making a reservation with vehicle type: all
    - when making a reservation when all vehicles displayed are the same type, it accepts
    - if vehicles displayed have different types, it displays: Error in creating reservation. Please try again.
- Cannot create reservation with only a cellphone number

Display Table
- Refresh page before displaying the table

#### Required Features:

- Clerk Transactions UI
- Allow add/delete/update all tables
- Allow user to view all tables

##### Other - less urgent
- Make a function that returns the full formatted SQL query (currently displays in console but without 
substitutions for placeholder variables)
- Display formatted query on the gui

