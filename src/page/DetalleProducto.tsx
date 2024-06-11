import { useEffect } from 'react'
import HomeLayaout from './HomeLayaout'
import { Button } from '@mui/material'
import { useHistory, useParams } from 'react-router-dom'
import useServices from '../services/useServices'


const DetalleProducto = () => 
  {
  const history = useHistory()
  const {state, handleFetchbyId} = useServices()

  interface Params {
    slug: string; 
  }

  const { slug } : Params = useParams()

  useEffect(() => {
    handleFetchbyId({id : slug})
  }, [slug]);
  
  return (
    <HomeLayaout handlePayment = {()=>{ }}>
      <div style={{
        display : 'flex',
        flexDirection :'column',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh'
        }}>

      <p>{ state.loading }</p>

      <h1>{ slug }</h1>
      <Button onClick={()=>history.push('/Home')}>ir atras {' '}
      </Button>
        
      </div>
    </HomeLayaout>
  )
}

export default DetalleProducto
