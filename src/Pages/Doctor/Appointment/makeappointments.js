import React, { useState } from 'react';
import './makeappointments.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MakeAppointment({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('Schedule an appointment');
  const [formData, setFormData] = useState({
    appId: '',
    doctorId: '',
    patientId: '',
    patientName: '',
    doctorName: '',
    birthdate: '',
    appointmentDate: '',
    visitReason: '',
    appointmentStatus: 'Waiting' // Assuming default status is Waiting
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const successToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "#4CAF50", // Green color
        color: "white",
      },
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "#F44336", // Red color
        color: "white",
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isSuccess = false;
  
    // Send data to server
    axios
      .post('http://localhost:8080/makeappointment', {
        AID: formData.appId,
        PID: formData.patientId,
        DID: formData.doctorId,
        FullnamePatient: formData.patientName,
        FullnameDoctor: formData.doctorName,
        AppointmentDate: formData.appointmentDate,
        VisitReason: formData.visitReason,
        AppointStatus: formData.appointmentStatus,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          successToast(res.data.message);
          isSuccess = true;
          setFormData({
            appId: '',
            doctorId: '',
            patientId: '',
            patientName: '',
            doctorName: '',
            birthdate: '',
            appointmentDate: '',
            visitReason: '',
            appointmentStatus: 'Waiting',
          });
        } else {
          errorToast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorToast(err.response.data.message || 'An error occurred while submitting the form');
        } else if (err.request) {
          // The request was made but no response was received
          errorToast('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an error
          errorToast('An error occurred while submitting the form');
        }
      });
  
    onSubmit(formData, isSuccess);
    setShowForm(false);
    setButtonText('Schedule an appointment');
  };

  const handleToggleForm = () => {
    setShowForm(prevState => !prevState);
    setButtonText(prevText => prevText === 'Schedule an appointment' ? 'Cancel' : 'Schedule an appointment');
  };

  return (
    <div>
      <button className="schedule-button" onClick={handleToggleForm}>{buttonText}</button>
      {showForm && (
        <div className="appointment-form">
          <h2>Make an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <label>Appointment ID:</label>
            <input type="text" name="appId" value={formData.appId} onChange={handleInputChange} required />
            <label>Patient ID:</label>
            <input type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} required />
            <label>Doctor ID:</label>
            <input type="text" name="doctorId" value={formData.doctorId} onChange={handleInputChange} required />
            <label>Patient's Name:</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required />
            <label>Doctor's Name:</label>
            <input type="text" name="doctorName" value={formData.doctorName} onChange={handleInputChange} required />
            <label>Appointment Date:</label>
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} required />
            <label>Visit Reason:</label>
            <input type="text" name="visitReason" value={formData.visitReason} onChange={handleInputChange} required />
            <label>Appointment Status:</label>
            <input type="text" name="appointmentStatus" value="Waiting" disabled />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default MakeAppointment;