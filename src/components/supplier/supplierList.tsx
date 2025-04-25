import { Supplier } from "my-types";
import { useState, useEffect } from "react";
import NewSupplierModal from "./newSupplierModal";
import EditSupplierModal from "./EditSupplierModal";
import { getSuppliers, deleteSupplier } from "../../api/supplier";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError("Failed to load suppliers. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        setError(null);
        await deleteSupplier(id);
        setSuppliers((currentSuppliers) =>
          currentSuppliers.filter((supplier) => supplier.id !== id)
        );
      } catch (err) {
        setError("Failed to delete supplier. Please try again later.");
        console.error("Error deleting supplier:", err);
      }
    }
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const handleNewModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleSupplierUpdated = (updatedSupplier: Supplier) => {
    setSuppliers((currentSuppliers) =>
      currentSuppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
  };

  const handleSupplierCreated = (newSupplier: Supplier) => {
    setSuppliers((currentSuppliers) => [...currentSuppliers, newSupplier]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier List</h1>
      </div>

      {isModalOpen && (
        <NewSupplierModal
          isOpen={isModalOpen}
          onClose={handleNewModalClose}
          onSupplierCreated={handleSupplierCreated}
        />
      )}

      {isEditModalOpen && selectedSupplier && (
        <EditSupplierModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          supplier={selectedSupplier}
          onSupplierUpdated={handleSupplierUpdated}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading suppliers...</p>
        </div>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    No suppliers found
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4">
                      {supplier.phoneNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4">{supplier.address || "N/A"}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <td colSpan={5} className="px-6 py-3">
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center justify-center w-full"
                    onClick={() => setIsModalOpen(true)}
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
