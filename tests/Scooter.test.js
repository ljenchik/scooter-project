const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("Scooter object", () => {
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
describe("Scooter methods", () => {
    //rent method
    test("rent method to checkout to user, success", () => {
        const scooter = new Scooter("Limehouse");
        const user = new User("Ben", "1234", 23);
        scooter.rent(user);
        expect(scooter.user).toEqual(user);
        expect(scooter.station).toBeNull();
    });
    test("rent method to throw error when charge is less than 20", () => {
        const scooter = new Scooter("Limehouse");
        const user = new User("Ben", "1234", 23);
        scooter.charge = 15;
        expect(() => scooter.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
        expect(scooter.user).toBeNull();
        expect(scooter.station).toBe("Limehouse");
    });
    test("rent method to throw error when scooter is broken", () => {
        const scooter = new Scooter("Limehouse");
        const user = new User("Ben", "1234", 23);
        scooter.isBroken = true;
        expect(() => scooter.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
        expect(scooter.user).toBeNull();
        expect(scooter.station).toBe("Limehouse");
    });
    test("rent method to throw error when charge is low and scooter is broken", () => {
        const scooter = new Scooter("Limehouse");
        const user = new User("Ben", "1234", 23);
        scooter.isBroken = true;
        expect(() => scooter.rent(user)).toThrow(
            "Scooter needs to charge or scooter needs repair"
        );
        expect(scooter.user).toBeNull();
        expect(scooter.station).toBe("Limehouse");
    });

    //dock method
    test("dock method to clear out the user", () => {
        const scooter = new Scooter("Limehouse");
        const user = new User("Ben", "1234", 23);
        scooter.rent(user);
        scooter.dock("Upminster");
        expect(scooter.user).toBe(null);
        expect(scooter.station).toBe("Upminster");
    });

    //requestRepair method
    //charge method
});
