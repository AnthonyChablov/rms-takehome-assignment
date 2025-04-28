import { useMemo } from 'react';

interface UseDataFilteringProps<T extends Record<string, any>> {
  data: T[];
  xAxisKey: string | null;
  yAxisKey: string | null;
  isLoading?: boolean;
  isError?: boolean;
}

export function useDataFiltering<T extends Record<string, any>>({
  data,
  xAxisKey,
  yAxisKey,
  isLoading = false,
  isError = false,
}: UseDataFilteringProps<T>) {
  const filteredData = useMemo(() => {
    // If we're in a loading or error state, return an empty array
    if (isLoading || isError) {
      return [];
    }

    // Filter out any data points where the selected x or y axis values are null/undefined
    return data.filter((item) => {
      // Only include items where both x and y values exist
      const hasXValue = xAxisKey && item[xAxisKey] != null;
      const hasYValue = yAxisKey && item[yAxisKey] != null;
      return hasXValue && hasYValue;
    });
  }, [data, xAxisKey, yAxisKey, isLoading, isError]);

  const filteredOutCount = data.length - filteredData.length;

  return {
    filteredData,
    filteredOutCount,
  };
}
