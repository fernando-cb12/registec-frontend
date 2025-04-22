import api from "./index";
import { Product } from "my-types";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<{
      status: string;
      message: string;
      payload: Product[];
    }>("/product");

    return response.data.payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const createProduct = async (product: Product) => {
  try {
    const response = await api.post<Product>("/product", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const updateProduct = async (product: Product) => {
  try {
    const response = await api.patch<Product>(
      `/product/${product.id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete<Product>(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
