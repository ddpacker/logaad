import React, { Component } from 'react';

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = { email : '',
                    password : ''
                };
        this.handleForm = this.handleForm.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
    };
    handleForm() {

    }
    handleSubmission() {

    }
    pressEnter() {
        
    }
    render() {
        return(
            <div className="modal fade" id="register" role="dialog">
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
                                        <input className="form-control" type="email" value={this.state.email} name="email" id="email" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Please enter your password</label>
                                        <input className="form-control" type="password" value={this.state.password} name="password" id="password" onChange={this.handleForm} onKeyUp={this.pressEnter} placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterModal;