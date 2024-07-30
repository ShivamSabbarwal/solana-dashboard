// src/components/WalletBalanceBarChart.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import ChartComponent from './ChartComponent';
import { fetchWalletBalances } from '../api';

interface Wallet {
  address: string;
  lamports: number;
  sol: number;
}

const WalletBalanceChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['walletBalances'], queryFn: fetchWalletBalances });

  const options = {
    chart: { toolbar: { show: false } },
    xaxis: {
      categories: data?.labels,
      title: { text: 'Wallet Address' },
    },
    yaxis: { title: { text: 'Balance (SOL)' } },
    plotOptions: { bar: { horizontal: true, endingShape: 'rounded' } },
    dataLabels: { enabled: false },
    title: { text: 'Wallet Balances' },
  };

  const series = [
    {
      name: 'Balance',
      data: (data?.series || [])?.map((wallet: Wallet) => wallet.sol) || [],
    },
  ];

  return (
    <div className="p-4">
      <ChartComponent isLoading={isLoading} error={error}>
        <ApexCharts options={options} series={series} type="bar" />
      </ChartComponent>
    </div>
  );
};

export default WalletBalanceChart;
