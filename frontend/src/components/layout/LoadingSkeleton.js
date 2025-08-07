import React from 'react';
import Header from './Header';

const LoadingSkeleton = () => (
  <div>
    <Header />
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-300 h-28 rounded-xl"></div>
          <div className="bg-gray-300 h-28 rounded-xl"></div>
          <div className="bg-gray-300 h-28 rounded-xl"></div>
          <div className="bg-gray-300 h-28 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="bg-gray-300 h-96 rounded-xl lg:col-span-2"></div>
          <div className="bg-gray-300 h-96 rounded-xl lg:col-span-3"></div>
        </div>
        <div className="bg-gray-300 h-64 rounded-xl w-full"></div>
      </div>
    </main>
  </div>
);

export default LoadingSkeleton;
