// frontend/src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Ruta base

// 1. Registrar un nuevo usuario (por parte del admin)
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error('Error al registrar usuario:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'No se pudo registrar el usuario' };
  }
};

// 2. Enviar solicitud de registro (por parte del cliente/comercio/conductor)
const requestRegistration = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/request`, userData);

    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response.data.data };
    }

    return { success: false, message: 'Hubo un problema al enviar tu solicitud.' };

  } catch (error) {
    console.error('Error al enviar la solicitud:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'No se pudo enviar la solicitud' };
  }
};

export default {
  registerUser,
  requestRegistration
};