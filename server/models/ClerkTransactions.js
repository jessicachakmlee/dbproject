const Receipt = require('server/models/Receipt');
const Report = require('server/models/Report');
const Reservation = require('server/models/reservation');

class ClerkTransactions{
    /*TODO: rent a vehicle with or without any reservation*/
    public static async rentVehicleAsync(confNo){
        let receipt;

        // `1.) Check if there's already a reservation
        // 1.a.) Yes reservation:
        //           1.a.i) From Reservation, get:
        //                     - confNo,
        //                     - fromDate
        //                     - fromTime
        //                     - toDate
        //                     - toTime
        //                     - vtname
        //                     - cellphone/dlicense
        //             1.a.iii.) Using vtname from Reservation, Join with ForRent View:
        //                     - Get vlicense/vid of an available car
        //                     - Get odometer(? I don't know where the odometer is supposed to come from. Frontend as another choose qualifier like vtname? Or like... display the odometer of the car currently......)
        //                     - Update VEHICLE table so that that car is 'being_rented'
        //             1.a.iii) From frontend input, get:
        //                     - odometer (??? see previous note)
        //                     - cardName
        //                     - cardNo
        //                     - ExpDate
        //                     - confNo
        //             1.a.iv) Using those inputs, INSERT new tuple into RENT table`

        if (typeof confNo !== "number") {
            var msg = "The input for confNo is of invalid type " + typeof  confNo;
            consoleError(msg);
            throw msg;
        }
        // verify the reservation number
        // assign resResult to output from sql query
        var reservationList = await Reservation.retrieveByConfNo(confNo,
            (err, res) => {
                // return error if any
                if (err) {
                    LogError(err);
                    return err;
                }
                // otherwies, set this
                return res;
            })

        // if there is a weird number of reservations throw an error
        if (reservationList.length !== 1 || reservationList.length !== 0) {
            var msg = "There is an invalid number of reservations for confNo: " + confNo;
            consoleError(msg);
            throw msg;
        }

        Console.log("The reservationList is: " + reservationList);
        // if there is no prior reservation
        if (reservationList.length == 0) {
            this.rentVehicleNoReserve();
        } else {
            // pass in first reservation in the list
            this.rentVehicleWithReserve(reservationList[0])
        }
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