import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Earthquakes from '../Earthquakes';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import { usePlotTableStore } from '@/store/plotTableStore';

// Mock the modules
vi.mock('@/api/earthquakesQuery');
vi.mock('@/context/EarthquakesContext');
vi.mock('@/store/plotTableStore');
vi.mock('../components/EarthquakesLayout/EarthquakesLayout', () => ({
  default: (props: any) => (
    <div data-testid="earthquakes-layout-component">
      <span data-testid="is-loading">{String(props.isLoading)}</span>
      <span data-testid="is-error">{String(props.isError)}</span>
      <span data-testid="data-length">{props.data?.length || 0}</span>
      <span data-testid="x-axis-key">{props.xAxisKey}</span>
      <span data-testid="y-axis-key">{props.yAxisKey}</span>
    </div>
  ),
}));

// Sample mock data
const mockEarthquakeData = [
  {
    id: '1',
    magnitude: 5.2,
    depth: 10,
    place: 'California',
    time: new Date().getTime(),
  },
  {
    id: '2',
    magnitude: 3.8,
    depth: 15,
    place: 'Alaska',
    time: new Date().getTime() - 3600000,
  },
];

describe('Earthquakes.tsx', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Setup default mocks
    (useHighlightedEarthquakeContext as any).mockReturnValue({
      highlightedEarthquake: null,
      setHighlightedEarthquake: vi.fn(),
    });

    (usePlotTableStore as any).mockReturnValue({
      selectedRecord: null,
      setSelectedRecord: vi.fn(),
      xAxisKey: 'time',
      setXAxisKey: vi.fn(),
      yAxisKey: 'magnitude',
      setYAxisKey: vi.fn(),
      filters: { startDate: null, endDate: null, minMagnitude: 0 },
    });
  });

  it('should pass loading state to layout component when data is being fetched', () => {
    // Arrange
    (useEarthquakesQuery as any).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
    });

    // Act
    render(<Earthquakes />);

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
    expect(screen.getByTestId('earthquakes-loading')).toBeInTheDocument();
    expect(screen.getByTestId('loading-plot')).toBeInTheDocument();
    expect(screen.getByTestId('loading-table')).toBeInTheDocument();
    expect(screen.queryByTestId('earthquakes-error')).toBeNull();
    expect(screen.queryByTestId('earthquakes-success')).toBeNull();
  });

  it('should render error UI and propagates error state to layout on data fetch failure', () => {
    // Arrange
    (useEarthquakesQuery as any).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
    });

    // Act
    render(<Earthquakes />);

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
    expect(screen.queryByTestId('earthquakes-loading')).toBeNull();
    expect(screen.getByTestId('earthquakes-error')).toBeInTheDocument();
    expect(screen.queryByTestId('earthquakes-success')).toBeNull();
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });

  it('should pass data and config to layout component when data fetching succeeds', () => {
    // Arrange
    (useEarthquakesQuery as any).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockEarthquakeData,
    });

    // Act
    render(<Earthquakes />);

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
    expect(screen.queryByTestId('earthquakes-loading')).toBeNull();
    expect(screen.queryByTestId('earthquakes-error')).toBeNull();
    expect(screen.getByTestId('earthquakes-success')).toBeInTheDocument();

    expect(
      screen.getByText('USGS Most Recent Earthquakes (Top 100)'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('plot-pane')).toBeInTheDocument();
    expect(screen.getByTestId('table-pane')).toBeInTheDocument();
  });
});
