import React, { useState, useEffect } from 'react';
import MSDoc from "./Form/MSDoc";
import CreateBill from "./Form/CreateBill";
import TreatmentPlan from "./Form/TreatmentPlan";
import SearchPa from "./Form/SearchPa";
import { useMultiStepForm } from "./Accordion/useMultiStepForm";
import axios from 'axios';

function RecordForm() {
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const handleSearchCompleted = (customerId) => {
    setCustomerId(customerId);
    setSearchCompleted(true);
  };

  const [msDocData, setMsDocData] = useState(null);
  const [treatmentPlanData, setTreatmentPlanData] = useState(null);

  // Function to fetch data from medical_summary table
  const fetchMedicalSummaryData = () => {
    axios
      .get(`http://localhost:8080/medical-summary/${customerId}`)
      .then((res) => {
        setMsDocData(res.data);
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
        setTreatmentPlanData(res.data);
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
   const handleSubmit = () => {
    // Update medical_summary table
    if (msDocData) {
      axios
        .put(`http://localhost:8080/medical-summary/${customerId}`, msDocData)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.error('Error updating medical summary:', err);
        });
    }

    // Update treatmentplan table
    if (treatmentPlanData) {
      axios
        .put(`http://localhost:8080/treatmentplan/${customerId}`, treatmentPlanData)
        .then((res) => {
          console.log(res.data.message);
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
    </div>
  );
}

export default RecordForm;
