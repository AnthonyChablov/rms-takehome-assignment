import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollToElement } from '../useScrollToElement';

describe('useScrollToElement', () => {
  // Mock DOM elements and methods
  let containerElement: HTMLDivElement;
  let highlightedElement: HTMLDivElement;
  let mockScrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Arrange (Common setup)
    // Create mock DOM elements
    containerElement = document.createElement('div');
    highlightedElement = document.createElement('div');
    highlightedElement.id = 'test-id';

    // Setup mock dimensions and positions
    vi.spyOn(containerElement, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 500,
      left: 0,
      right: 100,
      width: 100,
      height: 400,
      x: 0,
      y: 100,
      toJSON: () => {},
    });

    // Mock document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'test-id') return highlightedElement;
      return null;
    });

    // Mock scrollTo
    mockScrollTo = vi.fn();
    containerElement.scrollTo = mockScrollTo;

    // Setup offsets
    Object.defineProperty(containerElement, 'offsetTop', { value: 50 });
    Object.defineProperty(highlightedElement, 'offsetTop', { value: 200 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not scroll when highlighted is null', () => {
    // Arrange
    const containerRef = { current: containerElement };

    // Act
    renderHook(() => useScrollToElement(null, containerRef));

    // Assert
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when highlighted has no id', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { name: 'test' };

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when containerRef is null', () => {
    // Arrange
    const containerRef = { current: null };
    const highlighted = { id: 'test-id' };

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(document.getElementById).not.toHaveBeenCalled();
  });

  it('should not scroll when element with id does not exist', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { id: 'non-existent-id' };
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when element is fully visible in viewport', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { id: 'test-id' };

    // Element is within viewport
    vi.spyOn(highlightedElement, 'getBoundingClientRect').mockReturnValue({
      top: 150,
      bottom: 250,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 150,
      toJSON: () => {},
    });

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should scroll when element is above viewport', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { id: 'test-id' };

    // Element is above viewport
    vi.spyOn(highlightedElement, 'getBoundingClientRect').mockReturnValue({
      top: 50,
      bottom: 150,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 50,
      toJSON: () => {},
    });

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150, // 200 (highlightedElement.offsetTop) - 50 (containerElement.offsetTop)
      behavior: 'smooth',
    });
  });

  it('should scroll when element is below viewport', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { id: 'test-id' };

    // Element is below viewport
    vi.spyOn(highlightedElement, 'getBoundingClientRect').mockReturnValue({
      top: 450,
      bottom: 550,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 450,
      toJSON: () => {},
    });

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150, // 200 (highlightedElement.offsetTop) - 50 (containerElement.offsetTop)
      behavior: 'smooth',
    });
  });

  it('should scroll to element when highlighted changes', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const initialHighlighted = { id: 'test-id-1' };
    const newHighlighted = { id: 'test-id' };

    // Element is below viewport
    vi.spyOn(highlightedElement, 'getBoundingClientRect').mockReturnValue({
      top: 550,
      bottom: 650,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 550,
      toJSON: () => {},
    });

    // Act - Part 1
    const { rerender } = renderHook(
      ({ highlighted }) => useScrollToElement(highlighted, containerRef),
      { initialProps: { highlighted: initialHighlighted } },
    );

    // Assert - Part 1
    expect(mockScrollTo).not.toHaveBeenCalled();

    // Act - Part 2
    rerender({ highlighted: newHighlighted });

    // Assert - Part 2
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150,
      behavior: 'smooth',
    });
  });

  it('should use provided container ref without creating a new one', () => {
    // Arrange
    const containerRef = { current: containerElement };
    const highlighted = { id: 'test-id' };

    // Element is below viewport
    vi.spyOn(highlightedElement, 'getBoundingClientRect').mockReturnValue({
      top: 550,
      bottom: 650,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 550,
      toJSON: () => {},
    });

    // Act
    renderHook(() => useScrollToElement(highlighted, containerRef));

    // Assert
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150,
      behavior: 'smooth',
    });
    expect(containerRef.current).toBe(containerElement);
  });
});
