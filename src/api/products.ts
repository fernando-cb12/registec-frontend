import api from "./index";
import { Product } from "my-types";

export const getProducts = async () => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const createProduct = async (product: Product) => {
  try {
    const response = await api.post<Product>("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const updateProduct = async (product: Product) => {
  try {
    const response = await api.put<Product>(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
export const getProductById = async (id: number) => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
