import React, { useState } from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box, InputAdornment } from '@mui/material';


const initialProductState = {
  id: 0,
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0,
  },
  quantity: 0,
};

const AddProduct: React.FC = () => {
  const { addProduct } = useProductContext();
  const [product, setProduct] = useState<Omit<Product, 'id' | 'rating'>>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      ...product,
      id: Math.floor(Math.random() * 10000),
      rating: { rate: 0, count: 0 },
    };

    addProduct(newProduct);
    setProduct(initialProductState);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField label="Título" name="title" value={product.title} onChange={handleChange} />
      <TextField label="Precio" name="price" type="number" value={product.price} onChange={handleChange} InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputProps: { step: 0.01 },
        }}/>
      <TextField label="Descripción" name="description" value={product.description} onChange={handleChange} />
      <TextField label="Categoria" name="category" value={product.category} onChange={handleChange} />
      <TextField label="URL Imagen" name="image" value={product.image} onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Adicionar
      </Button>
    </Box>
  );
};

export default AddProduct;
