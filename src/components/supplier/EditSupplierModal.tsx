import { Supplier } from "my-types";
import { useState, useEffect } from "react";
import { updateSupplier } from "../../api/supplier";

export default function EditSupplierModal({
  isOpen,
  onClose,
  supplier,
  onSupplierUpdated,
}: {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
  onSupplierUpdated: (supplier: Supplier) => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
    if (!supplier) return;

    try {
      setIsSubmitting(true);
      const updatedSupplier: Supplier = {
        ...supplier,
        name,
        address,
        phoneNumber,
      };
      const response = await updateSupplier(updatedSupplier);
      onSupplierUpdated(response);
      onClose();
    } catch (err) {
      setError("Failed to update supplier. Please try again later.");
      console.error("Error updating supplier:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "address") setAddress(value);
    else if (id === "phoneNumber") setPhoneNumber(value);
  };

  useEffect(() => {
    if (isOpen && supplier) {
      setName(supplier.name);
      setAddress(supplier.address);
      setPhoneNumber(supplier.phoneNumber);
      setError(null);
    }
  }, [isOpen, supplier]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Supplier</h2>
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
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter supplier name"
            />
          </div>

          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter supplier address"
            />
          </div>

          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter phone number"
            />
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
              {isSubmitting ? "Updating..." : "Update Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
