import React, { Component } from "react";
import TransactionModule from './TransactionModal';
import Chart from '../../services/Chart';

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = { width : 0 }
    this.updateWidth = this.updateWidth.bind(this);
  }
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }
  updateWidth() {
    this.setState({ width: window.innerWidth});
  }
  render() {
    return (
      <div className="modal" id="stock" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className={(this.props.stock.percent > 0) ? 'modal-header bg-success' : 'modal-header bg-danger'}>
              <h3 className="modal-title text-light">{this.props.stock.ticker.toUpperCase()} - {this.props.stock.name}</h3>
            </div>
            <div class="modal-body">
              <div className="text-center">
                <h1 className={(this.props.stock.percent > 0) ? 'text-success' : 'text-danger'}>${this.props.stock.price} USD</h1>
                <Chart width="600" height="400" stock={this.props.stock.ticker} type="full"/>
              </div>
              {this.props.stock.isOwned.status
                ? <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-8">
                    <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.stock.isOwned.shares}</small>
                      <span className="badge badge-pill badge-secondary">Shares</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.stock.isOwned.averagePrice}</small>
                      <span className="badge badge-pill badge-secondary">Average Price</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{(this.props.stock.isOwned.shares * this.props.stock.price)}</small>
                      <span className="badge badge-pill badge-secondary">Total Equity</span>
                    </li>
                  </ul>
                    </div>
                    <div className="col-sm-2">
                    </div>
                  </div>
                  : null
              }
              <br/>
              <div class="row">
                <div class="col-sm-6">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.stock.open}</small>
                      <span className="badge badge-pill badge-secondary">Open</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.stock.high}</small>
                      <span className="badge badge-pill badge-secondary">Today's High</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.stock.low}</small>
                      <span className="badge badge-pill badge-secondary">Today's Low</span>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">Volume</span>
                        <small>{this.props.stock.volume}</small>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week High</span>
                        <small>{this.props.stock.high52}</small>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week Low</span>
                        <small>{this.props.stock.low52}</small>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
            <TransactionModule/>
          </div>
        </div>
      </div>
    );
  }
}

export default StockModal;
