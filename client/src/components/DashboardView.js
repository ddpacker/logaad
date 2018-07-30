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
        <div className="row" />
        <StockModal token={this.props.token} ticker={this.state.ticker} />
        {this.state.token}
        DASHBOARD VIEW
      </div>
    );
  }
}

export default DashboardView;
