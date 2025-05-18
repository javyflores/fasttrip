// frontend/src/components/ui/ServiceRequestForm.jsx

import React, { useState } from 'react';
import clientService from '../../services/clientService';

function ServiceRequestForm({ clientId }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [tipoCarga, setTipoCarga] = useState('linea blanca');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      id_cliente: clientId,
      origin_lat: parseFloat(origin.split(',')[0]),
      origin_lng: parseFloat(origin.split(',')[1]),
      destination_lat: parseFloat(destination.split(',')[0]),
      destination_lng: parseFloat(destination.split(',')[1]),
      tipo_carga: tipoCarga
    };

    const result = await clientService.createService(request);

    if (result.success) {
      setMensaje('✅ Solicitud enviada. Buscando conductor...');
    } else {
      setMensaje('❌ No se pudo enviar la solicitud. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow mb-6">
      <h3 className="font-semibold text-lg">Generar Nueva Solicitud</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Origen (lat,lng)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Destino (lat,lng)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <select
          value={tipoCarga}
          onChange={(e) => setTipoCarga(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Selecciona el tipo de carga</option>
          <option value="linea blanca">Línea Blanca</option>
          <option value="linea marron">Línea Marrón</option>
          <option value="muebles">Mueblería</option>
        </select>
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-danger text-white py-2 px-4 rounded transition duration-300"
        >
          Enviar Solicitud
        </button>
        {mensaje && <p className="mt-4 text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}

export default ServiceRequestForm;