package com.project.equipmentmanagement.service;

import com.project.equipmentmanagement.entity.Equipment;
import com.project.equipmentmanagement.entity.EquipmentType;
import com.project.equipmentmanagement.repository.EquipmentRepository;
import com.project.equipmentmanagement.repository.EquipmentTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;

    public EquipmentService(
            EquipmentRepository equipmentRepository,
            EquipmentTypeRepository equipmentTypeRepository) {

        this.equipmentRepository = equipmentRepository;
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    // GET ALL
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    // ADD
    public Equipment addEquipment(Equipment equipment) {

        Long typeId = equipment.getType().getId();

        EquipmentType type = equipmentTypeRepository
                .findById(typeId)
                .orElseThrow(() -> new RuntimeException("Equipment type not found"));

        equipment.setType(type);
        equipment.setId(null);

        return equipmentRepository.save(equipment);
    }

    // UPDATE
    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {

        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        equipment.setName(updatedEquipment.getName());
        equipment.setStatus(updatedEquipment.getStatus());
        equipment.setLastCleanedDate(updatedEquipment.getLastCleanedDate());

        Long typeId = updatedEquipment.getType().getId();

        EquipmentType type = equipmentTypeRepository
                .findById(typeId)
                .orElseThrow(() -> new RuntimeException("Equipment type not found"));

        equipment.setType(type);

        return equipmentRepository.save(equipment);
    }

    // DELETE
    public void deleteEquipment(Long id) {

        if (!equipmentRepository.existsById(id)) {
            throw new RuntimeException("Equipment not found");
        }

        equipmentRepository.deleteById(id);
    }
}