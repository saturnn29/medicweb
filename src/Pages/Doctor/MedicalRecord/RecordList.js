import React, { useState, useEffect } from "react";
import { AccordionContainer, AccordionContent } from "./Accordion/Accordion";

// React functional component for the Accordion
const Accordion = ({ items, multiple }) => {
  // State to track the currently active accordion item
  const [active, setActive] = useState();
  // State to track the active state of each accordion item (for multiple mode)
  const [activeArr, setActiveArr] = useState([]);

  // Initialize the activeArr state based on the items prop
  useEffect(() => {
    let p = items.map((item) => {
      return { name: item.name, active: false };
    });
    setActiveArr(p);
  }, [items]);

  // Function to handle accordion item clicks
  const handleClick = (name) => {
    setActive(name === active ? null : name);

    // Update the active state of each accordion item in multiple mode
    if (multiple) {
      let ind = activeArr.findIndex((i) => i.name === name);
      let upd = [...activeArr];
      upd[ind].active = !upd[ind].active;
      setActiveArr(upd);
    }
  };

  return (
    <AccordionContainer>
      {/* Map through accordion items and render AccordionContent for each */}
      {items.map((item) => {
        // Determine if the current item is active
        let isActive = active === item.name;
        if (multiple) isActive = activeArr.some((i) => i.name === item.name && i.active);

        return (
          <AccordionContent
            key={item.name} // Added a key prop for optimization
            onClick={() => handleClick(item.name)}
            itemName={item.name}
            itemContent={item.content}
            isActive={isActive}
          />
        );
      })}
    </AccordionContainer>
  );
};

// Function to render the Accordion component with example items
const render = () => {
  const items = [
    {
      name: "Patient: Sarah Johnson, diagnosed with Hepaticocholangiogastrostomy",
      content: (
        <div>
          <p>Chief Complaint: Abdominal pain, nausea</p>
          <p>Blood Pressure: 120/80 mmHg</p>
          <p>Heart Rate: 75 bpm</p>
          <p>Respiratory Rate: 16 breaths/min</p>
          <p>Temperature: 98.6°F</p>
          <p>Chronic Illnesses: Diabetes, Hypertension</p>
          <p>Previous Medical Events: Appendectomy (2020)</p>
          <p>Laboratory Results: Elevated liver enzymes</p>
        </div>
      )
    },
    {
      name: "Patient: Michael Williams, diagnosed with Supercalifragilisticexpialidocious Syndrome",
      content: (
        <div>
          <p>Chief Complaint: Fatigue, muscle weakness</p>
          <p>Blood Pressure: 135/85 mmHg</p>
          <p>Heart Rate: 68 bpm</p>
          <p>Respiratory Rate: 14 breaths/min</p>
          <p>Temperature: 97.8°F</p>
          <p>Chronic Illnesses: Asthma</p>
          <p>Previous Medical Events: Tonsillectomy (2018)</p>
          <p>Laboratory Results: Elevated creatine kinase levels</p>
        </div>
      )
    },
    {
      name: "Patient: Emily Davis, diagnosed with Paroxysmal Supraventricular Tachycardia",
      content: (
        <div>
          <p>Chief Complaint: Palpitations, chest discomfort</p>
          <p>Blood Pressure: 128/82 mmHg</p>
          <p>Heart Rate: 110 bpm</p>
          <p>Respiratory Rate: 18 breaths/min</p>
          <p>Temperature: 98.2°F</p>
          <p>Chronic Illnesses: None</p>
          <p>Previous Medical Events: None</p>
          <p>Laboratory Results: Normal</p>
        </div>
      )
    },
    {
      name: "Patient: Robert Turner, diagnosed with Gastroesophageal Reflux Disease",
      content: (
        <div>
          <p>Chief Complaint: Heartburn, regurgitation</p>
          <p>Blood Pressure: 142/92 mmHg</p>
          <p>Heart Rate: 82 bpm</p>
          <p>Respiratory Rate: 16 breaths/min</p>
          <p>Temperature: 98.4°F</p>
          <p>Chronic Illnesses: Obesity</p>
          <p>Previous Medical Events: Cholecystectomy (2021)</p>
          <p>Laboratory Results: Elevated esophageal pH</p>
        </div>
      )
    },
    {
      name: "Patient: Jennifer Martinez, diagnosed with Antidisestablishmentarianism Disorder",
      content: (
        <div>
          <p>Chief Complaint: Anxiety, restlessness</p>
          <p>Blood Pressure: 118/74 mmHg</p>
          <p>Heart Rate: 92 bpm</p>
          <p>Respiratory Rate: 20 breaths/min</p>
          <p>Temperature: 99.0°F</p>
          <p>Chronic Illnesses: Depression</p>
          <p>Previous Medical Events: None</p>
          <p>Laboratory Results: Elevated cortisol levels</p>
        </div>
      )
    },
    {
      name: "Patient: Christopher Lee, diagnosed with Pseudopseudohypoparathyroidism",
      content: (
        <div>
          <p>Chief Complaint: Muscle cramps, tingling sensations</p>
          <p>Blood Pressure: 132/88 mmHg</p>
          <p>Heart Rate: 78 bpm</p>
          <p>Respiratory Rate: 14 breaths/min</p>
          <p>Temperature: 98.8°F</p>
          <p>Chronic Illnesses: None</p>
          <p>Previous Medical Events: None</p>
          <p>Laboratory Results: Low calcium, high phosphate levels</p>
        </div>
      )
    },
    {
      name: "Patient: Amanda Robinson, diagnosed with Hippopotomonstrosesquippedaliophobia",
      content: (
        <div>
          <p>Chief Complaint: Panic attacks, avoidance of long words</p>
          <p>Blood Pressure: 126/84 mmHg</p>
          <p>Heart Rate: 96 bpm</p>
          <p>Respiratory Rate: 22 breaths/min</p>
          <p>Temperature: 98.1°F</p>
          <p>Chronic Illnesses: None</p>
          <p>Previous Medical Events: None</p>
          <p>Laboratory Results: Normal</p>
        </div>
      )
    }
  ];

  return (
    <div>
      <Accordion multiple items={items} />
    </div>
  );
}

export default render;
