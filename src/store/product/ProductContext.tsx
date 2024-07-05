import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../../types/Product'; 
import useApi from '../../page/hook/useApi';

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { createProduct, updateProduct, deleteProduct, fetchProducts, state } = useApi();

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
      setProducts(state.data);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setProducts(state.data);
  }, [state.data]);

  const addProduct = async (product: Product) => {
    setProducts([...products, product]);
    await createProduct(product);
    await fetchProducts();
  };

  const modifyProduct = async (updatedProduct: Product) => {
    await updateProduct(updatedProduct);
    await fetchProducts();
  };

  const removeProduct = async (id: string) => {
    await deleteProduct(id);
    
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct: modifyProduct, deleteProduct: removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
