import React, { useReducer } from 'react'
import { AuthContext, AuthContextProps, IUser } from './AuthContext'
import { AuthReducer, initialvalues } from './AuthReducer'
import { types } from './types/types'


interface AuthProviderProps {
    children : React.ReactNode
}

const init = () =>{
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return {
        isAuth :!!user,
        user: user,
    }
}

const AuthProvider = ({children}: AuthProviderProps) => {

    const [AuthState,dispatch] = useReducer(AuthReducer, initialvalues, init) 
    
    const login = (user : IUser) => {
        const action = {
            type: types.login,
            payload:user
        }
        
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(action)
    } 
    const logout = () => {
        const action = {
            type: types.logout,
            payload:''
        }
        localStorage.removeItem('user')
        dispatch(action)
    }     
        
    return (
        <AuthContext.Provider value = {{...AuthState,login, logout,}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
