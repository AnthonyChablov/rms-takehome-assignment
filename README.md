# 🌎 Earthquake Data Visualization Dashboard

This project is a Single Page Application (SPA) that visualizes United States Geological Survey (USGS) earthquake data with an interactive plot and a data table, this project was built as part of a frontend developer technical assessment as part of the requirements laid out by Resource Modeling Solutions.

## 📋 Overview

The Earthquake Data Visualization Dashboard loads geospatial statistical data from a USGS public dataset, displaying it in both an interactive scatter plot and a scrollable data table. The application demonstrates multiple state management approaches and implements state linking between the scatter plot and the scrollable data table.

## 🔗 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-blue)](https://rms-takehome-assignment.vercel.app/)

Check out the live demo of the application!

## 🛠️ Tech Stack

- **React** with **TypeScript** - Core UI framework
- **Vite** - Build tool and development server
- **TanStack / React Query** - Data fetching, caching, and state management for server data
- **Zustand** - Client-side state management
- **React Context API** - Component state sharing
- **Recharts.js** - Interactive data visualization library
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** & **React Testing Library** - Testing frameworks and library

## 🏗️ Architecture Overview

### 📊 State Management Strategy

The application employs three distinct state management approaches as required:

1. **Context API**

   - Used for managing the currently highlighted earthquake record
   - Implemented via `HighlightedEarthquakeContext` to share highlight state across components

2. **TanStack / React Query**

   - Handles data fetching, caching, and server state management
   - Separates data fetching concerns from UI rendering
   - Implements a well-structured data pipeline for fetching and processing USGS earthquake data

3. **Zustand**
   - Manages client-side UI state such as axis selections, filters, and selected records
   - Provides a clean separation of client state from server/data state

### 🧩 Separation of Concerns

The project follows a clear separation between:

- **Server State** (TanStack / React Query): Data fetched from external sources
- **Client State** (Zustand): UI-related state that changes based on user interactions
- **Component State** (Context API): State shared between related components

This separation ensures that each type of state is managed by the most appropriate tool, creating a more maintainable and scalable application architecture.

## ✨ Key Features

- **Interactive Scatter Plot**

  - Configurable X and Y axes via dropdown selectors
  - Visual highlighting of selected data points
  - Responsive design adapting to viewport size

- **Data Table**

  - Complete display of earthquake records
  - Scroll functionality to access all rows and columns
  - Row highlighting on hover/selection
  - Synchronized with plot selections

- **Bidirectional Component Linking**

  - Selecting a table row highlights the corresponding plot point
  - Selecting a plot point scrolls to and highlights the corresponding table row

- **Data Processing Pipeline**
  - Fetches CSV data from USGS dataset here : https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv
  - Parses and transforms raw data into appropriate structures
  - Filters invalid records and applies optional limits
  - Sorts data based on selected axes

## 🔍 Implementation Details

### 📡 Data Fetching and Processing

The application uses a well-structured data pipeline:

```typescript
export const getEarthquakes = async (
  filters?: GetEarthQuakesFilters,
  sortBy?: string | null,
): Promise<EarthquakeRecord[]> => {
  // 1. Get the correct URL
  const apiUrl = getEarthquakeApiUrl();

  // 2. Fetch the raw CSV data
  const csvData = await fetchData(apiUrl);

  // 3. Parse the CSV string
  const parsedRows = await parseCSV(csvData);

  // 4. Transform CSV rows into EarthquakeRecord objects
  let earthquakes = transformCsvToEarthquakes(parsedRows);

  // 5. Filter out records with invalid values
  earthquakes = filterData(earthquakes, 'longitude');

  // 6. Sort the data
  earthquakes = sortData(earthquakes, sortBy);

  // 7. Apply the limit (after filtering and sorting)
  earthquakes = applyLimit(earthquakes, filters?.limit);

  return earthquakes;
};
```

### 🔄 Context API Implementation

A React Context provides a clean way to share the highlighted earthquake state between components:

