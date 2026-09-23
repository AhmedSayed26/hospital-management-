package com.hospital.Hospital_Management_System.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DashboardReportDto {
    private Long id;
    private String reportTitle;
    private Date reportDate;
    private String patientName;
    private String doctorName;
}
