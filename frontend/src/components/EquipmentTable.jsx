import React, { useState, useEffect, useRef } from "react";

const EquipmentTable = ({
  equipment,
  loading,
  onEdit,
  onDelete,
  onMaintenance,
  onViewMaintenance
}) => {

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  if (!equipment || equipment.length === 0) {
    return <p className="text-gray-500 text-center">No equipment found</p>;
  }

  return (

    <div className="bg-white rounded-lg shadow border overflow-visible">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Last Cleaned</th>
            <th className="p-3 text-center">Actions</th>
          </tr>

        </thead>

        <tbody>

          {equipment.map((item) => (

            <tr key={item.id} className="border-t hover:bg-gray-50">

              <td className="p-3 font-medium">{item.name}</td>

              <td className="p-3">{item.type?.name}</td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    item.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              <td className="p-3">{item.lastCleanedDate}</td>

              <td className="p-3 text-center relative">

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.id ? null : item.id)
                  }
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  More
                </button>

                {openMenu === item.id && (

                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
                  >

                    <button
                      onClick={() => {
                        onEdit(item);
                        setOpenMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        onDelete(item.id);
                        setOpenMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        onMaintenance(item);
                        setOpenMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Maintenance
                    </button>

                    <button
                      onClick={() => {
                        onViewMaintenance(item);
                        setOpenMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      History
                    </button>

                  </div>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default EquipmentTable;