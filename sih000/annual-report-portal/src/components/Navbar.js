import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout(); // Call the logout function passed from App.js
        navigate('/login'); // Redirect to the login page after logging out
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Annual Report Portal</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/data-visualization">Data Visualization</Link></li>
                <li><Link to="/report">Report Generation</Link></li>
                <li><Link to="/collaboration">Collaboration</Link></li>
                <li><button onClick={handleLogoutClick} className="logout-button">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
