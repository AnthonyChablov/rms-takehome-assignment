import Earthquakes from './components/Earthquakes/Earthquakes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HighlightedEarthquakeProvider } from './context/EarthQuakeContext';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HighlightedEarthquakeProvider>
          <Earthquakes />
          <ReactQueryDevtools initialIsOpen={false} />
        </HighlightedEarthquakeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
