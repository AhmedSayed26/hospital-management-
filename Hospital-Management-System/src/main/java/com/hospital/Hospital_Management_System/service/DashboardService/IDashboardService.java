package com.hospital.Hospital_Management_System.service.DashboardService;

import com.hospital.Hospital_Management_System.dto.DoctorDashboardDto;
import com.hospital.Hospital_Management_System.dto.PatientDashboardDto;

public interface IDashboardService {
    PatientDashboardDto getPatientDashboard(Long patientId);

    DoctorDashboardDto getDoctorDashboard(Long doctorId);
}
