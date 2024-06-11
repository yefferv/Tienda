import { Product } from "../../types/Product"

export enum TypeActions {
  LOADING = 'LOADING',
  SUCCESS_DATA = 'SUCCESS_DATA',
  SUCCESS_DATA_BY_ID = 'SUCCESS_DATA_BY_ID',
  ERROR = 'ERROR'
}


interface  IState {
  data :Product[]
  dataById : Product | null
  loading: boolean
  error: any
}
export const initialState : IState =  {
  data : [],
  loading:false,
  error:null,
  dataById:null
}

type IAction = | {type:TypeActions.LOADING, payload: boolean}
| {type:TypeActions.SUCCESS_DATA, payload: Product[]}
| {type:TypeActions.SUCCESS_DATA_BY_ID, payload: Product}
| {type:TypeActions.ERROR, payload: any}

export const reducer = (state:IState, action : IAction) : IState => {
  switch (action.type) {
    case TypeActions.LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case TypeActions.SUCCESS_DATA:
      return {
        ...state,
        data: action.payload
      };
    case TypeActions.SUCCESS_DATA_BY_ID:
      return {
        ...state,
        dataById: action.payload
      };
    case TypeActions.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}