import React, { useContext, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import HomeLayaout from './HomeLayaout'
import { ProductProvider } from '../store/product/ProductContext'
import { Container, Typography } from '@mui/material'
import AddProduct from './Product/AddProduct'
import ProductList from './Product/ProductList'
import { Product } from '../types/Product'
import EditProduct from './Product/EditProduct'
import { useHistory } from 'react-router-dom'
import { PaymentContext } from '../store/payment/PaymentContext'

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const {products} = useContext(PaymentContext)

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };
  const history = useHistory()

  const handlePayment = () => {
    history.push({ pathname: '/carrito', state: { products } });
  };


  return (
    <ProductProvider>
      <div>
      <HomeLayaout handlePayment = {handlePayment} onSearch={()=>{}}>
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
