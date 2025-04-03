import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AxisSelector from '../AxisSelector';

describe('AxisSelector.tsx', () => {
  const mockProps = {
    xAxisKey: null,
    yAxisKey: null,
    numericKeys: ['value1', 'value2', 'value3'],
    handleXAxisChange: vi.fn(),
    handleYAxisChange: vi.fn(),
  };

  it('should render in the DOM', () => {
    // Arrange
    render(<AxisSelector {...mockProps} />);

    // Act
    const xAxisLabel = screen.getByLabelText('X-Axis:');
    const yAxisLabel = screen.getByLabelText('Y-Axis:');

    // Assert
    expect(xAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toBeInTheDocument();
  });

  it('should display all the numeric keys in both dropdowns', () => {
    // Arrange
    render(<AxisSelector {...mockProps} />);

    // Act
    const xOptions = screen.getAllByRole('option', { name: /value\d/ });
    const yOptions = screen.getAllByRole('option', { name: /value\d/ });

    // Assert
    expect(xOptions).toHaveLength(6); // 3 keys + 2 default options + 1 empty option
    expect(yOptions).toHaveLength(6); // 3 keys + 2 default options + 1 empty option
  });

  it('should call handleXAxisChange when X-Axis dropdown changes', () => {
    // Arrange
    render(<AxisSelector {...mockProps} />);

    // Act
    const xSelect = screen.getByLabelText('X-Axis:');
    fireEvent.change(xSelect, { target: { value: 'value1' } });

    // Assert
    expect(mockProps.handleXAxisChange).toHaveBeenCalledTimes(1);
  });

  it('should call handleYAxisChange when Y-Axis dropdown changes', () => {
    // Arrange
    render(<AxisSelector {...mockProps} />);

    // Act
    const ySelect = screen.getByLabelText('Y-Axis:');
    fireEvent.change(ySelect, { target: { value: 'value2' } });

    // Assert
    expect(mockProps.handleYAxisChange).toHaveBeenCalledTimes(1);
  });

  it('should display selected axis values when provided', () => {
    // Arrange
    const propsWithValues = {
      ...mockProps,
      xAxisKey: 'value1',
      yAxisKey: 'value2',
    };

    // Act
    render(<AxisSelector {...propsWithValues} />);

    // Assert
    const xSelect = screen.getByLabelText('X-Axis:') as HTMLSelectElement;
    const ySelect = screen.getByLabelText('Y-Axis:') as HTMLSelectElement;

    expect(xSelect.value).toBe('value1');
    expect(ySelect.value).toBe('value2');
  });

  it('should show default option when no axis is selected', () => {
    // Arrange
    render(<AxisSelector {...mockProps} />);

    // Act
    const defaultXOption = screen.getByRole('option', {
      name: 'Select X-Axis',
    });
    const defaultYOption = screen.getByRole('option', {
      name: 'Select Y-Axis',
    });

    // Assert
    expect(defaultXOption).toBeInTheDocument();
    expect(defaultYOption).toBeInTheDocument();
  });
});
