import { useEffect } from "react";
import useServices from "../../services/useServices" // Asegúrate de importar correctamente el hook useServices

const useApi = () => {
  const { handleFetch, handleFetchbyId, state } = useServices();

  useEffect(()=>{
    handleFetch()
  },[])

  const fetchProducts = async () => {
    await handleFetch();
  };

  const fetchProductById = async (id:string) => {
    await handleFetchbyId({ id });
  };

  return {
    fetchProducts,
    fetchProductById,
    state,
  };
};

export default useApi;