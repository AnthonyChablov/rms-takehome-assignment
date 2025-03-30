import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Import Vitest functions
import Error from '../Error';

describe('Error.tsx', () => {
  it('renders without crashing', () => {
    // Arrange
    // No specific arrangement needed for a simple render test.

    // Act
    render(<Error />);

    // Assert
    // If the test reaches this point without throwing an error, it has rendered.
    // You could add a simple assertion to confirm something is on the screen.
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
  });

  it('renders the default error message when no message prop is provided', () => {
    // Arrange
    // No specific arrangement needed, we're testing the default behavior.

    // Act
    render(<Error />);

    // Assert
    expect(
      screen.getByText('An unexpected error occurred.'),
    ).toBeInTheDocument();
  });

  it('renders the provided error message', () => {
    // Arrange
    const errorMessage = 'Failed to fetch data.';

    // Act
    render(<Error message={errorMessage} />);

    // Assert
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders the "Oops! Something went wrong." heading', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Error />);

    // Assert
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
  });

  it('renders the "Please try again later." suggestion', () => {
    // Arrange
    // No specific arrangement needed.

    // Act
    render(<Error />);

    // Assert
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });
});
