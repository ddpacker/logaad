import React, { Component } from "react";
import TransactionModule from './TransactionModal';
import Chart from '../../services/Chart';

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width : 600
    }
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
    if(window.innerWidth >= 990) {
      this.setState({width: 600})
    } else if ((window.innerWidth <= 990) && (window.innerWidth >= 518)) {
      this.setState({width: 400})
    } else {
      this.setState({width: (window.innerWidth * 0.8)})
    }
  }
  render() {
    return (
      <div className="modal" id="stock" tabIndex="-1" role="dialog">
        {this.props.data ?
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className={(this.props.data.quote.changePercent > 0) ? 'modal-header bg-success' : 'modal-header bg-danger'}>
              <h3 className="modal-title text-light">{this.props.data.quote.symbol} - {this.props.data.quote.companyName}</h3>
            </div>
            <div class="modal-body">
              <div className="text-center">
                <h1 className={(this.props.data.quote.changePercent > 0) ? 'text-success' : 'text-danger'}>${(Math.round((this.props.data.chart[(this.props.data.chart.length - 1)].average) * 100)) / 100} USD</h1>
                <Chart width={(this.state.width)} height={(this.state.width * 0.6)} data={this.props.data} type="full"/>
              </div>
              {this.props.data.quote.isOwned
                ? <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-8">
                    <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.data.quote.isOwned.shares}</small>
                      <span className="badge badge-pill badge-secondary">Shares</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.data.quote.stock.isOwned.averagePrice}</small>
                      <span className="badge badge-pill badge-secondary">Average Price</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{(this.props.data.quote.stock.isOwned.shares * this.props.data.quote.latestPrice)}</small>
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
                      <small>{this.props.data.quote.open}</small>
                      <span className="badge badge-pill badge-secondary">Open</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.data.quote.high}</small>
                      <span className="badge badge-pill badge-secondary">Today's High</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.data.quote.low}</small>
                      <span className="badge badge-pill badge-secondary">Today's Low</span>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">Volume</span>
                        <small>{this.props.data.quote.latestVolume}</small>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week High</span>
                        <small>{this.props.data.quote.week52High}</small>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week Low</span>
                        <small>{this.props.data.quote.week52Low}</small>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
            <TransactionModule/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}

export default StockModal;
