import React, { Component } from 'react';

class CleanStocks extends Component {
    constructor(){
        super();
        this.loaded = false;
        this.tickers = [];
        this.actualTicker = 0;
        this.bringTickers();
    }

    render(){
        return(
            <div id="showInfo"></div>
        )
    }

    componentDidMount(){
        this.div = document.getElementById("showInfo");
        this.loaded = true;
        if(this.tickers.length)this.cleanTickers();
    }

    cleanTickers(){
        if(this.actualTicker < this.tickers.length)this.bringTicker(this.tickers[this.actualTicker].symbol);
        else this.saveTickers();
    }

    bringTicker(ticker){
        const path = "https://api.iextrading.com/1.0/stock/"+ticker+"/batch?types=quote,chart&range=1d&chartLast=10";
        fetch(path, { method: "get" }).then(function (response) {
            response.json().then(function (data) {
                let badResults = 0;
                for (let i=0; i<data.chart.length; i++){
                    if(data.chart[i].average == -1)badResults ++;
                }
                this.showInfo(data.quote.symbol+" => bad results:"+badResults+"/10 => <font color="+(badResults <= data.chart.length/2?"'#00FF00'>ACCEPTED TICKER":"'#FF0000'>UNACEPTED TICKER")+"</font>");
                if (badResults > data.chart.length/2) this.tickers.splice(this.actualTicker, 1);
                else this.actualTicker ++;
                this.cleanTickers();
            }.bind(this));
        }.bind(this));
    }

    saveTickers(){
        this.showInfo(JSON.stringify(this.tickers));
        const path = "http://localhost:8090/SaveTickers";
        fetch(path, { method: "post", body: JSON.stringify(this.tickers) }).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
            }.bind(this));
        }.bind(this));
        this.showInfo("===> CLEAN ONES: "+this.tickers.length+" tickers");
    }

    bringTickers() {
        const path = "https://api.iextrading.com/1.0/ref-data/symbols";
        fetch(path, { method: "get" }).then(function (response) {
            response.json().then(function (data) {
                this.showInfo("===> INITIAL: "+data.length+" tickers");
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === "cs" && data[i].isEnabled)this.tickers.push({symbol:data[i].symbol, name:data[i].name});
                }
                this.showInfo("===> FIRST CLEAN: "+this.tickers.length+" tickers");
                if(this.loaded)this.cleanTickers();
            }.bind(this));
        }.bind(this));
    }

    showInfo(txt){
        this.div.innerHTML += "<br>"+txt;
    }
}
export default CleanStocks;