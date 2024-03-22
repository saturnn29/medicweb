import React, { useState } from "react";
import "./Modal.css";

/**
 * Modal component for displaying a form and handling user input.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {Object} props.defaultValue - Default values for form fields.
 * @returns {JSX.Element} Modal component.
 */
function Modal({ closeModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      status: "live",
    }
  );

  const [errors, setErrors] = useState("");

  /**
   * Validates the form fields and sets error messages if any.
   *
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    if (
      formState.name &&
      formState.description &&
      formState.price &&
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  /**
   * Handles changes in form input fields.
   *
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission.
   *
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  // JSX structure for the Modal component
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              onChange={handleChange}
              value={formState.price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}

          <button className="Mbutton" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;