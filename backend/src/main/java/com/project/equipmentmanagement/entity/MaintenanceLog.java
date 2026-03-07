package com.project.equipmentmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_logs")
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private LocalDate maintenanceDate;

    private String notes;

    private String performedBy;

    public MaintenanceLog() {}

    public Long getId() {
        return id;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public LocalDate getMaintenanceDate() {
        return maintenanceDate;
    }

    public String getNotes() {
        return notes;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public void setMaintenanceDate(LocalDate maintenanceDate) {
        this.maintenanceDate = maintenanceDate;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }
}