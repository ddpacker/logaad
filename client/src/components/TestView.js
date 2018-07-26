import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';

class TestView extends Component {

    constructor() {
        super();
        this.state = {
            ticker: "goog",
            name: "Facebook Inc.",
            isOwned: 
                { 
                    status: false,
                    shares: 15,
                    averagePrice: 130
                },
            price: 110,
            percent: -40,
            open: 129,
            high: 150,
            low: 129,
            high52: 150,
            low52: 105,
            volume: 2000000
        }
    }
    componentWillMount() {
        //API({this.state.ticker})
    }
    render() {
        return(
            <div>
                <button type="button" className="btn" data-toggle="modal" data-target="#stock">Toggle Stock Modal</button>
                <StockModal stock={this.state}/>
            </div>
        )
    }
}

export default TestView;