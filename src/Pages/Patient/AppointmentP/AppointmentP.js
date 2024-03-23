import "./AppPatient.scss";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import withAuth from "../../withAuth.js";
import axios from 'axios';

function AppointmentPage() {
    const [appointment, setAppointments] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        axios.get(`http://localhost:8080/patient-appointment/${userId}`)
            .then(response => {
                setAppointments(response.data);
                console.log(userId);
                console.log(appointment);
            })
            .catch(error => {
                console.error('Error retrieving appointments:', error);
            });
    }, []);

    return (
        <div className="appointment-patient">
            <div className="appointment-page" style={{ marginTop: '150px', width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                <table className="custom-table">
                    <thead>
                        <tr className="appointmenthead">
                            <th>Doctor Name</th>
                            <th>Appointment Date</th>
                            <th>Reason For Visit</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    {appointment && appointment.length > 0 ? (
                        appointment.map((app) => (
                        <tr key={app.AID}>
                            <td>{app.FullnameDoctor}</td>
                            <td>{app.AppointmentDate}</td>
                            <td>{app.VisitReason}</td>
                            <td>{app.AppointStatus}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="5">No appointments found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default withAuth(AppointmentPage, 'patient');