export default function NewProductModal() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form>
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
                type="text"
                id="product-identifier"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter product identifier"
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
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter product price"
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
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter product stock"
              />
            </div>
            <div className="mb-4 text-left">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="product-category"
              >
                Category{" "}
              </label>
              <select
                id="product-category"
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                defaultValue=""
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
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}