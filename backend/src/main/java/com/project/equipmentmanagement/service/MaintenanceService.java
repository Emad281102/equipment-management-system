package com.project.equipmentmanagement.service;

import com.project.equipmentmanagement.entity.Equipment;
import com.project.equipmentmanagement.entity.MaintenanceLog;
import com.project.equipmentmanagement.repository.EquipmentRepository;
import com.project.equipmentmanagement.repository.MaintenanceLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceLogRepository maintenanceLogRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceService(MaintenanceLogRepository maintenanceLogRepository,
                              EquipmentRepository equipmentRepository) {
        this.maintenanceLogRepository = maintenanceLogRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public MaintenanceLog addMaintenance(MaintenanceLog log) {

        Equipment equipment = equipmentRepository.findById(log.getEquipment().getId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        // BUSINESS RULE
        equipment.setStatus("Active");
        equipment.setLastCleanedDate(log.getMaintenanceDate());

        equipmentRepository.save(equipment);

        log.setEquipment(equipment);

        return maintenanceLogRepository.save(log);
    }

    public List<MaintenanceLog> getMaintenanceHistory(Long equipmentId) {
        return maintenanceLogRepository.findByEquipmentId(equipmentId);
    }
}