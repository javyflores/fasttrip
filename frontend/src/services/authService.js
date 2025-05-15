// frontend/src/services/authService.js
const API_URL = 'http://localhost:5000/auth';

const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;