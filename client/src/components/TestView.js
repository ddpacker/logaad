import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioComponent from './dashboard/PortfolioComponent';

class TestView extends Component {

    constructor() {
        super();
        this.state = {
            ticker: 'goog',
            isOwned: {
                status : true,
                shares : 3,
                averagePrice: 100
            },
            shares: 3
        }
        var tickerCall = `this.state.${this.state.ticker}_day.quote`;
        Tickers.suscribeTicker(this.state.ticker, "day", this.tickerUpdated.bind(this));
        this.swapTicker = this.swapTicker.bind(this);
    }
    swapTicker(symbol) {
        this.setState({ticker : symbol});
    }
    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
        if(this.state.ticker+"_day" === response.id)this.setState({data: response.data});
    }
    render() {
        return(
            <div>
                <button type="button" className="btn" data-toggle="modal" data-target="#stock">Toggle Stock Modal</button>
                <PortfolioComponent stocks={["fb", "goog", "aapl"]} swapTicker={this.swapTicker}/>
                <StockModal stock={this.tickerCall} data={this.state.data}/>
            </div>
        )
    }
}

export default TestView;