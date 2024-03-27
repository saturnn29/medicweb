import "./treatment.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from "../../withAuth.js";

function TreatmentPlan() {
  const [selected, setSelected] = useState(null);
  const [treatmentplan, setTreatmentplan] = useState([]);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    axios.get(`http://localhost:8080/treatmentdetail/${userId}`)
      .then(response => {
        setTreatmentplan(response.data);
      })
      .catch(error => {
        console.error('Error retrieving treatment plan:', error);
      });
  }, []);

  return (
    <div className="treat-page">
      <h1 className="treat-h1">Your Treatment Detail</h1>
      <div>
        <table className="treat-table">
          <thead className="treat-thead">
            <tr>
              <th className="treat-no-h">.No</th>
              <th>/</th>
            </tr>
          </thead>

          {treatmentplan.map((treatment, i) => (
            <tbody key={i}>
              <tr className="treat-tb-head" onClick={() => toggle(i)}>
                <th className="treat-no-h">{i + 1}</th>
                <th>
                  <span>{selected === i ? "-" : "+"}</span>
                </th>
              </tr>
              <tr>
                <td colSpan="4">
                  <div
                    className={
                      selected === i ? "treat-content show" : "treat-content"
                    }
                  >
                    <RowContent rowData={treatment} />
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

function RowContent({ rowData }) {
  return (
    <div>
      <table className="treat-table">
        <tbody className="treat-body">
          <tr>
            <td style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }} colSpan="2" className="treat-border">
              Medications
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="treat-border">
              {rowData.Medications}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }} colSpan="2" className="treat-border">
              PhysicalTherapy
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="treat-border">
              {rowData.PhysicalTherapy}
            </td>
          </tr>
          <tr>
            <th style={{ backgroundColor: '#f0f0f0' }} colSpan="2" className="treat-border">
              OccupationalTherapy
            </th>
          </tr>
          <tr>
            <td colSpan="2" className="treat-border">
              {rowData.OccupationalTherapy}
            </td>
          </tr>
          <tr>
            <th style={{ backgroundColor: '#f0f0f0' }} colSpan="2" className="treat-border">
              RecFollowUpAppointment
            </th>
          </tr>
          <tr>
            <td colSpan="2" className="treat-border">
              {rowData.RecFollowUpAppointment}
            </td>
          </tr>
          <tr>
            <th style={{ backgroundColor: '#f0f0f0' }} colSpan="2" className="treat-border">
              GuideMonitorSymtopms
            </th>
          </tr>
          <tr>
            <td colSpan="2" className="treat-border">
              {rowData.GuideMonitorSymtopms}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default withAuth(TreatmentPlan, 'patient');
