import { useEffect, RefObject } from 'react';

export function useScrollToElement<T extends Record<string, any>>(
  highlighted: T | null | undefined,
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (highlighted?.id && containerRef.current) {
      const highlightedRow = document.getElementById(highlighted.id);
      if (highlightedRow) {
        // Get container's viewport boundaries
        const containerRect = containerRef.current.getBoundingClientRect();
        const rowRect = highlightedRow.getBoundingClientRect();

        // Check if the row is not fully visible in the container
        const isRowAboveViewport = rowRect.top < containerRect.top;
        const isRowBelowViewport = rowRect.bottom > containerRect.bottom;

        // Only scroll if the row is not fully visible
        if (isRowAboveViewport || isRowBelowViewport) {
          containerRef.current.scrollTo({
            top: highlightedRow.offsetTop - containerRef.current.offsetTop,
            behavior: 'smooth', // Add smooth scrolling for better UX
          });
        }
      }
    }
  }, [highlighted, containerRef]);
}
