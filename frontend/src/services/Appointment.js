import apiClient from "@/api/client";

const Appointment = {

    async GetAllAppointments() {
        const response = await apiClient.get("/appointments");
        return response.data;
    },

    /*
    * This function is used to post a new appointment
    * @param {Object} appointmentData - The data for the new appointment
    * @returns {Object} The response from the server
    * method: POST
    * body: {
    *   patientId: string,
    *   doctorId: string,
    *   reason: string,
    *   status: string,
    *   date: string,
    * }
    **/
    async PostAppointment(appointmentData) {
        const response = await apiClient.post("/appointments", appointmentData);
        return response.data;
    },


    async DeleteAppointment(appointmentId) {
        const response = await apiClient.delete(`/appointments/${appointmentId}`);
        return response.data;
    },


    /*
    * This function is used to update an existing appointment
    * @param {Object} appointmentData - The data for the updated appointment
    * @param {string} appointmentId - The id of the appointment to update
    * @returns {Object} The response from the server
    * method: PUT
    * body: {
    *   patientId: string,
    *   doctorId: string,
    *   reason: string,
    *   status: string,
    *   date: string,
    * }
    **/

    async UpdateAppointment(appointmentId, appointmentData) {
        const response = await apiClient.put(`/appointments/${appointmentId}`, appointmentData);
        return response.data;
    },


    async GetAppointmentById(appointmentId) {
        const response = await apiClient.get(`/appointments/${appointmentId}`);
        return response.data;
    },


    async GetAppointmentsByPatientId(patientId) {
        const response = await apiClient.get(`/appointments/by-patient/${patientId}`);
        return response.data;
    },


    async GetAppointmentsByDoctorId(doctorId) {
        const response = await apiClient.get(`/appointments/by-doctor/${doctorId}`);
        return response.data;
    },

}

export default Appointment;
