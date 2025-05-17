// backend/controllers/driverController.js
const { pool } = require('../models/db');

async function updateLocation(req, res) {
  const { id_usuario, latitud, longitud } = req.body;

  try {
    const result = await pool.query(
      'UPDATE conductores SET latitud = $1, longitud = $2 WHERE id_usuario = $3 RETURNING *',
      [latitud, longitud, id_usuario]
    );

    res.json({
      success: true,
      status: 'activo',
      driver: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar ubicación:', error.message);
    res.status(500).json({ success: false, message: 'No se pudo actualizar tu ubicación' });
  }
}

async function getNearbyServices(req, res) {
  const { latitud, longitud } = req.body;

  try {
    const result = await pool.query(
      `SELECT s.*, c.nombre_empresa 
       FROM servicios s
       JOIN comercios c ON s.id_cliente = c.id_usuario
       ORDER BY earth_distance(ll_to_earth($1, $2), ll_to_earth(s.origen_lat, s.origen_lng)) ASC
       LIMIT 5`,
      [latitud, longitud]
    );

    res.json({ success: true, services: result.rows });
  } catch (error) {
    console.error('Error al obtener servicios:', error.message);
    res.status(500).json({ success: false, message: 'Error al buscar servicios' });
  }
}

async function getCurrentLocation(req, res) {
  const { id_usuario } = req.params;

  try {
    const result = await pool.query(
      'SELECT latitud, longitud FROM conductores WHERE id_usuario = $1',
      [id_usuario]
    );

    const location = result.rows[0];
    res.json({
      success: true,
      location: [location.latitud, location.longitud]
    });
  } catch (error) {
    console.error('Error al obtener ubicación:', error.message);
    res.status(500).json({ success: false, message: 'Ubicación no disponible' });
  }
}

async function acceptService(req, res) {
  const { id_servicio, id_conductor } = req.body;

  try {
    // Actualizar estado del servicio
    const updated = await pool.query(
      'UPDATE servicios SET estado = $1, id_conductor = $2 WHERE id = $3 RETURNING *',
      ['aceptado', id_conductor, id_servicio]
    );

    if (!updated.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Servicio aceptado',
      service: updated.rows[0]
    });

  } catch (error) {
    console.error('Error al aceptar servicio:', error.message);
    res.status(500).json({ success: false, message: 'No se pudo aceptar el servicio' });
  }
}

module.exports = {
  updateLocation,
  getNearbyServices,
  getCurrentLocation,
  acceptService
};