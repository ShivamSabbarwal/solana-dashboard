import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WalletBalanceChart from '../components/WalletBalanceChart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockWalletBalances = {
  labels: ['Wallet 1', 'Wallet 2', 'Wallet 3'],
  series: [
    { address: '0x1', lamports: 1000, sol: 1 },
    { address: '0x2', lamports: 2000, sol: 2 },
    { address: '0x3', lamports: 3000, sol: 3 },
  ],
};

jest.mock('../api', () => ({
  fetchWalletBalances: jest.fn(() => Promise.resolve(mockWalletBalances)),
}));

const queryClient = new QueryClient();

// Create a helper function to wrap components with QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('WalletBalanceChart', () => {
  it('renders without crashing', async () => {
    renderWithQueryClient(<WalletBalanceChart />);
    await waitFor(() => {
      expect(screen.getByText('Wallet Balances')).toBeVisible();
    });
  });
  // it('displays wallet balances when data is loaded', async () => {
  //   renderWithQueryClient(<WalletBalanceChart />);
  //   await waitFor(() => {
  //     expect(screen.getByText('Wallet 1')).toBeVisible();
  //     expect(screen.getByText('Wallet 2')).toBeVisible();
  //     expect(screen.getByText('Wallet 3')).toBeVisible();
  //   });
  // });
});
