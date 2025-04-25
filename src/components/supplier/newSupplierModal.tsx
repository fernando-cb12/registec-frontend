import { Supplier, NewSupplier } from "my-types";
import { useState, useEffect } from "react";
import { createSupplier } from "../../api/supplier";

export default function NewSupplierModal({
  isOpen,
  onClose,
  onSupplierCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSupplierCreated: (supplier: Supplier) => void;
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
    const newSupplier: NewSupplier = { name, address, phoneNumber };
    try {
      setIsSubmitting(true);
      setError(null);
      const createdSupplier = await createSupplier(newSupplier);
      onSupplierCreated(createdSupplier);
      onClose();
    } catch (err) {
      setError("Failed to create supplier. Please try again later.");
      console.error("Error creating supplier:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "supplier-name") setName(value);
    else if (id === "supplier-address") setAddress(value);
    else if (id === "supplier-phoneNumber") setPhoneNumber(value);
  };

  const handleClose = () => {
    setName("");
    setAddress("");
    setPhoneNumber("");
    setError(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAddress("");
      setPhoneNumber("");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Supplier</h2>
          <button
            onClick={handleClose}
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
              htmlFor="supplier-name"
            >
              Name
            </label>
            <input
              type="text"
              id="supplier-name"
              value={name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="supplier-address"
            >
              Address
            </label>
            <input
              type="text"
              id="supplier-address"
              value={address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter supplier address"
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="supplier-phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="supplier-phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="border border-gray-300 text-gray-700 rounded-md px-4 py-2"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
