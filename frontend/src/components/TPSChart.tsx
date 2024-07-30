import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import ChartComponent from './ChartComponent';
import { fetchTransactionsPerSecond } from '../api';
import RadioButtonGroup from './RadioButtonGroup';
import { Hours } from '../types';

const TPSChart: React.FC = () => {
  const [selectedHours, setSelectedHours] = useState<Hours>(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactionsPerSecond', selectedHours],
    queryFn: () => fetchTransactionsPerSecond(selectedHours),
  });

  const options = {
    chart: { toolbar: { show: false } },
    xaxis: { type: 'datetime' as const, title: { text: 'Time' } },
    yaxis: { title: { text: 'TPS' } },
    stroke: { curve: 'smooth' as const },

    title: {
      text: 'Transactions Per Second',
      // align: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [{ name: 'TPS', data: data?.series || [] }];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <RadioButtonGroup
          options={data?.hours}
          selectedOption={selectedHours}
          onChange={setSelectedHours}
          labelFormatter={(option) => `${option} Hours`}
        />
      </div>
      <ChartComponent isLoading={isLoading} error={error}>
        <ApexCharts options={options} series={series} type="line" />
      </ChartComponent>
    </div>
  );
};

export default TPSChart;
