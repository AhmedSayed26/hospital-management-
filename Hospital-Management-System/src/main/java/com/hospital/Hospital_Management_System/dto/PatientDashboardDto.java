package com.hospital.Hospital_Management_System.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PatientDashboardDto {
    private long upcomingAppointments;
    private long medicalRecords;
    private long prescriptions;
    private long reports;
    private DashboardAppointmentDto nextAppointment;
    private List<DashboardPrescriptionDto> recentPrescriptions;
    private List<DashboardReportDto> recentReports;
}
