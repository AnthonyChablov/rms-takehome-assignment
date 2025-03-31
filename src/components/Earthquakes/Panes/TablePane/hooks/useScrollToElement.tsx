import { useEffect, useRef, RefObject } from 'react';

export function useScrollToElement<T extends Record<string, any>>(
  highlighted: T | null | undefined, // Allow undefined here
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (highlighted?.id && containerRef.current) {
      const highlightedRow = document.getElementById(highlighted.id);
      if (highlightedRow) {
        containerRef.current.scrollTo({
          top: highlightedRow.offsetTop - containerRef.current.offsetTop,
        });
      }
    }
  }, [highlighted, containerRef]);
}
