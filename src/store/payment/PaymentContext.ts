import { createContext } from 'react'
import { Product } from '../../types/Product'

export interface IUser {
  id:string
  name:string
}

export interface PaymentContextProps {
    setProduct: (item: Product)=> void
    removeProduct: (productId: string)=> void
    updateProductQuantity: (id: string, quantity: number)=>void
    clearProducts: ()=> void
    products : Product[]
  
}

export const PaymentContext =  createContext({} as PaymentContextProps)
