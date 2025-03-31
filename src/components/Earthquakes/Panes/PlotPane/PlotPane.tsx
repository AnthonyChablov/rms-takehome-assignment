import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import CustomDot from './CustomDot/CustomDot';
import usePlotPaneData from './hooks/usePlotPlaneData';
import { cn } from '@/utils/utils';
import AxisSelector from './AxisSelector/AxisSelector';

interface PlotPaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
  selected?: T | null;
  setSelected?: (item: T | null) => void;
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  selectedRecord: T | null;
  setSelectedRecord: (item: T | null) => void;
}

function PlotPane<T extends Record<string, any>>({
  data,
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  xAxisKey,
  setXAxisKey,
  yAxisKey,
  setYAxisKey,
  selectedRecord,
  setSelectedRecord,
}: PlotPaneProps<T>) {
  // Use custom hook to manage the axis and numeric keys state
  const { numericKeys } = usePlotPaneData(data);

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisKey(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisKey(event.target.value);
  };

  const handleMouseEnter = (event: any) => {
    if (setHighlighted) {
      setHighlighted(event?.payload);
    }
  };

  const handleMouseLeave = (event: any) => {
    if (setHighlighted) {
      setHighlighted(event?.payload);
    }
  };

  const handleClick = (event: any) => {
    const payload = event?.payload;

    // Check if both setHighlighted and setSelected are defined
    if (setHighlighted && setSelected) {
      // If the clicked item is already selected, deselect it
      if (payload === selected) {
        setSelectedRecord(null);
      } else {
        // Otherwise, select the clicked item
        setSelectedRecord(payload);
      }
    }
  };

  const sortedData = React.useMemo(() => {
    if (data && xAxisKey) {
      return [...data].sort((a, b) => {
        // Assuming xAxisKey corresponds to a number
        return (a[xAxisKey] as number) - (b[xAxisKey] as number);
      });
    }
    return data;
  }, [data, xAxisKey]);

  return (
    <div className="bg-white rounded-lg  p-6 w-7/12 ">
      {/* Menu Select */}
      <AxisSelector
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        numericKeys={numericKeys}
        handleXAxisChange={handleXAxisChange}
        handleYAxisChange={handleYAxisChange}
      />

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
              data={sortedData}
              strokeWidth={1}
              shape={
                <CustomDot
                  selectedPoint={selectedRecord}
                  highlightedPoint={highlighted}
                />
              }
              onClick={handleClick}
              onMouseOver={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PlotPane;
