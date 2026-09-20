import apiClient from "@/api/client";

const AuthServices = {
  async registerPatient(patientData) {
    const response = await apiClient.post(
      "/auth/register/patient",
      patientData
    );

    return response.data;
  },

  async registerDoctor(doctorData) {
    const response = await apiClient.post(
      "/auth/register/doctor",
      doctorData
    );

    return response.data;
  },

  async login(credentials) {
    const response = await apiClient.post("/auth/login", credentials);

    return response.data;
  },
};

export default AuthServices;
