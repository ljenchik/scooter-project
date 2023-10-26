const User = require("../src/User");

// User properties tests
describe("User property tests", () => {
    const user = new User("Joe Bloggs", "test123", 21);
    test("Scooter class should create User instance", () => {
        expect(user).toBeInstanceOf(User);
    });
    // test username
    test("username should be a string", () => {
        expect(typeof user.username).toBe("string");
    });
    test("correct username", () => {
        expect(user.username).toBe("Joe Bloggs");
    });
    // test password
    test("correct password", () => {
        expect(user.getPassword()).toBe("test123");
    });
    // test age
    test("correct age", () => {
        expect(user.age).toBe(21);
    });
});

//User methods tests
describe("User methods", () => {
    const user1 = new User("John", "password", 45);
    // test login
    test("login method with correct password", () => {
        expect(user1.loggedIn).toBe(false);
        user1.login("password");
        expect(user1.loggedIn).toBe(true);
    });
    test("login method with incorrect password", () => {
        expect(() => user1.login("test1234")).toThrow("Incorrect password");
    });
    // test logout
    test("loout method", () => {
        user1.login("password");
        expect(user1.loggedIn).toBe(true);
        user1.logout();
        expect(user1.loggedIn).toBe(false);
    });
});
