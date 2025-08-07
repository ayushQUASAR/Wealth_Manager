import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SectorChart = ({ allocation }) => {
  // Guard against rendering before data is available
  if (!allocation || !allocation.bySector) {
    return null;
  }

  const data = {
    labels: Object.keys(allocation.bySector),
    datasets: [{
      data: Object.values(allocation.bySector).map(d => d.value),
      backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#6b7280'],
      borderColor: '#f3f4f6',
      borderWidth: 4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            const percentage = allocation.bySector[label].percentage.toFixed(2);
            return `${label}: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
      <h3 className="text-lg font-medium text-center">Sector Distribution</h3>
      <div className="h-80 w-full flex items-center justify-center mt-4">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SectorChart;