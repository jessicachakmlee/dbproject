const Receipt = require(Receipt);
const Reservation = require('models/reservation');

class ClerkTransactions{
    /*TODO: rent a vehicle with or without any reservation*/
    public static rentVehicle(rentInfo){
        let receipt;

        // TODO check if inputs are reservation or rentInfo
        if (rentInfo instanceof reservation) {
            // TODO verify the reservation number
            receipt = new Receipt(confNo, date, vType, location, timeInterval);
            // TODO add rental and update info on database
        } else {
            if (rentInfo.hasOwnProperty(confNo, date, vType, location, timeInterval)) {

                receipt = new Receipt(confNo, date, vType, location, timeInterval);
                // TODO add rental and update info on database
            } else {
                console.log("There is not enough valid information to make a rental.")
                // TODO: error warning or error handling
            }
        }
        // TODO update information on frontend display
    }
    /*TODO: Return a vehicle*/
    public static returnVehicle(){

        receipt.printReciept();
    }

    /*TODO: Make report*/
    public static makeReport(){

    }

    // TODO maybe make the following into classes later
    /*TODO*/
    public static makeDailyRentalReport(){

    }
    /*TODO*/
    public static makeDailyRentalBranchReport(){

    }
    /*TODO*/
    public static makeDailyReturnReport(){

    }
    /*TODO*/
    public static makeDailyReturnBranchReport(){

    }
}

module.exports(ClerkTransactions);