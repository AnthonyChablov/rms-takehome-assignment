import React, { createContext, useState, useContext } from 'react';
import { RawEarthquake } from '@/types/earthquake';

interface HighlightedEarthquakeContextType {
  highlightedEarthquake: RawEarthquake | null;
  setHighlightedEarthquake: React.Dispatch<
    React.SetStateAction<RawEarthquake | null>
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
    useState<RawEarthquake | null>(null);

  return (
    <HighlightedEarthquakeContext.Provider
      value={{ highlightedEarthquake, setHighlightedEarthquake }}
    >
      {children}
    </HighlightedEarthquakeContext.Provider>
  );
};

// Created a Custom Hook for cleaner usage.
export const useHighlightedEarthquake =
  (): HighlightedEarthquakeContextType => {
    const context = useContext(HighlightedEarthquakeContext);
    if (!context) {
      throw new Error(
        'useHighlightedEarthquake must be used within a HighlightedEarthquakeProvider',
      );
    }
    return context;
  };
