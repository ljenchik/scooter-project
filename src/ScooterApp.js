const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
    stations = { station1: [], station2: [], station3: [] };
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
    createScooter(station) {
        if (this.stations.hasOwnProperty(station)) {
            const newScooter = new Scooter(station);
            this.stations[station].push(newScooter);
            return newScooter;
        } else {
            throw new Error("No such station error");
        }
    }

    rentScooter(scooter, user) {
        this.stations[scooter.station] = this.stations[scooter.station].filter(
            (item) => item.serial !== scooter.serial
        );
        scooter.rent(user);
    }

    dockScooter(scooter, station) {
        if (!this.stations.hasOwnProperty(station)) {
            throw new Error("No such station");
        } else if (scooter.station === station) {
            throw new Error("Scooter already at station");
        } else {
            scooter.dock(station);
            this.stations[station].push(scooter);
            console.log("Scooter is docked");
        }
    }

    print() {
        console.log("Registered users: ", this.registeredUsers);
        console.log("List of all stations: ");
        console.log(this.stations);
    }
}

module.exports = ScooterApp;
