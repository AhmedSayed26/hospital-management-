import apiClient from "@/api/client";

const DashboardService = {
  async GetPatientDashboard() {
    const response = await apiClient.get("/dashboard/patient");
    return response.data;
  },
  async GetDoctorDashboard() {
    const response = await apiClient.get("/dashboard/doctor");
    return response.data;
  },
};

export default DashboardService;
