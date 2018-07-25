import React, { Component } from 'react';
import Auth from '../../services/Auth';
import EventBus from '../../services/EventBus';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = { username : '',
                    password : ''
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
        Auth.getToken(this.state.username, this.state.password);
    }
    pressEnter(event) {
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
        }
    }
    render() {
        return(
            <div className="modal fade" id="login" role="dialog">
                <div className="modal-dialog" role="doc">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title">Login</span>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="username">Please enter your username</label>
                                        <input className="form-control" type="username" value={this.state.username} name="username" id="username" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Please enter your password</label>
                                        <input className="form-control" type="password" value={this.state.password} name="password" id="password" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 text-center">
                                    <button type="button" onClick={this.handleSubmission} className="btn btn-dark" id="submit" data-dismiss="modal">Submit</button>
                                </div>
                                <div className="col-sm-6">
                                    <ul>
                                        <li>
                                            <a href="#">Forgot Password</a>
                                        </li>
                                        <li>
                                            <a href="#">Sign up for free today!</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal;