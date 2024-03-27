import React, { useState, useEffect } from 'react';
import "./contact.css";
import axios from 'axios';
import withAuth from "../../withAuth.js";

function Contact() {
    const [contacts, setContacts] = useState([]);

    // Load contacts from localStorage on component mount
    useEffect(() => {
      fetchContacts();
    }, []); 
    

    // Inside the fetchContacts function
  const fetchContacts = () => {
    const userId = sessionStorage.getItem('userId'); 
    console.log('userId:', userId);

    axios.get(`http://localhost:8080/doctor-contact/${userId}`) 
      .then(response => {
        setContacts(response.data);
        console.log(userId);
        console.log(contacts);
      })
      .catch(error => {
        console.error('Error retrieving contacts:', error);
      });
  };

  return (
    <div className = 'contact-page' > 
           <h1 className='contact-h1'>Contacts</h1>
            <div className='contact-tableContainer'>
            <table className='contact-table'>
                <thead className='contact-thead'>
                    <tr>
                        <th>PID</th>
                        <th>FullName</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {contacts.map((contact, i) => (
                    <tbody className='contact-tbody'>
                        <tr className='contact-tr'>
                            <th className='contact-td'>{contact.PID}</th>
                            <th className='contact-td'>{contact.FirstName} {contact.LastName}</th>
                            <th className='contact-td'>{contact.Gender}</th>
                            <th className='contact-td'>{contact.ContactNumber}</th>
                            <th className='contact-td'>{contact.Email}</th>
                        </tr>
                    </tbody>
                ))}
                
            </table>
            </div>
            
           
        <div className="contact-box">
            <div className='contact-box2'>
                <h3>Contact us</h3>
                <a>80 Duy Tan, Cau Giay, Ha Noi</a><br></br>
                <a href="https://cornhub.website/" style={{ color: 'white' }}>Gmail: assignment1@gmail.com</a><br></br>
                <a href="#" style={{ color: 'white' }}>Hotline: 115</a>
            </div>
        </div>
            


        </div>
  )
}

export default withAuth(Contact, 'doctor');




