// frontend/src/services/apiClient.js
const API_URL = 'http://localhost:5000/api';

const apiClient = {
  getUsuarios: async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    return await response.json();
  },
};

export default apiClient;