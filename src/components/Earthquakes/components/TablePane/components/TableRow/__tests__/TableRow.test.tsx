import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TableRow from '../TableRow';
import { TableRowProps } from '../TableRow';

// Mock the cn utility function to avoid actual class name generation in tests
vi.mock('@/utils/utils', () => ({
  cn: (...classes: (string | boolean | undefined | null)[]) =>
    classes.filter(Boolean).join(' '),
}));

describe('TableRow.tsx', () => {
  const mockRow = { id: 'row-1', name: 'John Doe', age: 30, city: 'New York' };
  const mockColumns = ['name', 'age', 'city'];
  const mockIndex = 0;
  const mockHighlighted = null;
  const mockSelected = null;
  const mockHandleClick = vi.fn();

  const renderComponent = (
    props: Partial<TableRowProps<typeof mockRow>> = {},
  ) => {
    render(
      <TableRow
        row={mockRow}
        index={mockIndex}
        columns={mockColumns}
        highlighted={mockHighlighted}
        selected={mockSelected}
        handleClick={mockHandleClick}
        {...props}
      />,
    );
  };

  it('should render in the DOM', () => {
    renderComponent();
    expect(screen.getByRole('row')).toBeInTheDocument();
  });

  it('should render the correct number of cells based on columns', () => {
    renderComponent();
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBe(mockColumns.length);
  });

  it('should apply the correct background class for even rows', () => {
    renderComponent({ index: 0 });
    expect(screen.getByRole('row')).toHaveClass('bg-white');
  });

  it('should apply the correct background class for odd rows', () => {
    renderComponent({ index: 1 });
    expect(screen.getByRole('row')).toHaveClass('bg-gray-50');
  });

  it('should apply hover classes', () => {
    renderComponent();
    expect(screen.getByRole('row')).toHaveClass('hover:cursor-pointer');
    expect(screen.getByRole('row')).toHaveClass('hover:bg-blue-100');
    expect(screen.getByRole('row')).toHaveClass('transition-colors');
    expect(screen.getByRole('row')).toHaveClass('duration-200');
  });

  it('should apply highlighted class when row is highlighted', () => {
    renderComponent({ highlighted: mockRow });
    expect(screen.getByRole('row')).toHaveClass('bg-blue-200');
  });

  it('should not apply highlighted class when row is not highlighted', () => {
    renderComponent();
    expect(screen.getByRole('row')).not.toHaveClass('bg-blue-200');
  });

  it('should apply selected classes when row is selected', () => {
    renderComponent({ selected: mockRow });
    expect(screen.getByRole('row')).toHaveClass('bg-green-100');
    expect(screen.getByRole('row')).toHaveClass('border-l-4');
    expect(screen.getByRole('row')).toHaveClass('border-green-500');
    expect(screen.getByRole('row')).toHaveClass('shadow-sm');
  });

  it('should not apply selected classes when row is not selected', () => {
    renderComponent();
    expect(screen.getByRole('row')).not.toHaveClass('bg-green-100');
    expect(screen.getByRole('row')).not.toHaveClass('border-l-4');
    expect(screen.getByRole('row')).not.toHaveClass('border-green-500');
    expect(screen.getByRole('row')).not.toHaveClass('shadow-sm');
  });

  it('should call handleClick when the row is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('row'));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith(mockRow);
  });
});
