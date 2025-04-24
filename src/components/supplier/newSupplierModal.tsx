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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
    const newSupplier: NewSupplier = { name, address, phoneNumber };
    try {
      const createdSupplier = await createSupplier(newSupplier);
      onSupplierCreated(createdSupplier);
      onClose();
    } catch (err) {
      setError("Failed to create supplier. Please try again later.");
      console.error("Error creating supplier:", err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "address") setAddress(value);
    else if (id === "phoneNumber") setPhoneNumber(value);
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
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Supplier</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleChange}
            required
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Supplier</button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
