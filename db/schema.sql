-- =====================================
-- Equipment Management System Database
-- =====================================

-- Equipment Type Table
CREATE TABLE IF NOT EXISTS equipment_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    last_cleaned_date DATE,
    type_id INTEGER,
    CONSTRAINT fk_equipment_type
        FOREIGN KEY (type_id)
        REFERENCES equipment_type(id)
        ON DELETE SET NULL
);

-- Maintenance Log Table
CREATE TABLE IF NOT EXISTS maintenance_log (
    id SERIAL PRIMARY KEY,
    maintenance_date DATE NOT NULL,
    notes TEXT,
    performed_by VARCHAR(255),
    equipment_id INTEGER,
    CONSTRAINT fk_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES equipment(id)
        ON DELETE CASCADE
);