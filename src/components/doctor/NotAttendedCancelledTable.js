import React, { useRef, useContext } from "react";
import storeContext from "../../context/context";

function NotCancelledTable(props) {
  const type = useRef("NA");
  const context = useContext(storeContext);
  const { getTokenData, NotAttendedCancelledAPI, setLoader } = context;

  if (props.patientInfo.IsCancel === true) {
    type.current = "CN";
  }

  const clickAttended = async () => {
    try {
      setLoader(true);
      // eslint-disable-next-line
      const response = await fetch(
        "https://localhost:44366/api/NotAttendedCancelled/MarkIsAttendedAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TokenId: props.patientInfo.TokenId,
          }),
        }
      );
      await getTokenData();
      await NotAttendedCancelledAPI();

      //const jsonResponse = await response.json();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div class="list-group">
        <a
          href="/"
          class="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              {props.patientInfo.TokenNumber} - {props.patientInfo.PatientName}
            </h5>
            <small>
              <button
                className="btn btn-primary btn-sm btnAttened"
                onClick={clickAttended}
                id="btnAttened"
                title="Mark Attended"
              >
                &#10003;
              </button>
            </small>
          </div>
          <p class="mb-1">Phone : {props.patientInfo.Phone}</p>
          <small>
            Type : {type.current === "CN" ? "Cancelled" : "Not Attended"}
          </small>
        </a>
      </div>
      {/* <div className="col-3 colmn">{props.patientInfo.PatientName}</div>
      <div className="col-2 colmn">{props.patientInfo.TokenNumber}</div>
      <div className="col-4 colmn">{props.patientInfo.Phone}</div>
      <div className="col-1 colmn">{type.current}</div>
      <div className="col-2 colmn">
        <button
          className="btn btn-primary btn-sm btnAttened"
          onClick={clickAttended}
          id="btnAttened"
        >
          &#10003;
        </button>
      </div> */}
    </>
  );
}

export default NotCancelledTable;
