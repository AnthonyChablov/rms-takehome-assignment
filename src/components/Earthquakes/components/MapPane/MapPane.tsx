// MapPane.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/utils/utils';

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/**
 * Props interface for the MapPane component.
 * @template T - The type of data items in the array, extending a record with string keys and any values.
 */
interface MapPaneProps<T extends Record<string, any>> {
  data: T[]; // Array of data points to visualize on the map
  highlighted?: T | null; // The currently highlighted data item
  setHighlighted?: (item: T | null) => void; // Function to set the highlighted item
  selected?: Set<string | number | null>; // Set of IDs of selected data items
  setSelected?: (item: Set<string | number>) => void; // Function to set the selected items (kept for consistency with PlotPane)
  addSelected?: (item: T) => void; // Optional function to add a data item to the selected set
  removeSelected?: (id: string | number) => void; // Optional function to remove a data item from the selected set
  isSelected?: (id: string | number) => boolean; // Optional function to check if a data item is selected
  latitudeKey?: string; // The key in the data object that holds the latitude value (default: 'latitude')
  longitudeKey?: string; // The key in the data object that holds the longitude value (default: 'longitude')
  idKey?: string; // The key in the data object that holds the unique ID (default: 'id')
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  // Pane Control
  paneControls?: React.ReactNode;
}

/**
 * MapPane component for visualizing data points on a React-Leaflet map.
 * It displays markers for each data point, with popups and tooltips for details.
 * Markers are styled based on their highlighted and selected states.
 *
 * @param {MapPaneProps<T>} props - The props for the MapPane component.
 * @returns {JSX.Element} The rendered MapPane component.
 */
function MapPane<T extends Record<string, any>>({
  data,
  highlighted,
  setHighlighted,
  selected,
  // Not directly used for setting in MapPane, but kept for consistency
  xAxisKey,
  setYAxisKey,
  yAxisKey,
  setXAxisKey,
  setSelected,
  addSelected,
  removeSelected,
  isSelected,
  latitudeKey = 'latitude', // Default key for latitude
  longitudeKey = 'longitude', // Default key for longitude
  idKey = 'id', // Default key for unique ID

  // Pane Control props
  paneControls = null,
}: MapPaneProps<T>) {
  // State to manage the map's center and zoom level.
  // Initialized to a default global view.
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(2); // Low zoom for a global view

  // Effect to adjust map center and zoom when data changes.
  // It calculates the average latitude and longitude of the data points.
  useEffect(() => {
    if (data && data.length > 0) {
      // Calculate the sum of latitudes and longitudes
      const sumLat = data.reduce(
        (sum, item) => sum + (item[latitudeKey] || 0),
        0,
      );
      const sumLng = data.reduce(
        (sum, item) => sum + (item[longitudeKey] || 0),
        0,
      );

      // Calculate the average latitude and longitude
      const avgLat = sumLat / data.length;
      const avgLng = sumLng / data.length;

      // Set the map center to the average coordinates
      setCenter([avgLat, avgLng]);
      // Adjust zoom level. A more sophisticated algorithm could calculate
      // a bounding box and set zoom to fit all points.
      setZoom(3); // Slightly increased zoom when data is present
    }
  }, [data, latitudeKey, longitudeKey]); // Re-run effect if data or key props change

  /**
   * Handles click events on map markers.
   * Toggles the selection state of the clicked data item.
   * @param {T} item - The data item associated with the clicked marker.
   */
  const handleMarkerClick = (item: T) => {
    // Ensure all necessary functions and item ID are available
    if (
      addSelected &&
      removeSelected &&
      isSelected &&
      item[idKey] !== undefined
    ) {
      // If the item is already selected, deselect it; otherwise, select it.
      if (isSelected(item[idKey])) {
        removeSelected(item[idKey]);
      } else {
        addSelected(item);
      }
    }
  };

  /**
   * Handles mouse over events on map markers.
   * Sets the hovered data item as the highlighted item.
   * @param {T} item - The data item associated with the hovered marker.
   */
  const handleMarkerMouseOver = (item: T) => {
    if (setHighlighted) {
      setHighlighted(item);
    }
  };

  /**
   * Handles mouse out events on map markers.
   * Clears the highlighted item if the mouse leaves the currently highlighted marker.
   * @param {T} item - The data item associated with the marker that the mouse left.
   */
  const handleMarkerMouseOut = (item: T) => {
    if (setHighlighted && highlighted && highlighted[idKey] === item[idKey]) {
      setHighlighted(null);
    }
  };

  return (
    <div
      className="bg-white rounded-lg py-6 min-w-full lg:w-7/12 flex flex-col items-center"
      data-testid="map-pane"
    >
      <div className="flex items-center justify-end w-full ">
        {paneControls && <div className="flex-shrink-0">{paneControls}</div>}
      </div>
      <MapContainer
        center={center} // Initial map center
        zoom={zoom} // Initial map zoom level
        scrollWheelZoom={true} // Enable scroll wheel zooming
        className="h-[500px] w-full rounded-md shadow-inner" // Tailwind classes for styling
        style={{ zIndex: 0 }} // Ensure map is not covered by other elements in the DOM
      >
        {/* TileLayer defines the map tiles (e.g., OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Iterate over data to create markers for each point */}
        {data.map((item, index) => {
          const lat = item[latitudeKey];
          const lng = item[longitudeKey];
          const itemId = item[idKey];

          // Only render a marker if valid latitude and longitude are present
          if (typeof lat === 'number' && typeof lng === 'number') {
            // Determine if the current item is highlighted or selected for styling
            const isCurrentHighlighted =
              highlighted && highlighted[idKey] === itemId;
            const isCurrentSelected =
              isSelected && itemId !== undefined && isSelected(itemId);

            // Create a custom DivIcon for markers to apply dynamic styling with Tailwind
            const customIcon = L.divIcon({
              className: cn(
                'rounded-full w-4 h-4 border-2 transition-all duration-200 ease-in-out',
                isCurrentSelected
                  ? 'bg-blue-600 border-blue-800 scale-125'
                  : 'bg-red-500 border-red-700',
                isCurrentHighlighted &&
                  'scale-150 ring-4 ring-yellow-400 ring-opacity-75',
              ),
              iconSize: [16, 16], // Size of the icon
              iconAnchor: [8, 8], // Point of the icon which will correspond to marker's location
            });

            return (
              <Marker
                key={itemId || index} // Unique key for React list rendering
                position={[lat, lng]} // Marker position [latitude, longitude]
                icon={customIcon} // Apply the custom icon
                eventHandlers={{
                  click: () => handleMarkerClick(item), // Handle click to toggle selection
                  mouseover: () => handleMarkerMouseOver(item), // Handle mouse over for highlighting
                  mouseout: () => handleMarkerMouseOut(item), // Handle mouse out to clear highlighting
                }}
              >
                {/* Popup content shown on marker click */}
                <Popup>
                  <div className="font-semibold text-sm mb-1">Details:</div>
                  {/* Display all key-value pairs of the data item in the popup */}
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="font-medium">{key}:</span>{' '}
                      {String(value)}
                    </div>
                  ))}
                </Popup>
                {/* Tooltip content shown on marker hover */}
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                  {/* Display all key-value pairs of the data item in the tooltip */}
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="font-medium">{key}:</span>{' '}
                      {String(value)}
                    </div>
                  ))}
                </Tooltip>
              </Marker>
            );
          }
          return null; // Don't render marker if lat/lng are invalid
        })}
      </MapContainer>
    </div>
  );
}

export default MapPane;
