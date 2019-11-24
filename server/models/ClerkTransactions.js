const Receipt = require('server/models/Receipt');
const Report = require('server/models/Report');
const Reservation = require('server/models/reservation');

class ClerkTransactions{
    /*TODO: rent a vehicle with or without any reservation*/
    public static async rentVehicleAsync(confNo){
        let receipt;

        // assign reservation to output from sql query
        var reservation = await this.getReservationFromConfNo(confNo);

        // if there is no prior reservation
        if (!reservation) {
            this.rentVehicleNoReserve();
        } else {
            // pass in first reservation in the list
            this.rentVehicleWithReserve(reservation[0])
        }
    }

    // Gives reservation from given confirmation number
    // or false if not a valid confirmation number
    private static async getReservationFromConfNo(confNo) {

        // if no confirmation number is given
        if (typeof confNo !== "number")
            return false;

        // check reservations for confirmation number
        var reservation = await Reservation.retrieveByConfNo(confNo,
            (err, res) => {
                // return error if any
                if (err) {
                    LogError(err);
                    return err;
                }
                // otherwise, return result
                return res;
            })

        Console.log("The reservation is: " + reservation);

        // if there is a weird number of reservations throw an error
        if (reservation.length !== 1 || reservationList.length !== 0) {
            var msg = "There is an invalid number of reservations for confNo: " + confNo;
            consoleError(msg);
            throw msg;
        }
        // check whether to send by reservation
        if (reservation.length === 1)
            return reservation[0];

        Console.log("The confirmation number submitted does not exist");
        return false;
    }

    // TODO:
    private static rentVehicleNoReserve() {

    }

    private static rentVehicleWithReserve(reservation) {

    }

    /*TODO: Return a vehicle*/
    public static returnVehicle(){

        receipt.printReciept();
    }

    /*TODO: Make report*/
    public static makeReport(){

    }
}

module.exports(ClerkTransactions);