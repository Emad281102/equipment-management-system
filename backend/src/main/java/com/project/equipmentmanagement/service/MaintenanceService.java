package com.project.equipmentmanagement.service;

import com.project.equipmentmanagement.entity.Equipment;
import com.project.equipmentmanagement.entity.MaintenanceLog;
import com.project.equipmentmanagement.repository.EquipmentRepository;
import com.project.equipmentmanagement.repository.MaintenanceLogRepository;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {

    private final MaintenanceLogRepository maintenanceRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceService(
            MaintenanceLogRepository maintenanceRepository,
            EquipmentRepository equipmentRepository) {

        this.maintenanceRepository = maintenanceRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public MaintenanceLog addMaintenance(MaintenanceLog log) {

        Equipment equipment = equipmentRepository
                .findById(log.getEquipment().getId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        equipment.setStatus("Active");
        equipment.setLastCleanedDate(log.getMaintenanceDate());

        equipmentRepository.save(equipment);

        return maintenanceRepository.save(log);
    }
}