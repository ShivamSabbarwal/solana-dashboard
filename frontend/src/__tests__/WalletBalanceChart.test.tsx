import { render, screen, waitFor } from '@testing-library/react';
import WalletBalanceChart from '../components/WalletBalanceChart';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockData = [
  { x: 'Wallet 1', y: 100 },
  { x: 'Wallet 2', y: 150 },
];

describe('WalletBalanceChart', () => {
  it('renders without crashing', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<WalletBalanceChart />);
    expect(screen.getByText('Wallet Balances')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true, error: null });
    render(<WalletBalanceChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to fetch') });
    render(<WalletBalanceChart />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('displays bar chart with data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<WalletBalanceChart />);
    await waitFor(() => expect(screen.getByText('Wallet 1')).toBeInTheDocument());
    expect(screen.getByText('Wallet 2')).toBeInTheDocument();
  });
});
