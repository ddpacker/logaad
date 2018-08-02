import React, { Component } from "react";
import TransactionModule from './TransactionModal';
import Chart from '../../services/Chart';
import PortfolioValue from "../../services/PortfolioValue";
import EventBus from "../../services/EventBus";
import Stocks from "../../services/Stocks";

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width : 600,
      quantity: 0,
      wallet: 0
    }
    this.updateWidth = this.updateWidth.bind(this);
    this.chartLength = this.chartLength.bind(this);
  }
  componentWillMount() {
    this.setState({quantity : this.props.quantity});
    

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
  chartLength(array){
    if(array.length>10){
      return 10
    }
    return (array.length-1);
  }
  render() {
    const value = (this.props.data && this.props.data.chart)?PortfolioValue.verifyData(this.props.data.chart, this.chartLength(this.props.data.chart)/*10*/):null;
    return (
      <div className="modal" id="stock" tabIndex="-1" role="dialog">
        <test/>
        {this.props.data ?
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className={(this.props.data.quote.changePercent >= 0) ? 'modal-header bg-success' : 'modal-header bg-danger'}>
              <h3 className="modal-title text-light">{this.props.data.quote.symbol} - {this.props.data.quote.companyName}</h3>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h1 className={(this.props.data.quote.changePercent >= 0) ? 'text-success' : 'text-danger'}>${Number((value.average)).toFixed(2)} USD</h1>
                <Chart width={(this.state.width)} height={(this.state.width * 0.6)} data={this.props.data} type="full"/>
              </div>
              {this.state.ownerShip
                ? <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-8">
                    <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.portList}</small>
                      <span className="badge badge-pill badge-secondary">Shares</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{this.props.portList}</small>
                      <span className="badge badge-pill badge-secondary">Average Price</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{(this.props.portList)}</small>
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
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{Number(this.props.data.quote.open).toFixed(2)}</small>
                      <span className="badge badge-pill badge-secondary">Open</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{Number(this.props.data.quote.high).toFixed(2)}</small>
                      <span className="badge badge-pill badge-secondary">Today's High</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <small>{Number(this.props.data.quote.low).toFixed(2)}</small>
                      <span className="badge badge-pill badge-secondary">Today's Low</span>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">Volume</span>
                        <small>{this.props.data.quote.latestVolume.toLocaleString()}</small>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week High</span>
                        <small>{Number(this.props.data.quote.week52High).toFixed(2)}</small>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-secondary">52 Week Low</span>
                        <small>{Number(this.props.data.quote.week52Low).toFixed(2)}</small>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
            <TransactionModule token={this.props.token} quantity={this.props.quantity} data={this.props.data} wallet={this.props.wallet} username={this.props.username}/>
          </div>
        </div>
        : null}
      </div>
    );
  }
}

export default StockModal;
