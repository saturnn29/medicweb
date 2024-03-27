import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Styled component for the container of the medical summary form
const MedicalSummaryContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
`;

// Styled component for section titles in the form
const SectionTitle = styled.h2`
    margin-bottom: 10px;
`;

// Styled component for form labels
const FormLabel = styled.label`
    display: block;
    margin-bottom: 10px;
`;

// Styled component for text input fields
const FormInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

// Styled component for textareas in the form
const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

// React functional component representing the medical summary form
const MSDoc = ({ customerId }) => {
    const [MSDoc, setMSDoc] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/medical-summary/${customerId}`)
            .then(response => {
                setMSDoc(response.data);
            })
            .catch(error => {
                console.error('Error retrieving medical summary:', error);
            });
    }, [customerId]);

    // Function to handle changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMSDoc(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Check if MSDoc is null before rendering the form
    if (!MSDoc) {
        return <div>Loading...</div>;
    }

    return (
        <MedicalSummaryContainer>
            <SectionTitle>Medical Summary</SectionTitle>
            <form>
                {/* Chief Complaint */}
                <FormLabel>
                    Chief Complaint:
                    <FormTextArea name="ChiefComplaint" value={MSDoc.ChiefComplaint || ''} onChange={handleInputChange} />
                </FormLabel>

                {/* Section for Vital Signs */}
                <SectionTitle>Vital Signs</SectionTitle>
                <FormLabel>
                    Blood Pressure:
                    <FormInput type="text" name="BloodPressure" value={MSDoc.BloodPressure || ''} onChange={handleInputChange} />
                </FormLabel>
                <FormLabel>
                    Heart Rate:
                    <FormInput type="text" name="HeartRate" value={MSDoc.HeartRate || ''} onChange={handleInputChange} />
                </FormLabel>
                <FormLabel>
                    Respiratory Rate:
                    <FormInput type="text" name="RespiratoryRate" value={MSDoc.RespiratoryRate || ''} onChange={handleInputChange} />
                </FormLabel>
                <FormLabel>
                    Temperature:
                    <FormInput type="text" name="Temperature" value={MSDoc.Temperature || ''} onChange={handleInputChange} />
                </FormLabel>

                {/* Section for Past Medical History */}
                <SectionTitle>Past Medical History</SectionTitle>
                <FormLabel>
                    Chronic Illnesses:
                    <FormTextArea name="ChronicIllnesses" value={MSDoc.ChronicIllnesses || ''} onChange={handleInputChange} />
                </FormLabel>
                <FormLabel>
                    Previous Significant Medical Events:
                    <FormTextArea name="PreviousMedicalEvents" value={MSDoc.PreviousMedicalEvents || ''} onChange={handleInputChange} />
                </FormLabel>

                {/* Section for Diagnostic Test Result */}
                <SectionTitle>Diagnostic Test Result</SectionTitle>
                <FormLabel>
                    Laboratory Results:
                    <FormTextArea name="LaboratoryResults" value={MSDoc.LaboratoryResults || ''} onChange={handleInputChange} />
                </FormLabel>
            </form>
        </MedicalSummaryContainer>
    );
};

export default MSDoc;
