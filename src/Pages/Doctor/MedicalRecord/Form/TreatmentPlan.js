import React from 'react';
import styled from 'styled-components';

// Styled component for the container of the treatment plan form
const TreatmentPlanContainer = styled.div`
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

// Styled component for textareas in the form
const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

// React functional component representing the treatment plan form
const TreatmentPlan = () => {
    return (
        <TreatmentPlanContainer>
            {/* Section for the Treatment Plan */}
            <SectionTitle>Treatment Plan</SectionTitle>

            {/* Form for entering treatment plan information */}
            <form>
                {/* Form field for Medications */}
                <FormLabel>
                    Medications:
                    <FormTextArea name="medications"></FormTextArea>
                </FormLabel>

                {/* Section for Therapies */}
                <SectionTitle>Therapies</SectionTitle>
                <FormLabel>
                    Physical Therapy:
                    <FormTextArea name="physicalTherapy"></FormTextArea>
                </FormLabel>
                <FormLabel>
                    Occupational Therapy:
                    <FormTextArea name="occupationalTherapy"></FormTextArea>
                </FormLabel>

                {/* Section for Follow-up Instructions */}
                <SectionTitle>Follow-up Instructions</SectionTitle>
                <FormLabel>
                    Recommendations for Follow-up Appointment:
                    <FormTextArea name="followUpRecommendations"></FormTextArea>
                </FormLabel>
                <FormLabel>
                    Guidance on Monitoring Symptoms:
                    <FormTextArea name="monitoringSymptoms"></FormTextArea>
                </FormLabel>
            </form>
        </TreatmentPlanContainer>
    );
};

// Export the component
export default TreatmentPlan;
