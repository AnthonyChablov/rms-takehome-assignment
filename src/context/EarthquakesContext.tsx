import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { EarthquakeRecord } from '@/types/earthquake';

/**
 * Context type definition for managing the state of the highlighted earthquake.
 *
 * This context holds the currently selected earthquake record (`highlightedEarthquake`)
 * and provides a setter function (`setHighlightedEarthquake`) to update the state.
 */
interface HighlightedEarthquakeContextType {
  /** The currently highlighted earthquake record, or `null` if no record is selected. */
  highlightedEarthquake: EarthquakeRecord | null;

  /**
   * Setter function to update the highlighted earthquake record.
   * @param earthquake - The new earthquake record to set as highlighted.
   */
  setHighlightedEarthquake: Dispatch<SetStateAction<EarthquakeRecord | null>>;
}

/**
 * Props type for the `HighlightedEarthquakeProvider` component.
 * This component will wrap its children with the Context Provider, providing access to the highlighted earthquake state.
 */
interface HighlightedEarthquakeProviderProps {
  /** React children elements to be wrapped by the provider. */
  children: React.ReactNode;
}

// Create context with a default value of undefined (will be populated by the provider)
const HighlightedEarthquakeContext = createContext<
  HighlightedEarthquakeContextType | undefined
>(undefined);

/**
 * Provider component for the `HighlightedEarthquakeContext` that makes the highlighted earthquake state
 * accessible to any component within its child tree.
 *
 * This component manages the state of the highlighted earthquake using React's `useState` hook,
 * and provides this state to its children via Context API.
 *
 * @param children - The child components that will have access to the highlighted earthquake state.
 */
export const HighlightedEarthquakeProvider: React.FC<
  HighlightedEarthquakeProviderProps
> = ({ children }) => {
  // State to track the currently highlighted earthquake
  const [highlightedEarthquake, setHighlightedEarthquake] =
    useState<EarthquakeRecord | null>(null);

  // Context value containing the state and setter function
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

/**
 * Custom hook for consuming the `HighlightedEarthquakeContext` easily.
 *
 * This hook provides access to the highlighted earthquake state and its setter function.
 * It throws an error if used outside of the `HighlightedEarthquakeProvider`.
 *
 * @returns The context value, containing the highlighted earthquake and setter function.
 * @throws Error if used outside of a `HighlightedEarthquakeProvider`.
 */
export const useHighlightedEarthquakeContext =
  (): HighlightedEarthquakeContextType => {
    const context = useContext(HighlightedEarthquakeContext);
    // Ensure the context is used within the provider
    if (!context) {
      throw new Error(
        'useHighlightedEarthquake must be used within a HighlightedEarthquakeProvider',
      );
    }
    return context;
  };

export default HighlightedEarthquakeContext;
