// frontend/src/services/clientService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/client';

const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${API_URL}/request`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error al crear servicio:', error.message);
    return { success: false, message: 'No se pudo generar el servicio' };
  }
};

export default {
  createService
};