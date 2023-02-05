import { AddShoppingCartOutlined } from "@mui/icons-material";
import { config } from "../App";
import {
  CardActionArea,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import  React, {useState} from "react";
import "./ProductCard.css";
import {Grid} from "@mui/material";
import axios from "axios";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({ product, handleAddToCart }) => {
return (
  <Card className="card">
     <div role="img" aria-label="stars">
      <img src={product.image} aria-label="img" height="140" alt="not found"></img></div>
      <CardContent>
          <Typography  variant="h8">
            {product.name}
          </Typography> 
          <Typography  variant="h8">
          <br /><br />
            ${product.cost}
          </Typography>

        </CardContent>
       
        <Rating defaultValue={product.rating} />
        <CardActions>
        <Button className='card-button' variant='contained' size="big" color="primary" startIcon={<AddShoppingCartIcon />} style={{'width':'100%'}} onClick={handleAddToCart}>
          ADD TO CART
        </Button>
    </CardActions>
    </Card>
    
    
  );
  };

  export default ProductCard;
