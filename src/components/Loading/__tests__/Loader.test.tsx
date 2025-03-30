import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../Loader';

describe('Loader.tsx', () => {
  it('renders in the DOM', () => {
    // Arrange
    // No specific arrangement needed for a simple render test.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('skeleton-plot')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
  });

  it('renders a skeleton for PlotPane', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('skeleton-plot')).toBeInTheDocument();
  });

  it('renders a skeleton for TablePane', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Loader />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
  });
});
