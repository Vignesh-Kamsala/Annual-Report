import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default role is 'Student'
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Added loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

        const url = isSignup ? 'http://127.0.0.1:5000/api/signup' : 'http://127.0.0.1:5000/api/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                if (isSignup) {
                    setIsSignup(false);
                    alert('Signup successful! Please log in.');
                    setEmail('');
                    setPassword('');
                    setRole('Student'); // Reset to default after signup
                } else {
                    // Check if the role matches the credentials
                    if (data.role !== role) {
                        setError('Invalid credentials for the selected role.');
                    } else {
                        // Store the token and role in sessionStorage
                        sessionStorage.setItem('authToken', data.token);
                        sessionStorage.setItem('userRole', role);  // Store the role here
                        onLogin(data.token, role);  // Pass token and role to onLogin handler

                        // Redirect based on role
                        navigate(role === 'Admin' ? '/admin' : '/');
                    }
                }
            } else {
                // If response status is not ok, display the error message from the server
                setError(data.message || 'Invalid credentials, please try again.');
            }
        } catch (error) {
            // Handle network errors or unreachable server
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="login-page">
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {/* Role selection for both signup and login */}
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                </select>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Login here' : 'Sign up here'}
                </span>
            </p>
        </div>
    );
};

export default LoginPage;
