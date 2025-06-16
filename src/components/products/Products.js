import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import apiClient from '../../common/api';
import ProductCard from '../productCard/ProductCard';
import './Products.css';

const Products = ({ userRole, searchTerm }) => { // Receives userRole and searchTerm from App.js
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState('default');
    const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, product: null });

    // Fetch products and categories on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await apiClient.get('/products'); // API call to fetch the products
                setProducts(productsResponse.data);
                const categoriesResponse = await apiClient.get('/products/categories'); // API call to fetch categories
                setCategories(['ALL', ...categoriesResponse.data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Apply filters and sorting whenever dependencies change
    useEffect(() => {
        let processedProducts = [...products];

        // Filter by category
        if (selectedCategory !== 'ALL') {
            processedProducts = processedProducts.filter(p => p.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            processedProducts = processedProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort products
        switch (sortBy) {
            case 'priceHighToLow':
                processedProducts.sort((a, b) => b.price - a.price); // Products sorted in decreasing order of price
                break;
            case 'priceLowToHigh':
                processedProducts.sort((a, b) => a.price - b.price); // Products sorted in increasing order of price
                break;
            case 'newest':
                processedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Products sorted by latest
                break;
            default:
                // Default order is as received from backend
                break;
        }

        setFilteredProducts(processedProducts);
    }, [products, selectedCategory, sortBy, searchTerm]);


    const handleDeleteClick = (product) => {
        setDeleteConfirmation({ open: true, product: product }); // On clicking the delete icon, a dialog to confirm deletion should appear
    };

    const handleDeleteConfirm = async () => {
        const productToDelete = deleteConfirmation.product;
        if (productToDelete) {
            try {
                await apiClient.delete(`/products/${productToDelete.id}`); // API call to delete the product
                setProducts(products.filter(p => p.id !== productToDelete.id)); // The deleted product is not displayed on the UI
                alert(`Product ${productToDelete.name} deleted successfully`); // On confirming deletion, display success message
            } catch (error) {
                console.error("Error deleting product:", error);
                alert('Failed to delete product.');
            }
        }
        setDeleteConfirmation({ open: false, product: null });
    };

    const handleCategoryChange = (event, newCategory) => {
        if (newCategory !== null) {
            setSelectedCategory(newCategory);
        }
    };

    return (
        <div className="products-container">
            {/* Category Toggle Buttons */}
            <div className="filters-container">
                 <ToggleButtonGroup
                    value={selectedCategory}
                    exclusive
                    onChange={handleCategoryChange}
                    aria-label="product categories"
                >
                    {categories.map(category => (
                        <ToggleButton key={category} value={category} aria-label={category}>
                            {category}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>

            {/* Sort Dropdown */}
            <FormControl className="sort-by-form">
                <InputLabel>Sort By:</InputLabel>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                </Select>
            </FormControl>

            {/* Products Grid */}
            <Grid container spacing={3} className="products-grid">
                {filteredProducts.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product} userRole={userRole} onDelete={handleDeleteClick} />
                    </Grid>
                ))}
            </Grid>

             {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmation.open}
                onClose={() => setDeleteConfirmation({ open: false, product: null })}
            >
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="primary">OK</Button>
                    <Button onClick={() => setDeleteConfirmation({ open: false, product: null })} color="secondary">CANCEL</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Products;