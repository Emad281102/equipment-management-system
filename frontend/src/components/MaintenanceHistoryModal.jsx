const MaintenanceHistoryModal = ({ logs, onClose }) => {

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-[600px]">

        <h2 className="text-xl font-bold mb-4">
          Maintenance History
        </h2>

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Performed By</th>
            </tr>

          </thead>

          <tbody>

            {logs.map((log) => (

              <tr key={log.id}>

                <td className="border p-2">
                  {log.maintenanceDate}
                </td>

                <td className="border p-2">
                  {log.notes}
                </td>

                <td className="border p-2">
                  {log.performedBy}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="mt-4 text-right">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

};

export default MaintenanceHistoryModal;