import React, { Component } from 'react';
import Tickers from '../../services/Tickers';
import TickerSwap from '../../services/TickerSwap';
import Chart from '../../services/Chart';

class WatchlistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleHoverIn = this.handleHoverIn.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        var symbol = event.target.getAttribute("value");
        TickerSwap.emitSwap(symbol);
    }

    handleHoverIn(event) {
        event.preventDefault();
        var symbol = event.target.getAttribute("value");
        this.setState({isActive : symbol});
    }
    
    handleHoverOut(event) {
        event.preventDefault();
        this.setState({isActive : ""});
    }

    render() {
        return(
            <div className="card">
                <div className="card-header bg-dark text-light text-center">
                    Watchlist
                </div>
                <div className="card-body bg-light">
                    <div className="list-group text-center">
                        {this.props.watchlist
                            ? this.props.watchlist.tickers.map(function(ticker){
                                return(
                                    <a onClick={this.handleClick} onMouseEnter={this.handleHoverIn} onMouseLeave={this.handleHoverOut} key={ticker.tickerName} value={ticker.tickerName} data-toggle="modal" data-target="#stock" 
                                        className={ticker.percentChange >= 0 
                                            ? 'list-group-item bg-success text-light d-flex justify-content-between align-items-center'
                                            : 'list-group-item bg-danger text-light d-flex justify-content-between align-items-center'
                                        }>
                                            <span><small>{ticker.tickerName.toUpperCase()} </small><br/><span className="badge badge-dark badge-pill">{ticker.shares} Shares</span></span>
                                            {this.state.isActive === ticker.tickerName
                                                ? <span><small>Total Equity: </small><h5>${ticker.stockEquity}</h5></span>
                                                : <span><small>${ticker.tickerValue}</small><br/><span className="badge badge-dark badge-pill">{ticker.percentChange}</span></span>
                                            }
                                    </a>
                                )
                            }.bind(this))
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default WatchlistComponent;