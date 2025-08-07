import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-40">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900">WealthManager.online</h1>
        </div>
        <div className="flex items-center">
          <img className="h-9 w-9 rounded-full object-cover ring-2 ring-offset-2 ring-indigo-500" src="https://placehold.co/100x100/6366f1/ffffff?text=U" alt="User Profile" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;