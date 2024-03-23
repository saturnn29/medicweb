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
    }, []);

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
                    <FormTextArea name="chiefComplaint" value={MSDoc.ChiefComplaint || ''} />
                </FormLabel>

                {/* Section for Vital Signs */}
                <SectionTitle>Vital Signs</SectionTitle>
                <FormLabel>
                    Blood Pressure:
                    <FormTextArea name="bloodPressure" value={MSDoc.BloodPressure || ''} />
                </FormLabel>
                <FormLabel>
                    Heart Rate:
                    <FormTextArea name="heartRate" value={MSDoc.HeartRate || ''} />
                </FormLabel>
                <FormLabel>
                    Respiratory Rate:
                    <FormTextArea name="respiratoryRate" value={MSDoc.RespiratoryRate || ''} />
                </FormLabel>
                <FormLabel>
                    Temperature:
                    <FormTextArea name="temperature" value={MSDoc.Temperature || ''} />
                </FormLabel>

                {/* Section for Past Medical History */}
                <SectionTitle>Past Medical History</SectionTitle>
                <FormLabel>
                    Chronic Illnesses:
                    <FormTextArea name="chronicIllnesses" value={MSDoc.ChronicIllnesses || ''} />
                </FormLabel>
                <FormLabel>
                    Previous Significant Medical Events:
                    <FormTextArea name="previousMedicalEvents" value={MSDoc.PreviousMedicalEvents || ''} />
                </FormLabel>

                {/* Section for Diagnostic Test Result */}
                <SectionTitle>Diagnostic Test Result</SectionTitle>
                <FormLabel>
                    Laboratory Results:
                    <FormTextArea name="labResults" value={MSDoc.LaboratoryResults || ''} />
                </FormLabel>
            </form>
        </MedicalSummaryContainer>
    );
};

export default MSDoc;