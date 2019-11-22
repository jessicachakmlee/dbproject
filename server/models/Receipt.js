class Receipt{
    confNo = -1;
    date = null;
    vType;
    location;
    timeInterval;

    constructor(confNo, date, vType, loc, timeInt) {
        this.confNo = confNo;
        this.date = date;
        this.vType = vType;
        this.location = loc;
        this.timeInterval = timeInt;
    }

    public static printReciept(){
        console.log("Receipt: \n" +
        "Confirmation Number: " + this.confNo + "\n" +
        "Date: " + this.date + "\n" +
        "Vehicle Type: " + this.vType + "\n" +
        "Branch Location: " + this.location + "\n" +
        "Time Interval: " + this.timeInterval + "\n")
    }
}

module.exports(Receipt);