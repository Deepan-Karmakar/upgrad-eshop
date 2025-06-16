import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container, Box, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../common/api';
import './CreateOrder.css';

const steps = ['Items', 'Select Address', 'Confirm Order']; // A stepper menu that has 3 steps to place the order

const CreateOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, quantity } = location.state || {};

    const [activeStep, setActiveStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState({ name: '', contactNumber: '', street: '', city: '', state: '', landmark: '', zipcode: '' });

    useEffect(() => {
        if (activeStep === 1) {
            const fetchAddresses = async () => {
                const response = await apiClient.get('/addresses');
                setAddresses(response.data);
            };
            fetchAddresses();
        }
    }, [activeStep]);

    const handleNext = () => {
        if (activeStep === 1 && !selectedAddress) {
            alert('Please select address!'); // Error message if user tries to proceed without selecting an address
            return;
        }
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSaveAddress = async () => {
        try {
            await apiClient.post('/addresses', newAddress); // An API call is made to add the address
            alert('Address saved successfully!');
            const response = await apiClient.get('/addresses'); // Re-fetch addresses
            setAddresses(response.data);
            setNewAddress({ name: '', contactNumber: '', street: '', city: '', state: '', landmark: '', zipcode: '' }); // Clear form
        } catch (error) {
            alert('Failed to save address.');
        }
    };

    const handleConfirmOrder = async () => {
        try {
            await apiClient.post('/orders', {
                product: product.id,
                address: selectedAddress.id,
                quantity: parseInt(quantity)
            });
            alert('Order placed successfully!'); // Message displayed after order is placed
            navigate('/'); // On clicking the Place order button, the user is redirected to the products page
        } catch (error) {
            alert('Failed to place order.');
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0: // The first step displays the item that the customer wants to order
                return (
                    <Box>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography>Quantity: {quantity}</Typography>
                        <Typography>Category: {product.category}</Typography>
                        <Typography>Description: {product.description}</Typography>
                        <Typography variant="h5" color="secondary">Total Price: ₹ {product.price * quantity}</Typography>
                    </Box>
                );
            case 1: // The second step adds the address
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Select Address</InputLabel>
                                <Select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                                    {addresses.map(addr => (
                                        <MenuItem key={addr.id} value={addr}>{addr.name} - {addr.street}, {addr.city}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}><Typography variant="h6" align="center">-OR-</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h6">Add Address</Typography></Grid>
                        {/* Form to capture user address */}
                        <Grid item xs={12}><TextField label="Name" value={newAddress.name} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="Contact Number" value={newAddress.contactNumber} onChange={(e) => setNewAddress({...newAddress, contactNumber: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="Street" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="City" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="State" value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="Landmark" value={newAddress.landmark} onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><TextField label="Zip Code" value={newAddress.zipcode} onChange={(e) => setNewAddress({...newAddress, zipcode: e.target.value})} fullWidth/></Grid>
                        <Grid item xs={12}><Button variant="contained" onClick={handleSaveAddress}>Save Address</Button></Grid>
                    </Grid>
                );
            case 2: // The third step is to review the order
                const address = selectedAddress;
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">{product.name}</Typography>
                            <Typography>Quantity: {quantity}</Typography>
                            <Typography>Category: {product.category}</Typography>
                            <Typography variant="h6" color="secondary">Total Price: ₹ {product.price * quantity}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                             <Typography variant="h5">Address Details:</Typography>
                             <Typography>{address.name}</Typography>
                             <Typography>Contact Number: {address.contactNumber}</Typography>
                             <Typography>{address.street}, {address.city}</Typography>
                             <Typography>{address.state} - {address.zipcode}</Typography>
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

    if (!product) {
        return <Typography>No product selected for order. Please go back to the products page and select 'Buy'.</Typography>;
    }

    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>
            <Box mt={4} p={3} border={1} borderRadius={4}>
                {getStepContent(activeStep)}
                <Box mt={4} display="flex" justifyContent="space-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleConfirmOrder}>Place Order</Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default CreateOrder;