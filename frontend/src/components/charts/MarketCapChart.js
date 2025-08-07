import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarketCapChart = ({ allocation }) => {
  if (!allocation || !allocation.byMarketCap) return null;

  const data = {
    labels: Object.keys(allocation.byMarketCap),
    datasets: [{
      label: 'Value',
      data: Object.values(allocation.byMarketCap).map(d => d.value),
      backgroundColor: ['#8b5cf6', '#ec4899', '#6366f1'],
    }],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            const percentage = allocation.byMarketCap[context.label].percentage.toFixed(2);
            return `${label}: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
     scales: {
        x: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value);
                }
            }
        }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium text-center">Market Cap Distribution</h3>
      <div className="h-80 w-full flex items-center justify-center mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
export default MarketCapChart;

