const BASE = "http://localhost:8080/api";

// GET ALL EQUIPMENT
export const getEquipment = async () => {

  const res = await fetch(`${BASE}/equipment`);

  if (!res.ok) {
    throw new Error("Failed to fetch equipment");
  }

  return res.json();
};

// ADD EQUIPMENT
export const addEquipment = async (data) => {

  const res = await fetch(`${BASE}/equipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

};

// UPDATE EQUIPMENT
export const updateEquipment = async (id, data) => {

  const res = await fetch(`${BASE}/equipment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

};

// DELETE EQUIPMENT
export const deleteEquipment = async (id) => {

  const res = await fetch(`${BASE}/equipment/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete equipment");
  }

};

// GET EQUIPMENT TYPES
export const getEquipmentTypes = async () => {

  const res = await fetch(`${BASE}/equipment-types`);

  if (!res.ok) {
    throw new Error("Failed to fetch equipment types");
  }

  return res.json();
};

// GET MAINTENANCE LOGS
export const getMaintenance = async (equipmentId) => {

  const res = await fetch(`${BASE}/maintenance/equipment/${equipmentId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch maintenance logs");
  }

  return res.json();
};

// ADD MAINTENANCE
export const addMaintenance = async (data) => {

  const res = await fetch(`${BASE}/maintenance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add maintenance record");
  }

};