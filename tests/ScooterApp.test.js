const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

let scooterApp;
beforeEach(() => {
    scooterApp = new ScooterApp();
});
// ScooterApp tests here
describe("ScooterApp properties tests", () => {
    test("correct stations", () => {
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [],
        });
    });
});

// register user
describe("registerUser method tests", () => {
    test("Should return instance of User", () => {
        let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
        expect(response).toBeInstanceOf(User);
    });

    test("Should add one user to registered users object", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        expect(scooterApp.registeredUsers).toEqual({
            Jane: new User("Jane", "test123", 34),
        });
    });
    test("Should add users to registered users object", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.registerUser("Kate", "test123", 23);
        expect(scooterApp.registeredUsers).toEqual({
            Jane: new User("Jane", "test123", 34),
            Kate: new User("Kate", "test123", 23),
        });
    });
    test("Should throw error when user already registered", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.registerUser("Kate", "test123", 23);
        expect(Object.keys(scooterApp.registeredUsers).length).toBe(2);
        expect(() => scooterApp.registerUser("Jane", "test123", 34)).toThrow(
            "Already registered"
        );
    });
    test("Should throw error when user is less 18 years old", () => {
        expect(() => scooterApp.registerUser("Jane", "test123", 17)).toThrow(
            "Too young to register"
        );
    });
});

describe("login user method tests", () => {
    // log in
    test("Should login and user.loggedIn = true", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.registerUser("Kate", "4321", 23);
        expect(scooterApp.registeredUsers).toEqual({
            Jane: { age: 34, loggedIn: false, username: "Jane" },
            Kate: { age: 23, loggedIn: false, username: "Kate" },
        });
        expect(scooterApp.registeredUsers["Jane"].loggedIn).toBe(false);
        expect(scooterApp.registeredUsers["Kate"].loggedIn).toBe(false);
        scooterApp.loginUser("Jane", "test123");
        expect(scooterApp.registeredUsers["Jane"].loggedIn).toBe(true);
    });

    test("Should not login if not registered", () => {
        expect(() => scooterApp.loginUser("Jane", "test123")).toThrow(
            "Username or password is incorrect"
        );
    });
    test("Should not login with incorrect password", () => {
        scooterApp.registerUser("Kate", "4321", 23);
        expect(() => scooterApp.loginUser("Kate", "test123")).toThrow(
            "Incorrect password"
        );
    });
});

// log out
describe("logout user method tests", () => {
    test("Should logout correctly", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.registerUser("Kate", "4321", 23);
        scooterApp.loginUser("Jane", "test123");
        scooterApp.loginUser("Kate", "4321");
        scooterApp.logoutUser("Jane");
        expect(scooterApp.registeredUsers).toEqual({
            Jane: { age: 34, loggedIn: false, username: "Jane" },
            Kate: { age: 23, loggedIn: true, username: "Kate" },
        });
    });

    test("Should logout correctly id all users logged out", () => {
        scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.registerUser("Kate", "4321", 23);
        scooterApp.loginUser("Jane", "test123");
        scooterApp.loginUser("Kate", "4321");
        scooterApp.logoutUser("Jane");
        scooterApp.logoutUser("Kate");
        expect(scooterApp.registeredUsers).toEqual({
            Jane: { age: 34, loggedIn: false, username: "Jane" },
            Kate: { age: 23, loggedIn: false, username: "Kate" },
        });
    });

    test("Should not logout if not logged in", () => {
        expect(() => scooterApp.logoutUser("Jane")).toThrow(
            "No such user is logged in"
        );
    });
});

// create scooter
describe("create scooter method tests", () => {
    test("creates a scooter and adds it to the given station", () => {
        const scooterApp = new ScooterApp();
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [],
        });
        const s1 = scooterApp.createScooter("station1");
        expect(scooterApp.stations).toEqual({
            station1: [s1],
            station2: [],
            station3: [],
        });
        expect(s1).toEqual(
            expect.objectContaining({
                charge: 100,
                isBroken: false,
                station: "station1",
                user: null,
            })
        );
    });

    test("creates a second scooter and adds it to the given station", () => {
        const scooterApp1 = new ScooterApp();
        expect(scooterApp1.stations).toEqual({
            station1: [],
            station2: [],
            station3: [],
        });
        const scooter1 = scooterApp1.createScooter("station1");
        const scooter2 = scooterApp1.createScooter("station1");
        expect(scooterApp1.stations).toEqual({
            station1: [scooter1, scooter2],
            station2: [],
            station3: [],
        });
        expect(scooter1.serial !== scooter2.serial).toBe(true);
    });
    test("creates a scooter with incorrect station", () => {
        expect(() => scooterApp.createScooter("station4")).toThrow(
            "No such station error"
        );
    });
});

// rent scooter
describe("rent scooter user method tests", () => {
    test("rentScooter method", () => {
        const user = scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.loginUser(user.username, user.getPassword());
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [],
        });
        const s1 = scooterApp.createScooter("station2");
        const s2 = scooterApp.createScooter("station2");
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [s1, s2],
            station3: [],
        });
        scooterApp.rentScooter(s1, user);
        expect(s1.user).toEqual(user);
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [s2],
            station3: [],
        });
    });
});

// dock scooter
describe("dock scooter method tests", () => {
    test("dockScooter method", () => {
        const newScooter = new Scooter("station1");
        scooterApp.dockScooter(newScooter, "station3");
        expect(newScooter.station).toBe("station3");
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [newScooter],
        });
    });

    test("dockScooter method with wrong station", () => {
        const newScooter = new Scooter("station3");
        expect(() => scooterApp.dockScooter(newScooter, "station4")).toThrow(
            "No such station"
        );
    });

    test("dockScooter method with wrong station", () => {
        const newScooter = new Scooter("station3");
        expect(() => scooterApp.dockScooter(newScooter, "station3")).toThrow(
            "Scooter already at station"
        );
    });
});
