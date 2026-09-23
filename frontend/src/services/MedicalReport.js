import apiClient from "@/api/client";

const MedicalReportService = {
    async GetAllMedicalReports() {
        const response = await apiClient.get("/medical-reports");
        return response.data;
    },
    async GetMedicalReportById(id) {
        const response = await apiClient.get(`/medical-reports/${id}`);
        return response.data;
    },
    async CreateMedicalReport(medicalReport) {
        const response = await apiClient.post("/medical-reports", medicalReport);
        return response.data;
    },
    async UpdateMedicalReport(id, medicalReport) {
        const response = await apiClient.put(`/medical-reports/${id}`, medicalReport);
        return response.data;
    },
    async DeleteMedicalReport(id) {
        const response = await apiClient.delete(`/medical-reports/${id}`);
        return response.data;
    },
    async GetMedicalReportsByPatientId(patientId) {
        const response = await apiClient.get(`/medical-reports/patient/${patientId}`);
        return response.data;
    },
    async GetMedicalReportsByDoctorId(doctorId) {
        const response = await apiClient.get(`/medical-reports/doctor/${doctorId}`);
        return response.data;
    },
    async GetMedicalReportsByRecordId(recordId) {
        const response = await apiClient.get(`/medical-reports/record/${recordId}`);
        return response.data;
    },
    async GetMedicalReportsByMedicalRecordId(recordId) {
        const response = await apiClient.get(`/medical-reports/medical-record/${recordId}`);
        return response.data;
    },
}

export default MedicalReportService;
