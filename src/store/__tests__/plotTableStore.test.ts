import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollToElement } from '@/hooks/useScrollToElement';
import { useRef } from 'react';

describe('useScrollToElement', () => {
  // Mock DOM elements and methods
  let containerElement: HTMLDivElement;
  let highlightedElement: HTMLDivElement;
  let mockScrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
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
    const containerRef = { current: containerElement };

    renderHook(() => useScrollToElement(null, containerRef));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when highlighted has no id', () => {
    const containerRef = { current: containerElement };
    const highlighted = { name: 'test' };

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when containerRef is null', () => {
    const containerRef = { current: null };
    const highlighted = { id: 'test-id' };

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(document.getElementById).not.toHaveBeenCalled();
  });

  it('should not scroll when element with id does not exist', () => {
    const containerRef = { current: containerElement };
    const highlighted = { id: 'non-existent-id' };

    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when element is fully visible in viewport', () => {
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

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should scroll when element is above viewport', () => {
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

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150, // 200 (highlightedElement.offsetTop) - 50 (containerElement.offsetTop)
      behavior: 'smooth',
    });
  });

  it('should scroll when element is below viewport', () => {
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

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150, // 200 (highlightedElement.offsetTop) - 50 (containerElement.offsetTop)
      behavior: 'smooth',
    });
  });

  it('should scroll to element when highlighted changes', () => {
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

    const { rerender } = renderHook(
      ({ highlighted }) => useScrollToElement(highlighted, containerRef),
      { initialProps: { highlighted: initialHighlighted } },
    );

    // Should not scroll with initial props
    expect(mockScrollTo).not.toHaveBeenCalled();

    // Rerender with new highlighted
    rerender({ highlighted: newHighlighted });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150,
      behavior: 'smooth',
    });
  });

  it('should use provided container ref without creating a new one', () => {
    // Create a real ref with the containerElement
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

    renderHook(() => useScrollToElement(highlighted, containerRef));

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 150,
      behavior: 'smooth',
    });

    // Verify container ref is still the same object
    expect(containerRef.current).toBe(containerElement);
  });
});
