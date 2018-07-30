import EventBus from "./EventBus";

class Auth {
    static async createUser(state) {
        //console.log(state);

        var username = state.userName;
        var email = state.email;
        var password = state.password;
        var name = `${state.firstName} ${state.lastName}`;
        //console.log("Auth UserName " + username + " name " + name + " email " + email + " password " + password);
        
        this.RegisterUser(username,name,email,password).then(res=>{
            var Message = res.Message;
            if(Message === "Operation Succesful"){
                alert("User created!");
            }else{
                alert("Operation Failed");
            }
        });
        /*
        	 {
			"in_userid":"greg",
			"in_name":"Greg Garville",
			"in_email":"greg@clasic.com",
			"in_password":"clasic123",
			"in_active":"0"
		 }
        */
    }
    static async getToken(state) {
        var authToken = null;
        var username = state.username;
        var password = state.password;
        var AccessGranted = -1;
        //var Name = "";
        //var Mail = "";
        this.login(username,password).then(res=>{
            //console.log(res);
            AccessGranted = res.LoginInfo.exist
            authToken = JSON.stringify(res.LoginInfo.userid);
            //Name = res.LoginInfo.name;
            //Mail = res.LoginInfo.email;
            if (AccessGranted === 1) {
                //console.log("Logged In");
                EventBus.eventEmitter.emit('authenticated', authToken);
            }
        });
        //console.log("Before IF " + AccessGranted);
        if (AccessGranted === 1) {
            //console.log("Logged In");
            EventBus.eventEmitter.emit('authenticated', authToken);
        } else {
            return null;
        }
    }

    static async RegisterUser(userid,name,email,password){
        console.log("I was here");
        const rawResponse = await fetch('http://localhost:8090/CreateUser', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },          
          /*
          	"in_userid":"greg",
			"in_name":"Greg Garville",
			"in_email":"greg@clasic.com",
			"in_password":"clasic123",
			"in_active":"0"
          */
          body: JSON.stringify({in_userid: userid,
            in_name: name,
            in_email: email,
            in_password: password,
            in_active: 0
        })
        });
        const content = await rawResponse.json();
        console.log(content);
       return content;        
    }
    static async login(username,password){    
        //console.log("This is my ip");
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