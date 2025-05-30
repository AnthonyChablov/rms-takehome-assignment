import React from 'react';

interface MapControlsProps {
  // Map layer controls
  mapLayer?: 'satellite' | 'terrain' | 'street';
  setMapLayer?: (layer: 'satellite' | 'terrain' | 'street') => void;

  // Magnitude filter
  minMagnitude?: number;
  setMinMagnitude?: (magnitude: number) => void;

  // Time range filter
  timeRange?: '1day' | '7days' | '30days' | 'all';
  setTimeRange?: (range: '1day' | '7days' | '30days' | 'all') => void;

  // Clustering toggle
  enableClustering?: boolean;
  setEnableClustering?: (enabled: boolean) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  mapLayer = 'street',
  setMapLayer,
  minMagnitude = 0,
  setMinMagnitude,
  timeRange = '7days',
  setTimeRange,
  enableClustering = true,
  setEnableClustering,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {/* Map Layer Selector */}
      {setMapLayer && (
        <div className="flex flex-col">
          <label
            htmlFor="map-layer"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Map Layer
          </label>
          <select
            id="map-layer"
            value={mapLayer}
            onChange={(e) =>
              setMapLayer(e.target.value as 'satellite' | 'terrain' | 'street')
            }
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="street">Street Map</option>
            <option value="satellite">Satellite</option>
            <option value="terrain">Terrain</option>
          </select>
        </div>
      )}

      {/* Minimum Magnitude Filter */}
      {setMinMagnitude && (
        <div className="flex flex-col">
          <label
            htmlFor="min-magnitude"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Min Magnitude
          </label>
          <select
            id="min-magnitude"
            value={minMagnitude}
            onChange={(e) => setMinMagnitude(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value={0}>All Magnitudes</option>
            <option value={1}>1.0+</option>
            <option value={2}>2.0+</option>
            <option value={3}>3.0+</option>
            <option value={4}>4.0+</option>
            <option value={5}>5.0+</option>
            <option value={6}>6.0+</option>
          </select>
        </div>
      )}

      {/* Time Range Filter */}
      {setTimeRange && (
        <div className="flex flex-col">
          <label
            htmlFor="time-range"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Time Range
          </label>
          <select
            id="time-range"
            value={timeRange}
            onChange={(e) =>
              setTimeRange(
                e.target.value as '1day' | '7days' | '30days' | 'all',
              )
            }
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="1day">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      )}

      {/* Clustering Toggle */}
      {setEnableClustering && (
        <div className="flex flex-col">
          <label
            htmlFor="enable-clustering"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Clustering
          </label>
          <div className="flex items-center">
            <input
              id="enable-clustering"
              type="checkbox"
              checked={enableClustering}
              onChange={(e) => setEnableClustering(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              {enableClustering ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapControls;
