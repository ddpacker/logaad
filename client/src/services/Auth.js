import EventBus from "./EventBus";

class Auth {
    static getToken(username, password) {
        var authToken = username;
        if ((username === "admin") && (password === "password")) {
            EventBus.eventEmitter.emit('authenticated', authToken);
        } else {
            return null;
        }
    }
}

export default Auth;