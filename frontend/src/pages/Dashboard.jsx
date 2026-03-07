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
      alert("Failed to load equipment");

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

    try {

      await deleteEquipment(id);
      fetchEquipment();

    } catch (err) {

      alert("Unable to delete equipment");

    }

  };

  const handleFormSubmit = async (data) => {

    try {

      if (mode === "add") {

        await addEquipment(data);

      } else {

        await updateEquipment(selectedEquipment.id, data);

      }

      setShowForm(false);

      fetchEquipment();

    } catch (err) {

      alert(err.message);

    }

  };

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

  const total = equipment.length;
  const active = equipment.filter(e => e.status === "Active").length;
  const inactive = equipment.filter(e => e.status === "Inactive").length;

  return (

    <div className="max-w-6xl mx-auto p-8">

      {/* Header */}

      <div className="bg-blue-50 border rounded-lg p-6 mb-6 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Equipment Usage Log
          </h1>

          <p className="text-gray-600 mt-1">
            Monitor equipment status and track maintenance history
          </p>

        </div>

        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Equipment
        </button>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Equipment</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600">{active}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{inactive}</p>
        </div>

      </div>

      {/* Equipment Table */}

      <EquipmentTable
        equipment={equipment}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMaintenance={handleMaintenance}
        onViewMaintenance={handleViewMaintenance}
      />

      {/* Equipment Form */}

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

      {/* Maintenance History */}

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