// backend/controllers/clientController.js

const { pool } = require('../models/db');

async function requestService(req, res) {
  const { id_cliente, origin_lat, origin_lng, destination_lat, destination_lng, tipo_carga } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO servicios (id_cliente, origen_lat, origen_lng, destino_lat, destino_lng, tipo_carga) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id_cliente, origin_lat, origin_lng, destination_lat, destination_lng, tipo_carga]
    );

    // Notificar a conductores disponibles
    const io = req.app.get('socketio'); // Asegúrate de tener socket.io configurado
    io.emit('new-service', result.rows[0]);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al generar servicio:', error.message);
    res.status(500).json({ success: false, message: 'No se pudo generar la solicitud' });
  }
}

module.exports = {
  requestService
};