# UI and Assignment Compliance

This project follows the requirements specified in the assignment document.

---

# UI Implementation

The frontend UI is built using **React and Tailwind CSS**.

No inline CSS styles were used.

Reusable React components were implemented for:

- EquipmentTable
- EquipmentForm
- MaintenanceModal
- MaintenanceHistoryModal

The same form component is reused for both **Add** and **Edit** operations.

---

# Database Implementation

The system uses PostgreSQL as the database.

The following tables are implemented:

- equipment_type
- equipment
- maintenance_log

All equipment types are stored in the database and are not hardcoded.

---

# Backend Architecture

The backend follows a layered architecture:

Controller → Service → Repository → Database

Spring Boot REST APIs are used for communication between frontend and backend.

---

# Business Rules

The following rule is enforced:

Equipment cannot be marked **Active** if the last cleaned date exceeds **30 days**.

This validation is implemented in the backend service layer.

---

# Maintenance Tracking

Maintenance records are stored separately in the **maintenance_log** table.

When maintenance is performed:

- A new maintenance record is stored
- Equipment last cleaned date is updated
- Equipment status becomes Active

---

# Summary

All requirements mentioned in the assignment specification have been implemented including:

- Equipment CRUD operations
- Maintenance logging
- Maintenance history
- Database normalization
- REST API architecture
- Modular frontend components