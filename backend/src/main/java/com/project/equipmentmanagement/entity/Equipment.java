package com.project.equipmentmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String status;

    private LocalDate lastCleanedDate;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private EquipmentType type;

    public Equipment(){}

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public LocalDate getLastCleanedDate() { return lastCleanedDate; }

    public void setLastCleanedDate(LocalDate lastCleanedDate) {
        this.lastCleanedDate = lastCleanedDate;
    }

    public EquipmentType getType() { return type; }

    public void setType(EquipmentType type) { this.type = type; }
}