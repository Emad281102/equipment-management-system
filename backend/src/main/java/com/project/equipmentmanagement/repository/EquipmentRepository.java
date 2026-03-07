package com.project.equipmentmanagement.repository;

import com.project.equipmentmanagement.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}