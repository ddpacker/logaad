import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';
import PortfolioComponent from './dashboard/PortfolioComponent';
import TickerSwap from '../services/TickerSwap';

class TestView extends Component {

    constructor() {
        super();
        this.state = {
            ticker: "goog",
        }   
    }
    componentWillMount() {
        TickerSwap.subscribeSwap(this.setTicker.bind(this));
        PortfolioValue.suscribe({aapl:15, pzza:35, fb:8}, this.bringPortfolio.bind(this));
    }
    setTicker(response) {
        this.setState({ticker: response});
        Tickers.suscribeTicker(response, "day", this.tickerUpdated.bind(this));
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
        console.log(this.state.ticker);
        console.log(this.state.data);
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