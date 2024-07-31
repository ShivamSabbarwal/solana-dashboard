import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MarketCapChart from '../components/MarketCapChart';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockData = {
  labels: ['Token A', 'Token B'],
  series: [50, 50],
};

describe('MarketCapChart', () => {
  it('renders without crashing', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<MarketCapChart />);
    expect(screen.getByText('Market Cap Distribution')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true, error: null });
    render(<MarketCapChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to fetch') });
    render(<MarketCapChart />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('displays pie chart with data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<MarketCapChart />);
    await waitFor(() => expect(screen.getByText('Token A')).toBeInTheDocument());
    expect(screen.getByText('Token B')).toBeInTheDocument();
  });

  it('changes currency when a different option is selected', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<MarketCapChart />);
    expect(screen.getByLabelText('USD')).toBeChecked();
    fireEvent.click(screen.getByLabelText('CAD'));
    await waitFor(() => expect(screen.getByLabelText('CAD')).toBeChecked());
  });
});
