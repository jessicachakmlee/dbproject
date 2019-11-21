class CustomerTransactions {
    private _customer;
    static constructor(customer) {
        this._customer = customer,
            this.getCustomer = function() {
                return _customer;
            }
    }

    /* TODO view number of available vehicles for a specific car type,
        location, and time interval.
        default: list all vehicles for a branch sorted alphabetically
    */
    public static viewVehicles(branch, vtype, loc, timeInterval) {
        let result = "";
        let numV = -1;
        // TODO hookup this result to the frontend display
        console.log("Showing the available vehicles for \n" +
            "Type: " + vtype + "\n" +
            "Location: " + loc + "\n" +
            "Time Interval: " + timeInterval + "\n" +
            "A total of " + numV + "results were found." + result);
    }

    /*TODO: make a reservation
    *  if the customer is new, add their details to the database
    *  return a confirmation number upon successfull completion
    *  if a customer is new, add new customer and details to database.
    *  if the customer's desired vehicle is not available display error*/
    public static makeReservation(customer) {
        let confNum = -1;
        let reservation;
        let validInputs = false;

        while (!validInputs) {
            // TODO process inputs
            if (!validInputs) {
                return confNum;
            }
        }
        // TODO hookup outputs to database and frontend
        console.log("Your reservation has been made. Please record the" +
            " following for your records: \n" +
            "Confirmation Number: " + confNum + "\n" +
            "Reservation Details: " + reservation + "\n"
        );
        return confNum;
    }

}

module.exports(CustomerTransactions);