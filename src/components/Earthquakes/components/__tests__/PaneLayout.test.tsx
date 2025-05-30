import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaneLayout from '../PaneLayout'; // Adjust the path if necessary

// Define some mock data for the props
const mockData = [
  { id: '1', value: 10, category: 'A' },
  { id: '2', value: 20, category: 'B' },
];

class MockResizeObserver {
  // The constructor might receive a callback, but we don't need to do anything with it for this mock.
  constructor(callback: ResizeObserverCallback) {
    // You could store the callback if you needed to trigger it manually in more advanced tests,
    // but for a basic "rendering" test, it's usually not necessary.
  }

  observe() {
    // Mock the observe method. It does nothing.
  }

  unobserve() {
    // Mock the unobserve method. It does nothing.
  }

  disconnect() {
    // Mock the disconnect method. It does nothing.
  }
}

// Assign the mock to the global window object.
// This makes ResizeObserver available to any component that tries to use it.
global.ResizeObserver = MockResizeObserver;

describe('PaneLayout.tsx', () => {
  it('should render in the DOM with required props', () => {
    // Provide all the required props with some sensible default/mock values
    render(
      <PaneLayout
        isLoading={false}
        isError={false}
        data={mockData}
        xAxisKey="category" // Assuming a string key for the x-axis
        setXAxisKey={vi.fn()} // Mock a function
        yAxisKey="value" // Assuming a string key for the y-axis
        setYAxisKey={vi.fn()} // Mock a function
        highlighted={null} // Or an initial valid highlighted item if required
        setHighlighted={vi.fn()}
        selected={new Set([])} // An empty array if no items are selected initially
        setSelected={vi.fn()}
        addSelected={vi.fn()}
        removeSelected={vi.fn()}
        isSelected={() => false} // A function that returns false for initial state
        title="Test Pane Layout"
        currentPage={1}
        setCurrentPage={vi.fn()}
        itemsPerPage={10}
        setItemsPerPage={vi.fn()}
        currentPane="default" // Or whatever a valid initial pane value is
        setCurrentPane={vi.fn()}
      />,
    );

    expect(screen.getByText('Test Pane Layout')).toBeInTheDocument(); // Check for the title
    expect(screen.getByText('category')).toBeInTheDocument(); // If xAxisKey is displayed
  });
});
