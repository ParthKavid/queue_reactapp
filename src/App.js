// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Navibar from "./components/doctor/Navibar";
import Footer from "./components/doctor/Footer";
import DoctorMain from "./components/doctor/DoctorMain";
//import { Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Navibar />
      <DoctorMain />
      <Footer />
      {/* </Router> */}
    </div>
  );
}

export default App;
