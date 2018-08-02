import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';
import PortfolioComponent from './dashboard/PortfolioComponent';
import TickerSwap from '../services/TickerSwap';
import ChartsView from './ChartsView';
import WatchlistComponent from './dashboard/WatchlistComponent';
import Stocks from '../services/Stocks';
import EventBus from '../services/EventBus';
import WatchlistValue from '../services/WatchlistValue';

class DashboardView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ticker: "",
            wallet: 0
        };
        this.findQuantity = this.findQuantity.bind(this);
        this.getWallet = this.getWallet.bind(this);
        this.refreshOnTransaction = this.refreshOnTransaction.bind(this);
        this.userStocksData = this.userStocksData.bind(this);
        this.findWatchStatus = this.findWatchStatus.bind(this);
        EventBus.getEventEmitter().on('refresh', this.refreshOnTransaction);

    }
    componentWillMount() {
        this.userStocksData();
        TickerSwap.subscribeSwap(this.setTicker.bind(this));
        this.getWallet();
    }
    userStocksData() {
        Stocks.userPortfolio(this.props.token).then(res=>{
            if (res.Stocks_by_User.length > 0) {
                this.setPortfolio(res.Stocks_by_User, "portList");
            }
        });
        Stocks.userWatchlist(this.props.token).then(res=>{
            if (res.WatchList_by_User.length > 0) {
                this.setWatchlist(res.WatchList_by_User, "watchList");
            } else {
                this.setState({watchlist: false});
            }
        });
    }
    refreshOnTransaction() {
        this.userStocksData();
        this.getWallet();
    }
    setPortfolio(response, value) {
        console.log(value, response);
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
    setWatchlist(response, value) {
        console.log(value, response);
        let watchList = {};
        for (let i=0; i<response.length; i++){
            for (let j in response[i]){
                watchList[j.toLowerCase()] = response[i][j];
            }
        }
        let obj = {};
        obj[value] = watchList;
        this.setState(obj);
        WatchlistValue.suscribe(this.state.watchList, this.bringWatchlist.bind(this));
    }
    setTicker(response) {
        this.setState({ticker: response});
        /*console.log(response);
        if ((this.state.portList).hasOwnProperty((response).toLowerCase())) {
            this.setState({tickerQty: this.state.portList[response]})
        } else {
            console.log("Not Owned")
        }*/
        this.findWatchStatus(response);
        this.findQuantity(response);
        Tickers.suscribeTicker(response, "day", this.tickerUpdated.bind(this));
    }
    findWatchStatus(response) {
        var watchFlag;
        if (this.state.watchlist) {
            this.state.watchlist.tickers.map(ticker=>{
                if (response === ticker.tickerName) {
                    this.setState({isWatched:true});
                    watchFlag = true;
                    console.log("we are here");
                }
            }); 
        }
        if (!watchFlag){
            console.log("Here");
            this.setState({isWatched:false});
        }
    }
    findQuantity(response) {
        var quantityFlag = false;
        if (this.state.portfolio) {
            this.state.portfolio.tickers.map(ticker=>{
                if (response === ticker.tickerName) {
                    this.setState({quantity:ticker.shares});
                    quantityFlag = true;
                };
            }); 
        }
        if (!quantityFlag){
            this.setState({quantity:0});
        }
    }
    getWallet(){
        Stocks.wallet(this.props.token).then(res=>{
            this.setState({wallet: res.Wallet_by_User.wallet })
            
        });
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
    bringWatchlist(response) {
        this.setState({watchlist: response});
    }
    render() {
        console.log("Dash", this.state.isWatched);
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
                            <h2 className="display-5">${(this.state.wallet).toFixed(2)} USD</h2>
                            <hr/>
                            <small>Portfolio Value</small>
                            <h1 
                            className={this.state.portfolio.totalChange >= 0
                                ? "display-4 text-success"
                                : "display-4 text-danger"
                            }>${(this.state.wallet + this.state.portfolio.totalEquity).toFixed(2)} USD</h1>
                            <small>Today's Change</small>
                            <h2 className="display-5">{Number.isNaN(this.state.portfolio.totalChange) ? this.state.portfolio.totalChange : 0} %</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <PortfolioComponent portfolio={this.state.portfolio}/>
                            </div>
                            <div className="col-sm-6">
                                <WatchlistComponent watchlist={this.state.watchlist}/>
                            </div>
                        </div>
                    </div>
                :   <div className="jumbotron my-5 text-center">
                        <h1 className="display-4">Welcome to Logaad</h1>
                        <p className="lead">Use the search bar above to get started!</p> 
                    </div>
                }
                <StockModal  data={this.state.data} quantity={this.state.quantity} wallet={this.state.wallet} isWatched={this.state.isWatched} username={this.props.token}/>
            </div>
        
        )
    }
}

export default DashboardView;