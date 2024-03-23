import React, { useState, useEffect } from 'react';
import MSDoc from "./Form/MSDoc";
import CreateBill from "./Form/CreateBill";
import TreatmentPlan from "./Form/TreatmentPlan";
import SearchPa from "./Form/SearchPa";
import { useMultiStepForm } from "./Accordion/useMultiStepForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function RecordForm() {
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const handleSearchCompleted = (customerId) => {
    setCustomerId(customerId);
    setSearchCompleted(true);
  };
  const [updatedMS, setUpdatedMS] = useState({
    ChiefComplaint: '',
    BloodPressure: '',
    HeartRate: '',
    RespiratoryRate: '',
    Temparature: '',
    ChronicIllnesses: '',
    PreviousMedicalEvents: '',
    LaboratoryResults: ''
  });
  const [updatedTP, setUpdatedTP] = useState({
    Medications: '',
    PhysicalTherapy: '',
    OccupationalTherapy: '',
    RecFollowUpAppointment: '',
    GuideMonitorSymtopms: ''
  });

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

  // Function to fetch data from medical_summary table
  const fetchMedicalSummaryData = () => {
    axios
      .get(`http://localhost:8080/medical-summary/${customerId}`)
      .then((res) => {
        setUpdatedMS(res.data);
      })
      .catch((err) => {
        console.error('Error fetching medical summary data:', err);
      });
  };

  // Function to fetch data from treatmentplan table
  const fetchTreatmentPlanData = () => {
    axios
      .get(`http://localhost:8080/treatmentplan/${customerId}`)
      .then((res) => {
        setUpdatedTP(res.data);
      })
      .catch((err) => {
        console.error('Error fetching treatment plan data:', err);
      });
  };

  useEffect(() => {
    if (customerId) {
      fetchMedicalSummaryData();
      fetchTreatmentPlanData();
    }
  }, [customerId]);

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <MSDoc customerId={customerId} />,
    <TreatmentPlan customerId={customerId} />,
    <CreateBill customerId={customerId} />,
  ]);

   // Function to handle form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    // Update medical_summary table
    if (updatedMS) {
      const updatedMSFields = {
        ChiefComplaint: updatedMS.ChiefComplaint,
        BloodPressure: updatedMS.BloodPressure,
        HeartRate: updatedMS.HeartRate,
        RespiratoryRate: updatedMS.RespiratoryRate,
        Temparature: updatedMS.Temparature,
        ChronicIllnesses: updatedMS.ChronicIllnesses,
        PreviousMedicalEvents: updatedMS.PreviousMedicalEvents,
        LaboratoryResults: updatedMS.LaboratoryResults
      };    

      axios
        .put(`http://localhost:8080/medical-summary/${customerId}`, updatedMSFields)
        .then((res) => {
          if (res.data.success) {
            console.log('Received updatedMS:', updatedMS);
            successToast(res.data.message);
          } else {
            errorToast(res.data.message);
          }
        })
        .catch((err) => {
          console.error('Error updating medical summary:', err);
        });
    }
  
    // Update treatmentplan table
    if (updatedTP) {
      const updatedTPFields = {
        Medications: updatedTP.Medications,
        PhysicalTherapy: updatedTP.PhysicalTherapy,
        OccupationalTherapy: updatedTP.OccupationalTherapy,
        RecFollowUpAppointment: updatedTP.RecFollowUpAppointment,
        GuideMonitorSymtopms: updatedTP.GuideMonitorSymtopms
      };
    
      axios
        .put(`http://localhost:8080/treatmentplan/${customerId}`, updatedTPFields)
        .then((res) => {
          if (res.data.success) {
            console.log('Received updatedTP:', updatedTP);
            successToast(res.data.message);
          } else {
            errorToast(res.data.message);
          }
        })
        .catch((err) => {
          console.error('Error updating treatment plan:', err);
        });
    }
  };

  return (
    <div className="record-form-container">
      <form onSubmit={handleSubmit}>
        {!searchCompleted && (
          <SearchPa onSearchCompleted={handleSearchCompleted} />
        )}
        {searchCompleted && (
          <div>
            {step}
            <div className="button-container">
              {!isFirstStep && (
                <button type="button" className="previous-button" onClick={back}>
                  Previous Page
                </button>
              )}
              <button type="button" className="next-button" onClick={isLastStep ? handleSubmit : next}>
                {isLastStep ? "Finish" : "Next Page"}
              </button>
            </div>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}

export default RecordForm;
