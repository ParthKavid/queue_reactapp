import React, { useEffect, useState, useContext } from "react";
import ClinicTime from "./ClinicTime";
import NotAttendedCancelled from "./NotAttendedCancelled";
import TokenRunningPart from "./TokenRunningPart";
import Spinner from "../Spinner";
import storeContext from "../../context/context";

const DoctorMain = (props) => {
  //const [loader, setLoader] = useState(true);
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const context = useContext(storeContext);
  const { setLoader, loader } = context;

  const getDoctorData = async () => {
    try {
      const response = await fetch(
        `https://localhost:44366/api/ClinicTime/GetDoctorData?DoctorID=${props.DoctorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setstartTime(data.data.StartTime);
      setendTime(data.data.EndTime);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="main">
        <h2 className="headingStyle">Doctor</h2>
        {loader && <Spinner></Spinner>}
        <div className="clinicTime mx-2 row">
          <ClinicTime startTime={startTime} endTime={endTime} />
        </div>
        <div className="doctorContainer row my-3">
          <TokenRunningPart />
          <NotAttendedCancelled />
        </div>
      </div>
    </>
  );
};

export default DoctorMain;
