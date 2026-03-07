CREATE TABLE equipment_types (
                                 id SERIAL PRIMARY KEY,
                                 name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE equipment (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(150) NOT NULL,
                           type_id INTEGER NOT NULL,
                           status VARCHAR(50) NOT NULL,
                           last_cleaned_date DATE,
                           FOREIGN KEY(type_id) REFERENCES equipment_types(id)
);

CREATE TABLE maintenance_logs (
                                  id SERIAL PRIMARY KEY,
                                  equipment_id INTEGER NOT NULL,
                                  maintenance_date DATE NOT NULL,
                                  notes TEXT,
                                  performed_by VARCHAR(100),
                                  FOREIGN KEY(equipment_id) REFERENCES equipment(id)
);