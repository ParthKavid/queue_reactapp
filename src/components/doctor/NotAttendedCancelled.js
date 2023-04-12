import React, { useEffect, useContext } from "react";
import NotAttendedCancelledTable from "./NotAttendedCancelledTable";
import storeContext from "../../context/context";

function NotAttendedCancelled(props) {
  const context = useContext(storeContext);

  const {
    patientData,
    NotAttendedCancelledAPI,
    total_Cancelled,
    total_NotAttended,
  } = context;

  useEffect(() => {
    NotAttendedCancelledAPI();
  }, []);

  // const patientdata = [
  //   { id: "121", name: "Tina", token: "5", type: "CN", phone: "5148765486" },
  //   { id: "125", name: "Riya", token: "1", type: "NA", phone: "4548436548" },
  //   { id: "1", name: "Tina", token: "5", type: "CN", phone: "5148765486" },
  //   { id: "5", name: "Riya", token: "1", type: "NA", phone: "4548436548" },
  //   { id: "4", name: "Tina", token: "5", type: "NA", phone: "5148765486" },
  //   { id: "2", name: "Riya", token: "1", type: "NA", phone: "4548436548" },
  //   { id: "7", name: "Tina", token: "5", type: "CN", phone: "5148765486" },
  //   { id: "45", name: "Riya", token: "1", type: "NA", phone: "4548436548" },
  //   { id: "654", name: "Tina", token: "5", type: "NA", phone: "5148765486" },
  //   { id: "455", name: "Riya", token: "1", type: "CN", phone: "4548436548" },
  // ];

  return (
    <>
      <div className="clinicTime col-5 m-1 notAttendedCancelled">
        <h3 className="headingStyle">NotAttended / Cancelled</h3>

        <hr></hr>
        <div className="tbloverflow">
          {patientData.length > 0 ? (
            patientData.map((elem) => {
              return (
                <div key={elem.TokenId}>
                  <div className="row my-2 tblRow">
                    <NotAttendedCancelledTable patientInfo={elem} />
                  </div>
                  <hr></hr>
                </div>
              );
            })
          ) : (
            <>
              <div className="row tblRow my-2 justify-content-center">
                <b>No Data</b>
              </div>
              <hr></hr>
            </>
          )}
        </div>
        <hr></hr>
        <div className="row my-2">
          <span>
            <b>Total Cancelled (CN) :{total_Cancelled}</b>
          </span>
        </div>
        <div className="row my-2">
          <span>
            <b>Total Not Attended (NA) : {total_NotAttended}</b>
          </span>
        </div>
      </div>
    </>
  );
}

export default NotAttendedCancelled;
