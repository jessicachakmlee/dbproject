const Receipt = require('server/models/Receipt');
const Report = require('server/models/Report');
const Reservation = require('server/models/reservation');
const Vehicle = require('server/models/vehicle');
const DBManipulation = require('server/models/databaseManipulations');

class ClerkTransactions{
    /*TODO: rent a vehicle with or without any reservation*/
    public static async rentVehicleAsync(confNo, city, location, fromDate, fromTime, toDate, toTime,
                                         vtname, cellphone, dlicense){
        let receipt;

        try {
            // retrieve the reservation
            var reservation = await this.getReservationFromConfNo(confNo);

            // retrieve a vehicle to rent
            var vehicle = await this.getVehicleToRent(city, location, vtname,
                fromDate, fromTime, toDate, toTime);

            // update vehicle status to being_rented
            var vehicleStatusChanged = await this.updateRentalVehicleStatus(vehicle);

            // if there is no prior reservation
            if (!reservation) {
                this.rentVehicleNoReserve();
            } else {
                // pass in first reservation in the list
                this.rentVehicleWithReserve(reservation)
            }
        } catch (e) {
            // display error
            console.log(e);
        }
    }

    // Gives reservation from given confirmation number
    // or false if not a valid confirmation number
    public static async getReservationFromConfNo(confNo) {

        // if no confirmation number is given
        if (typeof confNo !== "number")
            return false;

        // check reservations for confirmation number
        var reservation = await Reservation.retrieveByConfNo(confNo,
            (err, res) => {
                // return error if any
                if (err) {
                    throw err;
                }
                // otherwise, return result
                return res;
            })

        Console.log("The reservation is: " + reservation);

        // if there is a weird number of reservations throw an error
        if (reservation.length !== 1 || reservationList.length !== 0) {
            var errMsg = "There is an invalid number of reservations for confNo: " + confNo;
            throw new Error(errMsg);
        }
        // check whether to send by reservation
        if (reservation.length === 1)
            return reservation[0];

        Console.log("The confirmation number submitted does not exist");
        return false;
    }

    // Gives available vehicle given the branch, vehicle type, and time interval
    public static async getVehicleToRent(city, location, vtname, fromDate, fromTime, toDate, toTime) {
        // query the vehicle database to find a vehicle
        var vehicle = await Vehicle.retrieveVehiclesWithOptions(false, city, location, vtname,
            fromDate, fromTime, toDate, toTime, (err, res) => {
                if (err)
                    throw err;
                return res;
            });

        // return error if no vehicles are available
        if (vehicle.length === 0) {
            // tell the customer you're sorry for poor design choices
            var errMsg = "Sorry, there are no more vehicles of that type available. There was literally no point " +
                "in reserving a vehicle type";
            return new Error(errMsg);
        }

        // return the first vehicle in the list
        return vehicle[0];
    }

    // update given vehicle status to being_rented and returns the updated object
    private static async updateRentalVehicleStatus(vehicle) {
        // setter options for put request
        var setVar = {
            status: "being_rented"
        }

        // vehicle identification options for put request
        var whereVar = {
            vlicense: vehicle["vlicense"]
        }

        var result = await DBManipulation.update("Vehicle", setVar, whereVar, (err, res) => {
            if (err.error)
                throw err;
                return res;
        })
        // console.log("Output from updateRentalVehicleStatus was: " + result);
        return result;
    }

    // TODO: rent a vehicle with no reservation
    private static rentVehicleNoReserve(fromDate, fromTime, toDate, toTime, vtname, cellphone, dlicense) {

    }

    private static rentVehicleWithReserve(confNo, fromDate, fromTime, toDate, toTime, vtname, cellphone, dlicense) {

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