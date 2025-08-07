import React, { useState, useMemo } from 'react';

// A new component to render icons based on sector name
const SectorIcon = ({ sector }) => {
    const iconMap = {
        'Energy': { icon: '⚡️', color: 'bg-yellow-100 text-yellow-800' },
        'Technology': { icon: '💻', color: 'bg-blue-100 text-blue-800' },
        'Banking': { icon: '🏦', color: 'bg-gray-100 text-gray-800' },
        'Telecommunications': { icon: '📡', color: 'bg-sky-100 text-sky-800' },
        'Consumer Goods': { icon: '🛒', color: 'bg-pink-100 text-pink-800' },
        'Financial Services': { icon: '💰', color: 'bg-green-100 text-green-800' },
        'Consumer Discretionary': { icon: '💎', color: 'bg-purple-100 text-purple-800' },
        'Infrastructure': { icon: '🏗️', color: 'bg-orange-100 text-orange-800' },
        'Automotive': { icon: '🚗', color: 'bg-red-100 text-red-800' },
        'Healthcare': { icon: '❤️', color: 'bg-rose-100 text-rose-800' },
        'Default': { icon: '🏢', color: 'bg-stone-100 text-stone-800' }
    };

    const { icon, color } = iconMap[sector] || iconMap['Default'];
    
    return (
        <div className="flex items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3 ${color}`}>{icon}</span>
            <span>{sector}</span>
        </div>
    );
};

const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
const formatPercent = (val) => `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`;

const SortableHeader = ({ children, name, sortConfig, requestSort }) => {
    const isSorted = sortConfig.key === name;
    const directionIcon = sortConfig.direction === 'ascending' ? '▲' : '▼';
    
    return (
        <th 
            onClick={() => requestSort(name)} 
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
        >
            <div className="flex items-center">
                <span>{children}</span>
                <span className={`ml-2 ${isSorted ? 'text-gray-800' : 'text-gray-300'}`}>
                    {isSorted ? directionIcon : '↕'}
                </span>
            </div>
        </th>
    );
};


const HoldingsTable = ({ holdings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'descending' });

  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = (typeof a[sortConfig.key] === 'string') ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
        const valB = (typeof b[sortConfig.key] === 'string') ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
        
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const filteredHoldings = sortedHoldings.filter(h =>
    (h.companyName && h.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (h.symbol && h.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Holdings</h2>
        <input
          type="text"
          className="w-full max-w-xs p-2 border border-gray-300 rounded-lg"
          placeholder="Search holdings..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader name="companyName" sortConfig={sortConfig} requestSort={requestSort}>Holding</SortableHeader>
                <SortableHeader name="sector" sortConfig={sortConfig} requestSort={requestSort}>Sector</SortableHeader>
                <SortableHeader name="value" sortConfig={sortConfig} requestSort={requestSort}>Value</SortableHeader>
                <SortableHeader name="gainLoss" sortConfig={sortConfig} requestSort={requestSort}>Gain/Loss</SortableHeader>
                <SortableHeader name="gainLossPercent" sortConfig={sortConfig} requestSort={requestSort}>Gain/Loss %</SortableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHoldings.map((stock) => (
                <tr key={stock.symbol}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{stock.companyName}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SectorIcon sector={stock.sector} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-semibold">{formatCurrency(stock.value)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right ${stock.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(stock.gainLoss)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right ${stock.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercent(stock.gainLossPercent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default HoldingsTable;
