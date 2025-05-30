import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MapPane from '../MapPane';

describe('MapPane.tsx', () => {
  const mockData = [
    {
      id: '1',
      latitude: 40.7128,
      longitude: -74.006,
      title: 'New York',
      magnitude: 2.5,
    },
    {
      id: '2',
      latitude: 34.0522,
      longitude: -118.2437,
      title: 'Los Angeles',
      depth: 10,
    },
    {
      id: '3',
      latitude: 51.5074,
      longitude: -0.1278,
      title: 'London',
      time: Date.now(),
    },
  ];

  const mockSetHighlighted = vi.fn();
  const mockAddSelected = vi.fn();
  const mockRemoveSelected = vi.fn();
  const mockIsSelected = vi.fn((id) => new Set(['1']).has(id)); // Mock '1' as selected

  const defaultProps = {
    data: mockData,
    xAxisKey: 'longitude',
    setXAxisKey: vi.fn(),
    yAxisKey: 'latitude',
    setYAxisKey: vi.fn(),
    setHighlighted: mockSetHighlighted,
    addSelected: mockAddSelected,
    removeSelected: mockRemoveSelected,
    isSelected: mockIsSelected,
    paneControls: <div data-testid="mock-pane-controls">Pane Controls</div>,
  };

  it('should render in the DOM', () => {
    // Arrange - props are set in defaultProps
    render(<MapPane {...defaultProps} />);

    // Act - nothing specific to act on for initial render check

    // Assert
    expect(screen.getByTestId('map-pane')).toBeInTheDocument();
  });
});
