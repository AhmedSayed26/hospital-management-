package com.hospital.Hospital_Management_System.repository;

import com.hospital.Hospital_Management_System.entity.MedicalReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalReportRepository extends JpaRepository<MedicalReport , Long> {
    List<MedicalReport> findByMedicalRecordId(Long recordId);

    List<MedicalReport> findByDoctorId(Long doctorId);

    List<MedicalReport> findByPatientId(Long patientId);

    long countByPatientId(Long patientId);

    List<MedicalReport> findTop3ByPatientIdOrderByReportDateDesc(Long patientId);

    List<MedicalReport> findTop3ByDoctorIdOrderByReportDateDesc(Long doctorId);
}
