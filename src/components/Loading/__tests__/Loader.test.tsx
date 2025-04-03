import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../Loading';

describe('Loader.tsx', () => {
  it('should render in the DOM', () => {
    // Arrange
    // No specific arrangement needed for a simple render test.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('loading-plot')).toBeInTheDocument();
    expect(screen.getByTestId('loading-table')).toBeInTheDocument();
  });

  it('should renders a skeleton for PlotPane', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('loading-plot')).toBeInTheDocument();
  });

  it('should renders a skeleton for TablePane', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('loading-table')).toBeInTheDocument();
  });
});
