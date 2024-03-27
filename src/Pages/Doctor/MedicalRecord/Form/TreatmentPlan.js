import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TreatmentPlanContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 10px;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 10px;
`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const TreatmentPlan = ({ customerId }) => {
    const [treatmentPlan, setTreatmentPlan] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/treatmentplan/${customerId}`)
            .then(response => {
                setTreatmentPlan(response.data);
            })
            .catch(error => {
                console.error('Error retrieving treatment plan:', error);
            });
    }, [customerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTreatmentPlan(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!treatmentPlan) {
        return <div>Loading...</div>;
    }

    return (
        <TreatmentPlanContainer>
            <SectionTitle>Treatment Plan</SectionTitle>
            <form>
                <FormLabel>
                    Medical ID:
                    <FormTextArea type="text" name="MID" value={treatmentPlan.MID || ''} onChange={handleInputChange} disabled/>
                </FormLabel>
                <FormLabel>
                    Patient ID:
                    <FormTextArea type="text" name="PID" value={treatmentPlan.PID || ''} onChange={handleInputChange} disabled/>
                </FormLabel>
                <FormLabel>
                    Doctor ID:
                    <FormTextArea type="text" name="DID" value={treatmentPlan.DID || ''} onChange={handleInputChange} disabled/>
                </FormLabel>
                <FormLabel>
                    Medications:
                    <FormTextArea name="Medications" value={treatmentPlan.Medications || ''} onChange={handleInputChange}></FormTextArea>
                </FormLabel>

                <SectionTitle>Therapies</SectionTitle>
                <FormLabel>
                    Physical Therapy:
                    <FormTextArea name="PhysicalTherapy" value={treatmentPlan.PhysicalTherapy || ''} onChange={handleInputChange}></FormTextArea>
                </FormLabel>
                <FormLabel>
                    Occupational Therapy:
                    <FormTextArea name="OccupationalTherapy" value={treatmentPlan.OccupationalTherapy || ''} onChange={handleInputChange}></FormTextArea>
                </FormLabel>

                <SectionTitle>Follow-up Instructions</SectionTitle>
                <FormLabel>
                    Recommendations for Follow-up Appointment:
                    <FormTextArea name="RecFollowUpAppointment" value={treatmentPlan.RecFollowUpAppointment || ''} onChange={handleInputChange}></FormTextArea>
                </FormLabel>
                <FormLabel>
                    Guidance on Monitoring Symptoms:
                    <FormTextArea name="GuideMonitorSymtopms" value={treatmentPlan.GuideMonitorSymtopms || ''} onChange={handleInputChange}></FormTextArea>
                </FormLabel>
            </form>
        </TreatmentPlanContainer>
    );
};

export default TreatmentPlan;