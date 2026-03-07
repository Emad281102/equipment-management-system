import { useState } from "react";

const MaintenanceModal = ({ equipment, onClose, onSubmit }) => {

  const [form, setForm] = useState({
    maintenanceDate: "",
    notes: "",
    performedBy: ""
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      equipment: { id: equipment.id },
      maintenanceDate: form.maintenanceDate,
      notes: form.notes,
      performedBy: form.performedBy
    });

  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-4">
          Add Maintenance
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="date"
            className="border p-2 w-full"
            onChange={(e)=>
              setForm({...form,maintenanceDate:e.target.value})
            }
          />

          <input
            placeholder="Performed By"
            className="border p-2 w-full"
            onChange={(e)=>
              setForm({...form,performedBy:e.target.value})
            }
          />

          <textarea
            placeholder="Notes"
            className="border p-2 w-full"
            onChange={(e)=>
              setForm({...form,notes:e.target.value})
            }
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default MaintenanceModal;