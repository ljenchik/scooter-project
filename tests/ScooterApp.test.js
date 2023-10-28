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
        scooterApp.registeredUsers = { Jane: ["test123", 34] };
        expect(() => scooterApp.registerUser("Jane", "test123", 34)).toThrow(
            "Already registered"
        );
    });
    test("Should throw error when user is less 18 years old", () => {
        expect(() => scooterApp.registerUser("Jane", "test123", 17)).toThrow(
            "Too young to register"
        );
    });
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
    // log out
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

    // rent scooter
    test("rentScooter method", () => {
        const user = scooterApp.registerUser("Jane", "test123", 34);
        scooterApp.loginUser(user.username, user.getPassword());
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [],
        });
        const scooter = scooterApp.createScooter("station2");
        scooterApp.createScooter("station2");
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [
                {
                    charge: 100,
                    isBroken: false,
                    serial: 2,
                    station: "station2",
                    user: null,
                },
                {
                    charge: 100,
                    isBroken: false,
                    serial: 3,
                    station: "station2",
                    user: null,
                },
            ],
            station3: [],
        });
        scooterApp.rentScooter(scooter, user);
        expect(scooter.user).toEqual(user);
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [
                {
                    charge: 100,
                    isBroken: false,
                    serial: 3,
                    station: "station2",
                    user: null,
                },
            ],
            station3: [],
        });
    });

    // dock scooter
    test("dockScooter method", () => {
        const newScooter = new Scooter("station1");
        scooterApp.dockScooter(newScooter, "station3");
        expect(newScooter.station).toBe("station3");
        expect(scooterApp.stations).toEqual({
            station1: [],
            station2: [],
            station3: [
                {
                    charge: 100,
                    isBroken: false,
                    serial: 4,
                    station: "station3",
                    user: null,
                },
            ],
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

    // create scooter
    test("creates a scooter", () => {
        scooterApp.createScooter("station1");
        expect(scooterApp.stations).toEqual({
            station1: [
                {
                    charge: 100,
                    isBroken: false,
                    serial: 7,
                    station: "station1",
                    user: null,
                },
            ],
            station2: [],
            station3: [],
        });
    });
    test("creates a scooter with incorrect station", () => {
        expect(() => scooterApp.createScooter("station4")).toThrow(
            "No such station error"
        );
    });
});
