import EventBus from "./EventBus";

class Auth {
    static async getToken(username, password) {
        var authToken = null;
        var AccessGranted = -1;
        var Name = "";
        var Mail = "";
        this.login(username,password).then(res=>{
            console.log(res);
            AccessGranted = res.LoginInfo.exist
            authToken = JSON.stringify(res.LoginInfo.userid);
            Name = res.LoginInfo.name;
            Mail = res.LoginInfo.email;
            if (AccessGranted == 1) {
                console.log("Logged In");
                EventBus.eventEmitter.emit('authenticated', authToken);
            }
        });
        console.log("Before IF " + AccessGranted);
        if (AccessGranted == 1) {
            console.log("Logged In");
            EventBus.eventEmitter.emit('authenticated', authToken);
        } else {
            return null;
        }
    }

    static async login(username,password){
        
        
        const rawResponse = await fetch('http://localhost:8090/LogIn', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },          
          body: JSON.stringify({in_userid: username, in_password: password})
        });
        const content = await rawResponse.json();
      
        //console.log(content);
        
       return content;
    }
    

}

export default Auth;