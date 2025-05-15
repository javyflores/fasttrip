// frontend/src/services/driverService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/drivers';

// Actualiza estado del conductor
const updateDriverStatus = async (status) => {
  const response = await axios.put(`${API_URL}/status`, { status });
  return response.data;
};

// Obtiene comercios cercanos
const getNearbyBusinesses = async () => {
  const response = await axios.get(`${API_URL}/nearby-businesses`);
  return response.data.businesses || [];
};
const getStatistics = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data.stats || {};
};

const submitRating = async (serviceId, rating) => {
  const response = await axios.post(`${API_URL}/rate`, { serviceId, rating });
  return response.data;
};

const driverService = {
  updateDriverStatus,
  getNearbyBusinesses,
  getStatistics,
  submitRating
};

export default driverService;