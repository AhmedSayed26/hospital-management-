package com.hospital.Hospital_Management_System.repository;

import com.hospital.Hospital_Management_System.entity.Appointment;
import com.hospital.Hospital_Management_System.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientId(Long patientId);

    long countByPatientIdAndStatusInAndDateGreaterThanEqual(
            Long patientId,
            Collection<AppointmentStatus> statuses,
            Date date);

    Optional<Appointment> findFirstByPatientIdAndStatusInAndDateGreaterThanEqualOrderByDateAsc(
            Long patientId,
            Collection<AppointmentStatus> statuses,
            Date date);

    long countByDoctorIdAndStatusNotAndDateGreaterThanEqualAndDateLessThan(
            Long doctorId,
            AppointmentStatus status,
            Date start,
            Date end);

    List<Appointment> findByDoctorIdAndStatusNotAndDateGreaterThanEqualAndDateLessThanOrderByDateAsc(
            Long doctorId,
            AppointmentStatus status,
            Date start,
            Date end);

    long countByDoctorIdAndStatus(Long doctorId, AppointmentStatus status);

    List<Appointment> findTop5ByDoctorIdAndStatusOrderByDateAsc(Long doctorId, AppointmentStatus status);
}
