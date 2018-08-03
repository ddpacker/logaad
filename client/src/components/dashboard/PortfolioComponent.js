import React, { Component } from 'react';
import Tickers from '../../services/Tickers';
import TickerSwap from '../../services/TickerSwap';
import Chart from '../../services/Chart';
import ChartsView from '../ChartsView';
import EventBus from '../../services/EventBus';

class PortfolioComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleHoverIn = this.handleHoverIn.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
        this.tickerUpdated = this.tickerUpdated.bind(this);

        
    }
    componentWillMount() {
        if(this.props.portfolio && this.props.portfolio.tickers){
            this.props.portfolio.tickers.map(function(ticker){
                Tickers.suscribeTicker(ticker.tickerName, "month", this.tickerUpdated);
            }.bind(this));
        }
    }

    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
    }

    handleClick(event) {
        event.preventDefault();
        var symbol = event.currentTarget.getAttribute("value");
        TickerSwap.emitSwap(symbol);
    }

    handleHoverIn(event) {
        event.preventDefault();
        var symbol = event.currentTarget.getAttribute("value");
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
                    Portfolio
                </div>
                <div className="card-body bg-light">
                    <div className="list-group text-center">
                        {this.props.portfolio
                            ? this.props.portfolio.tickers.map(function(ticker){
                                if (ticker.shares > 0) {
                                    return(
                                        <div onClick={this.handleClick} onMouseEnter={this.handleHoverIn} onMouseLeave={this.handleHoverOut} key={ticker.tickerName} value={ticker.tickerName} data-toggle="modal" data-target="#stock" 
                                            className={ticker.percentChange >= 0 
                                                ? 'list-group-item bg-success text-light d-flex justify-content-between align-items-center'
                                                : 'list-group-item bg-danger text-light d-flex justify-content-between align-items-center'
                                            }>
                                                <span><small>{ticker.tickerName.toUpperCase()} </small><br/><span className="badge badge-dark badge-pill">{ticker.shares} Shares</span></span>
                                                <Chart width="180" height="55" data={this.state[ticker.tickerName+"_month"]} type="simple"/>                                        
                                                {this.state.isActive === ticker.tickerName
                                                    ? <span><small>Total Equity: </small><h6>${ticker.stockEquity}</h6></span>
                                                    : <span><small>${ticker.tickerValue}</small><br/><span className="badge badge-dark badge-pill">{ticker.percentChange}%</span></span>
                                                }
                                        </div>
                                    )
                                } else {
                                    return(null);
                                }
                            }.bind(this))
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PortfolioComponent;