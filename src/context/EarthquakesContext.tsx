import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { EarthquakeRecord } from '@/types/earthquake';

interface HighlightedEarthquakeContextType {
  highlightedEarthquake: EarthquakeRecord | null;
  setHighlightedEarthquake: Dispatch<SetStateAction<EarthquakeRecord | null>>;
}

interface HighlightedEarthquakeProviderProps {
  children: React.ReactNode;
}

// Create context with a default value of undefined
const HighlightedEarthquakeContext = createContext<
  HighlightedEarthquakeContextType | undefined
>(undefined);

/* 2. Context API:
 * - Set up a React Context to manage the currently highlighted earthquake record.
 * - Use the Context Provider in a top-level component to allow nested children access to the highlighted record state.
 */
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

// Created a Custom Hook for cleaner usage when consuming the context
export const useHighlightedEarthquakeContext =
  (): HighlightedEarthquakeContextType => {
    const context = useContext(HighlightedEarthquakeContext);
    // Check for null
    if (!context) {
      throw new Error(
        'useHighlightedEarthquake must be used within a HighlightedEarthquakeProvider',
      );
    }
    return context;
  };

export default HighlightedEarthquakeContext;
