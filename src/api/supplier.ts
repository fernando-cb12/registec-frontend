import api from "./";
import { NewSupplier, Supplier } from "my-types";

const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await api.get<{
      status: string;
      message: string;
      payload: Supplier[];
    }>("/supplier");
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};

const createSupplier = async (supplier: NewSupplier) => {
  try {
    const response = await api.post<Supplier>("/supplier", supplier);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
};

const updateSupplier = async (supplier: Supplier) => {
  try {
    const response = await api.patch<Supplier>(
      `/supplier/${supplier.id}`,
      supplier
    );
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
};
const deleteSupplier = async (id: number) => {
  try {
    const response = await api.delete<Supplier>(`/supplier/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
};

export { getSuppliers, createSupplier, updateSupplier, deleteSupplier };
