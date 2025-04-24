import { useState } from "react";
import { createProduct, getProducts } from "../api/products";
import { Product, NewProduct } from "my-types";

interface NewProductModalProps {
  onClose: () => void;
  onProductAdded: (products: Product[]) => void;
}

export default function NewProductModal({
  onClose,
  onProductAdded,
}: NewProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    price: "",
    stock: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace("product-", "")]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.name ||
      !formData.identifier ||
      !formData.price ||
      !formData.stock ||
      !formData.category
    ) {
      setError("All fields are required");
      return;
    }

    // Validación de números válidos
    if (
      isNaN(parseInt(formData.identifier)) ||
      isNaN(parseFloat(formData.price)) ||
      isNaN(parseInt(formData.stock))
    ) {
      setError("Identifier, Price, and Stock must be valid numbers.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const productData: NewProduct = {
        name: formData.name,
        identifier: parseInt(formData.identifier),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
      };

      await createProduct(productData);

      const updatedProducts = await getProducts();
      onProductAdded(updatedProducts);
      onClose();
    } catch (err) {
      setError("Failed to create product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product-name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product-identifier"
            >
              Identifier
            </label>
            <input
              type="number"
              id="product-identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter product identifier"
              min="0"
            />
          </div>
          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product-price"
            >
              Price
            </label>
            <input
              type="number"
              id="product-price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter product price"
              step="0.01"
              min="0"
            />
          </div>
          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product-stock"
            >
              Stock
            </label>
            <input
              type="number"
              id="product-stock"
              value={formData.stock}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter product stock"
              min="0"
            />
          </div>
          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product-category"
            >
              Category
            </label>
            <select
              id="product-category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="toys">Toys</option>
              <option value="sports">Sports</option>
              <option value="beauty">Beauty</option>
              <option value="health">Health</option>
              <option value="pet-supplies">Pet Supplies</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="border border-gray-300 text-gray-700 rounded-md px-4 py-2"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
