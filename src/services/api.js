import axios from 'axios';

const api = axios.create({
  baseURL: 'http://YOUR_BACKEND_IP:PORT',
  timeout: 10000,
});

export const authService = {
  login: (data) => api.post('/login', data),
};

export const doctorService = {
  getDoctors: () => api.get('/doctors'),
  getDoctorDetails: (id) => api.get(`/doctors/${id}`),
};

export const symptomService = {
  checkSymptoms: (symptoms) => api.post('/symptoms', { symptoms }),
};

export const medicineService = {
  searchMedicines: (query) => api.get(`/medicines?q=${query}`),
};

export const recordsService = {
  getHealthRecords: () => api.get('/records'),
};

export default api;
