import React, { Component } from 'react';
import Auth from '../../services/Auth';
import EventBus from '../../services/EventBus';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = { email : '',
                    password : ''
                };
        this.handleForm = this.handleForm.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
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
        var authToken = Auth.getToken(this.state.email, this.state.password);
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
                                        <label htmlFor="email">Please enter your email address</label>
                                        <input className="form-control" type="email" value={this.state.email} name="email" id="email" onChange={this.handleForm} placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Please enter your password</label>
                                        <input className="form-control" type="password" value={this.state.password} name="password" id="password" onChange={this.handleForm} placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
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
                                <div className="col-sm-6 text-center">
                                    <button type="button" onClick={this.handleSubmission} className="btn btn-dark" data-dismiss="modal">Submit</button>
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