```typescript
// Create context with a default value
const HighlightedEarthquakeContext = createContext<
  HighlightedEarthquakeContextType | undefined
>(undefined);

export const HighlightedEarthquakeProvider: React.FC<
  HighlightedEarthquakeProviderProps
> = ({ children }) => {
  const [highlightedEarthquake, setHighlightedEarthquake] =
    useState<EarthquakeRecord | null>(null);

  const value: HighlightedEarthquakeContextType = {
    highlightedEarthquake,
    setHighlightedEarthquake,
  };

  return (
    <HighlightedEarthquakeContext.Provider value={value}>
      {children}
    </HighlightedEarthquakeContext.Provider>
  );
};

// Custom Hook for cleaner usage
export const useHighlightedEarthquakeContext = (): HighlightedEarthquakeContextType => {
  const context = useContext(HighlightedEarthquakeContext);

  if (!context) {
    throw new Error(
      'useHighlightedEarthquake must be used within a HighlightedEarthquakeProvider'
    );
  }

  return context;
};
```

### 🗃️ Zustand Store Implementation

Zustand manages client-side state related to the plot and table, these features include a global store that is used to maintain state such as selected and filtered record state. In addition to this, the store is used to update the highlighted record when interacting with the table or plot :

```typescript
export const usePlotTableStore = create<PlotTableStore>((set) => ({
  filters: { limit: 100 }, // Default filters
  setFilters: (filters) => set({ filters }),

  xAxisKey: 'latitude',
  setXAxisKey: (key) => set({ xAxisKey: key }),

  yAxisKey: 'longitude',
  setYAxisKey: (key) => set({ yAxisKey: key }),

  selectedRecord: null,
  setSelectedRecord: (record) => set({ selectedRecord: record }),
}));
```

### 🔁 TanStack Query Implementation

Tanstack / React Query handles the asynchronous data fetching and caching:

```typescript
export const useEarthquakesQuery = (
  filters: GetEarthQuakesFilters | undefined,
  sortBy: string | null = null,
) => {
  return useQuery({
    queryKey: ['earthquakes', filters], // Exclude sortBy to prevent unnecessary refetches
    queryFn: () => getEarthquakes(filters, sortBy),
    refetchOnWindowFocus: false,
  });
};
```

## 💡 Design Decisions

### 🔑 Query Key Strategy and Client-Side Sorting

The TanStack Query implementation deliberately excludes `sortBy` from the query key to prevent unnecessary refetches when only sorting changes. This is an optimization that recognizes sorting as a client-side operation that doesn't require re-fetching data from the server.

**Client-Side Sorting Implementation:**

In `TablePlot.tsx`, I implemented client-side sorting using a custom `useSortedData` hook. This hook leverages `React.useMemo` to efficiently sort the data based on the selected `xAxisKey`, providing a smoother user experience.

```typescript
const sortedData = useSortedData(data, xAxisKey);

/**
 * Custom hook to memoize sorting an array of objects by a specific key.
 *
 * @template T The type of objects in the array.
 * @param {T[] | undefined | null} data The array of data to sort.
 * @param {keyof T | undefined | null} sortKey The key (property name) within T to sort by. If null/undefined, data is returned unsorted.
 * @returns {T[]} A new, memoized, sorted array based on the sortKey, or the original data structure if sorting is not possible/needed.
 */
function useSortedData<T>(
  data: T[] | undefined | null,
  sortKey: keyof T | undefined | null,
): T[] {
  const sortedData = React.useMemo(() => {
    if (data && sortKey) {
      const dataToSort = [...data];
      dataToSort.sort((a, b) => compareValues(sortKey, a, b));
      return dataToSort;
    }
    return data || [];
  }, [data, sortKey]);

  return sortedData;
}

export default useSortedData;
```

### 📦 State Management Separation

While TanStack Query could handle more state management, I deliberately separated concerns:

- **TanStack Query**: Responsibilities include handling fetching, caching, parseing and server-data related state.
- **Zustand**: Manages UI and visualization state that is purely client-side, like filtering of table data, selecting a record,
- **Context API**: Manages component-to-component communication for highlighting

This separation creates a cleaner architecture that would scale better in a larger application where different teams might work on different aspects of the application.

### ⚠️ CORS Resolution

During development, I encountered Cross-Origin Resource Sharing (CORS) issues when fetching data from the remote USGS resource. To address this, I utilized the CORS Anywhere proxy server. This tool acts as a proxy, adding the necessary headers to the response to allow the browser to access the data.

You can find more information about CORS Anywhere and its usage here:

