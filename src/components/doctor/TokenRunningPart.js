import React, { useEffect, useContext } from "react";
import storeContext from "../../context/context";

function TokenRunningPart() {
  const context = useContext(storeContext);
  const {
    setLoader,
    jsonData,
    getTokenData,
    NotAttendedCancelledAPI,
  } = context;

  // const DoctorId = 0;
  // //const [CurrTokenId, setCurrTokenId] = useState(0);
  // const startOrNextlbl = useRef("Start");

  // const TokenID = useRef(0);
  // const TotalVisitedToday = useRef(0);
  // const TokenNumber = useRef(0);
  // const TotalWaitingPatient = useRef("No Patients");
  // const cssclspatientWaiting = useRef("patientWaitingBlue");

  const btnNextClick = async (e) => {
    // if (startOrNextlbl.current === "Start") {
    //   //setStartOrNextlbl("Next");
    //   startOrNextlbl.current = "Next";
    // }

    try {
      setLoader(true);
      // eslint-disable-next-line
      const response = await fetch(
        "https://localhost:44366/api/TokenRunningPart/GetNextPatientAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TokenId: jsonData.TokenId,
          }),
        }
      );

      //const jsonResponse = await response.json();

      await getTokenData();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoader(false);
    }
  };
  const btnNotAttendClick = async (e) => {
    try {
      setLoader(true);
      // eslint-disable-next-line
      const response = await fetch(
        "https://localhost:44366/api/TokenRunningPart/NotAttendAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TokenId: jsonData.TokenId,
          }),
        }
      );

      //const jsonResponse = await response.json();

      await getTokenData();
      await NotAttendedCancelledAPI();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoader(false);
    }
  };
  const btnCancelPatientClick = async (e) => {
    try {
      setLoader(true);
      // eslint-disable-next-line
      const response = await fetch(
        "https://localhost:44366/api/TokenRunningPart/CancelPatientAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TokenId: jsonData.TokenId,
          }),
        }
      );

      //const jsonResponse = await response.json();

      await getTokenData();
      await NotAttendedCancelledAPI();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  return (
    <>
      <div className="clinicTime col-5 m-1 tokenRunningPart ">
        <h3 className="headingStyle">Token Running</h3>
        <div className="container">
          <button
            id="btnTokenRunning"
            className="btn btn-primary btnTokenRunning"
          >
            {jsonData.TokenNumber}
          </button>
          <div className="row my-3">
            <span
              className={
                jsonData.Total_Remaining === 0
                  ? "patientWaitingRed"
                  : "patientWaitingBlue"
              }
            >
              {jsonData.Total_Remaining === 0
                ? " No Patients "
                : "Waiting " + jsonData.Total_Remaining + " patients"}
            </span>
          </div>
          <hr></hr>
          <div className="row elemCenter">
            {jsonData.TokenId > 0 ? (
              <button
                id="btnNext"
                className="btn btn-primary col-3 btnNext"
                onClick={btnNextClick}
              >
                <b>{jsonData.TokenId > 0 ? "Next" : "Start"}</b>
              </button>
            ) : (
              <button
                id="btnNext"
                className="btn btn-primary col-3 btnNext disabled"
                onClick={btnNextClick}
              >
                <b>{jsonData.TokenId > 0 ? "Next" : "Start"}</b>
              </button>
            )}
          </div>
          {/* {loader && <Spinner></Spinner>} */}
          <hr></hr>
          <div className="row elemCenter">
            {jsonData.TokenId > 0 ? (
              <>
                <button
                  id="btnNotAttend"
                  className="btn btn-warning text-white col-5 mx-2 my-2 left btnNotAttend"
                  onClick={btnNotAttendClick}
                >
                  <b>Not Attended</b>
                </button>
                <button
                  id="btnCancel"
                  className="btn btn-danger text-white col-3 btnCancel mx-2 my-2 align-right btnCancel"
                  onClick={btnCancelPatientClick}
                >
                  <b>Cancel</b>
                </button>
              </>
            ) : (
              <>
                <button
                  id="btnNotAttend"
                  className="btn btn-warning text-white col-5 mx-2 my-2 left btnNotAttend disabled"
                  onClick={btnNotAttendClick}
                >
                  <b>Not Attended</b>
                </button>
                <button
                  id="btnCancel"
                  className="btn btn-danger text-white col-3 btnCancel mx-2 my-2 align-right btnCancel disabled"
                  onClick={btnCancelPatientClick}
                >
                  <b>Cancel</b>
                </button>
              </>
            )}
          </div>
          <hr></hr>
          <div className="row">
            <span className="visitedCount">
              <b>Total Patients Visited Today : {jsonData.Total_Attended}</b>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenRunningPart;
