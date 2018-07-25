import React, {Component} from 'react';

class Chart extends Component {

    constructor(){
        super();
        this.state = {canvas:""};
    }

    componentDidMount() {
        console.log(this.props);
        const type = this.props.type?this.props.type:"full";
        const time = this.props.time?this.props.time:"day";
        const extras = "/batch?types=quote,chart&range="+{day:"1d&chartInterval=5", month:"1m"}[time];
        const canvas = document.getElementById(this.props.stock);
        this.ctx = canvas.getContext("2d");
        this.bringStock(extras, (type==="full"));
    }

    render () {
        return (
            <canvas width={this.props.width} height={this.props.height} id={this.props.stock}></canvas>
        );
    }
    
    bringStock(extras, full){
        const path = "https://api.iextrading.com/1.0/stock/";
        fetch(path + this.props.stock + extras, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                this.drawStock(data, full);
            }.bind(this));
        }.bind(this));
    }
    
    drawStock(data, full){
        let posx = full ? 100 : 0;
        const ratespace = full ? 200 : 0;
        const posyini = this.props.height - (full ? ratespace : 0);
        const finalwidth = this.props.width - (full ? posx+10 : 0);
        const finalheight = posyini - (full ? 10 : 0);
        const xspace = Math.round(finalwidth / data.chart.length);
        const color = data.quote.change>0 ? "#00FF00" : "#FF0000";
        const differencials = this.findLowHigh(data.chart);
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        for (let i=0; i<data.chart.length; i++){
            const average = this.roundStock((data.chart[i].high+data.chart[i].low)/2, "round");
            const porc = (average-differencials.low) / differencials.difference;
            const posy = Math.round(posyini-(porc*finalheight));
            this.ctx[i ? "lineTo" : "moveTo"](posx, posy);
            posx += xspace;
        }
        this.ctx.stroke();
    }

    quoteStock(){

    }
    
    findLowHigh(data){
        const roundNum = 4;
        let low = 0;
        let high = 0;
        for (let i=0; i<data.length; i++){
            let average = (data[i].low+data[i].high)/2;
            if(average<low || !low)low = average;
            if(average>high || !high)high = average;
        }
        return {low:this.roundStock(low, "ceil"), high:this.roundStock(high, "ceil"), difference:this.roundStock((high-low), "round")};
    }
    
    roundStock(value, method){
        const roundStock = 10;
        return Math[method](value*roundStock)/roundStock;
    }
}
export default Chart;