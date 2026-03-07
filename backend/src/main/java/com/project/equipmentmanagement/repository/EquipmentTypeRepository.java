package com.project.equipmentmanagement.repository;

import com.project.equipmentmanagement.entity.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
}