import React, { Component } from "react";
import TransactionModule from './TransactionModal';
import Chart from '../../services/Chart';

class StockModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal" id="stock" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className={(this.props.stock.percent > 0) ? 'modal-header bg-success' : 'modal-header bg-danger'}>
              <h5 className="modal-title">{this.props.stock.ticker}</h5>
            </div>
            <div class="modal-body">
              <Chart width="600" height="400" stock={this.props.stock.ticker} type="full"/>
            </div>
            <TransactionModule/>
          </div>
        </div>
      </div>
    );
  }
}

export default StockModal;
