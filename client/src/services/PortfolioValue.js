import EventBus from "./EventBus";

class PortfolioValue { 
    static portfolio;
    static suscribe(stocks, callBack){
        EventBus.getEventEmitter().on("portfolio", callBack);
        if (this.portfolio)clearInterval(this.portfolio.inte);
        this.portfolio = {
            inte: setInterval(this.bringPortfolio.bind(this), 60000, stocks),
            stocks: stocks
        };
        this.bringPortfolio(stocks);
    }

    static bringPortfolio(stocks){
        let symbols = "";
        for (let i in stocks){
            symbols += (symbols?",":"")+i;
        }
        //if(symbols===""){symbols="aapl";}
        const path = "https://api.iextrading.com/1.0/stock/market/batch?symbols="+symbols+"&types=chart,ohlc&range=1d&last=1&chartLast=5";
        fetch(path, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                let obj = {
                    totalEquity: 0, 
                    tickers: [],
                    totalChange: 0
                };
                let unweightedChange = 0;
                let totalShares = 0;
                for (let i in data){
                    if(data[i] && data[i].chart && data[i].chart.length){
                        const stock = i.toLowerCase();
                        const chart = this.verifyData(data[i].chart, 4);
                        const open = data[i].ohlc.open.price;
                        const current = chart.average.toFixed(2);
                        const stockEquity = Number((chart.average * stocks[stock]).toFixed(2));
                        const stockUnweighted = (((current - open) / open) * 100);
                        const stockChange = stockUnweighted * stocks[stock];
                        const ticker = {
                            tickerName: stock,
                            tickerValue: current,
                            stockEquity: +stockEquity.toFixed(2),
                            shares: stocks[stock],
                            percentChange: +stockUnweighted.toFixed(3)
                        };
                        obj.tickers.push(ticker);
                        obj.totalEquity += stockEquity;
                        unweightedChange += +stockChange.toFixed(3);
                        totalShares += stocks[stock];
                    }
                }
                obj.totalChange = (unweightedChange / totalShares).toFixed(3);
                obj.tickers.sort(this.compare);
                obj.totalEquity = Number(obj.totalEquity.toFixed(2));
                EventBus.eventEmitter.emit("portfolio", obj);
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
        if (!data.length)return null;
        else if (data[index].average>0 || !index)return data[index];
        else return this.verifyData(data, index-1);
    }
}
export default PortfolioValue;
