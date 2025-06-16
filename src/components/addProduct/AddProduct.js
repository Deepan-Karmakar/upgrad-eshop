import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../common/api';
import './AddProduct.css';
const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '', category: '', manufacturer: '', availableItems: '', price: '', imageUrl: '', description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/products', formData); // An API call is made to add the product
            alert(`Product ${formData.name} added successfully`); // Display success message on successful addition
            navigate('/');
        } catch (error) {
            alert('Failed to add product.');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={3}>
                <Typography variant="h4" align="center">Add Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField name="name" label="Name *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="category" label="Category *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="manufacturer" label="Manufacturer *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="availableItems" type="number" label="Available Items *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="price" type="number" label="Price *" fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="imageUrl" label="Image URL" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="description" label="Product Description" fullWidth margin="normal" multiline rows={4} onChange={handleChange} />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Save Product</Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddProduct;