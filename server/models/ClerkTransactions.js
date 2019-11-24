const Receipt = require('server/models/Receipt');
const Report = require('server/models/Report');
const Reservation = require('server/models/reservation');
const Vehicle = require('server/models/vehicle');
const DBManipulation = require('server/models/databaseManipulations');
const Rent = require('server/models/rent');

class ClerkTransactions{
    /*Rent a vehicle with or without any reservation*/
    public static async rentVehicleAsync(confNo, city, location, fromDate, fromTime, toDate, toTime,
                                         vtname, cellphone, dlicense, cardName, cardNo, expDate){
        let receipt;

        try {
            // retrieve the reservation
            var reservation = await this.getReservationFromConfNo(confNo);

            // retrieve a vehicle to rent
            var vehicle = await this.getVehicleToRent(city, location, vtname,
                fromDate, fromTime, toDate, toTime);

            // update vehicle status to being_rented
            this.updateRentalVehicleStatus(vehicle);

            // vehicle info
            var vlicense = vehicle["vlicense"];
            var odometer = vehicle["odometer"];

            // insert new rental into Rent database
            var rent = await this.insertVehicleAsync(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
                odometer, cardName, cardNo, expDate, confNo);

            return rent;
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
        if (vehicle.length === 0 && vtname !== undefined) {
            // tell the customer you're sorry for poor design choices
            var errMsg = "Sorry, there are no more vehicles of that type available.";
            return new Error(errMsg);
        } else if (vehicle.length === 0) {
            var errMsg = "Sorry, there are no vehicles available at:" + location + ", " + city;
            return new Error(errMsg);
        } else {
            // return the first vehicle in the list
            return vehicle[0];
        }
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

    // Insert new rental entry into the Rent database
    public static async insertVehicleAsync(vlicense, dlicense, fromdate, fromtime, todate, totime,
                               odometer, cardname, cardno, expdate, confno) {

        // add put request to Rent database
        var rent = await Rent.insert(rid, vlicense, dlicense, fromdate, fromtime, todate, totime,
            odometer, cardname, cardno, expdate, confno, (err, res) => {
                if (err.error) {
                    return err;
                }
                return res;
            })
        // console.log("A new rental was added: " + rent);
        return rent;
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