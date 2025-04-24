declare module "my-types" {
  export type User = {
    id: number;
    name: string;
    email: string;
  };
  export type Product = {
    id: number;
    name: string;
    identifier: number;
    price: number;
    stock: number;
    category: string;
  };
  export type Supplier = {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
  };
  export type NewProduct = Omit<Product, "id">;
  export type NewSupplier = Omit<Supplier, "id">;
}
