package com.project.equipmentmanagement.controller;

import com.project.equipmentmanagement.entity.MaintenanceLog;
import com.project.equipmentmanagement.entity.Equipment;
import com.project.equipmentmanagement.repository.MaintenanceLogRepository;
import com.project.equipmentmanagement.repository.EquipmentRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")

@CrossOrigin(origins = "http://localhost:5173")   // ⭐ THIS FIXES YOUR ERROR

public class MaintenanceController {

    private final MaintenanceLogRepository maintenanceRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceController(
            MaintenanceLogRepository maintenanceRepository,
            EquipmentRepository equipmentRepository) {

        this.maintenanceRepository = maintenanceRepository;
        this.equipmentRepository = equipmentRepository;
    }

    @PostMapping
    public MaintenanceLog addMaintenance(@RequestBody MaintenanceLog log) {

        Equipment equipment = equipmentRepository
                .findById(log.getEquipment().getId())
                .orElseThrow();

        equipment.setStatus("Active");
        equipment.setLastCleanedDate(log.getMaintenanceDate());

        log.setEquipment(equipment);

        equipmentRepository.save(equipment);

        return maintenanceRepository.save(log);
    }

    @GetMapping("/equipment/{id}")
    public List<MaintenanceLog> getMaintenance(@PathVariable Long id) {

        return maintenanceRepository.findByEquipmentId(id);
    }
}