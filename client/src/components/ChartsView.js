import React, {Component} from 'react';
import Chart from '../services/Chart';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';


class ChartsView extends Component {
    constructor(props){
        super(props);
        var tickerToRender = `${this.props.ticker}_month`;
        Tickers.suscribeTicker(this.props.ticker, "month", this.tickerUpdated.bind(this));
    }

    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
    }

    /*bringTickers(){
        const path = "https://api.iextrading.com/1.0/ref-data/symbols";
        fetch(path, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                let tickers = [];
                for (let i=0; i<data.length; i++){
                    if(data[i].type=="cs" && data[i].isEnabled)tickers.push(data[i]);
                }
            }.bind(this));
        }.bind(this));
    }*/

    render (){
        return (
            <div>
                <Chart width="100" height="50" data={this.tickerToRender} type="simple"/>
            </div>
        )
    }
}

export default ChartsView;