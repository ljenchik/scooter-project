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
        expect(ScooterApp.stations).toEqual({
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

    // rent scooter

    // dock scooter
});
