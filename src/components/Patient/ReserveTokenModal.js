import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
function ReserveTokenModal(props) {
  const [fullname, setFullname] = useState(props.ReservedData.FullName);
  const prevName = useRef(props.ReservedData.FullName);
  const refDisplayCancel = useRef();
  const refDisplayEdit = useRef();
  const refDisplaySave = useRef();
  const refDisabledText = useRef();

  const onEdit = () => {
    refDisabledText.current.removeAttribute("disabled");
    refDisplayEdit.current.classList.add("d-none");
    refDisplaySave.current.classList.remove("d-none");
    refDisplayCancel.current.classList.remove("d-none");
    console.log(refDisplayCancel.current);
  };

  const onCancel = (e) => {
    setFullname(prevName);
    refDisabledText.current.setAttribute("disabled", "");
    refDisplayEdit.current.classList.remove("d-none");
    refDisplaySave.current.classList.add("d-none");
    refDisplayCancel.current.classList.add("d-none");
  };

  const onSave = async (id) => {
    if (fullname === "") {
      alert("Please enter the name");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:44366/api/PatientHome/SaveSubPatientNameAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ FullName: fullname, SubPatientId: id }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.data > 0) {
        refDisabledText.current.setAttribute("disabled", "");
        console.log(fullname);
        console.log(id);
        refDisplayEdit.current.classList.remove("d-none");
        refDisplaySave.current.classList.add("d-none");
        refDisplayCancel.current.classList.add("d-none");
      } else {
        alert("Error : something wrong in saving name.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChange = (e) => {
    prevName.current = fullname;
    setFullname(e.target.value);
  };

  return (
    <>
      <div>
        <Button
          style={{
            fontSize: "20px",
            backgroundColor: "#7bc0a9",
          }}
          variant="primary"
          className="rounded-circle text-dark border border-dark border-3 me-3"
        >
          {props.ReservedData.TokenNumber}
        </Button>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="FullName"
            aria-label="FullName"
            ref={refDisabledText}
            disabled
            value={fullname}
            onChange={onNameChange}
          />
          <button
            className="btn btn-outline-secondary text-light"
            title="Edit"
            ref={refDisplayEdit}
            type="button"
            onClick={onEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-secondary d-none text-success"
            type="button"
            ref={refDisplaySave}
            title="Save"
            onClick={() => {
              onSave(props.ReservedData.SubPatientId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check2"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-secondary d-none text-danger"
            type="button"
            ref={refDisplayCancel}
            title="Cancel"
            onClick={onCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <p></p>
        <p></p>
      </div>
    </>
  );
}

export default ReserveTokenModal;
