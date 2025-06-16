import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../common/api';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API endpoint for signin
            const response = await apiClient.post('/auth/signin', {
                username: formData.email,
                password: formData.password,
            });
            // In a real app, you would save the token from response.headers['x-auth-token']
            // and user role to localStorage/context.
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            navigate('/'); // Redirect to products page on successful sign in
        } catch (error) {
            alert('Login failed. Check your credentials.');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="xs" className="login-container">
            <Box className="login-box">
                <Typography variant="h5">Sign In</Typography>
                <form onSubmit={handleSubmit}>
                    {/* Form fields as specified: Email & Password  */}
                    <TextField name="email" type="email" label="Email Address *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="password" type="password"label="Password *" fullWidth margin="normal" onChange={handleChange} required />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
                </form>
                <Typography align="center" style={{ marginTop: '1rem' }}>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;