package com.project.equipmentmanagement.repository;

import com.project.equipmentmanagement.entity.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {

    List<MaintenanceLog> findByEquipmentId(Long equipmentId);
}