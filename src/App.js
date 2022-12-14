// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Navibar from "./components/doctor/Navibar";
import { Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Navibar />
      {/* </Router> */}
    </div>
  );
}

export default App;
