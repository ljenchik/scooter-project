class User {
    #password;
    constructor(username, password, age) {
        this.username = username;
        this.#password = password;
        this.age = age;
        this.loggedIn = false;
    }
    getPassword() {
        return this.#password;
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

// To do: verification on username and password (length)
module.exports = User;
