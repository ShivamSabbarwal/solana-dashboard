interface ChartComponentProps {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ isLoading, error, children }) => {
  if (isLoading) return <div className="text-lg text-center p-4">Loading...</div>;
  if (error) return <div className="text-lg text-center p-4 text-red-500">Error: {error.message}</div>;

  return <div className="bg-white shadow-md ring-slate-500 rounded-lg p-4 mb-4">{children}</div>;
};

export default ChartComponent;
