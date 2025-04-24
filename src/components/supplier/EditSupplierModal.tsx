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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
    if (!supplier) return;
    const updatedSupplier: Supplier = {
      ...supplier,
      name,
      address,
      phoneNumber,
    };
    try {
      const response = await updateSupplier(updatedSupplier);
      onSupplierUpdated(response);
      onClose();
    } catch (err) {
      setError("Failed to update supplier. Please try again later.");
      console.error("Error updating supplier:", err);
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
    if (isOpen && supplier) {
      setName(supplier.name);
      setAddress(supplier.address);
      setPhoneNumber(supplier.phoneNumber);
      setError(null);
    }
  }, [isOpen, supplier]);
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Supplier</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleChange} />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <button type="submit">Update Supplier</button>
        </form>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
