import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Map from '../Map';

describe('Map.tsx', () => {
  it('should render in the DOM', () => {
    // Arrange

    // Act
    const { container } = render(<Map />);

    // Assert
    expect(container).toBeInTheDocument();
  });
});
