import React, { Component } from "react";
import Search from "../services/Search";
import TestView from '../components/TestView';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="mx-auto order-0">
          <a className="navbar-brand">
            <img src={require("../img/brand.png")} style={{ height: "50px" }} alt="Brand" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          {this.props.token === "" ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-toggle="modal"
                  data-target="#login"
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-toggle="modal"
                  data-target="#register"
                >
                  Register
                </button>
              </li>
            </ul>
          ) : (
            <div className="navbar-nav ml-auto">
              
              <Search className="nav-item" />
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
