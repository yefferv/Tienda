import { types } from "./types/types"

type actionType = {
    type:string
    payload?:any
}

interface AuthReducerContextProps {
    isAuth:boolean
    user:{
        id:number
        name:string
    }
}


export const initialvalues:AuthReducerContextProps = {
    isAuth:false,
    user:{
        id:0,
        name:''
    }

}

export const AuthReducer = (state = initialvalues,action:actionType) =>{

    switch (action.type) {
        case types.login:            
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        case types.logout:            
            return {
                ...state,
                isAuth: false,
                user: null
            }
    
        default:
            return state;
    }
} 