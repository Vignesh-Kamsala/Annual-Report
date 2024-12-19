import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CSEDepartmentPage from './pages/CSEDepartmentPage';
import ECEDepartmentPage from './pages/ECEDepartmentPage';
import EEEDepartmentPage from './pages/EEEDepartmentPage';
import MEDepartmentPage from './pages/MEDepartmentPage';
import Navbar from './components/Navbar'; // Import Navbar

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Check if the user is authenticated and get the role from sessionStorage
        const token = sessionStorage.getItem('authToken');
        const role = sessionStorage.getItem('userRole');
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }

        // Botpress webchat integration
        const botpressScript = document.createElement('script');
        botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
        botpressScript.async = true;
        document.body.appendChild(botpressScript);

        const botpressConfigScript = document.createElement('script');
        botpressConfigScript.src = 'https://mediafiles.botpress.cloud/136e0f04-9df1-49b2-acda-9221c5477a73/webchat/v2.1/config.js';
        botpressConfigScript.async = true;
        document.body.appendChild(botpressConfigScript);

        // Cleanup scripts when component unmounts
        return () => {
            document.body.removeChild(botpressScript);
            document.body.removeChild(botpressConfigScript);
        };
    }, []);

    const handleLogin = (token, role) => {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole('');
    };

    return (
        <Router>
            <div>
                {isAuthenticated && <Navbar handleLogout={handleLogout} />}
                <Routes>
                    {!isAuthenticated ? (
                        <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
                    ) : (
                        <>
                            <Route path="/" element={<HomePage />} />

                            {/* Only Admin can access this route */}
                            {userRole === 'Admin' ? (
                                <Route path="/admin" element={<AdminPage />} />
                            ) : (
                                <Route path="/admin" element={<Navigate to="/" />} />
                            )}

                            <Route path="/department/cs" element={<CSEDepartmentPage />} />
                            <Route path="/department/ec" element={<ECEDepartmentPage />} />
                            <Route path="/department/ee" element={<EEEDepartmentPage />} />
                            <Route path="/department/me" element={<MEDepartmentPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
