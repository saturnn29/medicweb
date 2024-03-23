/*
  File: Services.js
  Author: [Your Name]
  Date: [Date]

  Description:
  This file defines the Services component, presenting various healthcare services offered by the medical institution. 
  It includes information about free checkups, 24/7 ambulances, doctors, bed facilities, medicines, total care services, medical pumps, medical consultations, and home healthcare.
  The component uses the 'styleHome.css' stylesheet for styling.

  Components:
  - Services: Functional component rendering the services section.
*/

import React from 'react';
import './styleHome.css'
import { Link } from 'react-router-dom';

const Services = () =>  {
    return (
        <div className='homeover'>
            <section className="services" id="services">
                <h1 className="heading">Our <span>Services</span></h1>
                <div className="services-container">
                    <div className="box">
                        <i className="fas fa-notes-medical"></i>
                        <h3>Free Checkups</h3>
                        <p>Get regular health checkups from our experienced medical professionals. We provide comprehensive evaluations to ensure your well-being. Early detection can lead to better health outcomes.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fas fa-ambulance"></i>
                        <h3>24/7 Ambulances</h3>
                        <p>Our fleet of ambulances is available 24/7 to provide immediate medical assistance. We prioritize swift response times to ensure timely transportation during emergencies.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fas fa-user-md"></i>
                        <h3>Doctors</h3>
                        <p>Meet our team of highly skilled and compassionate doctors dedicated to providing personalized care. From routine checkups to specialized treatments, we are here for your health needs.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fas fa-heartbeat"></i>
                        <h3>Bed Facility</h3>
                        <p>Rest comfortably in our well-equipped and modern bed facilities. Our facilities are designed to ensure a peaceful and restorative environment for your recovery.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fas fa-pills"></i>
                        <h3>Medicines</h3>
                        <p>Access a wide range of high-quality medicines prescribed by our expert healthcare professionals. We prioritize your well-being and only offer medications of the highest standards.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fas fa-procedures"></i>
                        <h3>Total Cares</h3>
                        <p>Experience comprehensive and holistic care with our total care services. We focus on addressing all aspects of your health and well-being to ensure a complete and effective recovery.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fa-solid fa-pump-medical"></i>
                        <h3>Medical Pumps</h3>
                        <p>Utilize our state-of-the-art medical pumps for precise and controlled administration of fluids or medications. Our pumps ensure accurate dosage and promote safe medical treatments.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fa-solid fa-briefcase-medical"></i>
                        <h3>Medical Consultations</h3>
                        <p>Benefit from personalized medical consultations with our experienced healthcare professionals. We provide expert advice and guidance to address your health concerns and optimize your well-being.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>

                    <div className="box">
                        <i className="fa-solid fa-house-medical"></i>
                        <h3>Home Healthcare</h3>
                        <p>Experience the convenience of receiving healthcare services in the comfort of your home. Our home healthcare services ensure that you receive quality medical care without leaving your residence.</p>
                        <a href="#" className="home-btn">Learn more <span className="fas fa-chevron-right"></span></a>
                    </div>
                </div>
            </section>  
        </div>
    );
}

export default Services;
