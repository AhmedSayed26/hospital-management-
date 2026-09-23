import React from "react";
import PatientDashboard from "./patientdashboard";
import DoctorsDashboard from "./doctorsdashboard";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    if (user?.role === "USER") {
        return <PatientDashboard />;
    }
    if (user?.role === "ADMIN") {
        return <DoctorsDashboard />;
    }
    return <div>You are not authorized to access this page</div>;
}