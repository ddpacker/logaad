import React, { Component } from "react";
import StockModal from "./dashboard/StockModal";
import Tickers from "../services/Tickers";
import PortfolioComponent from "./dashboard/PortfolioComponent";
import Search from "../services/Search";

class TestView extends Component {
  constructor() {
    super();
    this.state = {
      ticker: "fb"
    };

    this.swapTicker = this.swapTicker.bind(this);
  }
  swapTicker(symbol) {
    this.setState({ ticker: symbol });
  }
  tickerUpdated(response) {
    var obj = {};
    obj[response.id] = response.data;
    this.setState(obj);
    if (this.state.ticker + "_day" === response.id)
      this.setState({ data: response.data });
  }
  render() {
    Tickers.suscribeTicker(
      this.state.ticker,
      "day",
      this.tickerUpdated.bind(this)
    );
    return (
      <div>
        <Search />
        <button
          type="button"
          className="btn"
          data-toggle="modal"
          data-target="#stock"
        >
          Toggle Stock Modal
        </button>
        <PortfolioComponent
          stocks={["fb", "goog", "aapl"]}
          swapTicker={this.swapTicker}
        />
        <StockModal data={this.state.data} />
      </div>
    );
  }
}

export default TestView;
