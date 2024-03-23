import React, { useState } from "react";
import RecordList from "./RecordList";
import RecordForm from "./RecordForm";
import PInfor from "./Form/PatientInfor";
import "./MRecord.scss";
import withAuth from "../../withAuth.js";

function MedicalRecord() {
  const [active, setActive] = useState("FirstContent");

  return (
    <div className="MR">
      <div className="center-container">
        <div className="switch-buttons">
          <button
            className={active === "FirstContent" ? "active" : ""}
            onClick={() => setActive("FirstContent")}
          >
            Record List
          </button>
          <button
            className={active === "SecondContent" ? "active" : ""}
            onClick={() => setActive("SecondContent")}
          >
            Record Form
          </button>
          <button
            className={active === "ThirdContent" ? "active" : ""}
            onClick={() => setActive("ThirdContent")}
          >
            Add Patient
          </button>
        </div>
        <div className="content-container">
          {active === "FirstContent" && <RecordList />}
          {active === "SecondContent" && <RecordForm />}
          {active === "ThirdContent" && <PInfor />}
        </div>
      </div>
    </div>
  );
}

// Export the component
export default withAuth(MedicalRecord, 'doctor');