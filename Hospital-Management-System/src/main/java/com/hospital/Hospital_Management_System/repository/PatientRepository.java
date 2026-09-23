package com.hospital.Hospital_Management_System.repository;

import com.hospital.Hospital_Management_System.entity.Patient;
import com.hospital.Hospital_Management_System.enums.Disease;
import com.hospital.Hospital_Management_System.enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    List<Patient> findByNameContainingIgnoreCase(String name);
    List<Patient> findByDateOfRegistration(Date date);
    List<Patient> findByDateOfRegistrationAndDisease(Date date, Disease disease);

    List<Patient> findByDiseaseAndGenderAndBloodType(Disease disease, Gender gender, String bloodType);

    List<Patient> findByDisease(Disease disease);

    List<Patient> findByDiseaseAndGender(Disease disease, Gender gender);

    List<Patient> findByNameContainingIgnoreCaseAndDisease(String name, Disease disease);

    Optional<Patient> findByEmail(String email);

    @Query("""
            select count(distinct p.id)
            from Patient p
            where exists (
                select 1 from Appointment a
                where a.patient = p and a.doctor.id = :doctorId
            )
            or exists (
                select 1 from MedicalRecord r
                where r.patient = p and r.doctor.id = :doctorId
            )
            """)
    long countDistinctPatientsForDoctor(@Param("doctorId") Long doctorId);
}
