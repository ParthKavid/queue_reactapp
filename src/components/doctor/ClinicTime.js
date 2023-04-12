import React, { useEffect, useRef } from "react";

const ClinicTime = (props) => {
  const startTime = useRef(props.startTime);
  const endTime = useRef(props.endTime);

  useEffect(() => {
    startTime.current = props.startTime;
    endTime.current = props.endTime;
  }, [props.startTime, props.endTime]);

  const startTimeonchange = (e) => {
    startTime.current = e.target.value;
  };

  const endTimeonchange = (e) => {
    endTime.current = e.target.value;
  };

  const SaveTime = async (e) => {
    e.preventDefault();

    if (startTime.current > endTime.current) {
      alert("Please enter proper StartTime and EndTime.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:44366/api/ClinicTime/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            StartTime: startTime.current,
            EndTime: endTime.current,
          }),
        }
      );

      const jsonResponse = await response.json();
      alert(jsonResponse.message);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="col-md-2 my-2 w-auto">
        <label className="mx-2">Start Time :</label>
        <input
          type="time"
          className="startTime"
          id="StartTime"
          name="StartTime"
          ref={startTime}
          onChange={startTimeonchange}
          defaultValue={props.startTime}
        />
      </div>

      <div className="col-md-2 my-2 w-auto">
        <label className="mx-2">End Time : </label>
        <input
          type="time"
          className="endTime"
          id="EndTime"
          name="EndTime"
          ref={endTime}
          onChange={endTimeonchange}
          defaultValue={props.endTime}
        />
      </div>

      <div className="col-md-1 my-2 w-auto">
        <button
          className="btn btn-success btn-md"
          id="btnTimeSave"
          onClick={SaveTime}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ClinicTime;
