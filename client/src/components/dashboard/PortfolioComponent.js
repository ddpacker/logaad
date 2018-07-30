import React, { Component } from 'react';
import Tickers from '../../services/Tickers';

class PortfolioComponent extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        console.log(event.target);
    }

    render() {
        return(
            <div className="list-group">
                {this.props.portfolio.tickers
                    ? this.props.portfolio.tickers.map(function(ticker){
                        return(
                            <a onClick={this.handleClick} value={ticker} data-toggle="modal" data-target="#stock" className="list-group-item list-group-item-action">Stock 1: {ticker}</a>
                        )
                    }.bind(this))
                    : null
                }
            </div>
        )
    }
}

export default PortfolioComponent;