- [CORS Anywhere Demo](https://cors-anywhere.herokuapp.com/corsdemo)
- [CORS Anywhere GitHub](https://github.com/Rob--W/cors-anywhere/issues/301)

Note: While CORS Anywhere is helpful for development, it's not recommended for production environments. In a production setting, you would typically configure your server to handle CORS headers correctly.

To use CORS Anywhere with the development server:

1. Start a CORS Anywhere instance: You can use the public instance at https://cors-anywhere.herokuapp.com/, or you can run your own instance locally as described in the [CORS Anywhere GitHub repository](https://github.com/Rob--W/cors-anywhere/issues/301).

2. Request Temporary Access: On the demo page, to proceed using this public instance for your local development, click on the "Request temporary access to the demo server" button. This action should grant you temporary permission to use the proxy.

3. Update the API URL: In your project's API service (src/api/earthquakesApi.ts or a similar file), modify the base URL for fetching earthquake data to prepend the CORS Anywhere proxy URL. For example:

```typescript
const BASE_URL: string =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
// WARNING: cors-anywhere is a public proxy often rate-limited or down.
// Consider alternatives for development or setting up your own proxy.
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Use with caution!

/**
 * Determines the appropriate API URL based on the environment.
 * Prefixes with a CORS proxy in development to avoid CORS issues.
 * @returns The URL string to fetch data from.
 */
export const getEarthquakeApiUrl = (): string => {
  // In production, directly use BASE_URL.
  // In development, use the proxy to bypass CORS restrictions for localhost.
  // NOTE: Ensure process.env.NODE_ENV is correctly configured in your build process (e.g., Vite, Webpack).
  const isDevelopment = process.env.NODE_ENV === 'development';
  console.log(
    `Running in ${isDevelopment ? 'development' : 'production'} mode. Using URL: ${isDevelopment ? PROXY_URL + BASE_URL : BASE_URL}`,
  );
  return isDevelopment ? PROXY_URL + BASE_URL : BASE_URL;
};
```

Alternatively, you can run your own CORS Anywhere instance locally as described in the [CORS Anywhere GitHub repository](https://github.com/Rob--W/cors-anywhere/issues/301). If you do so, you would update the API URL to point to your local instance (e.g., http://localhost:8080/${USGS_API_URL}).

Note: While CORS Anywhere is helpful for development, it's not recommended for production environments due to potential reliability and security concerns. In a production setting, you should configure the server hosting the USGS data (if possible) or your own backend to handle CORS headers correctly.

## 📥 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AnthonyChablov/rms-takehome-assignment.git
   cd rms-takehome-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your web browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🧪 Running Tests

```bash
npm run test:unit:ui
```

or

```bash
npm run test:unit
```

## 🚀 Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src
├── tests/                    # Contains unit and integration tests for various parts of the application.
├── api/                      # Handles all API-related data fetching logic and functionality.
│   └── utils/                # Utility functions specifically for API interactions.
│   ├── earthquakesApi.ts     # Defines the API endpoints and services for fetching earthquake data.
│   └── earthquakesQuery.ts   # Implements data fetching and caching logic using Tanstack / React Query for earthquake data.
├── components/               # Reusable UI components.
│   ├── Earthquakes/          # Components related to displaying earthquake data.
│   ├── Error/                # Components for displaying error messages.
│   ├── Layout/               # Components for structuring the overall page layout.
│   └── Loading/              # Components for displaying loading states.
├── context/                  # Manages state using React Context API.
├── hooks/                    # Custom React hooks for encapsulating reusable logic.
├── store/                    # State management using Zustand.
├── types/                    # TypeScript type definitions and interfaces for the project.
└── utils/                    # General utility functions used throughout the application.
```

## 🤖 Use of AI

AI tools were used in the following ways:

- Initial project scaffolding suggestions
- Code reviews and refactoring suggestions
- Documentation assistance

All code was manually reviewed and modified to ensure it meets the requirements and follows best practices.

## 🔮 Future Improvements

- Add more interactive features to the scatter plot (zoom, pan)
- End-to-End (E2E) testing with Cypress
- Increase unit-testing coverage for all components and utilities
- Implement data filtering options
- Add time-series visualization options
- Add more improvements to mobile responsiveness
- Add more comprehensive error handling and loading states

## 📄 License

MIT

## 📬 Contact

For any questions or feedback about this project, please contact me at aechablov@gmail.com.
