import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: "#e6f2ff"}}>
                <div className="mx-auto order-0">
                    <a className="navbar-brand" href="#">
                        <img src={require('../img/logo.png')}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#login">Login</button> 
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#register">Register</button> 
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default NavBar;