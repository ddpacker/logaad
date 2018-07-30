import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';
import PortfolioComponent from './dashboard/PortfolioComponent';

class TestView extends Component {

    constructor() {
        super();
        this.state = {
            ticker: "goog"
        }
        Tickers.suscribeTicker(this.state.ticker, "day", this.tickerUpdated.bind(this));
        PortfolioValue.suscribe({aapl:15, pzza:35, fb:8}, this.bringPortfolio.bind(this));
    }
    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
        if(this.state.ticker+"_day" === response.id)this.setState({data: response.data});
    }
    bringPortfolio(response){
        this.setState({portfolio: response});
    }
    render() {
        return(
            <div>
                <button type="button" className="btn" data-toggle="modal" data-target="#stock">Toggle Stock Modal</button>
                <PortfolioComponent portfolio={this.state.portfolio} swapTicker={this.swapTicker}/>
                <StockModal data={this.state.data}/>
            </div>
        )
    }
}

export default TestView;