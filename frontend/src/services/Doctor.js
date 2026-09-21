import apiClient from "@/api/client";

const DoctorService = {
  async GetAllDoctors() {
    const response = await apiClient.get("/doctors");
    return response.data;
  },

  async GetDoctorById(doctorId) {
    const response = await apiClient.get(`/doctors/${doctorId}`);
    return response.data;
  },

  /*
   * Create a new doctor
   * method: POST /doctors
   * body: {
   *   name: string,
   *   email: string,
   *   password: string,
   *   phone: string,
   *   age: number,
   *   yearOfExperience: number,
   *   specialty: string,
   *   address: string,
   *   gender: string,
   *   role: string,
   * }
   */
  async CreateDoctor(doctorData) {
    const response = await apiClient.post("/doctors", doctorData);
    return response.data;
  },

  /*
   * Update an existing doctor
   * method: PUT /doctors/{id}
   * body: {
   *   name: string,
   *   email: string,
   *   password: string,
   *   phone: string,
   *   age: number,
   *   yearOfExperience: number,
   *   specialty: string,
   *   address: string,
   *   gender: string,
   * }
   */
  async UpdateDoctor(doctorId, doctorData) {
    const response = await apiClient.put(`/doctors/${doctorId}`, doctorData);
    return response.data;
  },

  async DeleteDoctor(doctorId) {
    const response = await apiClient.delete(`/doctors/${doctorId}`);
    return response.data;
  },

  async GetDoctorsByName(name) {
    const response = await apiClient.get("/doctors/by-name", {
      params: { name },
    });
    return response.data;
  },

  async GetDoctorsBySpecialty(specialty) {
    const response = await apiClient.get("/doctors/by-specialty", {
      params: { specialty },
    });
    return response.data;
  },

  /*
   * Search doctors with optional filters
   * method: GET /doctors/search
   * params: {
   *   name: string,
   *   specialty: string,
   *   gender: string,
   *   minExperience: number,
   * }
   */
  async SearchDoctors(filters = {}) {
    const response = await apiClient.get("/doctors/search", { params: filters });
    return response.data;
  },
};

export default DoctorService;
