import { useEffect } from "react";
import useServices from "../../services/useServices"; // Asegúrate de importar correctamente el hook useServices
import { Product } from "../../types/Product";

const useApi = () => {
  const { handleFetch, handleFetchbyId, handleCreateProduct, handleUpdateProduct, handleDeleteProduct, state } = useServices();

  useEffect(() => {
    handleFetch();
  }, []);

  const fetchProducts = async () => {
    await handleFetch();
  };

  const fetchProductById = async (id: string) => {
    await handleFetchbyId({ id });
  };

  const createProduct = async (product: Product) => {
    await handleCreateProduct(product);
  };

  const updateProduct = async (product: Product) => {
    await handleUpdateProduct(product);
  };

  const deleteProduct = async (id: string) => {
    await handleDeleteProduct(id);
  };

  return {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    state,
  };
};

export default useApi;
