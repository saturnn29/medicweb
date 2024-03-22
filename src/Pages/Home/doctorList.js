/*
  File: doctorList.js

  Description:
  This file defines the doctorList component, which displays a list of doctors with their images, names, and expertise.
  The component utilizes the 'styleHome.css' stylesheet for styling and includes a link from 'react-router-dom'.

  Components:
  - doctorList: Functional component rendering the list of doctors.
*/

import React from 'react';
import './styleHome.css'
import { Link } from 'react-router-dom';

const doctorList = () =>  {
    return (
        <div className='homeover'>
            <section className="doctorList" id="doctorList">
                <h1 className="heading">Our <span>Doctors</span></h1>
                <div className="doctorList-container">
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>  
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>
                    <div className="doctorList-box">
                        <img src="image/doctor-6.jpg" alt=""></img>
                        <h3>Tran Hoang Duy Linh</h3>
                        <span>Expert Doctor</span>
                        <div className="doctor-bio">
                            <a href="#" className="fab fa-facebook"></a>
                            <a href="#" className="fab fa-twitter"></a>
                            <a href="#" className="fab fa-instagram"></a>
                            <a href="#" className="fab fa-linkedin"></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default doctorList;