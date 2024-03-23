import React, { useState, useEffect } from 'react';
import MakeAppointment from './makeappointments';  
import { Link, Route, Routes } from 'react-router-dom';
import Edit from './EditAppointment'; 
import "./apointment.scss";
import withAuth from "../../withAuth.js";
import axios from 'axios';

function Appointment() {
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Inside the fetchAppointments function
  const fetchAppointments = () => {
    const userId = sessionStorage.getItem('userId'); 
    console.log('userId:', userId);

    axios.get(`http://localhost:8080/doctor-appointment/${userId}`) 
      .then(response => {
        setAppointments(response.data);
        console.log(userId);
        console.log(appointments);
      })
      .catch(error => {
        console.error('Error retrieving appointments:', error);
      });
  };

  const handleFormSubmit = (formData, isNew) => {
    if (isNew) {
      // Add new appointment to the appointments array
      const newAppointments = [...appointments, formData];
      setAppointments(newAppointments);

      // Store appointments in localStorage
      localStorage.setItem('appointments', JSON.stringify(newAppointments));
    } else {
      // Update existing appointment
      const updatedAppointments = appointments.map((appointment) =>
        appointment.appId === formData.appId ? formData : appointment
      );
      setAppointments(updatedAppointments);

      // Store updated appointments in localStorage
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    }
  };

  const handleDeleteAppointment = (appId) => {
    // Filter out the appointment to be deleted
    const updatedAppointments = appointments.filter((appointment) => appointment.appId !== appId);
    setAppointments(updatedAppointments);

    // Store updated appointments in localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    handleFormSubmit(updatedAppointment, false);
  };

  return (
    <div className="appointment-doctor">
      <div className="appointment-page" style={{ marginTop: '50px', width: '90%', margin: '0 auto' }}>
        <MakeAppointment onSubmit={handleFormSubmit} />
        <table className="custom-table">
          <thead>
            <tr className="appointmenthead">
              <th>Appointment ID</th>
              <th>Doctor ID</th>
              <th>Patient ID</th>
              <th>Patient's Name</th>
              <th>Doctor's Name</th>
              <th>Appointment Date</th>
              <th>Visit Reason</th>
              <th>Appointment Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {/* Table Body - Render appointment data */}
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.AID}</td>
                <td>{appointment.DID}</td>
                <td>{appointment.PID}</td>
                <td>{appointment.FullnamePatient}</td>
                <td>{appointment.FullnameDoctor}</td>
                <td>{appointment.AppointmentDate}</td>
                <td>{appointment.VisitReason}</td>
                <td>{appointment.AppointmentStatus}</td>
                <td className="center-cell">
                  <Link to={`/doctor/edit/${appointment.AID}`} className="custom-button primary">Edit</Link>
                </td>
                <td className="center-cell">
                  <button className="custom-button danger" onClick={() => handleDeleteAppointment(appointment.AID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Routes>
          <Route
            path="/doctor/edit/:appId"
            element={<Edit onUpdate={handleFormSubmit} handleUpdateAppointment={handleUpdateAppointment} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default withAuth(Appointment, 'doctor');