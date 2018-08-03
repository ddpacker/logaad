import React, { Component } from "react";
import TickerSwap from "./TickerSwap";

class Search extends Component {
  constructor() {
    super();
    this.tickers = [];
    this.bringTickers();
    //this.autocomplete();
  }



  render() {
    //console.log(this.tickers);
    setTimeout(this.autocomplete, 100, "myInput", this.tickers);
    return (
      <form autoComplete="off" action="/action_page.php">
        <div className="autocomplete">
          <input
            id="myInput"
            className="autocomplete form-control"
            type="search"
            placeholder="Search"
          />
        </div>
      </form>
    );
  }

  autocomplete(id, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    const inp = document.getElementById(id);
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", "autocomplete-list");
      a.setAttribute("class", "list-group");
      a.setAttribute("style", "position: absolute; z-index: 100");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        //console.log(arr);
        /*check if the item starts with the same letters as the text field value:*/
        if (
          arr[i].name.substr(0, val.length).toUpperCase() === val.toUpperCase()
        ) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("a");
          b.setAttribute("id", "autocomplete");
          b.setAttribute("class", "list-group-item list-group-item-action");
          b.setAttribute("href", "#");
          b.setAttribute("data-toggle", "modal");
          b.setAttribute("data-target","#stock");

          /*make the matching letters bold:*/
          b.innerHTML =
            "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].name.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].symbol + "'>";
          /*execute a function when someone clicks on the item value (a element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            //inp.value = this.getElementsByTagName("input")[0].value;
            console.log(this.getElementsByTagName("input")[0].value);
            inp.value = (this.getElementsByTagName("input")[0].value);
            TickerSwap.emitSwap((inp.value).toLowerCase());
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    })
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("a");
      if (e.keyCode === 40) {
        /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) {
        //up
        /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;

      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;

      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementById("autocomplete-list");
      if (x && elmnt !== x && elmnt !== inp) {
        x.parentNode.removeChild(x);
      }
      /*for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }*/
      return null;
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  bringTickers() {
    const path = "https://api.iextrading.com/1.0/ref-data/symbols";
    fetch(path, { method: "get" }).then(
      function (response) {
        response.json().then(
          function (data) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].type === "cs" && data[i].isEnabled)
                this.tickers.push(data[i]);
            }
          }.bind(this)
        );
      }.bind(this)
    );
  }
}

export default Search;
