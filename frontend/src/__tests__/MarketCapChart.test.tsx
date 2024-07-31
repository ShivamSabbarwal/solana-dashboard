import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MarketCapChart from '../components/MarketCapChart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMarketCapData = {
  series: [
    { id: '1', name: 'Token A', symbol: 'A', supply: 1000, price: 10, currency: 'usd', marketCap: 10000 },
    { id: '2', name: 'Token B', symbol: 'B', supply: 500, price: 20, currency: 'usd', marketCap: 10000 },
  ],
};

jest.mock('../api', () => ({
  fetchMarketCap: jest.fn(() => Promise.resolve(mockMarketCapData)),
}));

const queryClient = new QueryClient();

// Create a helper function to wrap components with QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('MarketCapChart', () => {
  it('renders without crashing', async () => {
    renderWithQueryClient(<MarketCapChart />);
    await waitFor(() => {
      screen.queryByText(/Market Cap/i);
      expect(screen.getByText('Market Cap')).not.toBeNull();
    });

    // it('displays chart data when data is loaded', async () => {
    //   renderWithQueryClient(<MarketCapChart />);
    //   await waitFor(() => {
    //     expect(screen.queryByText('Token A')).not.toBeNull();
    //     expect(screen.queryByText('Token B')).not.toBeNull();
    //   });
  });
});
