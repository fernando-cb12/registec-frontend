import { Product } from "my-types";
import { useState } from "react";
import NewProductModal from "./newProductModal";

export default function ProductList() {
  const [products] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {isModalOpen && <NewProductModal />}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <select className="border border-gray-300 rounded-md p-2 w-full">
                <option value="all">Filter</option>
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
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4">{product.identifier}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{product.category}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td colSpan={5} className="px-6 py-3 text-center">
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={() => setIsModalOpen(true)}
              >
                +
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
