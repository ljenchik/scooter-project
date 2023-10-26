const User = require("./User");
class Scooter {
    static nextSertial = 1;
    constructor(station) {
        this.station = station;
        this.user = null;
        Scooter.nextSertial += 1;
        this.serial = Scooter.nextSertial;
        this.charge = 100;
        this.isBroken = false;
    }
    rent(user) {
        if (this.charge > 20 && !this.isBroken) {
            return "Ready to check out";
        } else {
            throw new Error("Scooter needs to charge or scooter needs repair");
        }
    }
}

module.exports = Scooter;
