class Auth {
    static getToken(email, password) {
        console.log(email, password);
        if ((email === "admin@admin") && (password === "password")) {
            return "A JSON TOKEN";
        } else {
            return null;
        }
    }
}

export default Auth;