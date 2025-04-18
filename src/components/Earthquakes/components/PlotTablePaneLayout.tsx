import React, { Dispatch, SetStateAction } from 'react';
import PlotPane from './PlotPane/PlotPane';
import TablePane from './TablePane/TablePane';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import Container from '@/components/Layout/Container';

/**
 * Props for the `PlotTablePaneLayout` component.
 * T represents the data type for the earthquake records (generic for flexibility).
 */
export interface PlotTablePaneLayoutProps<T extends Record<string, any>> {
  isLoading: boolean; // Indicates whether data is being loaded
  isError: boolean; // Indicates whether an error occurred while fetching data
  data: T[]; // The data to display, typically a list of earthquake records
  xAxisKey: string | null; // Key for the X-axis (e.g., date, magnitude)
  setXAxisKey: (key: string) => void; // Setter function to update the X-axis key
  yAxisKey: string | null; // Key for the Y-axis (e.g., depth, distance)
  setYAxisKey: (key: string) => void; // Setter function to update the Y-axis key
  highlighted: T | null | undefined; // The currently highlighted earthquake record
  setHighlighted: Dispatch<SetStateAction<T | null>>; // Setter function to update the highlighted earthquake
  selected: Set<string | number | null>; // The currently selected earthquake record
  setSelected: (item: Set<string | number>) => void; // Setter function to update the selected earthquake
  title?: string; // Optional title for the visualization
  addSelected?: (item: T) => void; // Optional function to add a selected earthquake record
  removeSelected?: (id: string | number) => void; // Optional function to remove a selected earthquake record
  isSelected?: (item: string | number) => boolean; // Optional function to check if an item is selected
}

/**
 * `PlotTablePaneLayout` component is responsible for rendering the layout and managing
 * the display states (loading, error, success) for earthquake data visualization.
 * It displays a plot of the earthquake data in a graphical format and a table view with
 * the ability to select and highlight earthquake records.
 *
 * It also manages the state for X/Y axis keys, selected records, and highlighted records
 * to ensure a dynamic and interactive user experience.
 *
 * @param {PlotTablePaneLayoutProps<T>} props - The props passed to the component.
 * @returns {JSX.Element} The layout rendering the earthquake data visualization.
 */
export function PlotTablePaneLayout<T extends Record<string, any>>({
  isLoading,
  isError,
  data,
  xAxisKey,
  setXAxisKey,
  yAxisKey,
  setYAxisKey,
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  addSelected,
  removeSelected,
  isSelected,
  title = 'USGS Most Recent Earthquakes (Top 100)', // Default title if not provided
}: PlotTablePaneLayoutProps<T>) {
  // --- Loading State ---
  // If the data is still loading, display a loading skeleton inside a container.
  if (isLoading) {
    return (
      <div data-testid="earthquakes">
        <Container
          className="py-6 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between"
          dataTestId="earthquakes-loading"
        >
          <Loading />
        </Container>
      </div>
    );
  }

  // --- Error State ---
  // If an error occurred during data fetching, display an error message and fallback content.
  // In this case, an empty plot and table are displayed as placeholders.
  if (isError) {
    return (
      <div data-testid="earthquakes">
        <Container dataTestId="earthquakes-error">
          <Error />
          <div className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
            {/* Render empty plot and table as fallback */}
            <PlotPane
              data={[]}
              xAxisKey={xAxisKey}
              setXAxisKey={setXAxisKey}
              yAxisKey={yAxisKey}
              setYAxisKey={setYAxisKey}
              selected={selected}
              setSelected={setSelected}
            />
            <TablePane data={[]} />
          </div>
        </Container>
      </div>
    );
  }

  // --- Success State ---
  // If data is successfully loaded, render the PlotPane and TablePane components
  // with the provided data, axes keys, and state management functions.
  return (
    <div data-testid="earthquakes">
      <Container
        className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between"
        dataTestId="earthquakes-success"
      >
        <PlotPane
          data={data}
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxisKey={yAxisKey}
          setYAxisKey={setYAxisKey}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          selected={selected}
          setSelected={setSelected}
          removeSelected={removeSelected}
          addSelected={addSelected}
          isSelected={isSelected}
        />
        <TablePane
          title={title} // Pass title for the table pane
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxisKey={yAxisKey}
          setYAxisKey={setYAxisKey}
          data={data}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          selected={selected}
          setSelected={setSelected}
          removeSelected={removeSelected}
          addSelected={addSelected}
          isSelected={isSelected}
        />
      </Container>
    </div>
  );
}

export default PlotTablePaneLayout;
