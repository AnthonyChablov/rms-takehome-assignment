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
import CustomDot from './CustomDot/CustomDot';
import { cn } from '@/utils/utils';

interface PlotPaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
}

function PlotPane<T extends Record<string, any>>({
  data,
  highlighted,
  setHighlighted,
}: PlotPaneProps<T>) {
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

  const handleDotMouseEnter = (event: any) => {
    if (setHighlighted) {
      const { selected } = event.payload;
      setHighlighted(selected);
    }
  };

  const handleDotMouseLeave = () => {
    if (setHighlighted) {
      setHighlighted(null);
    }
  };

  const handleDotClick = (event: any) => {
    if (setHighlighted) {
      console.log(event?.payload);
      setHighlighted(event?.payload);
    }
  };

  return (
    <div className="bg-white rounded-lg  p-6 w-7/12 ">
      {/* Menu Select */}
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 "
            htmlFor="xAxis"
          >
            X-Axis:
          </label>
          <div className="relative hover:cursor-pointer">
            <select
              id="xAxis"
              value={xAxisKey || ''}
              onChange={handleXAxisChange}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">Select X-Axis</option>
              {numericKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
            htmlFor="yAxis"
          >
            Y-Axis:
          </label>
          <div className="relative ">
            <select
              id="yAxis"
              value={yAxisKey || ''}
              onChange={handleYAxisChange}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option className="hover:cursor-pointer" value="">
                Select Y-Axis
              </option>
              {numericKeys.map((key) => (
                <option className="hover:cursor-pointer" key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scatter Plot */}
      {data.length > 0 && xAxisKey && yAxisKey && (
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
            {/* Adjusted margins for labels */}
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey={xAxisKey}
              name={xAxisKey}
              stroke="#2b7fff"
              tickLine={false}
              label={{ value: xAxisKey, position: 'bottom', offset: 0 }}
            />
            <YAxis
              dataKey={yAxisKey}
              name={yAxisKey}
              stroke="#2b7fff"
              tickLine={false}
              label={{
                value: yAxisKey,
                angle: -90,
                position: 'left',
                offset: 0,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
              }}
            />
            <Scatter
              className={cn(`hover:cursor-pointer`)}
              data={data}
              strokeWidth={1}
              shape={<CustomDot selectedPoint={highlighted} />}
              onClick={handleDotClick}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PlotPane;
