import { useState } from "react";

/**
 * Custom React hook for managing multi-step forms.
 *
 * @param {Array} steps - An array containing the steps of the form.
 * @returns {Object} An object with properties and functions to manage the multi-step form.
 */
export function useMultiStepForm(steps) {
    // State to track the current step index
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    /**
     * Function to navigate to the next step in the form.
     * It prevents going beyond the last step.
     */
    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    /**
     * Function to navigate to the previous step in the form.
     * It prevents going beyond the first step.
     */
    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    /**
     * Function to directly go to a specific step in the form.
     *
     * @param {number} index - Index of the step to navigate to.
     */
    function goTo(index) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    };
}
