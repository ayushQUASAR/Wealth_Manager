import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const ReturnsTable = ({ returns }) => (
    <table className="min-w-full mt-4">
        <thead className="bg-gray-50">
            <tr>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                <th className="py-2 px-4 text-right text-xs font-medium text-gray-500 uppercase">1M</th>
                <th className="py-2 px-4 text-right text-xs font-medium text-gray-500 uppercase">3M</th>
                <th className="py-2 px-4 text-right text-xs font-medium text-gray-500 uppercase">1Y</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(returns).map(([key, value]) => (
                <tr key={key} className="border-b">
                    <td className="py-2 px-4 font-medium capitalize">{key}</td>
                    <td className={`py-2 px-4 text-right ${value['1month'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>{value['1month']}%</td>
                    <td className={`py-2 px-4 text-right ${value['3months'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>{value['3months']}%</td>
                    <td className={`py-2 px-4 text-right ${value['1year'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>{value['1year']}%</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const PerformanceChart = ({ performance }) => {
  if (!performance || !performance.timeline) return null;

  const data = {
    labels: performance.timeline.map(d => d.date),
    datasets: [
      {
        label: 'Portfolio',
        data: performance.timeline.map(d => d.portfolio),
        borderColor: '#4f46e5',
        yAxisID: 'y',
      },
      {
        label: 'Nifty 50',
        data: performance.timeline.map(d => d.nifty50),
        borderColor: '#10b981',
        yAxisID: 'y1',
      },
       {
        label: 'Gold',
        data: performance.timeline.map(d => d.gold),
        borderColor: '#f59e0b',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true, maintainAspectRatio: false, tension: 0.3, pointRadius: 0,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: { type: 'time', time: { unit: 'month' }, grid: { display: false } },
      y: { position: 'left', beginAtZero: false, ticks: { callback: v => new Intl.NumberFormat('en-IN', { notation: 'compact' }).format(v) } },
      y1: { position: 'right', beginAtZero: false, grid: { display: false }, ticks: { callback: v => new Intl.NumberFormat('en-IN', { notation: 'compact' }).format(v) } }
    },
    plugins: { legend: { position: 'top', align: 'end' } },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80">
            <Line data={data} options={options} />
        </div>
        <div>
            <h3 className="text-lg font-medium text-center mb-2">Returns (%)</h3>
            <ReturnsTable returns={performance.returns} />
        </div>
    </div>
  );
};
export default PerformanceChart;
