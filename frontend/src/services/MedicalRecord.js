import apiClient from "@/api/client";

const MedicalRecordService = {
    async GetAllMedicalRecords() {
        const response = await apiClient.get("/medical-records");
        return response.data;
    },
    async GetMedicalRecordById(id) {
        const response = await apiClient.get(`/medical-records/${id}`);
        return response.data;
    },
    async CreateMedicalRecord(medicalRecord) {
        const response = await apiClient.post("/medical-records", medicalRecord);
        return response.data;
    },
    async UpdateMedicalRecord(id, medicalRecord) {
        const response = await apiClient.put(`/medical-records/${id}`, medicalRecord);
        return response.data;
    },
    async DeleteMedicalRecord(id) {
        const response = await apiClient.delete(`/medical-records/${id}`);
        return response.data;
    },
    async GetMedicalRecordsByPatientId(patientId) {
        const response = await apiClient.get(`/medical-records/patient/${patientId}`);
        return response.data;
    },
    async GetMedicalRecordsByDoctorId(doctorId) {
        const response = await apiClient.get(`/medical-records/doctor/${doctorId}`);
        return response.data;
    },
}

export default MedicalRecordService;