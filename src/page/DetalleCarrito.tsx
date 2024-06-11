import { useContext, useEffect, useState } from 'react'
import HomeLayaout from './HomeLayaout'
import { Box, Button, Container, Grid } from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'
import { Product } from '../types/Product';
import useApi from './hook/useApi';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import CrCard from '../components/CrCard';
import { PaymentContext } from '../store/payment/PaymentContext';
import CrModal from '../components/CrModal';
import imgbancolombia  from "../assets/Bancolombia.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




interface LocationState {
    addCardPayment?: Product[]; // Definir el tipo de addCardPayment como un arreglo de Product
  }


const DetalleCarrito = () => 
  {

    const {setProduct,removeProduct, clearProducts ,products} = useContext(PaymentContext)
    
    const [open, setOpen] = useState(false);
    
    const history = useHistory()

    const handleRetornarHome = () => {
        history.push('/home')
      };

    const handleRemoverProducts = () => {
      toast.success("El pago se realizó correctamente", {
        position: "bottom-center",
        autoClose: 1000 ,
        onClose: () => {
          clearProducts()
          handleRetornarHome()
        }
      });
    };


    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleCancelar= () => {
      setOpen(false);
    };
    
    const totalPrecio: number = parseFloat(
      products.reduce((total, producto) => total + (producto.price * producto.quantity), 0).toFixed(2)
    );

    useEffect(() => {
      if (products.length === 0) {
        history.push('/home');
      }
    }, [products, history]);
            
    return (
        <HomeLayaout handlePayment = {()=>{ }}>
            <Box mt={5} display={'flex'} gap={2} justifyContent={'center'} >
                <Button>TOTAL = {totalPrecio}</Button>
                <Button variant="contained" onClick={handleClickOpen}>Pagar</Button>
                <Button variant="contained" onClick={handleRetornarHome}>Retornar</Button>
                <CrModal open={open} handleClose={handleRemoverProducts} handleCancelar={handleCancelar} title={"Desea continuar con el proceso de pago?"} description={"Valor a pagar: $" + totalPrecio} image={"src/assets/pse.jpg"} nombreButton= {"Realizar Pago"} nombreButtonCancelar= {"Cancelar"} puedeCancelar={true}></CrModal>
                <ToastContainer />
            </Box>
            <Container maxWidth="lg">
                <Box mt={5} display={'flex'} gap={2} >
                    
                    <Grid container spacing={2}>
                    {products.map((item : any)=>
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={4}>
                        <CrCard item = {item} handleAddCard = {setProduct}  isVisible = {false}/>
                        </Grid>
                    )}
                    
                    </Grid>
                </Box>
        </Container>

    
        </HomeLayaout>
)}

export default DetalleCarrito
