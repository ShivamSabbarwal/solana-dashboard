import Spinner from './Spinner';

interface ChartComponentProps {
  isLoading: boolean;
  error: Error | null;
  title?: string;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ isLoading, error, title, rightContent, children }) => {
  if (isLoading) return <Spinner />;
  if (error) return <div className="text-lg text-center p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between gap-2 align-middle">
        <h2 className="text-xl font-semibold mx-4 my-1">{title}</h2>
        {rightContent}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ChartComponent;
