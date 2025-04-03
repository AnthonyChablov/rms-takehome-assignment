import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import PlotTablePaneLayout, {
  PlotTablePaneLayoutProps,
} from '../PlotTablePaneLayout';
import { EarthquakeRecord } from '@/types/earthquake';
// Mock the imported components
vi.mock('./PlotPane/PlotPane', () => ({
  default: ({
    data,
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
  }: {
    data: any[];
    xAxisKey: string | null;
    setXAxisKey: (key: string) => void;
    yAxisKey: string | null;
    setYAxisKey: (key: string) => void;
  }) => (
    <div data-testid="plot-pane">
      <span>Plot Pane</span>
      <button onClick={() => setXAxisKey('mag')}>Set X Axis</button>
      <button onClick={() => setYAxisKey('depth')}>Set Y Axis</button>
      <span>Data count: {data.length}</span>
      <span>X Axis: {xAxisKey || 'none'}</span>
      <span>Y Axis: {yAxisKey || 'none'}</span>
    </div>
  ),
}));

vi.mock('./TablePane/TablePane', () => ({
  default: ({ data }: { data: any[] }) => (
    <div data-testid="table-pane">
      <span>Table Pane</span>
      <span>Rows: {data.length}</span>
    </div>
  ),
}));

vi.mock('@/components/Loading/Loading', () => ({
  default: () => <div data-testid="loading-component">Loading...</div>,
}));

vi.mock('@/components/Error/Error', () => ({
  default: () => <div data-testid="error-component">Error occurred</div>,
}));

vi.mock('@/components/Layout/Container', () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="container" className={className}>
      {children}
    </div>
  ),
}));

describe('PlotTablePaneLayout', () => {
  // Sample data for testing
  const mockData: EarthquakeRecord[] = [
    {
      time: '1649012345000',
      latitude: 34.056,
      longitude: -118.254,
      depth: 10.5,
      mag: 3.2,
      magType: 'md',
      nst: 32,
      gap: 120,
      dmin: 0.02,
      rms: 0.15,
      net: 'ci',
      id: 'ci38500000',
      updated: '1649012545000',
      place: 'Los Angeles, CA',
      type: 'earthquake',
      horizontalError: 0.2,
      depthError: 0.5,
      magError: 0.1,
      magNst: 25,
      status: 'reviewed',
      locationSource: 'ci',
      magSource: 'ci',
    },
    {
      time: '1649013456000',
      latitude: 37.7749,
      longitude: -122.4194,
      depth: 8.2,
      mag: 2.5,
      magType: 'md',
      nst: 20,
      gap: 110,
      dmin: 0.03,
      rms: 0.12,
      net: 'nc',
      id: 'nc73597231',
      updated: '1649013556000',
      place: 'San Francisco, CA',
      type: 'earthquake',
      horizontalError: 0.3,
      depthError: 0.4,
      magError: 0.1,
      magNst: 18,
      status: 'automatic',
      locationSource: 'nc',
      magSource: 'nc',
    },
  ];

  // Default props
  const defaultProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
    isLoading: false,
    isError: false,
    data: mockData,
    xAxisKey: 'mag',
    setXAxisKey: vi.fn() as (key: string) => void,
    yAxisKey: 'depth',
    setYAxisKey: vi.fn() as (key: string) => void,
    highlighted: null,
    setHighlighted: vi.fn() as React.Dispatch<
      React.SetStateAction<EarthquakeRecord | null>
    >,
    selected: null,
    setSelected: vi.fn() as (item: EarthquakeRecord | null) => void,
  };

  it('renders in the DOM', (): void => {
    // Arrange
    // Using default props

    // Act
    const result: RenderResult = render(
      <PlotTablePaneLayout {...defaultProps} />,
    );

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', (): void => {
    // Arrange
    const loadingProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
      ...defaultProps,
      isLoading: true,
    };

    // Act
    render(<PlotTablePaneLayout {...loadingProps} />);

    // Assert
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
    expect(screen.getByTestId('earthquakes-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('plot-pane')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-pane')).not.toBeInTheDocument();
  });

  it('displays error state when isError is true', (): void => {
    // Arrange
    const errorProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
      ...defaultProps,
      isError: true,
    };

    // Act
    render(<PlotTablePaneLayout {...errorProps} />);

    // Assert
    expect(screen.getByTestId('error-component')).toBeInTheDocument();
    expect(screen.getByTestId('earthquakes-error')).toBeInTheDocument();
    expect(screen.getByTestId('plot-pane')).toBeInTheDocument(); // Empty plot pane is still rendered
    expect(screen.getByTestId('table-pane')).toBeInTheDocument(); // Empty table pane is still rendered
  });

  it('displays success state with data when neither loading nor error', (): void => {
    // Arrange
    const successProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
      ...defaultProps,
      isLoading: false,
      isError: false,
    };

    // Act
    render(<PlotTablePaneLayout {...successProps} />);

    // Assert
    expect(screen.getByTestId('earthquakes-success')).toBeInTheDocument();
    expect(screen.getByTestId('plot-pane')).toBeInTheDocument();
    expect(screen.getByTestId('table-pane')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-component')).not.toBeInTheDocument();
  });

  it('passes correct props to child components', (): void => {
    // Arrange
    const customProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
      ...defaultProps,
      xAxisKey: 'longitude',
      yAxisKey: 'latitude',
    };

    // Act
    render(<PlotTablePaneLayout {...customProps} />);

    // Assert
    const plotPane: HTMLElement = screen.getByTestId('plot-pane');
    expect(plotPane).toHaveTextContent('X Axis: longitude');
    expect(plotPane).toHaveTextContent('Y Axis: latitude');
    expect(plotPane).toHaveTextContent('Data count: 2');

    const tablePane: HTMLElement = screen.getByTestId('table-pane');
    expect(tablePane).toHaveTextContent('Rows: 2');
  });

  it('renders with custom title', (): void => {
    // Arrange
    const customTitleProps: PlotTablePaneLayoutProps<EarthquakeRecord> = {
      ...defaultProps,
      title: 'Custom Earthquake Title',
    };

    // Act
    render(<PlotTablePaneLayout {...customTitleProps} />);

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
    // Note: Title is passed to TablePane, which is mocked in our tests
  });

  it('uses default title when none provided', (): void => {
    // Arrange
    const propsWithoutTitle: Omit<
      PlotTablePaneLayoutProps<EarthquakeRecord>,
      'title'
    > = { ...defaultProps };
    delete (propsWithoutTitle as any).title;

    // Act
    render(<PlotTablePaneLayout {...propsWithoutTitle} />);

    // Assert
    expect(screen.getByTestId('earthquakes')).toBeInTheDocument();
    // Default title would be passed to TablePane
  });
});
