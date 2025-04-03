import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Mock the ReactQueryDevtools component
vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: vi.fn(() => null),
}));

describe('App.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the App component in DOM', () => {
    // Arrange
    render(<App />);
    // Act
    const appComponent = screen.getByTestId('app');
    // Assert
    expect(appComponent).toBeInTheDocument();
  });

  it('should render the Earthquakes component loading', () => {
    // Arrange
    render(<App />);
    // Act
    const earthquakesComponent = screen.getByTestId('earthquakes');
    // Assert
    expect(earthquakesComponent).toBeInTheDocument();
  });

  it('should render the ReactQueryDevtools', () => {
    // Arrange
    render(<App />);
    // Assert
    expect(ReactQueryDevtools).toHaveBeenCalledTimes(1);
  });
});
