import React, { Dispatch, SetStateAction } from 'react';
import PlotPane from './PlotPane/PlotPane';
import TablePane from './TablePane/TablePane';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import Container from '@/components/Layout/Container';

export interface PlotTablePaneLayoutProps<T extends Record<string, any>> {
  isLoading: boolean;
  isError: boolean;
  data: T[];
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  highlighted: T | null | undefined;
  setHighlighted: Dispatch<SetStateAction<T | null>>;
  selected: T | null | undefined;
  setSelected: (item: T | null) => void;
  title?: string;
}

/**
 * Handles the layout and display states (loading, error, success) for earthquake data visualization.
 * Renders appropriate UI components based on the current state.
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
  title = 'USGS Most Recent Earthquakes (Top 100)',
}: PlotTablePaneLayoutProps<T>) {
  // --- Loading State ---
  if (isLoading) {
    return (
      <div data-testid="earthquakes-loading earthquakes">
        <Container className="py-6 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
          <Loading />
        </Container>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div data-testid="earthquakes-error earthquakes">
        <Container>
          <Error />
          <div className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
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
  return (
    <div data-testid-="earthquakes-success earthquakes">
      <Container className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
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
        />
        <TablePane
          title={title}
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxisKey={yAxisKey}
          setYAxisKey={setYAxisKey}
          data={data}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          selected={selected}
          setSelected={setSelected}
        />
      </Container>
    </div>
  );
}

export default PlotTablePaneLayout;
