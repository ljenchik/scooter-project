const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
    static stations = { station1: [], station2: [], station3: [] };
    constructor() {
        this.registeredUsers = {};
    }
    registerUser(username, password, age) {
        if (!this.registeredUsers.hasOwnProperty(username) && age >= 18) {
            const newRegisteredUser = new User(username, password, age);
            this.registeredUsers[username] = newRegisteredUser;
            console.log("User has been registered");
            return newRegisteredUser;
        } else if (this.registeredUsers.hasOwnProperty(username)) {
            throw new Error("Already registered");
        } else if (age < 18) {
            throw new Error("Too young to register");
        }
    }
    loginUser(username, password) {
        if (this.registeredUsers.hasOwnProperty(username)) {
            const registeredUser = this.registeredUsers[username];
            registeredUser.login(password);
            console.log("User has been logged in");
        } else if (
            !this.registeredUsers.hasOwnProperty(username) ||
            !registeredUsers[username].loggedIn
        ) {
            throw new Error("Username or password is incorrect");
        }
    }
    logoutUser(username) {
        if (this.registeredUsers.hasOwnProperty(username)) {
            const registeredUser = this.registeredUsers[username];
            registeredUser.logout();
        } else {
            throw new Error("No such user is logged in");
        }
    }
}

module.exports = ScooterApp;
