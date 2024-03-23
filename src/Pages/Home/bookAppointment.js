/*
  File: bookAppointment.js

  Description:
  This file defines the bookAppointment component, which provides a form for users to book an appointment.
  It includes fields for the user's name, phone number, email, and the preferred appointment date.
  The component utilizes the 'styleHome.css' stylesheet for styling and includes a link from 'react-router-dom'.

  Components:
  - bookAppointment: Functional component rendering the appointment booking form.
*/

import React from 'react';
import './styleHome.css'
import { Link } from 'react-router-dom';

const bookAppointment = () =>  {
    return (
        <div className='homeover'>
            <section className="bookApp" id="bookApp">
                <h1 className="heading"><span>Book </span>Now</h1>
                <div className="bookApp-row">
                    <div className="image">
                        <img src="image/booking-app.svg" alt=""></img>
                    </div>
                    <form action="">
                        <h3>Book Appointment</h3>
                        <input type="text" placeholder="Your Name" className="bookApp-box"></input>
                        <input type="number" placeholder="Your Phone Number" className="bookApp-box"></input>
                        <input type="text" placeholder="Your Email" className="bookApp-box"></input>
                        <input type="date" className="bookApp-box"></input>
                        <input type="submit" value="Book Now" className="home-btn"></input>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default bookAppointment;