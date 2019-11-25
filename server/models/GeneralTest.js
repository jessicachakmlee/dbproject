const ClerkTransactions = require('server/models/ClerkTransactions');

class GeneralTest {
    function () {
        var confno = 172525;
        var result = ClerkTransactions.getReservationFromConfNo(confno);
        console.log("result was: " + result);
    }

}


module.exports(GeneralTest);