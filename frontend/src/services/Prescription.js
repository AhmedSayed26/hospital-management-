import apiClient from "@/api/client";

const PrescriptionService = {
    async GetAllPrescriptions() {
        const response = await apiClient.get("/prescriptions");
        return response.data;
    },
    async GetPrescriptionById(id) {
        const response = await apiClient.get(`/prescriptions/${id}`);
        return response.data;
    },
    async CreatePrescription(prescription) {
        const response = await apiClient.post("/prescriptions", prescription);
        return response.data;
    },
    async UpdatePrescription(id, prescription) {
        const response = await apiClient.put(`/prescriptions/${id}`, prescription);
        return response.data;
    },
    async DeletePrescription(id) {
        const response = await apiClient.delete(`/prescriptions/${id}`);
        return response.data;
    },
    async GetPrescriptionsByPatientId(patientId) {
        const response = await apiClient.get(`/prescriptions/patient/${patientId}`);
        return response.data;
    },
    async GetPrescriptionsByDoctorId(doctorId) {
        const response = await apiClient.get(`/prescriptions/doctor/${doctorId}`);
        return response.data;
    }
}

export default PrescriptionService;