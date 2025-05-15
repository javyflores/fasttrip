// frontend/src/components/RegisterUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import driverService from '../services/driverService'; // o authService si usas JWT

function RegisterUser() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipo_usuario, setTipoUsuario] = useState('cliente');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nombre,
      apellido,
      email,
      password,
      telefono,
      tipo_usuario
    };

    try {
      const response = await driverService.registerUser(userData); // Asegúrate de tener esta función en tu servicio
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/img/brand/Logo Fasttrip.png" alt="FastTrip Logo" className="mx-auto h-16 mb-4" />
          <h2 className="text-2xl font-bold text-primary">Registrar Usuario</h2>
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-green-500 font-semibold">✅ Registro exitoso. Redirigiendo...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <select
                value={tipo_usuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Selecciona tu rol</option>
                <option value="admin">Administrador</option>
                <option value="driver">Conductor</option>
                <option value="client">Cliente</option>
                <option value="business">Comercio</option>
              </select>
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-danger text-white py-2 rounded-md transition duration-300"
              >
                Registrar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterUser;