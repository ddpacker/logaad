import React, { Component } from 'react';

class TransactionModule extends Component {
    render() {
        return(
            <div className="card" id="transaction">
                <div id="collapseBuy" class="collapse" data-parent="#transaction">
                    <div class="card-body">
                        THIS IS BUY
                    </div>
                </div>
                <div id="collapseSell" class="collapse" data-parent="#transaction">
                    <div class="card-body">
                        THIS IS SELL
                    </div>
                </div>
                <div id="collapseWatch" class="collapse" data-parent="#transaction">
                    <div class="card-body">
                        THIS IS WATCH
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row text-center">
                        <div className="col-sm-4">
                            <button className="btn btn-success" data-toggle="collapse" data-target="#collapseBuy">Buy</button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-danger" data-toggle="collapse" data-target="#collapseSell">Sell</button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-warning" data-toggle="collapse" data-target="#collapseWatch">Watch</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionModule;