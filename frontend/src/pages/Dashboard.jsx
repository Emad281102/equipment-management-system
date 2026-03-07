import React, { useEffect, useState } from "react";

import EquipmentTable from "../components/EquipmentTable";
import EquipmentForm from "../components/EquipmentForm";
import MaintenanceModal from "../components/MaintenanceModal";
import MaintenanceHistoryModal from "../components/MaintenanceHistoryModal";

import {
  getEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  addMaintenance,
  getMaintenance
} from "../services/api";

const Dashboard = () => {

  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [mode, setMode] = useState("add");

  const [maintenanceEquipment, setMaintenanceEquipment] = useState(null);

  const [historyLogs, setHistoryLogs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {

    setLoading(true);

    try {

      const data = await getEquipment();

      setEquipment(data);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);

  };

  const handleAddClick = () => {

    setMode("add");
    setSelectedEquipment(null);
    setShowForm(true);

  };

  const handleEdit = (item) => {

    setMode("edit");
    setSelectedEquipment(item);
    setShowForm(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this equipment?")) return;

    await deleteEquipment(id);

    fetchEquipment();

  };

  const handleFormSubmit = async (data) => {

    if (mode === "add") {

      await addEquipment(data);

    } else {

      await updateEquipment(selectedEquipment.id, data);

    }

    setShowForm(false);

    fetchEquipment();

  };

  /* -------------------------
     MAINTENANCE FUNCTIONS
  ------------------------- */

  const handleMaintenance = (equipment) => {

    setMaintenanceEquipment(equipment);

  };

  const handleMaintenanceSubmit = async (data) => {

    await addMaintenance(data);

    setMaintenanceEquipment(null);

    fetchEquipment();

  };

  const handleViewMaintenance = async (equipment) => {

    const logs = await getMaintenance(equipment.id);

    setHistoryLogs(logs);

    setShowHistory(true);

  };

  return (

    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Equipment Management

        </h1>

        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >

          Add Equipment

        </button>

      </div>

      <EquipmentTable
        equipment={equipment}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMaintenance={handleMaintenance}
        onViewMaintenance={handleViewMaintenance}
      />

      <EquipmentForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedEquipment}
        mode={mode}
      />

      {/* Maintenance Modal */}

      {maintenanceEquipment && (

        <MaintenanceModal
          equipment={maintenanceEquipment}
          onClose={() => setMaintenanceEquipment(null)}
          onSubmit={handleMaintenanceSubmit}
        />

      )}

      {/* Maintenance History Modal */}

      {showHistory && (

        <MaintenanceHistoryModal
          logs={historyLogs}
          onClose={() => setShowHistory(false)}
        />

      )}

    </div>

  );

};

export default Dashboard;