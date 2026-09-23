package com.hospital.Hospital_Management_System.controller;

import com.hospital.Hospital_Management_System.config.security.userService.CustomerUserDetails;
import com.hospital.Hospital_Management_System.dto.DoctorDashboardDto;
import com.hospital.Hospital_Management_System.dto.PatientDashboardDto;
import com.hospital.Hospital_Management_System.service.DashboardService.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final IDashboardService dashboardService;

    @GetMapping("/patient")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<PatientDashboardDto> patientDashboard() {
        return ResponseEntity.ok(dashboardService.getPatientDashboard(currentUserId()));
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<DoctorDashboardDto> doctorDashboard() {
        return ResponseEntity.ok(dashboardService.getDoctorDashboard(currentUserId()));
    }

    private Long currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomerUserDetails details)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return details.getId();
    }
}
