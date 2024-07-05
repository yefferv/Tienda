import React from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { products, deleteProduct } = useProductContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell style={{ minWidth: 180 }}>Titulo</TableCell>
            <TableCell style={{ minWidth: 120 }}>Precio</TableCell>
            <TableCell style={{ minWidth: 250 }}>Descripción</TableCell>
            <TableCell style={{ minWidth: 180 }}>Categoría</TableCell>
            <TableCell style={{ minWidth: 250 }}>URL Imagen</TableCell>
            <TableCell style={{ minWidth: 140 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={uuidv4()}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.image}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button onClick={() => onEdit(product)} variant="contained" color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => deleteProduct(product.id)} variant="contained" color="secondary">
                    Borrar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
