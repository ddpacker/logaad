import EventBus from "./EventBus";

class Tickers { 
    static suscribeTicker(stock, time, callBack){
        if(!this.tickers)this.tickers = {};
        if(!this.tickers[stock+time])this.createTicker(stock, time);
        EventBus.getEventEmitter().on(stock+"_"+time, callBack);
        return "";
    }

    static createTicker(stock, time){
        this.tickers[stock+time] = {
            inte: setInterval(this.bringStock, {month:43200000, day:300000}[time], stock, time)
        };
        this.bringStock(stock, time);
    }

    static bringStock(stock, time){
        const path = "https://api.iextrading.com/1.0/stock/";
        const extras = "/batch?types=quote,chart&range="+{day:"1d&chartInterval=5", month:"1m"}[time];
        fetch(path + stock + extras, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                EventBus.eventEmitter.emit(stock+"_"+time, {id:stock+"_"+time, data:data});
            }.bind(this));
        }.bind(this));
    }
}
export default Tickers;
