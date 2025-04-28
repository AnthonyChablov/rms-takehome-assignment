import React from 'react';
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
import CustomDot from './components/CustomDot/CustomDot';
import usePlotPaneData from './hooks/usePlotPlaneData';
import { cn } from '@/utils/utils';
import AxisSelector from './components/AxisSelector/AxisSelector';

interface PlotPaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
  selected?: Set<string | number | null>;
  setSelected?: (item: Set<string | number>) => void;
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  addSelected?: (item: T) => void; // Optional function to add a selected earthquake record
  removeSelected?: (id: string | number) => void; // Optional function to remove a selected earthquake record
  isSelected?: (item: string | number) => boolean; // Optional function to check if an item is selected
  axisSelectorAddon?: React.ReactNode; // optional prop for axis selector addon
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
  addSelected,
  removeSelected,
  isSelected,
  axisSelectorAddon = null,
}: PlotPaneProps<T | any>) {
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
    if (payload && removeSelected && addSelected && selected && isSelected) {
      // If the clicked item is already selected, deselect it
      if (isSelected(payload.id)) {
        removeSelected(payload.id);
      } else {
        // Otherwise, select the clicked item
        addSelected(payload.id);
      }
    }
  };

  return (
    <div
      className="bg-white rounded-lg  py-6 min-w-full lg:w-7/12 "
      data-testid="plot-pane"
    >
      <div className="flex items-center justify-between">
        {/* Container for AxisSelector and the addon */}
        {/* Menu Select */}
        <AxisSelector
          xAxisKey={xAxisKey}
          yAxisKey={yAxisKey}
          numericKeys={numericKeys}
          handleXAxisChange={handleXAxisChange}
          handleYAxisChange={handleYAxisChange}
        />
        {axisSelectorAddon && (
          <div className="ml-4 w-full">{axisSelectorAddon}</div>
        )}
      </div>
      {/* Scatter Plot */}
      {data.length > 0 && xAxisKey && yAxisKey && (
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
            style={{ border: 'none' }}
          >
            {/* Adjusted margins for labels */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              name={xAxisKey}
              stroke="#2b7fff"
              tickLine={false}
              label={{ value: xAxisKey, position: 'bottom', offset: 0 }}
              interval={'preserveEnd'}
              type={'number'}
              tickCount={5}
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
              shape={
                <CustomDot
                  selectedPoints={selected}
                  highlightedPoint={highlighted}
                />
              }
              onClick={handleClick}
              onMouseOver={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* Reference line at Y=0 with blue color */}
            <ReferenceLine y={0} stroke="#51a2ff" strokeWidth={1} />
            {/* Reference line at X=50 with blue color */}
            <ReferenceLine x={0} stroke="#51a2ff" strokeWidth={1} />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PlotPane;
