# Equipment Management System

This project is a full-stack Equipment Management System built using **Spring Boot, React, and PostgreSQL**.

The application allows users to manage pharmaceutical manufacturing equipment, record maintenance activities, and monitor equipment cleaning status.

The system provides equipment CRUD operations, maintenance logging, and maintenance history tracking.

---

# Technology Stack

## Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

## Frontend
- React
- Vite
- Tailwind CSS

## Database
- PostgreSQL

---

# Features

## Equipment Management
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

---

## Maintenance Logging

Maintenance records can be created for each equipment.

Each maintenance record includes:
- Maintenance Date
- Notes
- Performed By

Maintenance logs automatically update the **last cleaned date** of the equipment.

---

## Business Rules

The system enforces the following rule:

Equipment cannot be marked **Active** if the last cleaned date is older than **30 days**.

This validation is implemented in the backend service layer.

---

# Project Structure


equipment-management-system
│
├── backend
│ └── Spring Boot Application
│
├── frontend
│ └── React Application
│
├── db
│ ├── schema.sql
│ └── seed.sql
│
├── README.md
└── COMPLIANCE.md


---

# Setup Instructions

## 1 Clone Repository


git clone <put the url here>
cd equipment-management-system


---

## 2 Setup Database

1. Open PostgreSQL using **pgAdmin** or the **psql terminal**.

2. Create the database:


CREATE DATABASE equipment_management;


3. Connect to the database: \c equipment_management


4. Execute the schema file to create tables: db/schema.sql


This will create the following tables:

- equipment_type
- equipment
- maintenance_log

5. Insert initial equipment types: db/seed.sql


This will populate the **equipment_type** table with common pharmaceutical equipment types used in the system.

## 3 Run Backend

Navigate to backend folder:


cd backend


Run Spring Boot application: mvn spring-boot:run


Backend runs on: http://localhost:8080


---

## 4 Run Frontend

Navigate to frontend folder:


cd frontend


Install dependencies: npm install


Start development server: npm run dev


Frontend runs on: http://localhost:5173


---

# API Endpoints

## Equipment


GET /api/equipment
POST /api/equipment
PUT /api/equipment/{id}
DELETE /api/equipment/{id}


---

## Maintenance


POST /api/maintenance
GET /api/maintenance/equipment/{id}


---

## Equipment Types


GET /api/equipment-types


---

# Author

Mohammed Emadulla