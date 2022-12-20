import React, { Component } from "react";

export class ClinicTime extends Component {
  render() {
    return (
      <>
        <div className="col-md-3">
          <label className="mx-2">Start Time :</label>
          <input type="time" id="StartTime" />
        </div>

        <div className="col-md-3">
          <label className="mx-2">End Time : </label>
          <input type="time" id="EndTime" />
        </div>

        <div className="col-md-1 ">
          <button className="btn btn-success btn-sm" id="btnTimeSave">
            Save
          </button>
        </div>
      </>
    );
  }
}

export default ClinicTime;
