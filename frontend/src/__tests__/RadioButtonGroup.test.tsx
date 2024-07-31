// src/components/__tests__/RadioButtonGroup.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioButtonGroup from '../components/RadioButtonGroup';

describe('RadioButtonGroup', () => {
  it('renders radio buttons correctly', () => {
    const options = ['Option 1', 'Option 2'];
    render(<RadioButtonGroup options={options} selectedOption="Option 1" onChange={() => {}} />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('marks the selected option', () => {
    const options = ['Option 1', 'Option 2'];
    render(<RadioButtonGroup options={options} selectedOption="Option 1" onChange={() => {}} />);
    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();
  });

  it('calls onChange when a different option is selected', () => {
    const onChangeMock = jest.fn();
    const options = ['Option 1', 'Option 2'];
    render(<RadioButtonGroup options={options} selectedOption="Option 1" onChange={onChangeMock} />);
    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(onChangeMock).toHaveBeenCalledWith('Option 2');
  });
});
