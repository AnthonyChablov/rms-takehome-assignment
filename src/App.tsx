import Earthquakes from './components/Earthquakes/Earthquakes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HighlightedEarthquakeProvider } from './context/EarthquakeContext';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
  });

  return (
    <main className="App" data-testid="app">
      <QueryClientProvider client={queryClient}>
        <HighlightedEarthquakeProvider>
          <Earthquakes />
          <ReactQueryDevtools
            initialIsOpen={false}
            data-testid="react-query-devtools"
          />
        </HighlightedEarthquakeProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
