import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomDot from '../CustomDot';

describe('CustomDot.tsx', () => {
  interface Payload {
    id: string | number;
    value: number;
  }

  // Base props for testing
  const baseProps = {
    cx: 100,
    cy: 100,
    payload: { id: 'test', value: 10 } as Payload,
    onClick: vi.fn(),
    onMouseOver: vi.fn(),
    onMouseLeave: vi.fn(),
  };

  it('should render a basic dot in the DOM with default styles', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);

    // Act
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '100');
    expect(circle).toHaveAttribute('cy', '100');
    expect(circle).toHaveAttribute('r', '6'); // defaultRadius
    expect(circle).toHaveAttribute('fill', '#8ec5ff'); // defaultFill
    expect(circle).toHaveAttribute('stroke', '#155dfc'); // Default stroke
    expect(circle).toHaveAttribute('stroke-width', '1'); // Default strokeWidth
  });

  it('should apply highlighted styles when point is highlighted', () => {
    // Arrange
    const point: Payload = { id: 'test', value: 10 };
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
    const point: Payload = { id: 'test', value: 10 };
    const selectProps = {
      ...baseProps,
      payload: point,
      selectedPoints: new Set([point.id]),
      selectFill: '#00ff00',
      selectRadius: 20,
      selectedInnerRadius: 8,
      selectedInnerFill: '#ffffff',
      selectedStroke: '#0000ff',
      selectedStrokeWidth: 2,
    };

    // Act
    const { container } = render(<CustomDot {...selectProps} />);
    const circles = container.querySelectorAll('circle');

    // Assert
    expect(circles.length).toBe(2); // Main circle + inner circle
    expect(circles[0]).toHaveAttribute('fill', '#00ff00');
    expect(circles[0]).toHaveAttribute('r', '20');
    expect(circles[0]).toHaveAttribute('stroke', '#0000ff');
    expect(circles[0]).toHaveAttribute('stroke-width', '2');
    expect(circles[1]).toHaveAttribute('r', '8');
    expect(circles[1]).toHaveAttribute('fill', '#ffffff');
  });

  it('should call onClick when dot is clicked', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle')!;

    // Act
    fireEvent.click(circle);

    // Assert
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseOver when dot is hovered', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle')!;

    // Act
    fireEvent.mouseOver(circle);

    // Assert
    expect(baseProps.onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when mouse leaves dot', () => {
    // Arrange
    const { container } = render(<CustomDot {...baseProps} />);
    const circle = container.querySelector('circle')!;

    // Act
    fireEvent.mouseLeave(circle);

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
    const point: Payload = { id: 'test', value: 10 };
    const bothProps = {
      ...baseProps,
      payload: point,
      selectedPoints: new Set([point.id]),
      highlightedPoint: point,
      selectFill: '#00ff00',
      highlightFill: '#ff0000',
      selectRadius: 15,
      highlightRadius: 10,
    };

    // Act
    const { container } = render(<CustomDot {...bothProps} />);
    const circle = container.querySelector('circle');

    // Assert
    expect(circle).toHaveAttribute('fill', '#00ff00'); // Selected fill should win
    expect(circle).toHaveAttribute('r', '15'); // Selected radius should win
  });
});
