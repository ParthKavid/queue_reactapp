import React, { useState } from "react";
import "./patientCSS/login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        credentials.firstname === "" ||
        credentials.lastname === "" ||
        credentials.mobileno === ""
      ) {
        alert("Please fill the data");
        console.log("Please fill the data");
        return;
      }

      const response = await fetch(
        "https://localhost:44366/api/LoginPatient/LoginAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: credentials.firstname,
            LastName: credentials.lastname,
            MobileNo: credentials.mobileno,
          }),
        }
      );

      const json = await response.json();
      console.log(json.data);

      if (json.status === "Success") {
        // Save the auth token and redirect
        localStorage.setItem("token", json.data.token);
        localStorage.setItem("patientId", json.data.PateintId);
        navigate("/patient");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container title">
        <h1>Queue</h1>
      </div>
      <div className="container col-3 bglogin">
        <div className="loginForm">
          <form onSubmit={handleSubmit} className="">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={credentials.firstname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                aria-describedby="lastname"
                value={credentials.lastname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobileno"
                name="mobileno"
                value={credentials.mobileno}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
