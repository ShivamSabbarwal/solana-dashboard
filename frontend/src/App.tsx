// src/App.tsx
import React from 'react';

// Components
import MarketCapChart from './components/MarketCapChart';
import TPSChart from './components/TPSChart';
import WalletBalanceChart from './components/WalletBalanceChart';

const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <TPSChart />
        </div>
        <div className="col-span-1">
          <WalletBalanceChart />
        </div>
        <div className="col-span-1">
          <MarketCapChart />
        </div>
      </div>
    </div>
  );
};

export default App;
