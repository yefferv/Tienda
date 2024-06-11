import { createContext } from 'react'

export interface IUser {
  id:string
  name:string
}

export interface AuthContextProps {
    login: (user: IUser)=> void
    logout: ()=> void
    isAuth : boolean
    user : IUser
  
}

export const AuthContext =  createContext({} as AuthContextProps)
