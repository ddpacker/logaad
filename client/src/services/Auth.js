import EventBus from "./EventBus";

class Auth {
    static getToken(email, password) {
        var authToken = `${email} ${password}`
        if ((email === "admin@admin") && (password === "password")) {
            EventBus.eventEmitter.emit('authenticated', authToken);
        } else {
            return null;
        }
    }
}

export default Auth;