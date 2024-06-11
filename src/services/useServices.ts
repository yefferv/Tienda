import { useReducer } from "react"
import { TypeActions, initialState, reducer } from "./clients/reducerService"
import AxiosClient from "./clients/AxiosClient"

const useServices = () => {
    const [state, dispach] = useReducer(reducer,initialState)

    const handleFetch = async () => {
      dispach({type:TypeActions.LOADING, payload: true})
      try {
        const response = await AxiosClient("products")
        dispach({type:TypeActions.SUCCESS_DATA, payload: response.data})
      } catch (error) {
        dispach({type:TypeActions.ERROR, payload: error})
      }finally{
        dispach({type:TypeActions.LOADING, payload: false})
      }
      
    }

    const handleFetchbyId = async ({id}:{id:string}) => {
      dispach({type:TypeActions.LOADING, payload: true})
      try {
        const response = await AxiosClient("products/" + id)
        dispach({type:TypeActions.SUCCESS_DATA_BY_ID, payload: response.data})      
      } catch (error) {
        dispach({type:TypeActions.ERROR, payload: error})
      }finally{
        dispach({type:TypeActions.LOADING, payload: false})
      }
      
    }


  return {
    handleFetch,
    handleFetchbyId,
    state
  }
}

export default useServices