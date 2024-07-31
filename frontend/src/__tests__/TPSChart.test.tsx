import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TPSChart from '../components/TPSChart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockTPSData = {
  series: [{ x: new Date().toISOString(), y: 50 }],
  hours: [1, 3, 6, 12],
};

jest.mock('../api', () => ({
  fetchTransactionsPerSecond: jest.fn(() => Promise.resolve(mockTPSData)),
}));

const queryClient = new QueryClient();

// Create a helper function to wrap components with QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('TPSChart', () => {
  it('renders without crashing', async () => {
    renderWithQueryClient(<TPSChart />);
    await waitFor(() => {
      expect(screen.getByText('Transactions Per Second')).toBeVisible();
    });
  });
  // it('displays radio buttons when data is loaded', async () => {
  //   renderWithQueryClient(<TPSChart />);
  //   await waitFor(() => {
  //     expect(screen.getByText('1 Hours')).toBeVisible();
  //     expect(screen.getByText('3 Hours')).toBeVisible();
  //     expect(screen.getByText('6 Hours')).toBeVisible();
  //     expect(screen.getByText('12 Hours')).toBeVisible();
  //   });
  // });
  // it('changes chart data when a radio button is clicked', async () => {
  //   renderWithQueryClient(<TPSChart />);
  //   fireEvent.click(screen.getByText('3 Hours'));
  //   await waitFor(() => {
  //     expect(screen.getByText('3 Hours')).toHaveClass('text-white bg-slate-800');
  //   });
  // });
});
