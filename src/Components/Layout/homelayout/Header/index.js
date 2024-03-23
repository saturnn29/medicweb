import { Link } from 'react-router-dom';
import './styleHeader.css'

function Header() {
    return (
        <header class="header">
            <Link to="/home" className="logo">
                <i className="fas fa-heartbeat"></i>AuspexCare
            </Link>
            <nav class ="header-navbar">
                <Link to="/home">Home</Link>
                <Link to="/services">Services</Link>
                <Link to="/doctorList">Doctors</Link>
                <Link to="/bookAppointment">Booking</Link>
                <Link to="/login">Login/Signup</Link>
            </nav>
        </header>
    );
}

export default Header;