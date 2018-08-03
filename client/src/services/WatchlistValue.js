import EventBus from "./EventBus";

class WatchlistValue { 
    static watchlist;
    static suscribe(stocks, callBack){
        EventBus.getEventEmitter().on("watchlist", callBack);
        if (this.watchlist)clearInterval(this.watchlist.inte);
        this.watchlist = {
            inte: setInterval(this.bringWatchlist.bind(this), 60000, stocks),
            stocks: stocks
        };
        this.bringWatchlist(stocks);
    }

    static bringWatchlist(stocks){
        let symbols = "";
        for (let i in stocks){
            symbols += (symbols?",":"")+i;
        }
        //if(symbols===""){symbols="aapl";}
        const path = "https://api.iextrading.com/1.0/stock/market/batch?symbols="+symbols+"&types=chart,ohlc&range=1d&last=1&chartLast=5";
        fetch(path, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                let obj = {
                    tickers: []
                };
                for (let i in data){
                    if(data[i] && data[i].chart && data[i].chart.length){
                        const stock = i.toLowerCase();
                        const chart = this.verifyData(data[i].chart, (data[i].chart.length>=4?4:data[i].chart.length-1));
                        const open = data[i].ohlc.open.price;
                        const current = chart.average.toFixed(2);
                        const ticker = {
                            tickerName: stock,
                            tickerValue: current,
                        };
                        obj.tickers.push(ticker);
                    }
                }
                obj.tickers.sort(this.compare);
                EventBus.eventEmitter.emit("watchlist", obj);
            }.bind(this));
        }.bind(this));
    }

    static compare(a, b) {
        if (a.tickerName < b.tickerName)return -1;
        else return 1;
    }

    static verifyData(data, num) {
        //console.log("data ",data,"num",num);
        const index = data.length>=num?num:data.length-1;
        if (data[index].average>0 || !index)return data[index];
        else return this.verifyData(data, index-1);
    }
}
export default WatchlistValue;
