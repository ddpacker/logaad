import React, {Component} from 'react';
import Chart from '../services/Chart';
import Tickers from '../services/Tickers';


class ChartsView extends Component {
    constructor(){
        super();
        this.state = {width: 400};
        Tickers.suscribeTicker("pzza", "month", this.tickerUpdated.bind(this));
        Tickers.suscribeTicker("aapl", "day", this.tickerUpdated.bind(this));
    }

    tickerUpdated(response){
        var obj = {};
        obj[response.id] = response.data;
        this.setState(obj);
    }

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