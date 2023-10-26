class User {
    #password;
    constructor(username, password, age) {
        this.username = username;
        this.#password = password;
        this.age = age;
        this.loggedIn = false;
    }
    getPassword() {
        // Displays 3 asterisks and the last three characters of the password
        return `***${this.#password.slice(-3)}`;
    }
    login(password) {
        if (this.#password === password) {
            this.loggedIn = true;
        } else {
            throw new Error("Incorrect password");
        }
    }
    logout() {
        this.loggedIn = false;
    }
}

// Verification on username and password (length)
module.exports = User;
