import React, { Component } from "react";
import TickerSwap from "./TickerSwap";

class Search extends Component {
  constructor() {
    super();
    this.tickers = [];
    this.bringTickers();
  }

  render() {
    const id = "myInput";
    setTimeout(this.autocomplete.bind(this), 100, id);
    return (
      <form autoComplete="off" action="/action_page.php">
        <div className="autocomplete">
          <input id={id} className="autocomplete form-control" type="search" placeholder="Search" />
        </div>
      </form>
    );
  }

  autocomplete(id) {
    this.inp = document.getElementById(id);
    this.inp.addEventListener("input", this.enterText.bind(this));
    this.inp.addEventListener("keydown", this.keyPressed.bind(this));
    document.addEventListener("click", this.closeAllLists.bind(this));
  }

  enterText(event) {
    const arr = this.tickers;
    let a, div, val = event.target.value.toUpperCase();
    this.closeAllLists();
    if (!val) return false;
    this.currentFocus = -1;
     
    div = document.createElement("DIV");
    div.setAttribute("id", "autocomplete-list");
    div.setAttribute("class", "list-group");
    div.setAttribute("style", "position: absolute; z-index: 100");
      
    this.inp.parentNode.appendChild(div);
    let showing = 0;
    for (let i=0; i<arr.length; i++) {
      if (arr[i].name.toUpperCase().indexOf(val)>=0 || arr[i].symbol.toUpperCase().indexOf(val)>=0) {
        a = document.createElement("a");
        a.setAttribute("id", "autocomplete");
        a.setAttribute("class", "list-group-item list-group-item-action");
        a.setAttribute("href", "#");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target","#stock");

        const ind = arr[i].name.toUpperCase().indexOf(val);
        if (ind+1){
          a.innerHTML = arr[i].name.substr(0, ind);
          a.innerHTML += "<strong>" + arr[i].name.substr(ind, val.length) + "</strong>";
          a.innerHTML += arr[i].name.substr(ind+val.length);
        } else a.innerHTML += arr[i].name;

        a.innerHTML += "<input type='hidden' value='" + arr[i].symbol + "'>";
        a.addEventListener("click", this.clickStock.bind(this));
        div.appendChild(a);

        if(++showing >= 10)break;
      }
    }
  }

  clickStock(event) {
    this.value = (event.currentTarget.getElementsByTagName("input")[0].value);
    TickerSwap.emitSwap(this.value);
    this.closeAllLists();
  }

  keyPressed(event) {
    let a;
    const list = document.getElementById("autocomplete-list");
    if (list) a = list.getElementsByTagName("a");
    //console.log(event.keyCode, this.currentFocus);
    if (event.keyCode === 40) {
      this.currentFocus ++;
      this.addActive(a);
    } else if (event.keyCode === 38) {
      this.currentFocus --;
      this.addActive(a);
    } else if (event.keyCode === 13) {
      event.preventDefault();
      if (this.currentFocus>-1 && a) a[this.currentFocus].click();
    }
  }

  addActive(a) {
    if (!a) return false;

    this.removeActive(a);
    if (this.currentFocus >= a.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = a.length - 1;

    a[this.currentFocus].classList.add("active");
  }
  
  removeActive(a) {
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
  }

  closeAllLists(elmnt) {
    const list = document.getElementById("autocomplete-list");
    if (list && elmnt !== list && elmnt !== this.inp)list.parentNode.removeChild(list);
  }

  bringTickers() {
    const path = "http://localhost:8090/Tickers";//"https://api.iextrading.com/1.0/ref-data/symbols";
    fetch(path, { method: "get" }).then(
      function (response) {
        response.json().then(
          function (data) {
            this.tickers = data;
            /*for (let i = 0; i < data.length; i++) {
              if (data[i].type === "cs" && data[i].isEnabled)this.tickers.push(data[i]);
            }*/
          }.bind(this)
        );
      }.bind(this)
    );
  }
}

export default Search;
