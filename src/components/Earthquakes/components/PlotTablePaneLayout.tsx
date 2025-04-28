import React, { Dispatch, SetStateAction, useMemo } from 'react';
import PlotPane from './PlotPane/PlotPane';
import TablePane from './TablePane/TablePane';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import Container from '@/components/Layout/Container';
import Pagination from './Pagination/Pagination';

/**
 * Props for the `PlotTablePaneLayout` component.
 * T represents the data type for the earthquake records (generic for flexibility).
 */
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
  title = 'USGS Most Recent Earthquakes (Top 100)', // Default title for the table pane
  /* Pagination Props */
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}: PlotTablePaneLayoutProps<T>) {
  // --- Calculate Paginated Data ---
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, currentPage, itemsPerPage],
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // --- Handle Items Per Page Change ---
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

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
  // If an error occurred during data fetching, display an error message and fallback content. In this case, an empty plot and table are displayed as placeholders.
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
  // If data is successfully loaded, render the PlotPane and TablePane components with the provided data, axes keys, and state management functions.
  return (
    <div data-testid="earthquakes">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
      <Container
        className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between"
        dataTestId="earthquakes-success"
      >
        <PlotPane
          data={paginatedData}
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
          data={paginatedData}
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
