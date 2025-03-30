import { useState, useEffect } from 'react';

function usePlotPaneData<T extends Record<string, any>>(data: T[]) {
  const [xAxisKey, setXAxisKey] = useState<string | null>(null);
  const [yAxisKey, setYAxisKey] = useState<string | null>(null);
  const [numericKeys, setNumericKeys] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const firstRow = data[0];
      const numbers = Object.keys(firstRow).filter(
        (key) => typeof firstRow[key] === 'number',
      );
      setNumericKeys(numbers);

      // Set initial axis keys if available
      if (numbers.length >= 2) {
        setXAxisKey(numbers[0]);
        setYAxisKey(numbers[1]);
      } else if (numbers.length === 1) {
        setXAxisKey(numbers[0]);
      }
    }
  }, [data]);

  return {
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    numericKeys,
  };
}

export default usePlotPaneData;
