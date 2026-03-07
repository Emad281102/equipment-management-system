import React, { useEffect, useState } from "react";
import { getEquipmentTypes } from "../services/api";

const EquipmentForm = ({ isOpen, onClose, onSubmit, initialData, mode }) => {

  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    typeId: "",
    status: "Inactive",
    lastCleanedDate: ""
  });

  useEffect(() => {

    getEquipmentTypes().then(setTypes);

    if (mode === "edit" && initialData) {

      setFormData({
        name: initialData.name,
        typeId: initialData.type?.id || "",
        status: initialData.status,
        lastCleanedDate: initialData.lastCleanedDate
      });

    }

  }, [initialData, mode]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const payload = {
      name: formData.name,
      status: formData.status,
      lastCleanedDate: formData.lastCleanedDate,
      type: { id: parseInt(formData.typeId) }
    };

    onSubmit(payload);

  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/30">

      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add Equipment" : "Edit Equipment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Equipment Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="typeId"
            value={formData.typeId}
            onChange={handleChange}
            className="border p-2 w-full"
          >

            <option value="">Select Type</option>

            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}

          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >

            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>

          </select>

          <input
            type="date"
            name="lastCleanedDate"
            value={formData.lastCleanedDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <div className="flex gap-2 justify-end">

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EquipmentForm;