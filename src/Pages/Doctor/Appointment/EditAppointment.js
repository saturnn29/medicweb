import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './makeappointments.scss'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

function Edit({onUpdate}) {
  const { appId } = useParams(); // Get appId from route parameters
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/doctor/appointment');
  };
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    visitReason: '',
    appointmentStatus: '',
  });

  useEffect(() => {
    // Fetch appointment data using appId
    axios.get(`http://localhost:8080/makeappointment/${appId}`)
      .then((res) => {
        setFormData(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onUpdate === 'function') {
      onUpdate(formData);
    }

    const updatedFields = {
      patientName: formData.patientName,
      doctorName: formData.doctorName,
      appointmentDate: formData.appointmentDate,
      visitReason: formData.visitReason,
    };
    onUpdate(updatedFields);

    // Send updated data to server
    axios.put(`http://localhost:8080/makeappointment/${appId}`, updatedFields)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          successToast(res.data.message);
        } else {
          errorToast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast('An error occurred while updating the appointment');
      });
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

  return (
    <div className="appointment-form">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="visitReason">Visit Reason:</label>
          <input
            type="text"
            id="visitReason"
            name="visitReason"
            value={formData.visitReason}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="appointmentStatus">Appointment Status:</label>
          <input
            type="text"
            id="appointmentStatus"
            name="appointmentStatus"
            value="Wating"
            onChange={handleInputChange}
            disabled
          />
        </div>
        <button type="submit">Update</button>
        <button type="cancel" onClick={handleCancel}>Cancel</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Edit;