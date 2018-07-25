import React, { Component } from "react";

class StockModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="modal" id="stock" tabindex="-1" role="dialog">
        <div
          class="modal-dialog modal-lg"
          /*style="max-width: 80%"*/
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="collapse"
                data-target="#demo"
              >
                Simple collapsible
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="collapse"
                data-target="#demo"
              >
                Simple collapsible2
              </button>
              <div id="demo" class="collapse">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockModal;
