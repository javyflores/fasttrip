// backend/models/user.model.js
const db = require('./db');

async function registerUser(userData) {
  const query = `
    INSERT INTO usuarios (
      nombre, apellido, email, password, telefono, tipo_usuario
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    userData.nombre,
    userData.apellido,
    userData.email,
    userData.password, // En producción, usa bcrypt
    userData.telefono,
    userData.tipo_usuario
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = { registerUser };