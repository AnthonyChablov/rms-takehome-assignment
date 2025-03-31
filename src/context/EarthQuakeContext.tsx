import React, { createContext, useState, useContext } from 'react';
import { EarthquakeRecord } from '@/types/earthquake';

/* 2. Context API:
  - Set up a React Context to manage the currently highlighted earthquake record.
  - Use the Context Provider in a top-level component to allow nested children access to the highlighted record state.
*/

interface HighlightedEarthquakeContextType {
  highlightedEarthquake: EarthquakeRecord | null;
  setHighlightedEarthquake: React.Dispatch<
    React.SetStateAction<EarthquakeRecord | null>
  >;
}
interface HighlightedEarthquakeProviderProps {
  children: React.ReactNode;
}

// Create context
const HighlightedEarthquakeContext = createContext<
  HighlightedEarthquakeContextType | undefined
>(undefined);

export const HighlightedEarthquakeProvider = ({
  children,
}: HighlightedEarthquakeProviderProps) => {
  const [highlightedEarthquake, setHighlightedEarthquake] =
    useState<EarthquakeRecord | null>(null);

  return (
    <HighlightedEarthquakeContext.Provider
      value={{ highlightedEarthquake, setHighlightedEarthquake }}
    >
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
