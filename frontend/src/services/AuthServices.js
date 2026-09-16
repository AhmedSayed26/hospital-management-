import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth`;

const AuthServices = {
  async registerPatient(patientData) {
    const response = await axios.post(
      `${API_URL}/register/patient`,
      patientData
    );

    return response.data;
  },

  async registerDoctor(doctorData) {
    const response = await axios.post(
      `${API_URL}/register/doctor`,
      doctorData
    );

    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);

    return response.data;
  },
};

export default AuthServices;
