import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import ChartComponent from './ChartComponent';
import { fetchMarketCap } from '../api';

interface MarketCapItem {
  id: string;
  name: string;
  symbol: string;
  supply: number;
  price: number;
  currency: string;
  marketCap: number;
}
const MarketCapChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['marketCap'], queryFn: fetchMarketCap, staleTime: 60 * 1000 });

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    labels: (data?.series || [])?.map((item: MarketCapItem) => item.name),
  };

  const series = (data?.series || [])?.map((item: MarketCapItem) => item.marketCap);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <ChartComponent isLoading={isLoading} error={error} title="Market Cap">
        <ApexCharts options={options} series={series} type="pie" />
      </ChartComponent>
    </div>
  );
};

export default MarketCapChart;
