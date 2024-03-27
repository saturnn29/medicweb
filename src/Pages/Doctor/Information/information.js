import React from "react";
import "./information.scss";
import withAuth from "../../withAuth.js";

// DoctorDetails component to display information about a doctor
function DoctorDetails() {
  return (
    <div className="doctor-profile">
      {/* Grid container for organizing content */}
      <div className="grid-container">
        {/* Left column for basic information and profile image */}
        <div className="grid-column-left">
          <div className="segment">
            {/* Doctor's profile image */}
            <img
              /*src={require("~/public/image/doctor-6.jpg").default}*/
              className="profile-image"
              alt="Profile"
            />

            {/* Basic information about the doctor */}
            <div className="info-row">
              <b>Full Name:</b>
              <div>John Lennon</div>
            </div>
            <div className="info-row">
              <b>IC:</b>
              <div>12/4/1990</div>
            </div>
            <div className="info-row">
              <b>Gender:</b>
              <div>Male</div>
            </div>
          </div>
        </div>

        {/* Right column for detailed information about the doctor */}
        <div className="grid-column-right">
          <div className="segment">
            <h2 className="segment-header">Doctor's Full Details</h2>

            {/* Personal details section */}
            <div className="info-row">
              <div className="sub-segment">
                <h3 className="sub-header">PERSONAL DETAILS</h3>
                <div className="sub-info">
                  <b>Phone</b>
                  <div>0291232131</div>
                </div>
                <div className="sub-info">
                  <b>Birthdate</b>
                  <div>18/2/1989</div>
                </div>
              </div>
            </div>

            {/* Education details section */}
            <div className="info-row">
              <div className="sub-segment">
                <h3 className="sub-header">EDUCATION DETAILS</h3>
                <div className="sub-info">
                  <b>Highest Qualification</b>
                  <div>phD</div>
                </div>
                <div className="sub-info">
                  <b>Major</b>
                  <div>Something</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DoctorDetails, 'doctor');