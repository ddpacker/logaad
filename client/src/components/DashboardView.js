import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';
import PortfolioComponent from './dashboard/PortfolioComponent';
import TickerSwap from '../services/TickerSwap';
import ChartsView from './ChartsView';
import WatchlistComponent from './dashboard/WatchlistComponent';
import Stocks from '../services/Stocks';

class DashboardView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ticker: "",
            tickerQty: 0,
            wallet: 150.26,
        };
    }
    componentWillMount() {
        Stocks.userPortfolio(this.props.token).then(res=>{
            this.setArray(res.Stocks_by_User, "portList");
        });
        TickerSwap.subscribeSwap(this.setTicker.bind(this));
    }
    setArray(response, value) {
        let portList = {};
        for (let i=0; i<response.length; i++){
            for (let j in response[i]){
                portList[j.toLowerCase()] = response[i][j];
            }
        }
        let obj = {};
        obj[value] = portList;
        this.setState(obj);
        PortfolioValue.suscribe(this.state.portList, this.bringPortfolio.bind(this));
    }
    setTicker(response) {
        this.setState({ticker: response});
        console.log(response);
        if ((this.state.portList).hasOwnProperty((response).toLowerCase())) {
            this.setState({tickerQty: this.state.portList[response]})
        } else {
            console.log("Not Owned")
        }
        Tickers.suscribeTicker(response, "day", this.tickerUpdated.bind(this));
    }
    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
        if(this.state.ticker+"_day" === response.id)this.setState({data: response.data});
    }
    bringPortfolio(response){
        //console.log("bringPortfolio", response)
        this.setState({portfolio: response});
    }
    render() {
        return(
            <div className="container">
                {this.state.portfolio && this.state.portList
                ?   <div>
                        <div className=
                            {this.state.portfolio.totalChange >= 0 
                                ?   "jumbotron my-5 text-center text-light bg-dark"
                                :   "jumbotron my-5 text-center text-light bg-dark"
                            }>
                            <small>Total Equity</small>
                            <h2 className="display-5">${(this.state.portfolio.totalEquity).toFixed(2)} USD</h2>
                            <small>Cash on Hand</small>
                            <h2 className="display-5">${this.state.wallet} USD</h2>
                            <hr/>
                            <small>Portfolio Value</small>
                            <h1 
                            className={this.state.portfolio.totalChange >= 0
                                ? "display-4 text-success"
                                : "display-4 text-danger"
                            }>${(this.state.wallet + this.state.portfolio.totalEquity).toFixed(2)} USD</h1>
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
                <StockModal  data={this.state.data} portList={this.state.portList} username={this.props.token} quantity={this.state.tickerQty} />
            </div>
        
        )
    }
}

export default DashboardView;