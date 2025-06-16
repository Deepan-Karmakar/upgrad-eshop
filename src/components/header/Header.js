import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Logo icon
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ userRole, onSearchChange }) => { // Assuming userRole and search handler are passed as props
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Placeholder for authentication status
    const isAdmin = userRole === 'admin';

    const handleLogout = () => {
        // Clear auth state here
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <AppBar position="fixed" className="app-bar"> {/* Background color #3f51b5 is the default primary color for Material-UI */}
            <Toolbar className="toolbar">
                <Box className="header-logo">
                    <ShoppingCartIcon />
                    <Typography variant="h6">upGrad E-Shop</Typography>
                </Box>

                {isLoggedIn && (
                    <Box className="search-bar">
                        <SearchIcon />
                        <InputBase placeholder="Search…" onChange={onSearchChange} />
                    </Box>
                )}

                <Box className="header-links">
                    {!isLoggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            {isAdmin && <Button color="inherit" component={Link} to="/add-product">Add Product</Button>} {/* 'Add Product' link for Admin  */}
                            <Button variant="contained" color="secondary" onClick={handleLogout}>LOGOUT</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;