import React, { useState, useEffect } from "react";
import "../Patient/patient.css";
import Navibar from "../doctor/Navibar";
import Footer from "../doctor/Footer";
import { useNavigate } from "react-router-dom";
import ReserveTokenModal from "./ReserveTokenModal";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const PatientMain = () => {
  const [show, setShow] = useState(false);
  const [reserveTokenShow, setreserveTokenShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const doctorId = 1;
  const patientId = localStorage.getItem("patientId");
  const [patientData, setPatientData] = useState({
    patientName: "",
    phone: "",
  });

  const [tokenData, setTokenData] = useState({
    tokenNumber: 0,
    token_Available: 0,
    token_Running: 0,
    tokenId: 0,
  });

  const [doctorData, setDoctorData] = useState({
    doctorName: "",
    clinicName: "",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
  });

  // const resdata = [
  //   {
  //     FullName: "Parth Kavid",
  //     TokenNumber: 4,
  //     TokenId: 4,
  //     SubPatientId: 10,
  //   },
  //   {
  //     FullName: "Parth Kavid",
  //     TokenNumber: 4,
  //     TokenId: 5,
  //     SubPatientId: 10,
  //   },
  //   {
  //     FullName: "Parth Kavid",
  //     TokenNumber: 4,
  //     TokenId: 6,
  //     SubPatientId: 10,
  //   },
  // ];
  const [subPatientData, setSubPatientData] = useState([]);

  const [noOfPatients, setnoOfPatients] = useState("1");

  const OnnoOfPatientsChange = (e) => {
    setnoOfPatients(e.target.value);
    alert(e.target.value);
  };

  const getDoctorData = async () => {
    try {
      const response = await fetch(
        `https://localhost:44366/api/ClinicTime/GetDoctorData?DoctorId=${doctorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const result = await response.json();
      console.log("Doctor Data");
      console.log(result);
      if (result.data != null) {
        const doctorResult = result.data;

        setDoctorData({
          doctorName: doctorResult.DoctorName,
          clinicName: doctorResult.ClinicName,
          startTime: doctorResult.StartTime,
          endTime: doctorResult.EndTime,
          breakStartTime: doctorResult.BreakStartTime,
          breakEndTime: doctorResult.BreakEndTime,
        });
      }
    } catch (error) {}
  };

  const getTokenData = async () => {
    try {
      const response = await fetch(
        `https://localhost:44366/api/PatientHome/PatientHomeAPI?PatientId=${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();
      if (result.data != null && result.data.length > 0) {
        const data = result.data[0];

        setTokenData({
          tokenNumber: data.TokenNumber,
          token_Available: data.Token_Available,
          token_Running: data.Token_Running,
          tokenId: data.TokenId,
        });
        console.log("Token Data");
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    } finally {
      // setLoader(false);
    }
  };

  const getPatientData = async () => {
    try {
      const response = await fetch(
        `https://localhost:44366/api/PatientHome/PatientDetailAPI/${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();
      if (result.data.length > 0) {
        const data = result.data[0];

        setreserveTokenShow(data.IsReserved);

        setPatientData({
          patientName: data.PatientName,
          phone: data.Phone,
        });
        console.log("Patient Data");
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    } finally {
      // setLoader(false);
    }
  };

  const getSubPatientData = async () => {
    try {
      const response = await fetch(
        `https://localhost:44366/api/PatientHome/SubPatientDetailAPI/${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();

      if (result.data.length > 0) {
        const data = result.data;

        // const data = [
        //   {
        //     FullName: "Parth Kavid",
        //     TokenNumber: 4,
        //     TokenId: 4,
        //     SubPatientId: 3,
        //   },
        //   {
        //     FullName: "Parth Kavid",
        //     TokenNumber: 5,
        //     TokenId: 5,
        //     SubPatientId: 4,
        //   },
        //   {
        //     FullName: "Parth Kavid",
        //     TokenNumber: 6,
        //     TokenId: 6,
        //     SubPatientId: 5,
        //   },
        // ];
        setSubPatientData(data);
        console.log("SubPatient Data");
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
      //navigate("/login");
    } finally {
      // setLoader(false);
    }
  };

  const onTokenSubmit = async (e) => {
    e.preventDefault();
    try {
      if (parseInt(noOfPatients) < 1 || parseInt(noOfPatients) > 3) {
        alert("You have selected the wrong value");
        return;
      }
      const response = await fetch(
        "https://localhost:44366/api/Token/SaveTokenAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            NoOfPatient: noOfPatients,
            PatientId: patientId,
          }),
        }
      );
      const json = await response.json();
      console.log(json.data);
      if (json.status === "Success") {
        setreserveTokenShow(true);
        getSubPatientData();
        //navigate("/patient");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenData();
    getDoctorData();
    getPatientData();
    getSubPatientData();
  }, []);

  return (
    <>
      <Navibar />
      <div className="vh-100 bgMain">
        <div className="mx-3 text-left">
          <small className="font-italic">Good Morning,</small>{" "}
          <span className="h6 text-uppercase">{patientData.patientName}</span>
        </div>
        <div className=""></div>
        <div className="container  text-center">
          <div className="bg-white mt-3 h-50">
            <p>{doctorData.doctorName}</p>
            <p>{doctorData.clinicName}</p>
            <p>Start Time - {doctorData.startTime}</p>
            <p>End Time - {doctorData.endTime}</p>
            <figure className="figure">
              {/* <img
                src="https://th.bing.com/th/id/OIP.HxV79tFMPfBAIo0BBF-sOgHaEy?pid=ImgDet&rs=1"
                className="figure-img img-fluid rounded"
                alt="..."
              /> */}
              {/* <figcaption className="figure-caption">
                A caption for the above image.
              </figcaption> */}
            </figure>
          </div>
          <div className="bgcenter " style={{ marginTop: "-30px" }}>
            <div
              className="row p-3 bgActiveToken justify-content-center text-green"
              style={{ marginBottom: "-10px" }}
            >
              <h6>Active Token</h6>
              <p
                className="rounded-circle p-3 text-light border border-light border-3"
                style={{
                  fontSize: "60px",
                  width: "50%",
                  backgroundColor: "#2e4b42",
                }}
              >
                {tokenData.token_Running}
              </p>
            </div>
            <div className="row p-3 bgGetToken justify-content-center text-light">
              {reserveTokenShow ? (
                <>
                  <h6>Your Token</h6>
                  <div className="d-flex justify-content-center">
                    {subPatientData.map((elem) => {
                      return (
                        <div key={elem.TokenId}>
                          <ReserveTokenModal
                            ReservedData={elem}
                          ></ReserveTokenModal>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h6>Get Token</h6>

                  <Button
                    style={{
                      fontSize: "60px",
                      width: "50%",
                      backgroundColor: "#7bc0a9",
                    }}
                    variant="primary"
                    onClick={handleShow}
                    className="rounded-circle text-dark border border-dark border-3 me-3"
                  >
                    {tokenData.token_Available}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <Offcanvas show={show} onHide={handleClose} placement="bottom">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Hi, {patientData.patientName}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="container">
                <form className="row g-3" onSubmit={onTokenSubmit}>
                  <label>Select the number of Patients : </label>
                  <select
                    className="form-select"
                    aria-label="noofpatient"
                    name="noofpatient"
                    id="noofpatient"
                    onChange={OnnoOfPatientsChange}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">
                      Get Token
                    </button>
                  </div>
                </form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientMain;
