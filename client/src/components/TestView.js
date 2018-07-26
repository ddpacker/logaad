import React, { Component } from  'react';
import StockModal from './dashboard/StockModal';

class TestView extends Component {

    constructor() {
        super();
        this.state = {
            ticker: "MSFT",
            percent: 40
        }
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