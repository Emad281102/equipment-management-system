import { useState } from "react";

const EquipmentTable = ({
  equipment,
  loading,
  onEdit,
  onDelete,
  onMaintenance,
  onViewMaintenance
}) => {

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!equipment.length) {
    return <p>No equipment found.</p>;
  }

  return (

    <table className="w-full border mt-4">

      <thead className="bg-gray-200">

        <tr>

          <th className="p-3 border">Equipment Name</th>
          <th className="p-3 border">Type</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Last Cleaned</th>
          <th className="p-3 border">Actions</th>

        </tr>

      </thead>

      <tbody>

        {equipment.map((item) => (

          <tr key={item.id} className="text-center">

            <td className="border p-2">{item.name}</td>

            <td className="border p-2">
              {item.type?.name}
            </td>

            <td className="border p-2">

              <span className={`px-2 py-1 rounded text-sm ${
                item.status === "Active"
                  ? "bg-green-200"
                  : item.status === "Inactive"
                  ? "bg-red-200"
                  : "bg-yellow-200"
              }`}>
                {item.status}
              </span>

            </td>

            <td className="border p-2">
              {item.lastCleanedDate}
            </td>

            <td className="border p-2 flex gap-2 justify-center">

              <button
                onClick={() => onEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => onMaintenance(item)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Maintenance
              </button>

              <button
                onClick={() => onViewMaintenance(item)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                History
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );

};

export default EquipmentTable;