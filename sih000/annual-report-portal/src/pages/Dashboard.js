import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/data-integration">Data Integration</Link></li>
        <li><Link to="/data-visualization">Data Visualization</Link></li>
        <li><Link to="/report">Report Generation</Link></li>
        <li><Link to="/collaboration">Collaboration</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
