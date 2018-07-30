import React, { Component } from 'react';
import Tickers from '../../services/Tickers';
import TickerSwap from '../../services/TickerSwap';

class PortfolioComponent extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        var symbol = event.target.getAttribute("value")
        TickerSwap.emitSwap(symbol);
    }

    render() {
        return(
            <div className="list-group">
            
                {this.props.portfolio
                    ? this.props.portfolio.tickers.map(function(ticker){
                        return(
                            <a onClick={this.handleClick} key={ticker.tickerName} value={ticker.tickerName} data-toggle="modal" data-target="#stock" className="list-group-item list-group-item-action">{ticker.tickerName}</a>
                        )
                    }.bind(this))
                    : null
                }
            </div>
        )
    }
}

export default PortfolioComponent;