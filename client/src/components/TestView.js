import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';
import PortfolioComponent from './dashboard/PortfolioComponent';
import TickerSwap from '../services/TickerSwap';
import ChartsView from './ChartsView';
import WatchlistComponent from './dashboard/WatchlistComponent';

class TestView extends Component {
    constructor() {
        super();
        this.state = {
            ticker: "fb",
            wallet: 150.26
        };
    }
    componentWillMount() {
        TickerSwap.subscribeSwap(this.setTicker.bind(this));
        PortfolioValue.suscribe({iq: 5, msft: 1}, this.bringPortfolio.bind(this));
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
        console.log(this.state.portfolio);
        return(
            <div className="container">
                {this.state.portfolio
                ?   <div>
                        <div className=
                            {this.state.portfolio.totalChange >= 0 
                                ?   "jumbotron my-5 text-center text-light bg-success"
                                :   "jumbotron my-5 text-center text-light bg-danger"
                            }>
                            <small>Total Equity</small>
                            <h2 className="display-5">${this.state.portfolio.totalEquity} USD</h2>
                            <small>Cash on Hand</small>
                            <h2 className="display-5">${this.state.wallet} USD</h2>
                            <hr/>
                            <small>Portfolio Value</small>
                            <h1 className="display-4">${(this.state.wallet) + (this.state.portfolio.totalEquity)} USD</h1>
                            <small>Today's Change</small>
                            <h2 className="display-5">{this.state.portfolio.totalChange}%</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <PortfolioComponent portfolio={this.state.portfolio}/>
                            </div>
                            <div className="col-sm-6">
                                <WatchlistComponent watclist={this.state.watchlist}/>
                            </div>
                        </div>
                    </div>
                :   <div className="jumbotron my-5 text-center">
                        <h1 className="display-4">Welcome to Logaad</h1>
                        <p className="lead">Use the search bar above to get started!</p> 
                    </div>
                }
                
                <StockModal data={this.state.data}/>
            </div>
        
        )
    }
}

export default TestView;
