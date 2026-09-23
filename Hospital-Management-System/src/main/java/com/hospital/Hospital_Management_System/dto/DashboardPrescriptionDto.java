package com.hospital.Hospital_Management_System.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DashboardPrescriptionDto {
    private Long id;
    private String medicineDescription;
    private Date issueDate;
    private String doctorName;
}
