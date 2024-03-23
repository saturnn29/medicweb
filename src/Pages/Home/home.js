/*
  File: Home.js
  Author: [Your Name]
  Date: [Date]

  Description:
  This file defines the Home component, representing the home section of a healthcare website. 
  It includes a welcome message, a brief description of the healthcare services offered, and some key statistics.
  The component utilizes the 'styleHome.css' stylesheet for styling.

  Components:
  - Home: Functional component rendering the home section.
*/

import './styleHome.css'

function Home() {
    return (
        <div className='homeover'>
            <section className="home hsection" id="home">
                <div className="image">
                    <img src="./image/doctors-bro.svg" alt=""/>
                </div>
                <div className="content">
                    <h3>welcome!</h3>
                    <p>Embark on a journey towards optimal health and wellness with Our Health Hub. At Our Health Hub, we are committed to providing comprehensive and compassionate healthcare services to meet all your medical needs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquam felis. Phasellus vitae nisi vel elit hendrerit pharetra.</p>
                    <p>Our team of expert healthcare professionals is dedicated to ensuring your well-being. Whether you require routine checkups, specialized treatments, or personalized care, we are here to support you on your path to a healthier life.</p>
                    <a href="#" className="home-btn">Contact Us<span className="fas fa-chevron-right"></span></a>
                </div>
            </section>

            <section className="icons-container hsection">
                <div className="icons">
                    <i className="fas fa-user-md"></i>
                    <h3>300+</h3>
                    <p>Doctors at work</p>
                </div>

                <div className="icons">
                    <i className="fas fa-user"></i>
                    <h3>10000+</h3>
                    <p>Positive feedback</p>
                </div>

                <div className="icons">
                    <i className="fas fa-procedures"></i>
                    <h3>1000+</h3>
                    <p>Room Facility</p>
                </div>

                <div className="icons">
                    <i className="fas fa-hospital"></i>
                    <h3>100+</h3>
                    <p>Avalaible Hospitals</p>
                </div>
            </section>

        </div>
    );
}

export default Home;