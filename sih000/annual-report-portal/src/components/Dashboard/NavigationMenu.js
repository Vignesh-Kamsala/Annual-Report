import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/data-integration">Data Integration</Link></li>
                <li><Link to="/data-visualization">Data Visualization</Link></li>
                <li><Link to="/report">Report Generation</Link></li>
                <li><Link to="/collaboration">Collaboration</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationMenu;
