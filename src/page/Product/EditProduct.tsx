import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box } from '@mui/material';

interface EditProductProps {
  product: Product;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onCancel }) => {
  const { updateProduct } = useProductContext();
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateProduct(updatedProduct);
    onCancel();
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField label="Título" name="title" value={updatedProduct.title} onChange={handleChange} />
      <TextField label="Precio" name="price" type="number" value={updatedProduct.price} onChange={handleChange} />
      <TextField label="Descripción" name="description" value={updatedProduct.description} onChange={handleChange} />
      <TextField label="Categoria" name="category" value={updatedProduct.category} onChange={handleChange} />
      <TextField label="URL Imagen" name="image" value={updatedProduct.image} onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar Cambios
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel}>
        Cancelar
      </Button>
    </Box>
  );
};

export default EditProduct;
