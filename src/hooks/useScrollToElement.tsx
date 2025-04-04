import { useEffect, RefObject } from 'react';

/**
 * A custom React hook that automatically scrolls a container to bring a highlighted element into view.
 *
 * @param {T | null | undefined} highlighted - The object representing the element to be highlighted. It must have an `id` property to identify the corresponding DOM element.
 * @param {RefObject<HTMLDivElement | null>} containerRef - A reference to the container element that will be scrolled. It should be a `div` or any scrollable container.
 *
 * @template T - A generic type that extends a plain object (i.e., an object with string keys and any values). This allows for flexibility in the shape of the `highlighted` object.
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const highlighted = { id: 'item-2' };
 * useScrollToElement(highlighted, containerRef);
 */
export function useScrollToElement<T extends Record<string, any>>(
  highlighted: T | null | undefined,
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    // Only proceed if a valid `highlighted` object with an `id` is provided
    if (highlighted?.id && containerRef.current) {
      // Find the DOM element corresponding to the highlighted id
      const highlightedRow = document.getElementById(highlighted.id);
      if (highlightedRow) {
        // Get the boundaries (position and size) of the container and the highlighted row
        const containerRect = containerRef.current.getBoundingClientRect();
        const rowRect = highlightedRow.getBoundingClientRect();

        // Determine if the highlighted row is outside the visible viewport of the container
        const isRowAboveViewport = rowRect.top < containerRect.top;
        const isRowBelowViewport = rowRect.bottom > containerRect.bottom;

        // Only trigger scrolling if the row is outside the container's visible area
        if (isRowAboveViewport || isRowBelowViewport) {
          // Scroll the container to the position of the highlighted row
          containerRef.current.scrollTo({
            top: highlightedRow.offsetTop - containerRef.current.offsetTop,
            behavior: 'smooth', // Smooth scrolling for improved user experience
          });
        }
      }
    }
  }, [highlighted, containerRef]); // Effect dependencies: runs when `highlighted` or `containerRef` changes
}
