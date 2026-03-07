# Equipment Management System

A full-stack Equipment Management System built with **Spring Boot**, **React**, and **PostgreSQL**.

The application allows users to manage pharmaceutical manufacturing equipment, record maintenance activities, and monitor equipment cleaning status.

---

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

### Frontend
- React
- Vite
- Tailwind CSS

### Database
- PostgreSQL

---

## Features

### Equipment Management
The system supports full CRUD operations for equipment.

Users can:
- View all equipment
- Add new equipment
- Edit equipment details
- Delete equipment

Each equipment record includes:
- Equipment Name
- Equipment Type
- Status
- Last Cleaned Date

### Maintenance Logging

Maintenance records can be created for each piece of equipment.

Each maintenance record includes:
- Maintenance Date
- Notes
- Performed By

> Maintenance logs automatically update the **Last Cleaned Date** of the associated equipment.

### Business Rules

Equipment cannot be marked **Active** if the last cleaned date is older than **30 days**.

This validation is enforced in the backend service layer.

---

## Project Structure

```
equipment-management-system/
│
├── backend/                  # Spring Boot Application
├── frontend/                 # React Application
├── db/
│   ├── schema.sql
│   └── seed.sql
├── README.md
└── COMPLIANCE.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Emad281102/equipment-management-system
cd equipment-management-system
```

### 2. Setup Database

1. Open PostgreSQL using **pgAdmin** or the **psql terminal**.

2. Create the database:
```sql
CREATE DATABASE equipment_management;
```

3. Connect to the database:
```sql
\c equipment_management
```

4. Run the schema file to create tables:
```bash
\i db/schema.sql
```

This will create the following tables:
- `equipment_type`
- `equipment`
- `maintenance_log`

5. Run the seed file to insert initial data:
```bash
\i db/seed.sql
```

This will populate the `equipment_type` table with common pharmaceutical equipment types.

---

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

---

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Endpoints

### Equipment

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/equipment` | Fetch all equipment |
| `POST` | `/api/equipment` | Create new equipment |
| `PUT` | `/api/equipment/{id}` | Update equipment by ID |
| `DELETE` | `/api/equipment/{id}` | Delete equipment by ID |

### Maintenance

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/maintenance` | Create a maintenance log |
| `GET` | `/api/maintenance/equipment/{id}` | Get maintenance history for equipment |

### Equipment Types

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/equipment-types` | Fetch all equipment types |

---

## Author

**Mohammed Emadulla**