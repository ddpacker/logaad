import EventBus from "./EventBus";

class PortfolioValue { 
    static portfolio;
    static suscribe(stocks, callBack){
        EventBus.getEventEmitter().on("portfolio", callBack);
        if(this.portfolio)clearInterval(this.portfolio.inte);
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
        const path = "https://api.iextrading.com/1.0/stock/market/batch?symbols="+symbols+"&types=chart&range=1d&last=1&chartLast=5";
        fetch(path, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                let obj = {
                    totalEquity: 0, 
                    tickers: []//{}
                };
                console.log(this.portfolio);
                for (let i in data){
                    if(data[i] && data[i].chart && data[i].chart.length){
                        const stock = i.toLowerCase();
                        const chart = this.verifyData(data[i].chart, 4);
                        const stockEquity = chart.average * stocks[stock];
                        const ticker = /*obj.tickers[stock] = */{
                            tickerName: stock,
                            tickerValue: Math.round(chart.average*100)/100, 
                            stockEquity: Math.round(stockEquity*100)/100
                        };
                        obj.tickers.push(ticker);
                        obj.totalEquity += stockEquity;
                    }
                }
                obj.tickers.sort(this.compare);
                obj.totalEquity = Math.round(obj.totalEquity*100)/100;
                EventBus.eventEmitter.emit("portfolio", obj);
            }.bind(this));
        }.bind(this));
    }

    static compare(a, b) {
        if (a.tickerName < b.tickerName)return -1;
        else return 1;
    }

    static verifyData(data, num) {
        if(data[num].average>0 || !num)return data[num];
        else return this.verifyData(data, num-1);
    }
}
export default PortfolioValue;
