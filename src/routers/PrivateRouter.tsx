import { Redirect, Route, Switch } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'



interface PrivateRouterProps {
    children : React.ReactNode
  }
  
  const PrivateRouter = ({children}:PrivateRouterProps)=>{
    const {isAuth} =  useContext(AuthContext)
    return (isAuth ? children : <Redirect to='/login'/>)
  }
    

  export default  PrivateRouter
