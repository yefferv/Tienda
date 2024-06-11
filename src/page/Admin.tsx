import React, { useContext, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import HomeLayaout from './HomeLayaout'
import { ProductProvider } from '../store/product/ProductContext'
import { Container, Typography } from '@mui/material'
import AddProduct from './Product/AddProduct'
import ProductList from './Product/ProductList'
import { Product } from '../types/Product'
import EditProduct from './Product/EditProduct'

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  
  return (
    <ProductProvider>
      <div>
      <HomeLayaout handlePayment = {()=>{ }}>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Administración Productos
        </Typography>
        <AddProduct />
        <ProductList onEdit={handleEditProduct} />
        {editingProduct && (
          <EditProduct product={editingProduct} onCancel={handleCancelEdit} />
        )}
      </Container>
      </HomeLayaout>
      </div>
    </ProductProvider>
  )
}

export default Admin
