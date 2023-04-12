import React, { useState } from "react";
import StoreContext from "./context";

const AppState = (props) => {
  const hardData = {
    TokenId: 0,
    TokenNumber: 0,
    Date: "0001-01-01T00:00:00",
    PatientId: 0,
    PatientName: null,
    Phone: null,
    IsPending: false,
    IsCancel: false,
    IsCurrent: false,
    InQueue: false,
    Total_Remaining: 0,
    Token_Available: 0,
    Token_Running: 0,
    Total_Attended: 0,
    Total_Cancelled: 0,
    Total_NotAttended: 0,
    AllData: null,
  };
  const data = [];
  const [jsonData, setJsonData] = useState(data);
  const [patientData, setPatientData] = useState(data);

  // eslint-disable-next-line
  const [doctorId, setDoctorId] = useState(0);

  const [loader, setLoader] = useState(true);
  const [total_Cancelled, setTotal_Cancelled] = useState(0);
  const [total_NotAttended, setTotal_NotAttended] = useState(0);

  // Get all NotAttendedCancelledAPI
  const NotAttendedCancelledAPI = async () => {
    try {
      const response = await fetch(
        "https://localhost:44366/api/NotAttendedCancelled/NotAttendedCancelledAPI",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.data.length > 0) {
        setTotal_Cancelled(result.data[0].Total_Cancelled);
        setTotal_NotAttended(result.data[0].Total_NotAttended);
        setPatientData(result.data);
      } else {
        setPatientData(hardData);
      }
    } catch (error) {
      console.log("Error : " + error);
    } finally {
      setLoader(false);
    }
  };

  const getTokenData = async () => {
    try {
      const response = await fetch(
        "https://localhost:44366/api/TokenRunningPart/GetTokenRunningPartDataAPI?DoctorID=" +
          doctorId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.data.length > 0) {
        setJsonData(result.data);
      } else {
        setJsonData(hardData);
      }
    } catch (error) {
      console.log("Error : " + error);
    } finally {
      setLoader(false);
    }
  };

  const values = {
    jsonData,
    patientData,
    NotAttendedCancelledAPI,
    getTokenData,
    setLoader,
    loader,
    total_Cancelled,
    total_NotAttended,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default AppState;
