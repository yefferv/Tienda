import React, { useContext, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import HomeLayaout from './HomeLayaout';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import CrCard from '../components/CrCard';
import { Product } from '../types/Product';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { PaymentContext } from '../store/payment/PaymentContext';
import useApi from './hook/useApi';


const Home = () => {
  const { products, setProduct, removeProduct } = useContext(PaymentContext);
  const { state } = useApi();
  const [searchText, setSearchText] = useState('');

  const handleAddCard = (product: Product) => {
    const existingIndex = products.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      removeProduct(product.id);
    } else {
      setProduct(product);
    }
  };

  const history = useHistory();
  const handlePayment = () => {
    history.push({ pathname: '/carrito', state: { products } });
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredProducts = state.data.filter((product: Product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <HomeLayaout handlePayment={handlePayment} onSearch={handleSearch}>
      <Container maxWidth="lg">
        <Box mt={5} display="flex" gap={2}>
          {state.loading ? (
            <CenteredCircularProgress />
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.length > 0 && filteredProducts.map((item: Product) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={4}>
                  <CrCard item={item} handleAddCard={handleAddCard} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </HomeLayaout>
  );
};

export default Home;
