import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import ChartComponent from './ChartComponent';
import { fetchMarketCap } from '../api';
import RadioButtonGroup from './RadioButtonGroup';
import { Currency } from '../types';

interface MarketCapItem {
  id: string;
  name: string;
  symbol: string;
  supply: number;
  price: number;
  currency: Currency;
  marketCap: number;
}
const MarketCapChart: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('usd');

  const { data, isLoading, error } = useQuery({ queryKey: ['marketCap', selectedCurrency], queryFn: () => fetchMarketCap(selectedCurrency) });

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    labels: (data?.series || [])?.map((item: MarketCapItem) => item.name),
    legend: {
      position: 'bottom' as const,
    },
    title: {
      text: 'Market Cap Distribution',
    },
  };

  const series = (data?.series || [])?.map((item: MarketCapItem) => item.marketCap);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <RadioButtonGroup
          options={data?.currencies}
          selectedOption={selectedCurrency}
          onChange={setSelectedCurrency}
          labelFormatter={(option) => option.toUpperCase()}
        />
      </div>
      <ChartComponent isLoading={isLoading} error={error}>
        <ApexCharts options={options} series={series} type="pie" />
      </ChartComponent>
    </div>
  );
};

export default MarketCapChart;
