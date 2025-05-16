// backend/models/userModel.js
const db = require('./db');

// 1. Función para insertar una nueva solicitud de registro
async function requestRegistration(userData) {
  const { nombre, apellido, email, telefono, tipo_usuario } = userData;

  const query = `
    INSERT INTO newregistro 
      (nombre, apellido, email, telefono, tipo_usuario)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nombre, apellido, email, telefono, tipo_usuario];

  try {
    const result = await db.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error al registrar solicitud:', error.message);
    return { success: false, message: error.detail || 'Error al enviar la solicitud de registro' };
  }
}

// 2. Función para obtener todas las solicitudes pendientes
async function getRegistrationRequests() {
  const query = `
    SELECT * FROM newregistro
    WHERE estado_registro = 'pendiente';
  `;

  try {
    const result = await db.query(query);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error al obtener solicitudes:', error.message);
    return { success: false, message: 'Error al cargar solicitudes de registro' };
  }
}

// 3. 
async function approveRegistration(id_registro) {
  try {
    const solicitud = await db.query(
      'SELECT * FROM newregistro WHERE id_registro = $1 AND estado_registro = $2',
      [id_registro, 'pendiente']
    );

    if (!solicitud.rows.length) {
      throw new Error('Solicitud no encontrada');
    }

    const userData = solicitud.rows[0];

    const newUser = await db.query(
      'INSERT INTO usuarios (nombre, apellido, email, password, telefono, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        userData.nombre,
        userData.apellido,
        userData.email,
        'contraseña_temporal_123',
        userData.telefono,
        userData.tipo_usuario
      ]
    );

    await db.query(
      'UPDATE newregistro SET estado_registro = $1 WHERE id_registro = $2',
      ['aprobado', id_registro]
    );

    return { success: true, user: newUser.rows[0] };
  } catch (error) {
    console.error('Error al aprobar usuario:', error.message);
    return { success: false, message: error.message || 'No se pudo aprobar la solicitud' };
  }
}



// Exportamos ambas funciones
module.exports = {
  requestRegistration,
  getRegistrationRequests,
  approveRegistration
};


// backend/models/userModel.js

