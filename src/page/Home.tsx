import CrCard from "../components/CrCard"
import { Box, Button, Container, Grid } from "@mui/material";
import HomeLayaout from "./HomeLayaout";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import { useContext, useEffect, useState } from "react";
import { Product } from "../types/Product";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import useServices from "../services/useServices";
import { PaymentContext } from "../store/payment/PaymentContext";
import useApi from "./hook/useApi";



const Home = () => {
  const {user} = useContext(AuthContext)
  const {setProduct,removeProduct, products} = useContext(PaymentContext)
  //const {data, loading} = useApi(import.meta.env.VITE_API_URL)
  
  const {state} = useApi()

  

  if (state.error) {
    return (
      <div>
        <h1>Error</h1>
      </div>

    )
  }

  //const [addCardPayment, setAddCardPayment] = useState<Product[]>([])

  const handleAddCard = (product: Product) => {
    const existingIndex = products.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      removeProduct(product.id);
    } else {
      setProduct(product)
    }

    console.log("arreglo =>",products)
  }

  const history = useHistory();

  const handlePayment = () =>{
    history.push({pathname :'/carrito', state: { products }})
  }

  return (
    <HomeLayaout handlePayment = {handlePayment}>
      <Container maxWidth="lg">
        <Box mt={5} display={'flex'} gap={2} >
            {state.loading?
            <CenteredCircularProgress />
            :
            
            <Grid container spacing={2}>
            {state.data.map((item : any)=>
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={4}>
                  <CrCard item = {item} handleAddCard = {handleAddCard}/>
                </Grid>
            )}
            </Grid>}
        </Box>
      </Container>

  
    </HomeLayaout>
    
  )
}

export default Home
