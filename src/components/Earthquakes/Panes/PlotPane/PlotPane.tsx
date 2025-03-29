import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PlotPaneProps<T extends Record<string, any>> {
  data: T[];
}

function PlotPane<T extends Record<string, any>>({ data }: PlotPaneProps<T>) {
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

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisKey(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisKey(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="xAxis">X-Axis:</label>
        <select id="xAxis" value={xAxisKey || ''} onChange={handleXAxisChange}>
          <option value="">Select X-Axis</option>
          {numericKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="yAxis">Y-Axis:</label>
        <select id="yAxis" value={yAxisKey || ''} onChange={handleYAxisChange}>
          <option value="">Select Y-Axis</option>
          {numericKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {data.length > 0 && xAxisKey && yAxisKey && (
        <ResponsiveContainer className="" width={`100%`} height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              className=" hover:cursor-pointer"
              data={data}
              fill="#8884d8"
            />
            <XAxis dataKey={xAxisKey} name={xAxisKey} />
            <YAxis dataKey={yAxisKey} name={yAxisKey} />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PlotPane;
