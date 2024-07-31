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
    staleTime: 60 * 1000,
  });

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: { type: 'datetime' as const, title: { text: 'Time' } },
    yaxis: { title: { text: 'TPS' } },
    stroke: { curve: 'smooth' as const, width: 1.5 },
  };

  const series = [{ name: 'TPS', data: data?.series || [] }];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <ChartComponent
        isLoading={isLoading}
        error={error}
        title="Transactions Per Second"
        rightContent={
          <RadioButtonGroup
            options={data?.hours}
            selectedOption={selectedHours}
            onChange={setSelectedHours}
            labelFormatter={(option) => `${option} Hours`}
          />
        }
      >
        <ApexCharts options={options} series={series} type="line" />
      </ChartComponent>
    </div>
  );
};

export default TPSChart;
