// frontend/src/pages/SolregPage.jsx
import React from 'react';
import RegisterUser from '../components/RegisterUser';

function SolregPage() {
  return (
    <div>
      <h1 className="text-center text-white text-2xl font-bold mt-6">
        Solicita tu registro en FastTrip
      </h1>
      <p className="text-white text-center mb-6">El administrador revisará tu solicitud pronto</p>

      <RegisterUser />
    </div>
  );
}

export default SolregPage;