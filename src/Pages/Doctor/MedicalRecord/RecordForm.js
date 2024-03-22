import { useState } from "react";
import MSDoc from "./Form/MSDoc";
import CreateBill from "./Form/CreateBill";
import TreatmentPlan from "./Form/TreatmentPlan";
import SearchPa from "./Form/SearchPa";
import { useMultiStepForm } from "./Accordion/useMultiStepForm";

function RecordForm() {
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const handleSearchCompleted = (customerId) => {
    setCustomerId(customerId);
    setSearchCompleted(true);
  };
  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <MSDoc customerId={customerId} />,
    <TreatmentPlan customerId={customerId} />,
    <CreateBill />,
  ]);
  return (
    <div className="record-form-container">
      <form>
        {!searchCompleted && (
          <SearchPa onSearchCompleted={handleSearchCompleted} />
        )}
        {searchCompleted && (
          <form>
            {step}
            <div className="button-container">
              {!isFirstStep && (
                <button
                  type="button"
                  className="previous-button"
                  onClick={back}
                >
                  Previous Page
                </button>
              )}
              <button type="button" className="next-button" onClick={next}>
                {isLastStep ? "Finish" : "Next Page"}
              </button>
            </div>
          </form>
        )}
      </form>
    </div>
  );
}

export default RecordForm;
