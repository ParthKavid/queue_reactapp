import React from "react";
import loader from "../Images/spinner.gif";
import "./doctor/doctor.css";

function Spinner() {
  return (
    <div className="text-center ">
      <img className="spinner" src={loader} alt="loading" />
    </div>
  );
}

export default Spinner;
