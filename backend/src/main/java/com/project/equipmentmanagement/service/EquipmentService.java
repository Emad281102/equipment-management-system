package com.project.equipmentmanagement.service;

import com.project.equipmentmanagement.entity.Equipment;
import com.project.equipmentmanagement.entity.EquipmentType;
import com.project.equipmentmanagement.repository.EquipmentRepository;
import com.project.equipmentmanagement.repository.EquipmentTypeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;

    public EquipmentService(
            EquipmentRepository equipmentRepository,
            EquipmentTypeRepository equipmentTypeRepository
    ) {
        this.equipmentRepository = equipmentRepository;
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    // GET ALL EQUIPMENT
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    // ADD EQUIPMENT
    public Equipment addEquipment(Equipment equipment) {

        if (equipment.getType() != null && equipment.getType().getId() != null) {

            EquipmentType type = equipmentTypeRepository
                    .findById(equipment.getType().getId())
                    .orElseThrow(() -> new RuntimeException("Equipment type not found"));

            equipment.setType(type);
        }

        validateCleaningRule(equipment);

        return equipmentRepository.save(equipment);
    }

    // UPDATE EQUIPMENT
    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {

        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        equipment.setName(updatedEquipment.getName());
        equipment.setStatus(updatedEquipment.getStatus());
        equipment.setLastCleanedDate(updatedEquipment.getLastCleanedDate());

        if (updatedEquipment.getType() != null && updatedEquipment.getType().getId() != null) {

            EquipmentType type = equipmentTypeRepository
                    .findById(updatedEquipment.getType().getId())
                    .orElseThrow(() -> new RuntimeException("Equipment type not found"));

            equipment.setType(type);
        }

        validateCleaningRule(equipment);

        return equipmentRepository.save(equipment);
    }

    // DELETE EQUIPMENT
    public void deleteEquipment(Long id) {

        if (!equipmentRepository.existsById(id)) {
            throw new RuntimeException("Equipment not found");
        }

        equipmentRepository.deleteById(id);
    }

    // BUSINESS RULE VALIDATION
    private void validateCleaningRule(Equipment equipment) {

        if ("Active".equalsIgnoreCase(equipment.getStatus())) {

            LocalDate lastCleaned = equipment.getLastCleanedDate();

            if (lastCleaned != null && lastCleaned.isBefore(LocalDate.now().minusDays(30))) {

                throw new RuntimeException(
                        "Equipment cannot be Active if last cleaned date is older than 30 days"
                );
            }
        }
    }

}