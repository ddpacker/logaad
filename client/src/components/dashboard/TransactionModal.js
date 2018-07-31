import React, { Component } from 'react';

class TransactionModule extends Component {


    constructor(props) {
        super(props);
        this.state = { 
                    username : '',
                    stock : '',
                    amount: '',
                    price: ''
                };
        this.handleBuy = this.handleBuy.bind(this);
        this.BuySale = this.BuySale.bind(this);
        this.handleSell = this.handleSell.bind(this);
        
    };

    handleBuy(state){
        console.log("State info " + state);
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
        return(
            <div className="card" id="transaction">
                <div id="collapseBuy" class="collapse" data-parent="#transaction">
                    <div class="card-body" >                        
                        THIS IS BUY
                    </div>
                </div>
                <div id="collapseSell" class="collapse" data-parent="#transaction">
                    <div class="card-body" >
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
                            <button className="btn btn-success btn-block" data-toggle="collapse" data-target="#collapseBuy" onClick={this.handleBuy}>
                                <i className="material-icons my-0 py-0">attach_money</i>
                                <h5>BUY</h5>
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-danger btn-block" data-toggle="collapse" data-target="#collapseSell" onClick={this.handleSell}>
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
