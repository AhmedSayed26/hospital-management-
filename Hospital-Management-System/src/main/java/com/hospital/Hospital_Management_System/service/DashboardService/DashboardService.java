package com.hospital.Hospital_Management_System.service.DashboardService;

import com.hospital.Hospital_Management_System.dto.DashboardAppointmentDto;
import com.hospital.Hospital_Management_System.dto.DashboardPrescriptionDto;
import com.hospital.Hospital_Management_System.dto.DashboardReportDto;
import com.hospital.Hospital_Management_System.dto.DoctorDashboardDto;
import com.hospital.Hospital_Management_System.dto.PatientDashboardDto;
import com.hospital.Hospital_Management_System.entity.Appointment;
import com.hospital.Hospital_Management_System.entity.Doctor;
import com.hospital.Hospital_Management_System.entity.MedicalReport;
import com.hospital.Hospital_Management_System.entity.Patient;
import com.hospital.Hospital_Management_System.entity.Prescription;
import com.hospital.Hospital_Management_System.enums.AppointmentStatus;
import com.hospital.Hospital_Management_System.repository.AppointmentRepository;
import com.hospital.Hospital_Management_System.repository.MedicalRecordRepository;
import com.hospital.Hospital_Management_System.repository.MedicalReportRepository;
import com.hospital.Hospital_Management_System.repository.PatientRepository;
import com.hospital.Hospital_Management_System.repository.PrescriptionRepository;
import com.hospital.Hospital_Management_System.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService implements IDashboardService {

    private static final List<AppointmentStatus> UPCOMING_STATUSES = List.of(
            AppointmentStatus.PENDING,
            AppointmentStatus.CONFIRMED
    );

    private final AppointmentRepository appointmentRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicalReportRepository medicalReportRepository;
    private final PatientRepository patientRepository;
    private final RoomRepository roomRepository;

    @Override
    public PatientDashboardDto getPatientDashboard(Long patientId) {
        Date startOfToday = startOfToday();

        DashboardAppointmentDto nextAppointment = appointmentRepository
                .findFirstByPatientIdAndStatusInAndDateGreaterThanEqualOrderByDateAsc(
                        patientId,
                        UPCOMING_STATUSES,
                        startOfToday
                )
                .map(this::toAppointment)
                .orElse(null);

        List<DashboardPrescriptionDto> recentPrescriptions = prescriptionRepository
                .findTop3ByPatientIdOrderByIssueDateDesc(patientId)
                .stream()
                .map(this::toPrescription)
                .toList();

        List<DashboardReportDto> recentReports = medicalReportRepository
                .findTop3ByPatientIdOrderByReportDateDesc(patientId)
                .stream()
                .map(this::toReport)
                .toList();

        return PatientDashboardDto.builder()
                .upcomingAppointments(appointmentRepository.countByPatientIdAndStatusInAndDateGreaterThanEqual(
                        patientId,
                        UPCOMING_STATUSES,
                        startOfToday
                ))
                .medicalRecords(medicalRecordRepository.countByPatientId(patientId))
                .prescriptions(prescriptionRepository.countByPatientId(patientId))
                .reports(medicalReportRepository.countByPatientId(patientId))
                .nextAppointment(nextAppointment)
                .recentPrescriptions(recentPrescriptions)
                .recentReports(recentReports)
                .build();
    }

    @Override
    public DoctorDashboardDto getDoctorDashboard(Long doctorId) {
        Date startOfToday = startOfToday();
        Date startOfTomorrow = startOfTomorrow();

        List<DashboardAppointmentDto> todaySchedule = appointmentRepository
                .findByDoctorIdAndStatusNotAndDateGreaterThanEqualAndDateLessThanOrderByDateAsc(
                        doctorId,
                        AppointmentStatus.CANCELED,
                        startOfToday,
                        startOfTomorrow
                )
                .stream()
                .map(this::toAppointment)
                .toList();

        List<DashboardAppointmentDto> pendingList = appointmentRepository
                .findTop5ByDoctorIdAndStatusOrderByDateAsc(doctorId, AppointmentStatus.PENDING)
                .stream()
                .map(this::toAppointment)
                .toList();

        List<DashboardReportDto> recentReports = medicalReportRepository
                .findTop3ByDoctorIdOrderByReportDateDesc(doctorId)
                .stream()
                .map(this::toReport)
                .toList();

        Long availableBeds = roomRepository.sumAvailableBeds();
        Long totalBeds = roomRepository.sumTotalBeds();

        return DoctorDashboardDto.builder()
                .todayAppointments(appointmentRepository.countByDoctorIdAndStatusNotAndDateGreaterThanEqualAndDateLessThan(
                        doctorId,
                        AppointmentStatus.CANCELED,
                        startOfToday,
                        startOfTomorrow
                ))
                .pendingAppointments(appointmentRepository.countByDoctorIdAndStatus(
                        doctorId,
                        AppointmentStatus.PENDING
                ))
                .patients(patientRepository.countDistinctPatientsForDoctor(doctorId))
                .availableBeds(availableBeds == null ? 0 : availableBeds)
                .totalBeds(totalBeds == null ? 0 : totalBeds)
                .todaySchedule(todaySchedule)
                .pendingList(pendingList)
                .recentReports(recentReports)
                .build();
    }

    private DashboardAppointmentDto toAppointment(Appointment appointment) {
        Patient patient = appointment.getPatient();
        Doctor doctor = appointment.getDoctor();

        return DashboardAppointmentDto.builder()
                .id(appointment.getId())
                .date(appointment.getDate())
                .reason(appointment.getReason())
                .status(appointment.getStatus())
                .patientName(patient == null ? null : patient.getName())
                .doctorName(doctor == null ? null : doctor.getName())
                .build();
    }

    private DashboardPrescriptionDto toPrescription(Prescription prescription) {
        Doctor doctor = prescription.getDoctor();

        return DashboardPrescriptionDto.builder()
                .id(prescription.getId())
                .medicineDescription(prescription.getMedicineDescription())
                .issueDate(prescription.getIssueDate())
                .doctorName(doctor == null ? null : doctor.getName())
                .build();
    }

    private DashboardReportDto toReport(MedicalReport report) {
        Patient patient = report.getPatient();
        Doctor doctor = report.getDoctor();

        return DashboardReportDto.builder()
                .id(report.getId())
                .reportTitle(report.getReportTitle())
                .reportDate(report.getReportDate())
                .patientName(patient == null ? null : patient.getName())
                .doctorName(doctor == null ? null : doctor.getName())
                .build();
    }

    private Date startOfToday() {
        ZoneId zone = ZoneId.systemDefault();
        return Date.from(LocalDate.now(zone).atStartOfDay(zone).toInstant());
    }

    private Date startOfTomorrow() {
        ZoneId zone = ZoneId.systemDefault();
        return Date.from(LocalDate.now(zone).plusDays(1).atStartOfDay(zone).toInstant());
    }
}
