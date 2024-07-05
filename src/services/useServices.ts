import { useReducer } from "react";
import { TypeActions, initialState, reducer } from "./clients/reducerService";
import AxiosClient from "./clients/AxiosClient";
import { Product } from "../types/Product";
import { v4 as uuidv4 } from 'uuid';

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
  const transformedProducts = products.map(transformProduct);
  return transformedProducts;
};

const useServices = () => {
  const [state, dispach] = useReducer(reducer, initialState);

  const handleFetch = async () => {
    dispach({ type: TypeActions.LOADING, payload: true });
    try {
      const response = await AxiosClient("products");
      
      dispach({ type: TypeActions.SUCCESS_DATA, payload: transformProducts(response.data) });
    } catch (error) {
      dispach({ type: TypeActions.ERROR, payload: error });
    } finally {
      dispach({ type: TypeActions.LOADING, payload: false });
    }
  };

  const handleFetchbyId = async ({ id }: { id: string }) => {
    dispach({ type: TypeActions.LOADING, payload: true });
    try {
      const response = await AxiosClient(`products/${id}`);
      dispach({ type: TypeActions.SUCCESS_DATA_BY_ID, payload: transformProduct(response.data) });
    } catch (error) {
      dispach({ type: TypeActions.ERROR, payload: error });
    } finally {
      dispach({ type: TypeActions.LOADING, payload: false });
    }
  };

  const handleCreateProduct = async (product: Product) => {
    dispach({ type: TypeActions.LOADING, payload: true });
    try {
      console.log('producto a crear=',product)
      const response = await AxiosClient.post("products", product);
      console.log('response=',product)
      dispach({ type: TypeActions.SUCCESS_DATA, payload: transformProducts([response.data, ...state.data]) });
    } catch (error) {
      dispach({ type: TypeActions.ERROR, payload: error });
    } finally {
      dispach({ type: TypeActions.LOADING, payload: false });
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    dispach({ type: TypeActions.LOADING, payload: true });
    try {
      const response = await AxiosClient.put(`products/${product.id}`, product);
      const updatedProducts = state.data.map((p) => (p.id === product.id ? transformProduct(response.data) : p));
      dispach({ type: TypeActions.SUCCESS_DATA, payload: updatedProducts });
    } catch (error) {
      dispach({ type: TypeActions.ERROR, payload: error });
    } finally {
      dispach({ type: TypeActions.LOADING, payload: false });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    dispach({ type: TypeActions.LOADING, payload: true });
    try {
      await AxiosClient.delete(`products/${id}`);
      const updatedProducts = state.data.filter((product) => product.id !== id);
      dispach({ type: TypeActions.SUCCESS_DATA, payload: updatedProducts });
    } catch (error) {
      dispach({ type: TypeActions.ERROR, payload: error });
    } finally {
      dispach({ type: TypeActions.LOADING, payload: false });
    }
  };

  return {
    handleFetch,
    handleFetchbyId,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    state,
  };
};

export default useServices;
