// src/App.tsx
import React from 'react';

// Components
import MarketCapChart from './components/MarketCapChart';
import TPSChart from './components/TPSChart';
import WalletBalanceChart from './components/WalletBalanceChart';

// API

import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <MarketCapChart />
        </div>
        <div className="col-span-1">
          <TPSChart />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <WalletBalanceChart />
        </div>
      </div>
    </div>
  );
};

export default App;
