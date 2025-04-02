import { renderHook, render, act, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React, { ReactNode } from 'react';
import {
  HighlightedEarthquakeProvider,
  useHighlightedEarthquakeContext,
} from '@/context/EarthquakesContext';
import { EarthquakeRecord } from '@/types/earthquake';

// Create a wrapper component for testing hooks that need the provider
const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <HighlightedEarthquakeProvider>{children}</HighlightedEarthquakeProvider>
  );
};

describe('HighlightedEarthquakeContext', () => {
  it('should initialize with null highlighted earthquake', () => {
    // Arrange
    const wrapper = createWrapper();

    // Act
    const { result } = renderHook(() => useHighlightedEarthquakeContext(), {
      wrapper,
    });

    // Assert
    expect(result.current.highlightedEarthquake).toBeNull();
    expect(typeof result.current.setHighlightedEarthquake).toBe('function');
  });

  it('should update highlighted earthquake when setter is called', () => {
    // Arrange
    const wrapper = createWrapper();
    const mockEarthquake: EarthquakeRecord = {
      time: '2023-01-01T12:00:00.000Z',
      latitude: 37.7749,
      longitude: -122.4194,
      depth: 10,
      mag: 5.5,
      magType: 'ml',
      nst: 50,
      gap: 45,
      dmin: 0.5,
      rms: 1.2,
      net: 'test',
      id: 'test-id',
      updated: '2023-01-01T12:05:00.000Z',
      place: 'Test Location',
      type: 'earthquake',
      horizontalError: 0.2,
      depthError: 0.5,
      magError: 0.1,
      magNst: 30,
      status: 'reviewed',
      locationSource: 'test-network',
      magSource: 'test-network',
    };

    // Act
    const { result } = renderHook(() => useHighlightedEarthquakeContext(), {
      wrapper,
    });

    act(() => {
      result.current.setHighlightedEarthquake(mockEarthquake);
    });

    // Assert
    expect(result.current.highlightedEarthquake).toEqual(mockEarthquake);
  });

  it('should throw an error when used outside of provider', () => {
    // Arrange
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Act & Assert
    expect(() => {
      renderHook(() => useHighlightedEarthquakeContext());
    }).toThrow(
      'useHighlightedEarthquake must be used within a HighlightedEarthquakeProvider',
    );

    // Clean up
    consoleErrorSpy.mockRestore();
  });

  it('should allow setting the highlighted earthquake to null', () => {
    // Arrange
    const wrapper = createWrapper();
    const mockEarthquake: EarthquakeRecord = {
      time: '2023-01-01T12:00:00.000Z',
      latitude: 37.7749,
      longitude: -122.4194,
      depth: 10,
      mag: 5.5,
      magType: 'ml',
      nst: 50,
      gap: 45,
      dmin: 0.5,
      rms: 1.2,
      net: 'test',
      id: 'test-id',
      updated: '2023-01-01T12:05:00.000Z',
      place: 'Test Location',
      type: 'earthquake',
      horizontalError: 0.2,
      depthError: 0.5,
      magError: 0.1,
      magNst: 30,
      status: 'reviewed',
      locationSource: 'test-network',
      magSource: 'test-network',
    };

    // Act
    const { result } = renderHook(() => useHighlightedEarthquakeContext(), {
      wrapper,
    });

    act(() => {
      result.current.setHighlightedEarthquake(mockEarthquake);
    });

    // Verify earthquake is set
    expect(result.current.highlightedEarthquake).toEqual(mockEarthquake);

    // Act - set to null
    act(() => {
      result.current.setHighlightedEarthquake(null);
    });

    // Assert
    expect(result.current.highlightedEarthquake).toBeNull();
  });

  it('should maintain state between re-renders', () => {
    // Arrange
    const wrapper = createWrapper();
    const mockEarthquake: EarthquakeRecord = {
      time: '2023-01-01T12:00:00.000Z',
      latitude: 37.7749,
      longitude: -122.4194,
      depth: 10,
      mag: 5.5,
      magType: 'ml',
      nst: 50,
      gap: 45,
      dmin: 0.5,
      rms: 1.2,
      net: 'test',
      id: 'test-id',
      updated: '2023-01-01T12:05:00.000Z',
      place: 'Test Location',
      type: 'earthquake',
      horizontalError: 0.2,
      depthError: 0.5,
      magError: 0.1,
      magNst: 30,
      status: 'reviewed',
      locationSource: 'test-network',
      magSource: 'test-network',
    };

    // Act
    const { result, rerender } = renderHook(
      () => useHighlightedEarthquakeContext(),
      { wrapper },
    );

    act(() => {
      result.current.setHighlightedEarthquake(mockEarthquake);
    });

    // Re-render the hook
    rerender();

    // Assert
    expect(result.current.highlightedEarthquake).toEqual(mockEarthquake);
  });

  it('should share the same state across multiple consumers', () => {
    // Arrange
    const mockEarthquake: EarthquakeRecord = {
      time: '2023-01-01T12:00:00.000Z',
      latitude: 37.7749,
      longitude: -122.4194,
      depth: 10,
      mag: 5.5,
      magType: 'ml',
      nst: 50,
      gap: 45,
      dmin: 0.5,
      rms: 1.2,
      net: 'test',
      id: 'test-id',
      updated: '2023-01-01T12:05:00.000Z',
      place: 'Test Location',
      type: 'earthquake',
      horizontalError: 0.2,
      depthError: 0.5,
      magError: 0.1,
      magNst: 30,
      status: 'reviewed',
      locationSource: 'test-network',
      magSource: 'test-network',
    };

    // Create a test component that uses the context multiple times
    const TestComponent = () => {
      const context1 = useHighlightedEarthquakeContext();
      const context2 = useHighlightedEarthquakeContext();

      return (
        <div>
          <div data-testid="consumer1">
            {context1.highlightedEarthquake?.id || 'null'}
          </div>
          <div data-testid="consumer2">
            {context2.highlightedEarthquake?.id || 'null'}
          </div>
          <button
            data-testid="update-button"
            onClick={() => context1.setHighlightedEarthquake(mockEarthquake)}
          >
            Update
          </button>
        </div>
      );
    };

    // Act
    render(
      <HighlightedEarthquakeProvider>
        <TestComponent />
      </HighlightedEarthquakeProvider>,
    );

    const consumer1Element = screen.getByTestId('consumer1');
    const consumer2Element = screen.getByTestId('consumer2');
    const updateButton = screen.getByTestId('update-button');

    // Assert initial state
    expect(consumer1Element.textContent).toBe('null');
    expect(consumer2Element.textContent).toBe('null');

    // Act - trigger state update by interacting with the component
    act(() => {
      updateButton.click();
    });

    // Assert both consumers show the updated value
    expect(consumer1Element.textContent).toBe('test-id');
    expect(consumer2Element.textContent).toBe('test-id');
  });
});
