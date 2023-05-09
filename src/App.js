// import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import Navibar from "./components/doctor/Navibar";
import Footer from "./components/doctor/Footer";
import DoctorMain from "./components/doctor/DoctorMain";
import AppState from "./context/AppState";
import PatientMain from "./components/Patient/PatientMain";
import Login from "./components/Patient/Login";
// import Test from "./components/doctor/Test";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <AppState>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<DoctorMain DoctorId={1} />} />
              <Route path="/patient" element={<PatientMain />} />
            </Routes>

            <Outlet />
          </div>
        </Router>
      </AppState>
    </>
  );
}

export default App;
