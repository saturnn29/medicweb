/*
  File: MedicalSummary.js

  Description:
  This file defines the MedicalSummary component, which presents a medical summary for a patient. 
  It includes sections for patient information, vital signs, past medical history, and diagnostic test results.
  The component utilizes styled-components for styling, providing a visually appealing layout.
  Patient information can be edited and saved using the 'Edit Personal Information' button. The data is initially
  displayed as read-only and can be edited when the button is clicked.

  Components:
  - MedicalSummary: Functional component managing the overall layout and state.
    It includes two sections, one for patient information and another for medical summary.
  - Styled Components: Various styled components used for layout, form elements, and buttons.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import withAuth from "../../withAuth.js";

const MedicalSummaryContainer = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    border: none; 
    border-radius: 5px;
    margin-top: 20px;
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
`;

const LeftSection = styled.div`
    width: 48%;
    border: 0.2rem solid var(--green); 
    border-radius: 5px;
    box-shadow: .6rem .6rem 0 rgba(22, 160, 133, 0.3);
    padding: 20px;
`;

const RightSection = styled.div`
    width: 48%;
    margin-right: 2%;
    border: 0.2rem solid var(--green); 
    border-radius: 5px;
    box-shadow: .6rem .6rem 0 rgba(22, 160, 133, 0.3);
    padding: 20px;
    margin-left: 10%;
`;

const SectionTitle = styled.h2`
    margin-bottom: 10px;
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
    background-color: #4169e1;
    color: #ffffff;

`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const EditButton = styled.button`
    background-color: #ffa500;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

function MedicalSummary() {
  const [isPatientInfoEditable, setPatientInfoEditable] = useState(false);
  const [medicalSummary, setMedicalSummary] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const handleEditButtonClick = () => {
    setPatientInfoEditable(!isPatientInfoEditable);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      const fetchData = async () => {
        try {
          const [medicalSummaryResponse, patientInfoResponse] = await Promise.all([
            axios.get(`http://localhost:8080/medical-summary/${userId}`),
            axios.get(`http://localhost:8080/patient-info/${userId}`),
          ]);
          setMedicalSummary(medicalSummaryResponse.data);
          setPatientInfo(patientInfoResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
  }, []);

  return (
    <MedicalSummaryContainer>
      <LeftSection>
        <SectionTitle>Patient's Information</SectionTitle>
        <form>
          <FormLabel>
            First Name:
            <FormInput
              type="text"
              name="patientName"
              defaultValue={patientInfo?.FirstName || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Last Name:
            <FormInput
              type="text"
              name="patientName"
              defaultValue={patientInfo?.LastName || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Date of Birth:
            <FormInput
              type="text"
              name="dob"
              defaultValue={patientInfo?.DoB ? new Date(patientInfo.DoB).toLocaleDateString() : ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Gender:
            <FormInput
              type="text"
              name="gender"
              defaultValue={patientInfo?.Gender || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Contact Number:
            <FormInput
              type="text"
              name="contactNumber"
              defaultValue={patientInfo?.ContactNumber || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Address:
            <FormInput
              type="text"
              name="address"
              defaultValue={patientInfo?.address || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
          <FormLabel>
            Email:
            <FormInput
              type="text"
              name="email"
              defaultValue={patientInfo?.email || ''}
              readOnly={!isPatientInfoEditable}
            />
          </FormLabel>
        </form>
        <EditButton onClick={handleEditButtonClick}>
          {isPatientInfoEditable ? 'Save' : 'Edit Personal Information'}
        </EditButton>
      </LeftSection>

      <RightSection>
        <SectionTitle>Medical Summary</SectionTitle>
        <form>
          <FormLabel>
            Chief Complaint:
            <FormInput
              name="chiefComplaint"
              defaultValue={medicalSummary?.ChiefComplaint || ''}
              readOnly
            />
          </FormLabel>

          <SectionTitle>Vital Signs</SectionTitle>
          <FormLabel>
            Blood Pressure:
            <FormInput
              type="text"
              name="bloodPressure"
              defaultValue={medicalSummary?.BloodPressure || ''}
              readOnly
            />
          </FormLabel>
          <FormLabel>
            Heart Rate:
            <FormInput
              type="text"
              name="heartRate"
              defaultValue={medicalSummary?.HeartRate || ''}
              readOnly
            />
          </FormLabel>
          <FormLabel>
            Respiratory Rate:
            <FormInput
              type="text"
              name="respiratoryRate"
              defaultValue={medicalSummary?.RespiratoryRate || ''}
              readOnly
            />
          </FormLabel>
          <FormLabel>
            Temperature:
            <FormInput
              type="text"
              name="temperature"
              defaultValue={medicalSummary?.Temperature || ''}
              readOnly
            />
          </FormLabel>

          <SectionTitle>Past Medical History</SectionTitle>
          <FormLabel>
            Chronic Illnesses:
            <FormInput
              name="chronicIllnesses"
              defaultValue={medicalSummary?.ChronicIllnesses || ''}
              readOnly
            />
          </FormLabel>
          <FormLabel>
            Previous Significant Medical Events:
            <FormInput
              name="previousMedicalEvents"
              defaultValue={medicalSummary?.PreviousMedicalEvents || ''}
              readOnly
            />
          </FormLabel>

          <SectionTitle>Diagnostic Test Result</SectionTitle>
          <FormLabel>
            Laboratory Results:
            <FormInput
              name="labResults"
              defaultValue={medicalSummary?.LaboratoryResults || ''}
              readOnly
            />
          </FormLabel>
        </form>
      </RightSection>
    </MedicalSummaryContainer>
  );
}
  
export default withAuth(MedicalSummary, 'patient');