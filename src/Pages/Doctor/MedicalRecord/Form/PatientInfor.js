import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientForm = styled.div`
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
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 20px 250px;
    background-color: #16a085;
    font-size: 18px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #197563;
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

function PInfor({ onSubmit = () => {} }) {
    const userId = sessionStorage.getItem('userId');
    const [formData, setFormData] = useState({
        doctorId: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male',
        address: '',
        phone: '',
        email: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        axios.post('http://localhost:8080/PInfor', {
            DID: userId,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            DOB: formData.dob,
            Gender: formData.gender,
            Address: formData.address,
            Phone: formData.phone,
            Email: formData.email
        })
        .then(res => {
            console.log(res);
            if (res.data.success) {
                successToast(res.data.message);
                setFormData({
                    doctorId: '',
                    firstName: '',
                    lastName: '',
                    dob: '',
                    gender: '',
                    address: '',
                    phone: '',
                    email: ''
                });
            } else {
                errorToast(res.data.message);
            }
        })
        .catch(err => {
            console.log(err)
            errorToast('Error submitting form');
        });
    };

    return (
        <PatientForm>
            <h1>Patient Information</h1>
            <form onSubmit={handleSubmit}>
                <FormLabel>
                    First Name:
                    <FormInput type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required/>
                </FormLabel>
                <FormLabel>
                    Last Name:
                    <FormInput type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required/>
                </FormLabel>
                <FormLabel>
                    Date of Birth:
                    <FormInput type="date" name="dob" value={formData.dob} onChange={handleInputChange} required/>
                </FormLabel>
                <FormLabel required>
                    Gender:
                    <FormSelect name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </FormSelect>
                </FormLabel>
                <FormLabel required>
                    Address:
                    <FormInput type="text" name="address" value={formData.address} onChange={handleInputChange}  autoCapitalize="none"/>
                </FormLabel>
                <FormLabel required>
                    Contact Info:
                    <FormInput type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
                    <FormInput type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email"  autoCapitalize="none"/>
                </FormLabel>
                <SubmitButton type="submit" value="Submit">Submit</SubmitButton>
            </form>
            <ToastContainer />
        </PatientForm>
    );
}

export default PInfor;
