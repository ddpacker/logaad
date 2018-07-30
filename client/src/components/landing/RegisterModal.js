import React, { Component } from 'react';
import Auth from '../../services/Auth';

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = { email : '',
                    password : '',
                    firstName : '',
                    lastName : '',
                    userName : ''
                };
        this.handleForm = this.handleForm.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
    };
    handleForm(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmission() {
        /*
        console.log("First Name " + this.state.firstName
    + " Last Name " + this.state.lastName 
    + " Email " + this.state.email
    + " Password " + this.state.password 
    + " UserName " + this.state.userName
    );*/
        Auth.createUser(this.state);
    }
    pressEnter(event) {
        if (event.keyCode === 13) {
            document.getElementById("registersubmit").click();
        }
    }
    render() {
        return(
            <div className="modal fade" id="register" role="dialog">
            <div class="alert alert-primary" role="alert">
  This is a primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
                <div className="modal-dialog" role="doc">
                    <div className="modal-content">

                        <div className="modal-header">
                            <span className="modal-title">Register</span>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Please enter your email address</label>
                                        <input className="form-control" type="email" value={this.state.email} name="email" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userName">Please enter your username</label>
                                        <input className="form-control" type="text" value={this.state.userName} name="userName" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Please enter your password</label>
                                        <input className="form-control" type="password" value={this.state.password} name="password" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <input className="form-control" type="text" value={this.state.firstName} name="firstName" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="First Name"/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input className="form-control" type="text" value={this.state.lastName} name="lastName" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Last Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" id="registersubmit" onClick={this.handleSubmission} data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterModal;