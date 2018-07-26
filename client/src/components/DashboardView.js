import React, { Component } from "react";
import LoginModal from "./landing/LoginModal";
import EventBus from "../services/EventBus";
import StockModal from "./dashboard/StockModal";

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentWillMount() {
    this.setState({ token: this.props.token });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-dark"
          data-toggle="modal"
          data-target="#stock"
        >
          stock
        </button>
        <div className="row" />
        <StockModal ticker={this.state.ticker} />
        {this.state.token}
        DASHBOARD VIEW
      </div>
    );
  }
}

export default DashboardView;
