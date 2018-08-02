import React, {Component} from 'react';

class Chart extends Component {

    constructor(){
        super();
        this.elementsColor = "#CCCCCC";
        this.id = Math.round(Math.random()*1000000);
    }

    render () {
        setTimeout(this.did_render.bind(this), 100);
        return (
            <canvas width={this.props.width} height={this.props.height} id={this.id}></canvas>
        );
    }

    did_render(){
        if(this.props.data && document.getElementById(this.id)){
            const type = this.props.type?this.props.type:"full";
            this.full = (type==="full");
            this.canvas = document.getElementById(this.id);
            this.ctx = this.canvas.getContext("2d");
            this.data = this.props.data;
            this.drawStock(this.data);
            //else if(this.data != "")this.bringStock();
        }
    }
    
    /*bringStock(){
        const path = "https://api.iextrading.com/1.0/stock/";
        const time = this.props.time?this.props.time:"day";
        const extras = "/batch?types=quote,chart&range="+{day:"1d&chartInterval=5", month:"1m"}[time];
        fetch(path + this.props.stock + extras, {method: "get"}).then(function(response){
            response.json().then(function(data) {
                this.data = data;
                this.drawStock(this.data);
            }.bind(this));
        }.bind(this));
    }*/
    
    drawStock(data){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const differencials = this.findLowHigh(data.chart);
        const ratespace = this.full ? 20 : 0;
        const posxini = this.full ? 70 : 0;
        const posyini = this.props.height - (this.full ? ratespace : 0);
        const finalwidth = this.props.width - (this.full ? posxini+10 : 0);
        const finalheight = posyini - (this.full ? 10 : 0);
        console.log("drawstock", data.quote.close, data.quote.latestPrice);
        const color = data.quote.open<data.quote.latestPrice ? "rgba(92, 184, 92, " : "rgba(217, 83, 79, ";
        const xspace = this.roundStock(finalwidth / (data.chart.length-1));
        let posx = posxini;
        let tooltips = [];
        if(this.props.test){
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#000000";
            this.ctx.rect(posxini, posyini-finalheight, finalwidth, finalheight);
            this.ctx.stroke();
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.full?color+"1)":"#FFFFFF";
        this.ctx.lineWidth = 2;
        for (let i=0; i<data.chart.length; i++){
            const average = i<data.chart.length-1?this.roundStock((data.chart[i].high+data.chart[i].low)/2):data.quote.latestPrice;
            const porc = (average-differencials.low) / differencials.difference;
            const posy = Math.round(posyini-(porc*finalheight));
            this.ctx[i ? "lineTo" : "moveTo"](posx, posy);
            tooltips.push({posx:posx, posy:posy, label:data.chart[i].label, average:average});
            if(i < data.chart.length-1)posx += xspace;
            if(this.props.test)console.log(average);
        }
        this.ctx.stroke();
        if(this.full){
            const grad = this.ctx.createLinearGradient(posxini, posyini-finalheight, posxini, posyini);
            grad.addColorStop(0, color+".3)");
            grad.addColorStop(1, color+"0)");
            this.ctx.fillStyle = grad;
            this.ctx.lineTo(posx, posyini);
            this.ctx.lineTo(posxini, posyini);
            this.ctx.fill();
            this.quoteStock({x:posxini, y:posyini-finalheight, width:finalwidth, height:finalheight}, differencials);
            this.showTooltips(tooltips, xspace, posxini, posyini);
            this.canvas.onmousemove = this.movingMouse.bind(this);
        }
    }

    quoteStock(coord, differencials){
        const space = Math.round(coord.height/4);
        this.ctx.lineWidth = .3;
        this.ctx.fillStyle = this.ctx.strokeStyle = this.elementsColor;
        this.ctx.font = "lighter 12px sans-serif";
        this.ctx.textAlign = "right";
        for (let i=0; i<5; i++){
            this.ctx.beginPath();
            if(i===4)this.ctx.lineWidth = 2;
            this.ctx.moveTo(coord.x-10, coord.y+space*i);
            this.ctx.lineTo(coord.x+coord.width+4, coord.y+space*i);
            this.ctx.stroke();
            this.ctx.fillText(this.roundStock(differencials.high-differencials.difference/4*i), coord.x-20, coord.y+space*i);
        }
    }

    showTooltips(data, xspace, posx, posy){
        if(data.length){
            this.tooltip_props = {data:data, xspace:xspace, posxini:posx, posyini:posy, posx:0};
            const interm = Math.floor(data.length/4.5);
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
    }

    movingMouse(event){
        //console.log(event, this.canvas);
        const index = this.tooltip_props?Math.round((event.layerX-this.tooltip_props.posxini)/this.tooltip_props.xspace):-1;
        if(index>-1 && index!==this.tooltip_props.index && index>=0 && index<this.tooltip_props.data.length){
            const tooltipWidth = 160;
            let posx = this.tooltip_props.data[index].posx-tooltipWidth/2;
            let posy = 0;
            if(posx < 0)posx += tooltipWidth/2;
            else if(posx+tooltipWidth > this.canvas.width)posx -= tooltipWidth/2;
            if(posy+30 > this.tooltip_props.data[index].posy)posy = this.tooltip_props.posyini-30;
            this.drawStock(this.data);
            this.movingTooltip(index, posx, posy, tooltipWidth);
        }
    }

    movingTooltip(index, posx, posy, tooltipWidth){
        this.tooltip_props.index = index;
        this.ctx.beginPath();
        this.ctx.lineWidth = .7;
        this.ctx.strokeStyle = "#666666";
        this.ctx.setLineDash([3, 4]);
        this.ctx.moveTo(this.tooltip_props.data[index].posx, 10);
        this.ctx.lineTo(this.tooltip_props.data[index].posx, this.tooltip_props.posyini);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.lineWidth = .7;
        this.ctx.strokeStyle = this.elementsColor;
        this.ctx.rect(posx, posy, tooltipWidth, 30);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = "#666666";
        this.ctx.arc(this.tooltip_props.data[index].posx, this.tooltip_props.data[index].posy, 4, 0, 360);
        this.ctx.fill();

        this.ctx.font = "lighter 12px sans-serif";
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.tooltip_props.data[index].average+" USD", posx+10, posy+20, tooltipWidth/2, 30);

        this.ctx.fillStyle = this.elementsColor;
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.tooltip_props.data[index].label, posx+tooltipWidth-10, posy+20, tooltipWidth/2, 30);
    }
    
    findLowHigh(data){
        let low = 0;
        let high = 0;
        let lastValue = 0;
        const margin = .0005;
        for (let i=0; i<data.length; i++){
            if(data[i].low>0 && data[i].high>0){
                let average = (data[i].low+data[i].high)/2;
                if(average<low || !low)low = average;
                if(average>high || !high)high = average;
                lastValue = average;
            }else {
                data.splice(i, 1);
                i --;
            }
        }
        low *= 1-margin;
        high *= 1+margin;
        let difference = high-low;
        return {low:this.roundStock(low, "floor"), high:this.roundStock(high, "ceil"), difference:this.roundStock(difference, "ceil"), lastValue:lastValue};
    }
    
    roundStock(value, method="round", roundNum=100){
        return Math[method](value*roundNum)/roundNum;
    }
}
export default Chart;