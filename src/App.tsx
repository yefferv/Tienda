import { ThemeProvider } from "@emotion/react"
import { theme } from "./styles/themes"
import {
  BrowserRouter as Router
} from "react-router-dom";
import Rutas from "./routers/Rutas";
import AuthProvider from "./Auth/AuthProvider";
import PaymentProvider from "./store/payment/PaymentProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
        <PaymentProvider> 
          <Rutas/>
        </PaymentProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
    
  )
}

export default App
