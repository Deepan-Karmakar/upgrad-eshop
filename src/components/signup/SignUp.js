import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../common/api';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      // API endpoint for signup
      await apiClient.post('/auth/signup', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNumber: formData.contactNumber,
      });
      alert('Sign up successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Sign up failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" className="signup-container">
      <Box className="signup-box">
        <Typography variant="h5">Sign up</Typography>
        <form onSubmit={handleSubmit}>
          {/* Form fields as specified: First Name, Last Name, Email, Password, Confirm Password, Contact Number  */}
          <TextField name="firstName" label="First Name *" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="lastName" label="Last Name *" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="email" type="email" label="Email Address *" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="password" type="password" label="Password *" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="confirmPassword" type="password" label="Confirm Password *" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="contactNumber" label="Contact Number *" fullWidth margin="normal" onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
        </form>
        <Typography align="center" style={{ marginTop: '1rem' }}>
          <Link to="/login">Already have an account? Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;