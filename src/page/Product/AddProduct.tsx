import React, { useState } from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box } from '@mui/material';

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

  const handleSubmit = () => {
    const newProduct: Product = {
      ...product,
      id: Math.floor(Math.random() * 10000),
      rating: { rate: 0, count: 0 },
    };
    addProduct(newProduct);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField label="Título" name="title" value={product.title} onChange={handleChange} />
      <TextField label="Precio" name="price" type="number" value={product.price} onChange={handleChange} />
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
