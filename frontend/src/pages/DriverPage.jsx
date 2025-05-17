// frontend/src/pages/DriverPage.jsx
import React, { useEffect, useState } from 'react';
import MapView from '../components/map/MapView';
import ActivationButton from '../components/ui/ActivationButton';
import NotificationModal from '../components/ui/NotificationModal';
import CallButton from '../components/ui/CallButton';
import TripStats from '../components/dashboard/TripStats';
import RatingSystem from '../components/ui/RatingSystem';
import driverService from '../services/driverService';

function DriverPage() {
  const [location, setLocation] = useState([10.4987, -66.8945]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      const data = await driverService.getCurrentLocation(1); // Suponiendo id=1
      if (data.success) setLocation(data.location);
    };
    loadLocation();
  }, []);

  const handleStatusChange = (status) => {
    setIsAvailable(status === 'activo');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-primary">Mi Panel – Conductor</h2>

      <div className="flex justify-center gap-4 mb-6">
        <ActivationButton onStatusChange={handleStatusChange} />
        <p>Estado: <strong>{isAvailable ? 'Disponible' : 'No disponible'}</strong></p>
      </div>

      <MapView userLocation={location} />

      <NotificationModal />
      <CallButton phoneNumber="04121234567" />
      <TripStats />
      <RatingSystem serviceId="12345" />
    </div>
  );
}

export default DriverPage;