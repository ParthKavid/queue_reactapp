import React, { Component } from "react";
import NotCancelledTable from "./NotCancelledTable";

export class NotAttendedCancelled extends Component {
  render() {
    return (
      <>
        <div className="clinicTime col-5 m-1">
          <h3 className="headingStyle">NotAttended / Cancelled</h3>
          <div className="row my-2">
            <div className="col-md-3">
              <b>Patient</b>
            </div>
            <div className="col-md-3">
              <b>Token #</b>
            </div>
            <div className="col-md-3">
              <b>Phone</b>
            </div>
            <div className="col-md-3">
              <b>Attended?</b>
            </div>
          </div>
          <hr></hr>
          <div className="row my-2">
            <NotCancelledTable />
          </div>
          <hr></hr>
          <div className="row my-2">
            <span>
              <b>Total Cancelled : 1</b>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default NotAttendedCancelled;
