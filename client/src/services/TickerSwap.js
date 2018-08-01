import EventBus from "./EventBus";

class TickerSwap { 
    static emitSwap(symbol) {
        EventBus.eventEmitter.emit('swap', symbol);
        EventBus.eventEmitter.emit('refreshTransaction');
    }
    static subscribeSwap(cb) {
        EventBus.getEventEmitter().on('swap', cb);
    }
}
export default TickerSwap;
