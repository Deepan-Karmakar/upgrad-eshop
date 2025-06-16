import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProductCard.css';

const ProductCard = ({ product, userRole, onDelete }) => {
    const navigate = useNavigate();
    const isAdmin = userRole === 'admin';

    const handleBuy = () => {
        navigate(`/products/${product.id}`); // On click of a 'Buy' button, a user routes to the product details page
    };

    const handleEdit = () => {
        navigate(`/modify-product/${product.id}`); // When the edit icon is clicked, the Modify product page is displayed
    };

    return (
        <Card className="product-card">
            <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.imageUrl}
                title={product.name}
            />
            <CardContent>
                <Box className="product-title">
                    <Typography gutterBottom variant="h6" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        ₹ {product.price}
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions className="card-actions">
                <Button variant="contained" color="primary" onClick={handleBuy}>
                    Buy
                </Button>
                {isAdmin && ( /* Modify/Delete icons are present in the product card for Admin */
                    <Box>
                        <IconButton aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => onDelete(product)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;