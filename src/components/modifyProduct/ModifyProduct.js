import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../common/api';
import './ModifyProduct.css';

const ModifyProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/products/${id}`);
                setFormData(response.data); // All the fields have prefilled values
            } catch (error) {
                console.error("Failed to fetch product", error);
                alert("Could not load product data.");
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put(`/products/${id}`, formData); // An API call is made to modify the product
            alert(`Product ${formData.name} modified successfully`); // On successful modification, display the message
            navigate('/');
        } catch (error) {
            alert('Failed to modify product.');
            console.error(error);
        }
    };

    if (!formData) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="sm">
            <Box mt={3}>
                <Typography variant="h4" align="center">Modify Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField name="name" label="Name *" value={formData.name} fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="category" label="Category *" value={formData.category} fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="manufacturer" label="Manufacturer *" value={formData.manufacturer} fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="availableItems" type="number" label="Available Items *" value={formData.availableItems} fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="price" type="number" label="Price *" value={formData.price} fullWidth margin="normal" onChange={handleChange} required />
                    <TextField name="imageUrl" label="Image URL" value={formData.imageUrl} fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="description" label="Product Description" value={formData.description} fullWidth margin="normal" multiline rows={4} onChange={handleChange} />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Modify Product</Button>
                </form>
            </Box>
        </Container>
    );
};

export default ModifyProduct;