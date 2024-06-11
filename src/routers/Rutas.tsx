import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import DetalleProducto from '../page/DetalleProducto'
import Home from '../page/Home'
import DetalleCarrito from '../page/DetalleCarrito'
import { useEffect, useState } from 'react'
import Login from '../page/Login/Login'
import Admin from '../page/Admin'
import PrivateRouter from './PrivateRouter'
import PaymentProvider from '../store/payment/PaymentProvider'


const Rutas = () => {
  const location = useLocation();

  useEffect(() => {
  }, [location]);


  return (
        <Switch>
          <>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin">
              <PrivateRouter>
               <Admin />
              </PrivateRouter>
            </Route>
            <Route exact path="/">
                <Home />                
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/detalles/:slug">
              <DetalleProducto/>
            </Route>
            <Route exact path="/carrito">
              <DetalleCarrito/>
            </Route>
            
          </>  
        
        </Switch>
  )
}

export default Rutas
