// ===================================================================
// FILE: frontend/src/App.js
// ===================================================================
import React, { useState, useEffect } from 'react';
import * as api from './api/portfolio';

import Header from './components/layout/Header';
import LoadingSkeleton from './components/layout/LoadingSkeleton';
import OverviewCards from './components/overview/ OverviewCards';
import SectorChart from './components/charts/SectorChart';
import MarketCapChart from './components/charts/MarketCapChart';
import PerformanceChart from './components/charts/PerformanceChart';
import HoldingsTable from './components/holdings/HoldingsTable';
import KeyInsights from './components/insights/KeyInsights';
import './App.css';

function App() {
  const [summary, setSummary] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [summaryData, allocationData, performanceData, holdingsData] = await Promise.all([
          api.fetchSummary(),
          api.fetchAllocation(),
          api.fetchPerformance(),
          api.fetchHoldings(),
        ]);
        
        setSummary(summaryData);
        setAllocation(allocationData);
        setPerformance(performanceData);
        setHoldings(holdingsData);

      } catch (err) {
        setError('Failed to fetch portfolio data. Please ensure the backend server is running and the database is seeded.');
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
        <>
            <Header />
            <div className="error-message">{error}</div>
        </>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8 fade-in">
        {summary && <OverviewCards summary={summary} />}
        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allocation && <SectorChart allocation={allocation} />}
          {allocation && <MarketCapChart allocation={allocation} />}
        </section>

        {performance && <PerformanceChart performance={performance} />}
        {holdings.length > 0 && <HoldingsTable holdings={holdings} />}
        {summary && <KeyInsights summary={summary} />}
      </main>
    </div>
  );
}

export default App;