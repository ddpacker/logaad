import React, { Component } from 'react';

class TransactionModule extends Component {


    constructor(props) {
        super(props);
        this.state = { 
                    username : '',
                    ownedShares : 4,
                    stock : '',
                    amount: '',
                    price: '',
                    quantity: 0,
                    wallet: 150,
                    isWatched: false
                };
        this.handleBuy = this.handleBuy.bind(this);
        this.BuySale = this.BuySale.bind(this);
        this.handleSell = this.handleSell.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleWatch = this.handleWatch.bind(this);
        
    };

    handleQuantity(event) {
        this.setState({quantity:event.target.value});
    }

    handleWatch(event) {
        this.setState({isWatched:!this.state.isWatched});
    }

    handleBuy(state){
        console.log("State info " + this.state.wallet);
        if ((this.state.quantity * this.props.data.quote.latestPrice) > (this.state.wallet)) {
            this.setState({message: "Too Expensive"})
        }
        console.log("Handle Buy", this);
        this.BuySale("omar","INTC",250,50,"B").then(res=>{
            console.log(res);
            alert("buy");
        });
    }
    handleSell(state){
        console.log("State info " + state);
        console.log("Handle SELL", this);
        this.BuySale("omar","INTC",250,50,"S").then(res=>{
            console.log(res);
            alert("sell");
        });        
    }
    static async BuyTransaction(){
        alert("I'm inside Buy Transaction");
        this.BuySale("omar","INTC",250,50,"B").then(res=>{
            console.log(res);
        });
        return null;
    }

    static async SellTransaction(){
        alert("I'm selling a stock");
        this.BuySale("omar","INTC",250,50,"S").then(res=>{
            console.log(res);
        });
    }

    async BuySale(username,stockid,amount,price,type){    
        //console.log("This is my ip");
        const rawResponse = await fetch('http://localhost:8090/BuyOrSellStocks', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },       
          /*
 {
		"in_userid":"omar",
		"in_stockid":"INTC",
		"in_amount":200,
		"in_type":"B",
		"in_price":125.50
		 }          
          */   
          body: JSON.stringify({
            in_userid: username,
            in_stockid: stockid,
            in_amount: amount,
            in_type: type,
            in_price : price
            })
        });
        const content = await rawResponse.json();
      
        //console.log(content);
        
       return content;
    }

    render() {
        console.log(this.props.data);
        return(
            <div className="card" id="transaction">
                <div id="collapseBuy" className="collapse collapseTransaction" data-parent="#transaction">
                    <div className="card-header bg-dark text-light text-center">
                        Confirm Your Purchase of {this.props.data.quote.symbol}
                    </div>
                    <div className="card-body text-center">
                        <div className="input-group mx-auto">
                            <div className="input-group-prepend">
                                <span className="input-group-text">${this.props.data.quote.latestPrice} x </span>
                            </div>
                            <input type="number" min="1" step="1" max={(this.state.wallet / this.props.data.quote.latestPrice)} onChange={this.handleQuantity} class="form-control" value={this.innerHTML} placeholder="Amount of Shares"></input>
                            <div className="input-group-append">
                                <span className="input-group-text"> = ${Number(this.props.data.quote.latestPrice * this.state.quantity).toFixed(2)}</span>
                                <button className="btn btn-success" onClick={this.handleBuy} data-toggle="alert" data-target="#buy">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="collapseSell" class="collapse collapseTransaction" data-parent="#transaction">
                    <div className="card-header bg-dark text-light text-center">
                        Confirm Your Sale of {this.props.data.quote.symbol}
                    </div>
                    <div className="card-body text-center">
                        You currently own {this.state.ownedShares} shares of {this.props.data.quote.symbol}...
                        <div className="input-group mx-auto">
                            <div className="input-group-prepend">
                                <span className="input-group-text">${this.props.data.quote.latestPrice} x </span>
                            </div>
                            <input type="number" min="1" step="1" max={this.state.ownedShares} onChange={this.handleQuantity} class="form-control" value={this.innerHTML} placeholder="Amount of Shares"></input>
                            <div className="input-group-append">
                                <span className="input-group-text"> = ${Number(this.props.data.quote.latestPrice * this.state.quantity).toFixed(2)}</span>
                                <button className="btn btn-danger" onClick={this.handleBuy} data-toggle="alert" data-target="#buy">Sell</button>
                            </div>
                        </div>
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
                        {this.state.ownedShares > 0
                            ?   <div className="col-sm-4">
                                    <button className="btn btn-danger btn-block" data-toggle="collapse" data-target="#collapseSell">
                                        <i className="material-icons my-0 py-0">money_off</i>
                                        <h5>SELL</h5>
                                    </button>
                                </div>
                            : <div className="col-sm-4">
                                    <button className="btn btn-disabled btn-block">
                                        <i className="material-icons my-0 py-0">money_off</i>
                                        <h5>SELL</h5>
                                    </button>
                                </div>
                        }
                        <div className="col-sm-4">
                            {!this.state.isWatched
                                ?   <button onClick={this.handleWatch} className="btn btn-info btn-block">
                                        <i className="material-icons my-0 py-0">remove_red_eye</i>
                                        <h5>WATCH</h5>
                                    </button>
                                :   <button onClick={this.handleWatch} className="btn btn-warning btn-block">
                                        <i className="material-icons my-0 py-0">remove</i>
                                        <h5>unWATCH</h5>
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionModule;
