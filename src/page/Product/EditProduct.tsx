import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box, Modal } from '@mui/material';

interface EditProductProps {
  product: Product;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onCancel }) => {
  const { updateProduct } = useProductContext();
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const [open, setOpen] = useState(true);

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
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <TextField label="Título" name="title" value={updatedProduct.title} onChange={handleChange} />
        <TextField label="Precio" name="price" type="number" value={updatedProduct.price} onChange={handleChange} />
        <TextField label="Descripción" name="description" value={updatedProduct.description} onChange={handleChange} />
        <TextField label="Categoria" name="category" value={updatedProduct.category} onChange={handleChange} />
        <TextField label="URL Imagen" name="image" value={updatedProduct.image} onChange={handleChange} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProduct;
