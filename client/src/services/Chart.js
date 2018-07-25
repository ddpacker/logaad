import React, {Component} from 'react';

class Chart extends Component {

    constructor(){
        super();
        this.state = {canvas:""};
        this.elementsColor = "#CCCCCC";
    }

    componentDidMount() {
        console.log(this.props);
        const type = this.props.type?this.props.type:"full";
        const time = this.props.time?this.props.time:"day";
        const extras = "/batch?types=quote,chart&range="+{day:"1d&chartInterval=5", month:"1m"}[time];
        this.canvas = document.getElementById(this.props.stock+this.props.width+this.props.height);
        this.ctx = this.canvas.getContext("2d");
        this.full = (type==="full");
        this.bringStock(extras);
    }

    render () {
        return (
            <canvas width={this.props.width} height={this.props.height} id={this.props.stock+this.props.width+this.props.height}></canvas>
        );
    }
    
    bringStock(extras){
        const path = "https://api.iextrading.com/1.0/stock/";
        fetch(path + this.props.stock + extras, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                this.data = data;
                this.drawStock(this.data, this.full);
                if(this.full)this.canvas.onmousemove = this.movingMouse.bind(this);
            }.bind(this));
        }.bind(this));
    }
    
    drawStock(data, full){
        const differencials = this.findLowHigh(data.chart);
        const ratespace = full ? 200 : 0;
        const posxini = full ? 70 : 0;
        const posyini = this.props.height - (full ? ratespace : 0);
        const finalwidth = this.props.width - (full ? posxini+10 : 0);
        const finalheight = posyini - (full ? 10 : 0);
        const color = data.quote.change>0 ? "rgba(0, 255, 0, " : "rgba(255, 0, 0, ";
        const xspace = this.roundStock(finalwidth / (data.chart.length-1));
        let posx = posxini;
        let tooltips = [];
        if(this.props.test){
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#000000";
            this.ctx.rect(posxini, posyini-finalheight, finalwidth, finalheight);
            this.ctx.stroke();
        }
        //console.log("INITIAL>>", differencials.high, differencials.low, differencials.difference);
        this.ctx.beginPath();
        this.ctx.strokeStyle = color+"1)";
        this.ctx.lineWidth = 2;
        for (let i=0; i<data.chart.length; i++){
            const average = this.roundStock((data.chart[i].high+data.chart[i].low)/2);
            const porc = (average-differencials.low) / differencials.difference;
            const posy = Math.round(posyini-(porc*finalheight));
            this.ctx[i ? "lineTo" : "moveTo"](posx, posy);
            tooltips.push({posx:posx, posy:posy, label:data.chart[i].label, average:average});
            if(i < data.chart.length-1)posx += xspace;
            if(this.props.test)console.log(average);
        }
        this.ctx.stroke();
        if(full){
            const grad = this.ctx.createLinearGradient(posxini, posyini-finalheight, posxini, posyini);
            grad.addColorStop(0, color+".3)");
            grad.addColorStop(1, color+"0)");
            this.ctx.fillStyle = grad;
            this.ctx.lineTo(posx, posyini);
            this.ctx.lineTo(posxini, posyini);
            this.ctx.fill();
            this.quoteStock(data.quote, {x:posxini, y:posyini-finalheight, width:finalwidth, height:finalheight}, differencials);
            this.showTooltips(tooltips, xspace, posxini, posyini);
        }
    }

    quoteStock(quote, coord, differencials){
        const space = Math.round(coord.height/4);
        this.ctx.lineWidth = .3;
        this.ctx.fillStyle = this.ctx.strokeStyle = this.elementsColor;
        this.ctx.font = "lighter 12px sans-serif";
        this.ctx.textAlign = "right";
        for (let i=0; i<5; i++){
            this.ctx.beginPath();
            if(i==4)this.ctx.lineWidth = 2;
            this.ctx.moveTo(coord.x-10, coord.y+space*i);
            this.ctx.lineTo(coord.x+coord.width+4, coord.y+space*i);
            this.ctx.stroke();
            this.ctx.fillText(this.roundStock(differencials.high-differencials.difference/4*i), coord.x-20, coord.y+space*i);
        }
    }

    showTooltips(data, xspace, posx, posy){
        const interm = Math.round(data.length/4.5);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.elementsColor;
        this.ctx.textAlign = "left";
        for (let i=0; i<5; i++){
            const posxdef = posx+interm*i*xspace;
            this.ctx.arc(posxdef, posy+2, 3, 0, 360);
            this.ctx.fillText(data[interm*i].label, posxdef, posy+20);
        }
        this.ctx.fill();
    }

    movingMouse(event){
        console.log(event, this.canvas);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStock(this.data, this.full);
        this.movingTooltip(event.layerX, event.layerY);
    }

    movingTooltip(posx, posy){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.lineWidth = .3;
        this.ctx.strokeStyle = this.elementsColor;
        this.ctx.rect(posx, posy, 140, 30);
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    findLowHigh(data){
        let low = 0;
        let high = 0;
        const margin = .0005;
        for (let i=0; i<data.length; i++){
            if(data[i].low>0 && data[i].high>0){
                let average = (data[i].low+data[i].high)/2;
                if(average<low || !low)low = average;
                if(average>high || !high)high = average;
            }else {
                data.splice(i, 1);
                i --;
            }
        }
        low *= 1-margin;
        high *= 1+margin;
        let difference = high-low;
        return {low:this.roundStock(low, "floor"), high:this.roundStock(high, "ceil"), difference:this.roundStock(difference, "ceil")};
    }
    
    roundStock(value, method="round"){
        const roundNum = 10;
        return Math[method](value*roundNum)/roundNum;
    }
}
export default Chart;