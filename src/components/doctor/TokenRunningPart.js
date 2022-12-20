import React, { Component } from "react";

export class TokenRunningPart extends Component {
  render() {
    return (
      <>
        {" "}
        <div className="clinicTime col-5 m-1">
          <h3 className="headingStyle">Token Running</h3>
          <div className="container">
            <button
              id="btnTokenRunning"
              className="btn btn-primary btnTokenRunning"
            >
              0
            </button>
            <div className="row  my-3">
              <span className="patientWaiting">No Patients</span>
            </div>
            <hr></hr>
            <div className="row elemCenter">
              <button id="btnNext" className="btn btn-primary col-3 btnNext">
                <b>Next</b>
              </button>
            </div>
            <hr></hr>
            <div className="row elemCenter">
              <button
                id="btnNotAttend"
                className="btn btn-warning text-white col-5 mx-2 left"
              >
                <b>Not Attended</b>
              </button>
              <button
                id="btnCancel"
                className="btn btn-danger text-white col-3 btnCancel mx-2 align-right"
              >
                <b>Cancel</b>
              </button>
            </div>
            <hr></hr>
            <div className="row">
              <span className="visitedCount">
                <b>Total Patients Visited Today : 5</b>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TokenRunningPart;
