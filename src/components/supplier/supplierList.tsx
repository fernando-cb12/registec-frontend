import { Supplier } from "my-types";
import { useState, useEffect } from "react";
import NewSupplierModal from "./newSupplierModal";
import EditSupplierModal from "./EditSupplierModal";
import { getSuppliers, deleteSupplier } from "../../api/supplier";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError("Failed to load suppliers. Please refresh the page.");
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Supplier
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="border px-4 py-2">{supplier.id}</td>
              <td className="border px-4 py-2">{supplier.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditSupplier(supplier)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSupplier(supplier.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
}
