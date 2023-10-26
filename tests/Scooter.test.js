const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("scooter object", () => {
    const scooter = new Scooter("Limehouse");
    const scooter1 = new Scooter("Bank");
    test("Scooter class should create Scooter instance", () => {
        expect(scooter).toBeInstanceOf(Scooter);
    });
    test("correct station", () => {
        expect(scooter.station).toBe("Limehouse");
    });
    test("correct user", () => {
        expect(scooter.user).toBe(null);
    });
    test("correct serial", () => {
        expect(scooter.serial).toBe(2);
        expect(scooter1.serial).toBe(3);
    });
    test("correct charge to 100", () => {
        expect(scooter.charge).toBe(100);
    });
    test("correct isBroken to false when scooter is not broken", () => {
        expect(scooter.isBroken).toBe(false);
    });
});

//Method tests
describe("scooter methods", () => {
    const scooter = new Scooter("Limehouse");
    const scooter1 = new Scooter("Bank");
    const scooter2 = new Scooter("TowerBridge");
    const user = new User();
    //rent method
    test("rent method to checkout to user", () => {
        expect(scooter.rent(user)).toBe("Ready to check out");
    });
    test("rent method to throw error when charge is less than 20", () => {
        scooter1.charge = 15;
        expect(() => scooter1.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
    });
    test("rent method to throw error when scooter is broken", () => {
        scooter2.isBroken = true;
        expect(() => scooter2.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
    });
    test("rent method to throw error when charge is low and scooter is broken", () => {
        scooter2.charge = 19;
        expect(() => scooter2.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
    });

    //dock method
    //requestRepair method
    //charge method
});
