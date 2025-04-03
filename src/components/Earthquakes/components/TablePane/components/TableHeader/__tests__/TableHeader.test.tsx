import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableHeader from '../TableHeader';

describe('TableHeader.tsx', () => {
  const mockColumns = ['Name', 'Age', 'City'];

  it('should render in the DOM', () => {
    // Arrange
    // Act
    render(<TableHeader columns={mockColumns} />);

    // Assert
    expect(screen.getByRole('rowgroup')).toBeInTheDocument(); // Checks for thead
    expect(screen.getByRole('row')).toBeInTheDocument(); // Checks for tr
  });

  it('should render the correct number of column headers', () => {
    // Arrange
    // Act
    render(<TableHeader columns={mockColumns} />);

    // Assert
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells.length).toBe(mockColumns.length);
  });

  it('should render the column names correctly', () => {
    // Arrange
    // Act
    render(<TableHeader columns={mockColumns} />);

    // Assert
    mockColumns.forEach((column) => {
      expect(screen.getByText(column)).toBeInTheDocument();
    });
  });

  it('should handle an empty columns array', () => {
    // Arrange
    const emptyColumns: string[] = [];

    // Act
    render(<TableHeader columns={emptyColumns} />);

    // Assert
    expect(screen.getByRole('rowgroup')).toBeInTheDocument();
    expect(screen.getByRole('row')).toBeInTheDocument();
    expect(screen.queryByRole('columnheader')).toBeNull();
  });
});
