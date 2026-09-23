package com.hospital.Hospital_Management_System.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DoctorDashboardDto {
    private long todayAppointments;
    private long pendingAppointments;
    private long patients;
    private long availableBeds;
    private long totalBeds;
    private List<DashboardAppointmentDto> todaySchedule;
    private List<DashboardAppointmentDto> pendingList;
    private List<DashboardReportDto> recentReports;
}
