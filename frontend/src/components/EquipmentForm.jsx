import React, { useState, useEffect } from "react";

const EQUIPMENT_TYPES = [
  { id: 1, name: "Compounding Vessel" },
  { id: 2, name: "Filtration Vessel" },
  { id: 3, name: "Autoclave" },
  { id: 4, name: "Weighing Balance" },
  { id: 5, name: "Washing Machine" },
];

const EquipmentForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = "add",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    typeId: "",
    status: "Active",
    lastCleanedDate: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        typeId: initialData.type?.id || "",
        status: initialData.status || "Active",
        lastCleanedDate: initialData.lastCleanedDate || "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      type: {
        id: parseInt(formData.typeId),
      },
      status: formData.status,
      lastCleanedDate: formData.lastCleanedDate,
    };

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 shadow">

        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add Equipment" : "Edit Equipment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Equipment Name"
            className="border p-2 w-full"
            value={formData.name}
            onChange={handleChange}
          />

          <select
            name="typeId"
            className="border p-2 w-full"
            value={formData.typeId}
            onChange={handleChange}
          >
            <option value="">Select Type</option>

            {EQUIPMENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}

          </select>

          <select
            name="status"
            className="border p-2 w-full"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
            
          </select>

          <input
            type="date"
            name="lastCleanedDate"
            className="border p-2 w-full"
            value={formData.lastCleanedDate}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded"
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