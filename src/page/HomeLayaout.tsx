import React from 'react'
import CrNavbar from '../components/CrNavbar'


interface Props {
    children : React.ReactNode
    handlePayment : () => void
}

const HomeLayaout = ({children, handlePayment}:Props) => {
  return (
    <>
      <CrNavbar handlePayment = {handlePayment}/>
      {children}
    </>
  )
}

export default HomeLayaout
