// backend/models/driverModel.js

const { pool } = require('./db');

/**
 * Función: getNearbyServices
 * Descripción: Busca los 5 servicios más cercanos al conductor
 * Usada por: MapView.jsx (frontend)
 */
async function getNearbyServices(latitud, longitud) {
  const query = `
    SELECT s.*, c.nombre_empresa 
    FROM servicios s
    JOIN comercios c ON s.id_cliente = c.id_usuario
    ORDER BY earth_distance(ll_to_earth($1, $2), ll_to_earth(s.origen_lat, s.origen_lng)) ASC
    LIMIT 5`;
  const values = [latitud, longitud];

  try {
    const result = await pool.query(query, values);
    return { success: true, services: result.rows };
  } catch (error) {
    console.error('Error al buscar servicios cercanos:', error.message);
    return { success: false, message: 'No se pudieron encontrar conductores' };
  }
}

/**
 * Función: updateLocation
 * Descripción: Actualiza la ubicación actual del conductor
 * Usada por: ActivationButton.jsx (frontend)
 */
async function updateLocation(id_usuario, latitud, longitud) {
  try {
    const result = await pool.query(
      'UPDATE conductores SET latitud = $1, longitud = $2 WHERE id_usuario = $3 RETURNING *',
      [latitud, longitud, id_usuario]
    );

    if (!result.rows.length) {
      throw new Error('Conductor no encontrado');
    }

    return { success: true, driver: result.rows[0] };
  } catch (error) {
    console.error('Error al actualizar ubicación:', error.message);
    return { success: false, message: 'No se pudo actualizar la ubicación' };
  }
}

/**
 * Función: getDriverLocation
 * Descripción: Obtiene la última ubicación registrada del conductor
 * Usada por: DriverPage.jsx (frontend)
 */
async function getDriverLocation(id_usuario) {
  try {
    const result = await pool.query(
      'SELECT latitud, longitud FROM conductores WHERE id_usuario = $1',
      [id_usuario]
    );

    if (!result.rows.length) {
      return { success: false, message: 'Ubicación no disponible' };
    }

    return {
      success: true,
      location: [result.rows[0].latitud, result.rows[0].longitud]
    };
  } catch (error) {
    console.error('Error al obtener ubicación:', error.message);
    return { success: false, message: 'No se pudo obtener la ubicación del conductor' };
  }
}

/**
 * Función: acceptService
 * Descripción: El conductor acepta un servicio asignado
 * Usada por: NotificationModal.jsx (frontend)
 */
async function acceptService(id_servicio, id_conductor) {
  try {
    // Actualizar estado del servicio
    const updated = await pool.query(
      'UPDATE servicios SET estado = $1, id_conductor = $2 WHERE id = $3 RETURNING *',
      ['aceptado', id_conductor, id_servicio]
    );

    if (!updated.rows.length) {
      throw new Error('Servicio no encontrado');
    }

    // Emitir evento WebSocket para notificar al cliente
    const io = req.app.get('io'); // Esto puede ir en el controlador si usas Socket.IO
    io.to(`cliente-${updated.rows[0].id_cliente}`).emit('service-assigned', {
      serviceId: id_servicio,
      conductorId: id_conductor
    });

    return { success: true, service: updated.rows[0] };

  } catch (error) {
    console.error('Error al aceptar servicio:', error.message);
    return { success: false, message: 'No se pudo aceptar el servicio' };
  }
}

/**
 * Función: getStatistics
 * Descripción: Obtiene estadísticas del conductor (viajes, ganancias, calificaciones)
 * Usada por: TripStats.jsx (frontend)
 */
async function getStatistics(id_usuario) {
  try {
    // Contar servicios completados
    const completedResult = await pool.query(
      'SELECT COUNT(*) FROM servicios WHERE id_conductor = $1 AND estado = $2',
      [id_usuario, 'completado']
    );

    // Promedio de calificaciones
    const ratingResult = await pool.query(
      'SELECT AVG(puntuacion) AS avg_rating FROM calificaciones WHERE id_conductor = $1',
      [id_usuario]
    );

    // Ganancias totales
    const earningsResult = await pool.query(
      'SELECT SUM(monto) AS total_earnings FROM facturas WHERE id_conductor = $1',
      [id_usuario]
    );

    // Historial de viajes por mes
    const tripHistory = await pool.query(`
      SELECT EXTRACT(MONTH FROM fecha_solicitud) AS mes, COUNT(*) AS cantidad
      FROM servicios 
      WHERE id_conductor = $1 AND estado = 'completado'
      GROUP BY EXTRACT(MONTH FROM fecha_solicitud)
      ORDER BY mes`,
      [id_usuario]
    );

    const historyArray = Array(5).fill(0);
    tripHistory.rows.forEach(row => {
      if (row.mes >= 1 && row.mes <= 5) {
        historyArray[row.mes - 1] = parseInt(row.cantidad);
      }
    });

    return {
      success: true,
      stats: {
        totalTrips: parseInt(completedResult.rows[0].