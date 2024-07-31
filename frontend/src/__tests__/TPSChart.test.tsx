import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TPSChart from '../components/TPSChart';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockData = [
  { x: new Date().toISOString(), y: 1000 },
  { x: new Date(Date.now() + 1000).toISOString(), y: 2000 },
];

describe('TPSChart', () => {
  it('renders without crashing', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<TPSChart />);
    expect(screen.getByText('Transactions Per Second')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true, error: null });
    render(<TPSChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to fetch') });
    render(<TPSChart />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('displays line chart with data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<TPSChart />);
    await waitFor(() => expect(screen.getByText('Transactions Per Second')).toBeInTheDocument());
  });

  it('changes time frame when a different option is selected', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, error: null });
    render(<TPSChart />);
    expect(screen.getByLabelText('1 Hours')).toBeChecked();
    fireEvent.click(screen.getByLabelText('3 Hours'));
    await waitFor(() => expect(screen.getByLabelText('3 Hours')).toBeChecked());
  });
});
