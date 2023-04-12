// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Navibar from "./components/doctor/Navibar";
import Footer from "./components/doctor/Footer";
import DoctorMain from "./components/doctor/DoctorMain";
import AppState from "./context/AppState";
// import Test from "./components/doctor/Test";
//import { Router } from "react-router-dom";

function App() {
  return (
    <>
      <AppState>
        <div className="App">
          {/* <Router> */}
          <Navibar />
          <DoctorMain DoctorId={1} />
          {/* <Test /> */}
          <Footer />
          {/* </Router> */}
        </div>
      </AppState>
    </>
  );
}

export default App;
