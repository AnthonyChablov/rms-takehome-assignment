import React from 'react';
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
import usePlotPaneData from './hooks/usePlotPlaneData';
import { usePlotTableStore } from '@/store/plotTableStore';
import { cn } from '@/utils/utils';
import AxisSelector from './AxisSelector/AxisSelector';

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
  // Use custom hook to manage the axis and numeric keys state
  const { numericKeys } = usePlotPaneData(data);

  // Use Zustand to get and set xAxisKey and yAxisKey
  const {
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    setHighlightedRecord: setGlobalHighlightedRecord, // Rename this for clarity
  } = usePlotTableStore();

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisKey(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisKey(event.target.value);
  };

  const handleMouseEnter = (event: any) => {
    if (setHighlighted) {
      console.log(event?.payload);
      setHighlighted(event?.payload);
    }
  };

  const handleMouseLeave = (event: any) => {
    if (setHighlighted) {
      console.log(event?.payload);
      setHighlighted(event?.payload);
    }
  };

  const handleClick = (event: any) => {
    if (setHighlighted) {
      console.log(event?.payload);
      setHighlighted(event?.payload);
    }
  };

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
              data={data}
              strokeWidth={1}
              shape={<CustomDot selectedPoint={highlighted} />}
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
