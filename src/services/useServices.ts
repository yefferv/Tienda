import { useReducer } from "react"
import { TypeActions, initialState, reducer } from "./clients/reducerService"
import AxiosClient from "./clients/AxiosClient"
import { Product } from "../types/Product";


const transformProduct = (product: any): Product => ({
  id: product._id || product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.image,
  rating: {
    rate: product.rating?.rate || 0,
    count: product.rating?.count || 0,
  },
  quantity: product.quantity || 1,
});

const transformProducts = (products: any[]): Product[] => {
  console.log('products--',products)
  const transformedProducts =  products.map(transformProduct);
  console.log('Nuevo--',transformedProducts)
  return transformedProducts
};

const useServices = () => {
    const [state, dispach] = useReducer(reducer,initialState)

    const handleFetch = async () => {
      dispach({type:TypeActions.LOADING, payload: true})
      try {
        const response = await AxiosClient("products")
        dispach({type:TypeActions.SUCCESS_DATA, payload: transformProducts(response.data)})
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
        dispach({type:TypeActions.SUCCESS_DATA_BY_ID, payload: transformProduct(response.data)})      
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