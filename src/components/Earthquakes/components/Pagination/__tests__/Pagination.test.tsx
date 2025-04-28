import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../Pagination';

describe('AxisSelector.tsx', () => {
  it('should render in the DOM', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);

    // Assert
    const paginationElement = screen.getByTestId('pagination');
    expect(paginationElement).toBeInTheDocument();
  });

  it('should display the correct number of items per page', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);

    // Assert
    const itemsPerPageSelect = screen.getByLabelText('Items per page:');
    expect(itemsPerPageSelect).toHaveValue('10');
  });

  it('should call onItemsPerPageChange when items per page changes', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const itemsPerPageSelect = screen.getByLabelText('Items per page:');
    fireEvent.change(itemsPerPageSelect, { target: { value: '25' } });

    // Assert
    expect(mockProps.onItemsPerPageChange).toHaveBeenCalledTimes(1);
  });

  it('should call setCurrentPage when next page button is clicked', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);

    // Assert
    expect(mockProps.setCurrentPage).toHaveBeenCalledTimes(1);
  });

  it('should call setCurrentPage when previous page button is clicked', () => {
    // Arrange
    const mockProps = {
      currentPage: 2,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(prevButton);

    // Assert
    expect(mockProps.setCurrentPage).toHaveBeenCalledTimes(1);
  });

  it('should disable the previous button on the first page', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const prevButton = screen.getByRole('button', { name: 'Previous' });

    // Assert
    expect(prevButton).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    // Arrange
    const mockProps = {
      currentPage: 5,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });

    // Assert
    expect(nextButton).toBeDisabled();
  });

  it('should display the correct current page and total pages', () => {
    // Arrange
    const mockProps = {
      currentPage: 3,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
    };

    // Act
    render(<Pagination {...mockProps} />);
    const pageInfo = screen.getByText('Page 3 of 5');

    // Assert
    expect(pageInfo).toBeInTheDocument();
  });
  it('should apply the provided className', () => {
    // Arrange
    const mockProps = {
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
      onItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
      className: 'custom-class',
    };

    // Act
    render(<Pagination {...mockProps} />);
    const paginationElement = screen.getByTestId('pagination');

    // Assert
    expect(paginationElement).toHaveClass('custom-class');
  });
});
