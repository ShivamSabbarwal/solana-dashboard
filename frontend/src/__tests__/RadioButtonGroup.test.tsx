import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioButtonGroup from '../components/RadioButtonGroup';

const options = [1, 3, 6, 12];
const mockOnChange = jest.fn();

describe('RadioButtonGroup', () => {
  it('renders options correctly', () => {
    render(<RadioButtonGroup options={options} selectedOption={1} onChange={mockOnChange} labelFormatter={(option) => `${option} Hours`} />);

    options.forEach((option) => {
      expect(screen.getByText(`${option} Hours`)).toBeInTheDocument();
    });
  });

  it('highlights the selected option', () => {
    render(<RadioButtonGroup options={options} selectedOption={3} onChange={mockOnChange} labelFormatter={(option) => `${option} Hours`} />);

    expect(screen.getByText('3 Hours')).toHaveClass('text-white bg-slate-800');
  });

  it('calls onChange when an option is clicked', () => {
    render(<RadioButtonGroup options={options} selectedOption={1} onChange={mockOnChange} labelFormatter={(option) => `${option} Hours`} />);

    fireEvent.click(screen.getByText('6 Hours'));
    expect(mockOnChange).toHaveBeenCalledWith(6);
  });
});
