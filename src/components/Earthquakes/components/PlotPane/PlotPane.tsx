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
  selected?: T[];
  setSelected?: (item: T[]) => void;
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  addSelected?: (item: T) => void; // Optional function to add a selected earthquake record
  removeSelected?: (id: string | number) => void; // Optional function to remove a selected earthquake record
}

/**
 * PlotPane component renders a scatter plot with configurable axes and interaction features
 * for visualizing and interacting with data points.
 *
 * The component allows for dynamic axis selection, custom point rendering, and interaction events
 * such as highlighting and selecting data points on hover and click.
 *
 * @template T The type of data in the `data` array (typically an object with properties to be plotted on the axes).
 *
 * @param {T[]} data The data to plot in the scatter chart.
 * @param {T | null} [highlighted] The data point currently highlighted (optional).
 * @param {(item: T | null) => void} [setHighlighted] Function to set the highlighted data point (optional).
 * @param {T | null} [selected] The data point currently selected (optional).
 * @param {(item: T | null) => void} [setSelected] Function to set the selected data point (optional).
 * @param {string | null} xAxisKey The key from the data to be used as the X-axis.
 * @param {(key: string) => void} setXAxisKey Function to set the X-axis key.
 * @param {string | null} yAxisKey The key from the data to be used as the Y-axis.
 * @param {(key: string) => void} setYAxisKey Function to set the Y-axis key.
 *
 * @returns A `<div>` containing the scatter plot chart, interactive elements for axis selection,
 *          and reference lines at X=0 and Y=0 for better visualization.
 *
 *
 * @note
 * - The component allows users to dynamically select the X and Y axes from a list of available numeric keys.
 * - The custom dot component `CustomDot` is used to render individual points, with support for selected and highlighted points.
 * - Reference lines at X=0 and Y=0 are drawn to help visually track data across both axes.
 * - Interaction is supported, allowing users to highlight and select points, with updates to the `highlighted` and `selected` states.
 */
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
    if (
      payload &&
      setHighlighted &&
      setSelected &&
      removeSelected &&
      addSelected
    ) {
      // If the clicked item is already selected, deselect it
      if (payload === selected) {
        removeSelected(payload);
      } else {
        // Otherwise, select the clicked item
        addSelected(payload);
      }
    }
  };

  const isSelected = (item: T) => {
    return selected?.some((selectedItem) => selectedItem.id === item.id);
  };

  return (
    <div
      className="bg-white rounded-lg  py-6 w-full lg:w-7/12 "
      data-testid="plot-pane"
    >
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
