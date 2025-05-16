// frontend/src/components/RegisterUser.jsx
import React, { useState } from 'react';
import userService from '../services/userService';

function RegisterUser() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipo_usuario, setTipoUsuario] = useState('cliente');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { nombre, apellido, email, telefono, tipo_usuario };

    // Llamamos al servicio de solicitud de registro
    const resultado = await userService.requestRegistration(userData);

    if (resultado.success) {
      setMensaje('✅ Solicitud enviada. Te contactaremos pronto.');
    } else {
      setMensaje('❌ Hubo un problema al enviar tu solicitud. Inténtalo más tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-pink-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6">Registro de Usuario en FastTrip</h2>
        <p className="mb-6 text-gray-700">
          ¡Nos alegra tenerte aquí! Completa este formulario para generar una solicitud de registro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <select
            value={tipo_usuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="cliente">Cliente Directo</option>
            <option value="comercio">Comercio</option>
            <option value="conductor">Conductor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4 transition duration-300"
          >
            Enviar Solicitud
          </button>
        </form>

        {mensaje && <p className="mt-4 text-white">{mensaje}</p>}
      </div>
    </div>
  );
}

export default RegisterUser;