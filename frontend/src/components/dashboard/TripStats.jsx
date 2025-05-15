// frontend/src/components/dashboard/TripStats.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TripStats() {
  const [stats, setStats] = useState({
    totalTrips: 0,
    completedTrips: 0,
    avgRating: 0,
    earnings: 0
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchStats = async () => {
    try {
      const data = await driverService.getStatistics(); // Asegúrate de tener este servicio
      setStats(data);

      // Preparar datos para el gráfico
      const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
      const tripData = data.completedTripsHistory || [12, 19, 3, 5, 2];

      setChartData({
        labels,
        datasets: [{
          label: 'Viajes Completados',
          backgroundColor: '#FF6F31',
          borderColor: '#FF6F31',
          borderWidth: 1,
          data: tripData
        }]
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="trip-stats bg-white p-4 rounded-md shadow">
      <h4 className="text-lg font-semibold text-primary">Mis Estadísticas</h4>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p>Total de Viajes: <strong>{stats.totalTrips}</strong></p>
        <p>Viajes Completados: <strong>{stats.completedTrips}</strong></p>
        <p>Promedio de Calificación: <strong>★{stats.avgRating.toFixed(1)}</strong></p>
        <p>Ganancias Totales: <strong>Bs. {stats.earnings.toFixed(2)}</strong></p>
      </div>

      {/* Gráfico */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Viajes por Mes'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }}
      />
    </div>
  );
}

export default TripStats;