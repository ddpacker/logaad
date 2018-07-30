import EventBus from "./EventBus";

class TickerSwap { 
    static emitSwap(symbol) {
        EventBus.eventEmitter.emit('swap', symbol);
    }
    static subscribeSwap(cb) {
        EventBus.getEventEmitter().on('swap', cb);
    }
}
export default TickerSwap;
