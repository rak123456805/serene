import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setLoginError(false);
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                // Redirect to dashboard or home
                window.location.href = '/';
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError(true);
        }
    };

    return (
        <>
            <Navbar />
            
            {/* Login Section */}
            <section className="auth-section">
                <div className="auth-container">
                    <h2>Welcome Back</h2>
                    <p>Log in to continue your journey with Serene.</p>
                    {loginError && (
                        <div id="login-error">There is no account with this information.</div>
                    )}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="Enter your email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                placeholder="Enter your password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-options">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn-primary">Login</button>
                    </form>
                    <div className="auth-switch">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Login; 