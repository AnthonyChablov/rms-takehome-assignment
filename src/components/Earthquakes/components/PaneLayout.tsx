import React, { Dispatch, SetStateAction, useMemo } from 'react';
import PlotPane from './PlotPane/PlotPane';
import TablePane from './TablePane/TablePane';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import Container from '@/components/Layout/Container';
import Pagination from './Pagination/Pagination';
import { usePagination } from './hooks/usePagination/usePagination';
import { useDataFiltering } from './hooks/useDataFiltering/useDataFiltering';
import { VisualizationPane } from '@/store/visualizationStore/visualizationStore';
import MapPane from './MapPane/MapPane';
import ActionButton from './TablePane/components/Button/ActionButton';
import VisualizationToggle from './Toggle/VisualizationToggle';

/**
 * Props for the `PaneLayout` component.
 * T represents the data type for the earthquake records (generic for flexibility).
 */
export interface PaneLayoutProps<T extends Record<string, any>> {
  isLoading: boolean;
  isError: boolean;
  data: T[];
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  highlighted: T | null | undefined;
  setHighlighted: Dispatch<SetStateAction<T | null>>;
  selected: Set<string | number | null>;
  setSelected: (item: Set<string | number>) => void;
  title?: string;
  addSelected?: (item: T) => void;
  removeSelected?: (id: string | number) => void;
  isSelected?: (item: string | number) => boolean;

  /* Pagination Props */
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;

  /* Visualization Props */
  currentPane?: string;
  setCurrentPane?: (pane: VisualizationPane) => void;
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
 * @param {PaneLayoutProps<T>} props - The props passed to the component.
 * @returns {JSX.Element} The layout rendering the earthquake data visualization.
 */
export function PaneLayout<T extends Record<string, any>>({
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
  title = 'USGS Most Recent Earthquakes (Top 100)', // Default title for the table pane
  /* Pagination Props */
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  /* Visualization Props */
  currentPane = 'plot',
  setCurrentPane = () => {},
}: PaneLayoutProps<T>) {
  // --- Pagination ---
  const {
    paginatedData,
    totalPages,
    handleItemsPerPageChange: baseHandleItemsPerPageChange,
  } = usePagination({
    data,
    currentPage,
    itemsPerPage,
  });

  // Handle items per page change and reset current page to 1
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    baseHandleItemsPerPageChange(event, setItemsPerPage, setCurrentPage);
  };

  // --- Data Filtering for Plot ---
  const { filteredData: plotData, filteredOutCount } = useDataFiltering({
    data: paginatedData,
    xAxisKey,
    yAxisKey,
    isLoading,
    isError,
  });

  // --- Render Toggle Buttons as a component ---
  const toggleButtons = (
    <div className="relative inline-flex rounded-md shadow-none">
      <ActionButton
        onClick={() => setCurrentPane('plot')}
        active={currentPane === 'plot'}
        className="rounded-l-sm rounded-r-none border-r border-gray-300"
      >
        Plot
      </ActionButton>
      <ActionButton
        onClick={() => setCurrentPane('map')}
        active={currentPane === 'map'}
        className="rounded-r-sm rounded-l-none"
      >
        Map
      </ActionButton>
    </div>
  );

  // --- Loading State ---
  // If the data is still loading, display a loading skeleton inside a container.
  if (isLoading) {
    return (
      <div data-testid="earthquakes">
        <Container dataTestId="earthquakes-loading">
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
  // If data is successfully loaded

  return (
    <div data-testid="earthquakes">
      <Container className="px-4 space-y-6 " dataTestId="earthquakes-success">
        <div className="flex  flex-col lg:flex-row space-x-4 justify-between">
          <div className="w-full">
            {currentPane === 'plot' && (
              <PlotPane
                data={plotData}
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
                paneControls={
                  <VisualizationToggle
                    currentPane={currentPane as VisualizationPane}
                    setCurrentPane={setCurrentPane}
                  />
                }
              />
            )}
            {currentPane === 'map' && (
              <MapPane
                data={plotData}
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
                paneControls={
                  <VisualizationToggle
                    currentPane={currentPane as VisualizationPane}
                    setCurrentPane={setCurrentPane}
                  />
                }
              />
            )}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <TablePane
            title={title}
            xAxisKey={xAxisKey}
            setXAxisKey={setXAxisKey}
            yAxisKey={yAxisKey}
            setYAxisKey={setYAxisKey}
            data={paginatedData}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            selected={selected}
            setSelected={setSelected}
            removeSelected={removeSelected}
            addSelected={addSelected}
            isSelected={isSelected}
          />
        </div>
      </Container>
    </div>
  );
}

export default PaneLayout;
