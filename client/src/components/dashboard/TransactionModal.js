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
                            <button className="btn btn-success btn-block" data-toggle="collapse" data-target="#collapseBuy">
                                <i className="material-icons my-0 py-0">attach_money</i>
                                <h5>BUY</h5>
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-danger btn-block" data-toggle="collapse" data-target="#collapseSell">
                                <i className="material-icons my-0 py-0">money_off</i>
                                <h5>SELL</h5>
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-info btn-block" data-toggle="collapse" data-target="#collapseWatch">
                                <i className="material-icons my-0 py-0">remove_red_eye</i>
                                <h5>WATCH</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionModule;