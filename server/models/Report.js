const rent = require('rent');
const ret = require('return');
const vehicle = require('vehicle');

class Report{

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

    /*TODO: Get number of returns of each vehicle category*/
    public static getNumReturnsByVCategory(){

    }

    /*TODO: Get revenue of returns of each vehicle category*/
    public static getRetRevenueByVCategory(){

    }

    /*TODO: Get number of returns by branch*/
    public static getNumReturnsByBranch(){

    }

    /*TODO: Get revenue of returns by branch*/
    public static getRetRevenueByBranch(){

    }

    /*TODO: Get total number of returns*/
    public static getNumReturns(){

    }

    /*TODO: Output 1: list daily info on all returned vehicles for company
    *               Sorting: grouped by branch, within each branch, vehicle category*/
    public static displayAllReturnedVehicles(timeInterval, branch){

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

module.exports(Report);