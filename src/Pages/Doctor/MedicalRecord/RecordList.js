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
  let items = [
      {
          name:"Patient: Sarah Johnson, diagnosed with Hepaticocholangiogastrostomy",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Michael Williams, diagnosed with Supercalifragilisticexpialidocious Syndrome",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Emily Davis, diagnosed with Paroxysmal Supraventricular Tachycardia",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Robert Turner, diagnosed with Gastroesophageal Reflux Disease",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Jennifer Martinez, diagnosed with Antidisestablishmentarianism Disorder",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Christopher Lee, diagnosed with Pseudopseudohypoparathyroidism",
          content: <div>HEHEHEHHEHE</div>
      },
      {
          name:"Patient: Amanda Robinson, diagnosed with Hippopotomonstrosesquippedaliophobia",
          content: <div>HEHEHEHHEHE</div>
      },
  ]

  return (
      <div>
          <Accordion multiple items={items}/>
      </div>
  );
}

export default render;
