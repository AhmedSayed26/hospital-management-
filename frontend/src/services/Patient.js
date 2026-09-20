import apiClient from "@/api/client";

const Patient = {
  async GetAllPatients() {
    const response = await apiClient.get("/patients");
    return response.data;
  },

  async GetPatientById(patientId) {
    const response = await apiClient.get(`/patients/${patientId}`);
    return response.data;
  },

  /*
   * Create a new patient
   * method: POST /patients
   * body: {
   *   name: string,
   *   age: number,
   *   phone: string,
   *   email: string,
   *   password: string,
   *   address: string,
   *   disease: string,
   *   bloodType: string,
   *   dateOfRegistration: string,
   *   gender: string,
   * }
   */
  async CreatePatient(patientData) {
    const response = await apiClient.post("/patients", patientData);
    return response.data;
  },

  /*
   * Update an existing patient
   * method: PUT /patients/{id}
   * body: {
   *   id: number,
   *   name: string,
   *   age: number,
   *   phone: string,
   *   email: string,
   *   password: string,
   *   address: string,
   *   disease: string,
   *   bloodType: string,
   *   dateOfRegistration: string,
   *   gender: string,
   * }
   */
  async UpdatePatient(patientId, patientData) {
    const response = await apiClient.put(`/patients/${patientId}`, patientData);
    return response.data;
  },

  async DeletePatient(patientId) {
    const response = await apiClient.delete(`/patients/${patientId}`);
    return response.data;
  },

  /*
   * Search patients with optional filters
   * method: GET /patients/search
   * params: {
   *   name: string,
   *   disease: string,
   *   gender: string,
   *   bloodType: string,
   *   dateOfRegistration: string,
   * }
   */
  async SearchPatients(filters = {}) {
    const response = await apiClient.get("/patients/search", { params: filters });
    return response.data;
  },

  async GetPatientsByName(name) {
    const response = await apiClient.get("/patients/by-name", {
      params: { name },
    });
    return response.data;
  },

  async GetPatientsByDisease(disease) {
    const response = await apiClient.get("/patients/by-disease", {
      params: { disease },
    });
    return response.data;
  },

  async GetPatientsByNameAndDisease(name, disease) {
    const response = await apiClient.get("/patients/by-name-and-disease", {
      params: { name, disease },
    });
    return response.data;
  },

  async GetPatientsByDate(date) {
    const response = await apiClient.get("/patients/by-date", {
      params: { date },
    });
    return response.data;
  },

  async GetPatientsByDiseaseAndGender(disease, gender) {
    const response = await apiClient.get("/patients/by-disease-and-gender", {
      params: { disease, gender },
    });
    return response.data;
  },

  async GetPatientsByDiseaseAndGenderAndBloodType(disease, gender, bloodType) {
    const response = await apiClient.get(
      "/patients/by-disease-and-gender-and-bloodType",
      { params: { disease, gender, bloodType } }
    );
    return response.data;
  },
};

export default Patient;
