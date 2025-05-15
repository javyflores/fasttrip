// frontend/src/services/userService.js
const API_URL = 'http://localhost:5000/users';

const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  return await response.json();
};

export default { registerUser };