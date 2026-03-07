package com.project.equipmentmanagement.controller;

import com.project.equipmentmanagement.entity.EquipmentType;
import com.project.equipmentmanagement.repository.EquipmentTypeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment-types")
@CrossOrigin(origins = "http://localhost:5173")
public class EquipmentTypeController {

    private final EquipmentTypeRepository equipmentTypeRepository;

    public EquipmentTypeController(EquipmentTypeRepository equipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    @GetMapping
    public List<EquipmentType> getTypes() {
        return equipmentTypeRepository.findAll();
    }

}