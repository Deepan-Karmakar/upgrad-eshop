import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../common/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/products/${id}`); // An API call is made to fetch a specific product
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handlePlaceOrder = () => {
        navigate('/create-order', { state: { product, quantity } }); // There is a 'Place Order' button which routes to the create order page
    };

    if (!product) {
        return <CircularProgress />;
    }

    return (
        <Container className="details-container">
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography variant="caption" className="quantity-available">
                            Available Quantity: {product.availableItems}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Category: <strong>{product.category}</strong>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h5" color="secondary" gutterBottom>
                        ₹ {product.price}
                    </Typography>
                    <TextField
                        type="number"
                        label="Enter Quantity *"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        inputProps={{ min: 1, max: product.availableItems }}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        className="place-order-btn"
                    >
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;