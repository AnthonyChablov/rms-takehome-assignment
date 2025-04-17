import React from 'react';
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
  interface MockRow {
    id: string;
    name: string;
    age: number;
    city: string;
  }
  const mockRow: MockRow = {
    id: 'row-1',
    name: 'John Doe',
    age: 30,
    city: 'New York',
  };
  const mockColumns: (keyof MockRow)[] = ['name', 'age', 'city'];
  const mockIndex = 0;
  const mockHighlighted: MockRow | null = null;
  const mockSelected: Set<string | number> = new Set(['row-1']);
  const mockHandleClick = vi.fn();
  const mockSetHighlighted = vi.fn();

  const renderComponent = (props: Partial<TableRowProps<MockRow>> = {}) => {
    render(
      <table>
        <tbody>
          <TableRow
            row={mockRow}
            index={mockIndex}
            columns={mockColumns}
            highlighted={mockHighlighted}
            selected={new Set()} // Initialize with an empty Set if not provided
            handleClick={mockHandleClick}
            setHighlighted={mockSetHighlighted}
            {...props}
          />
        </tbody>
      </table>,
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
    renderComponent({ selected: mockSelected });
    expect(screen.getByRole('row')).toHaveClass('bg-green-100');
    expect(screen.getByRole('row')).toHaveClass('border-l-4');
    expect(screen.getByRole('row')).toHaveClass('border-green-500');
    expect(screen.getByRole('row')).toHaveClass('shadow-sm');
  });

  it('should not apply selected classes when row is not selected', () => {
    renderComponent({ selected: new Set() });
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

  it('should render cells with correct content', () => {
    renderComponent();
    mockColumns.forEach((column) => {
      expect(screen.getByText(String(mockRow[column]))).toBeInTheDocument();
    });
  });

  it('should call setHighlighted with the row on mouse enter', () => {
    renderComponent();
    fireEvent.mouseEnter(screen.getByRole('row'));
    expect(mockSetHighlighted).toHaveBeenCalledTimes(1);
    expect(mockSetHighlighted).toHaveBeenCalledWith(mockRow);
  });

  it('should call setHighlighted with null on mouse leave', () => {
    renderComponent();
    fireEvent.mouseLeave(screen.getByRole('row'));
    expect(mockSetHighlighted).toHaveBeenCalledTimes(1);
    expect(mockSetHighlighted).toHaveBeenCalledWith(null);
  });

  it('should call setHighlighted with the correct row on multiple mouse enter and leave events', () => {
    const mockRow2: MockRow = {
      id: 'row-2',
      name: 'Jane Smith',
      age: 25,
      city: 'Los Angeles',
    };
    render(
      <table>
        <tbody>
          <TableRow
            row={mockRow}
            index={mockIndex}
            columns={mockColumns}
            highlighted={mockHighlighted}
            selected={new Set()}
            handleClick={mockHandleClick}
            setHighlighted={mockSetHighlighted}
            data-testid={`table-row-${mockIndex}`}
          />
          <TableRow
            row={mockRow2}
            index={mockIndex + 1}
            columns={mockColumns}
            highlighted={mockHighlighted}
            selected={new Set()}
            handleClick={mockHandleClick}
            setHighlighted={mockSetHighlighted}
            data-testid={`table-row-${mockIndex + 1}`}
          />
        </tbody>
      </table>,
    );

    const row1 = screen.getByTestId(`table-row-${mockIndex}`);
    const row2 = screen.getByTestId(`table-row-${mockIndex + 1}`);

    fireEvent.mouseEnter(row1);
    expect(mockSetHighlighted).toHaveBeenCalledWith(mockRow);

    fireEvent.mouseLeave(row1);
    expect(mockSetHighlighted).toHaveBeenCalledWith(null);

    fireEvent.mouseEnter(row2);
    expect(mockSetHighlighted).toHaveBeenCalledWith(mockRow2);

    fireEvent.mouseLeave(row2);
    expect(mockSetHighlighted).toHaveBeenCalledWith(null);

    expect(mockSetHighlighted).toHaveBeenCalledTimes(4);
  });
});
