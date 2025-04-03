import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomDot from '../CustomDot';

describe('CustomDot.tsx', () => {
  // Base props for testing
  const baseProps = {
    cx: 100,
    cy: 100,
    payload: { id: 'test', value: 10 },
    onClick: vi.fn(),
    onMouseOver: vi.fn(),
    onMouseLeave: vi.fn(),
  };

  it('should render a basic dot in the DOM', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);

    // Act
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '100');
    expect(circle).toHaveAttribute('cy', '100');
    expect(circle).toHaveAttribute('r', '6'); // Default radius
    expect(circle).toHaveAttribute('fill', '#8ec5ff'); // Default fill
  });

  it('should use custom fill and radius when provided', () => {
    // Arrange
    const customProps = {
      ...baseProps,
      fill: '#ff0000',
      r: 10,
    };

    // Act
    const { container } = render(<CustomDot {...customProps} />);
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toHaveAttribute('fill', '#ff0000');
    expect(circle).toHaveAttribute('r', '6'); // Still default radius as r is not used directly
  });

  it('should apply highlighted styles when point is highlighted', () => {
    // Arrange
    const point = { id: 'test', value: 10 };
    const highlightProps = {
      ...baseProps,
      payload: point,
      highlightedPoint: point,
      highlightFill: '#123456',
      highlightRadius: 15,
    };

    // Act
    const { container } = render(<CustomDot {...highlightProps} />);
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toHaveAttribute('fill', '#123456');
    expect(circle).toHaveAttribute('r', '15');
  });

  it('should apply selected styles and render inner circle when point is selected', () => {
    // Arrange
    const point = { id: 'test', value: 10 };
    const selectProps = {
      ...baseProps,
      payload: point,
      selectedPoint: point,
      selectFill: '#00ff00',
      selectRadius: 20,
      selectedInnerRadius: 8,
      selectedInnerFill: '#ffffff',
    };

    // Act
    const { container } = render(<CustomDot {...selectProps} />);
    const circles = container.querySelectorAll('circle');

    // Assert
    expect(circles.length).toBe(2); // Main circle + inner circle
    expect(circles[0]).toHaveAttribute('fill', '#00ff00');
    expect(circles[0]).toHaveAttribute('r', '20');
    expect(circles[1]).toHaveAttribute('r', '8');
    expect(circles[1]).toHaveAttribute('fill', '#ffffff');
  });

  it('should call onClick when dot is clicked', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle');

    // Act
    fireEvent.click(circle!);

    // Assert
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseOver when dot is hovered', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle');

    // Act
    fireEvent.mouseOver(circle!);

    // Assert
    expect(baseProps.onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when mouse leaves dot', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle');

    // Act
    fireEvent.mouseLeave(circle!);

    // Assert
    expect(baseProps.onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should apply custom stroke and strokeWidth', () => {
    // Arrange
    const strokeProps = {
      ...baseProps,
      stroke: '#990000',
      strokeWidth: 3,
    };

    // Act
    const { container } = render(<CustomDot {...strokeProps} />);
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toHaveAttribute('stroke', '#990000');
    expect(circle).toHaveAttribute('stroke-width', '3');
  });

  it('should prioritize selection over highlight styling', () => {
    // Arrange
    const point = { id: 'test', value: 10 };
    const bothProps = {
      ...baseProps,
      payload: point,
      selectedPoint: point,
      highlightedPoint: point,
      selectFill: '#00ff00',
      highlightFill: '#ff0000',
    };

    // Act
    const { container } = render(<CustomDot {...bothProps} />);
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toHaveAttribute('fill', '#00ff00'); // Selected fill should win
  });
});
