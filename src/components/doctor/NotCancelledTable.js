import React, { Component } from "react";

export class NotCancelledTable extends Component {
  render() {
    return (
      <>
        <div className="col-3">Tina</div>
        <div className="col-3">4</div>
        <div className="col-3">517845112</div>
        <div className="col-3">
          <button className="btn btn-primary btn-sm" id="btnAttened">
            Attended
          </button>
        </div>
      </>
    );
  }
}

export default NotCancelledTable;
