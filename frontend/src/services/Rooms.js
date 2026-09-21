import apiClient from "@/api/client";

const RoomService = {
  async GetAllRooms() {
    const response = await apiClient.get("/rooms");
    return response.data;
  },

  async GetRoomById(roomId) {
    const response = await apiClient.get(`/rooms/${roomId}`);
    return response.data;
  },

  /*
   * Create a new room
   * method: POST /rooms
   * body: {
   *   roomNumber: string,
   *   totalBeds: number,
   * }
   */
  async CreateRoom(roomData) {
    const response = await apiClient.post("/rooms", roomData);
    return response.data;
  },

  /*
   * Update an existing room
   * method: PUT /rooms/{id}
   * body: {
   *   roomNumber: string,
   *   totalBeds: number,
   * }
   */
  async UpdateRoom(roomId, roomData) {
    const response = await apiClient.put(`/rooms/${roomId}`, roomData);
    return response.data;
  },

  async DeleteRoom(roomId) {
    const response = await apiClient.delete(`/rooms/${roomId}`);
    return response.data;
  },

  /*
   * Assign a patient to a room
   * method: POST /rooms/{roomId}/assign/{patientId}
   * params: {
   *   stayDurationInDays: number,
   * }
   */
  async AssignPatientToRoom(roomId, patientId, stayDurationInDays) {
    const response = await apiClient.post(
      `/rooms/${roomId}/assign/${patientId}`,
      null,
      { params: { stayDurationInDays } }
    );
    return response.data;
  },

  /*
   * Remove a patient from a room
   * method: POST /rooms/{roomId}/remove/{patientId}
   */
  async RemovePatientFromRoom(roomId, patientId) {
    const response = await apiClient.post(
      `/rooms/${roomId}/remove/${patientId}`
    );
    return response.data;
  },
};

export default RoomService;
