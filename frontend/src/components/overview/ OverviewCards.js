import React from 'react';

const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

const Card = ({ title, value, isGainLoss = false }) => {
  const valueClass = isGainLoss ? (value >= 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-900';
  const formattedValue = isGainLoss ? `${value >= 0 ? '+' : ''}${formatCurrency(value)}` : formatCurrency(value);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${valueClass}`}>{formattedValue}</p>
    </div>
  );
};

const OverviewCards = ({ summary, holdingsCount }) => (
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card title="Total Portfolio Value" value={summary.totalValue} />
      <Card title="Total Gain/Loss" value={summary.totalGainLoss} isGainLoss />
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Performance %</h3>
        <p className={`text-3xl font-bold mt-2 ${summary.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {summary.totalGainLossPercent >= 0 ? '+' : ''}{summary.totalGainLossPercent.toFixed(2)}%
        </p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Number of Holdings</h3>
        <p className="text-3xl font-bold mt-2 text-gray-900">{summary.holdingsCount}</p>
      </div>
    </div>
  </section>
);

export default OverviewCards;