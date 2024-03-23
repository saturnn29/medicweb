import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #16a085;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #197563;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #c0392b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #a53125;
  }
`;

function EditPatientInfo() {
  const { PID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    PID: '',
    DID: '',
    FirstName: '',
    LastName: '',
    DoB: '',
    Gender: '',
    ContactNumber: '',
    Address: '',
    Email: '',
  });

  useEffect(() => {
    fetchPatientData();
  }, [PID]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patients?PID=${PID}`);
      if (response.data && response.data.length > 0) {
        setFormData(response.data[0]);
      } else {
        console.error('No patient data found');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/patients/${PID}`, formData);
      if (response.data.success) {
        successToast(response.data.message);
        navigate('/patient');
      } else {
        errorToast(response.data.message);
      }
    } catch (error) {
      console.error('Error updating patient information:', error);
      errorToast('An error occurred while updating patient information');
    }
  };

  const handleCancel = () => {
    navigate('/patient');
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
        backgroundColor: "#4CAF50",
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
        backgroundColor: "#F44336",
        color: "white",
      },
    });
  };

  return (
    <FormContainer>
      <h2>Edit Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <FormLabel>
          Patient ID:
          <FormInput
            type="text"
            name="PID"
            value={formData.PID}
            onChange={handleInputChange}
            disabled
          />
        </FormLabel>
        <FormLabel>
          Doctor ID:
          <FormInput
            type="text"
            name="DID"
            value={formData.DID}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel>
          First Name:
          <FormInput
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel>
          Last Name:
          <FormInput
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel>
          Date of Birth:
          <FormInput
            type="date"
            name="DoB"
            value={formData.DoB}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel required>
          Gender:
          <FormSelect name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </FormSelect>
        </FormLabel>
        <FormLabel>
          Contact Number:
          <FormInput
            type="text"
            name="ContactNumber"
            value={formData.ContactNumber}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel>
          Address:
          <FormInput
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
          />
        </FormLabel>
        <FormLabel>
          Email:
          <FormInput
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
          />
        </FormLabel>
        <SubmitButton type="submit">Update</SubmitButton>
        <CancelButton type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}

export default EditPatientInfo;