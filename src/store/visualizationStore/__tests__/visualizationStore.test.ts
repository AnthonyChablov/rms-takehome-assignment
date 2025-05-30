import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act } from '@testing-library/react'; // act is essential for state updates in tests
import { useVisualizationStore } from '../visualizationStore';

describe('visualizationStore', () => {
  // Reset the store state to its initial values before each test
  beforeEach(() => {
    act(() => {
      // Set the state to the default initial value as defined in the store
      useVisualizationStore.setState({ currentPane: 'plot' });
    });
  });

  // Clean up any mocks after each test (though not strictly necessary for this simple store)
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have an initial currentPane of "plot"', () => {
    // Arrange
    // The store is already reset in beforeEach.

    // Act
    const currentPane = useVisualizationStore.getState().currentPane;

    // Assert
    expect(currentPane).toBe('plot');
  });

  it('should update currentPane to "map" when setPane("map") is called', () => {
    // Arrange
    // The store is already reset in beforeEach.
    const store = useVisualizationStore.getState();

    // Act
    // Use act to wrap the state update, as it's a synchronous update to a Zustand store.
    act(() => {
      store.setPane('map');
    });

    // Assert
    // Get the updated state after the action
    expect(useVisualizationStore.getState().currentPane).toBe('map');
  });

  it('should allow setting the same pane without issues', () => {
    // Arrange
    const store = useVisualizationStore.getState();
    act(() => {
      store.setPane('map'); // Set to 'map' first
    });

    // Act
    act(() => {
      store.setPane('map'); // Try to set to 'map' again
    });

    // Assert
    expect(useVisualizationStore.getState().currentPane).toBe('map');
  });
});
