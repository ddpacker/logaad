import React, {Component} from 'react';
import Chart from '../services/Chart';
import Tickers from '../services/Tickers';
import PortfolioValue from '../services/PortfolioValue';


class ChartsView extends Component {
    constructor(){
        super();
        this.state = {width: 400};
        Tickers.suscribeTicker("pzza", "month", this.tickerUpdated.bind(this));
        Tickers.suscribeTicker("aapl", "day", this.tickerUpdated.bind(this));
        PortfolioValue.suscribe({aapl:15, pzza:35, fb:8}, this.bringPortfolio.bind(this));
    }

    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
    }

    bringPortfolio(response){
        console.log("bringPortfolio", response);
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
                <button onClick={this.changeView.bind(this)}>change</button>
                <Chart width="200" height="100" data={this.state.pzza_month} type="simple"/>
                <br/>
                <Chart width={this.state.width} height="400"  data={this.state.aapl_day} />
            </div>
        )
    }
    
    changeView(){
        this.setState({width:this.state.width+100});
    }
}

export default ChartsView;