import React from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { products, deleteProduct } = useProductContext();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Categoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(product)} variant="contained" color="primary">
                  Editar
                </Button>
                <Button onClick={() => deleteProduct(product.id)} variant="contained" color="secondary">
                  Borrar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;