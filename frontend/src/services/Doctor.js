import apiClient from "@/api/client";

const Doctor = {
  async GetAllDoctors() {
    const response = await apiClient.get("/doctors");
    return response.data;
  },
};

export default Doctor;
