import React, { Component } from "react";
import ClinicTime from "./ClinicTime";
import NotAttendedCancelled from "./NotAttendedCancelled";
import TokenRunningPart from "./TokenRunningPart";

export class DoctorMain extends Component {
  render() {
    return (
      <>
        <div className="main">
          <h2 className="headingStyle">Doctor </h2>
          <div className="clinicTime row">
            <ClinicTime />
          </div>
          <div className="doctorContainer row my-3">
            <TokenRunningPart />
            <NotAttendedCancelled />
          </div>
        </div>
      </>
    );
  }
}

export default DoctorMain;
