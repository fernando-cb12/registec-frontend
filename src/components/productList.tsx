import { Product } from "my-types";
import { useState, useEffect } from "react";
import NewProductModal from "./newProductModal";
import EditProductModal from "./EditProductModal";
import { getProducts, deleteProduct } from "../api/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isNewModalOpen, setNewProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting a product
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setError(null);
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

  // Handler for editing a product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  // Handler for new modal close
  const handleNewModalClose = () => {
    setNewProductModal(false);
  };

  // Handler for edit modal close
  const handleEditModalClose = () => {
    setEditingProduct(null);
  };

  // Handler for product updates (both new and edit)
  const handleProductsUpdated = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  // Filter products by category
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
      </div>

      {isNewModalOpen && (
        <NewProductModal
          onClose={handleNewModalClose}
          onProductAdded={handleProductsUpdated}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={handleEditModalClose}
          onProductUpdated={handleProductsUpdated}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
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
            <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 grid">
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center">
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center w-full"
                    onClick={() => setNewProductModal(true)}
                  >
                    <span className="text-xl">+</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
