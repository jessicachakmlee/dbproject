const Receipt = require(Receipt);
const Reservation = require('server/models/reservation');

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

    // TODO maybe make the following into a report class later

    /*TODO: Make report*/
    public static makeRentalReport(){

    }
    /*TODO: Output 1: list all rented out vehicles for this day
            Sorting: Group entries by branch, within each branch, and vehicle category*/
    public static displayAllRentedVehicles(timeInterval, branch) {

    }
    /*TODO: get number of vehicles for each category*/
    public static getNumRentalsByVCategory(){

    }

    /*TODO: get number of rentals at each branch*/
    public static getNumRentalsByBranch(){

    }

    /*TODO: get total number of rentals*/
    public static getNumRentals(){

    }

    /*TODO: Output 1: list daily info on all rented out vehicles for company
                Sorting: Group entries by branch, within each branch, and vehicle category
    *  Output 2: number of vehicles for each vehicle category
        Output 3: number of rentals at each branch
        Output 4: total number of rentals*/
    public static makeDailyRentalReport(){

    }
    /*TODO: Make daily rental report for one branch*/
    public static makeDailyRentalBranchReport(){

    }
    /*TODO: Output 1: list daily info on all returned vehicles for company
    *               Sorting: grouped by branch, within each branch, vehicle category
    *       Output 2: number of vehicles returned per vehicle category
    *       Output 3: total revenue per vehicle category
    *       Output 4: subtotals for number of vehicles per branch and
    *                   revenue per branch
    *       Output 5: total number of returns*/
    public static makeDailyReturnReport(){

    }
    /*TODO: Make daily return report for one branch*/
    public static makeDailyReturnBranchReport(){

    }
}

module.exports(ClerkTransactions);