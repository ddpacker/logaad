import EventBus from "./EventBus";

class Auth {
    static getToken(email, password) {
        var authToken = `${email}`;
        if ((email === "admin@admin") && (password === "password")) {
            EventBus.eventEmitter.emit('authenticated', authToken);
            return (authToken);
        } else {
            return null;
        }
    }
}

export default Auth;