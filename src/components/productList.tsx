import { Product } from "my-types";
import { useState, useEffect } from "react";
import NewProductModal from "./newProductModal";
import EditProductModal from "./EditProductModal";
import { getProducts, deleteProduct } from "../api/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        // Update the products list after deletion
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== id)
        );
      } catch (err) {
        setError("Failed to delete product. Please try again later.");
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleNewModalClose = () => {
    setIsNewModalOpen(false);
    // Refresh the product list after adding a new product
  };

  const handleEditModalClose = () => {
    setEditingProduct(null);
    // Refresh the product list after editing a product
  };

  // Only filter products if products is an array
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (selectedCategory === "all") return true;
        return product.category === selectedCategory;
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Inventory</h1>
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center"
          onClick={() => setIsNewModalOpen(true)}
        >
          <span className="mr-2">Add New Product</span>
          <span className="text-xl">+</span>
        </button>
      </div>

      {isNewModalOpen && <NewProductModal onClose={handleNewModalClose} />}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={handleEditModalClose}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Identifier
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="toys">Toys</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                  <option value="health">Health</option>
                  <option value="pet-supplies">Pet Supplies</option>
                  <option value="food">Food</option>
                </select>
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.identifier}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
