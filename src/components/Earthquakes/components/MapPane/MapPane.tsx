// MapPane.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/styles';
import L from 'leaflet';
import { cn } from '@/utils/utils';
import MarkerClusterGroup from 'react-leaflet-markercluster';

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
        addSelected(item.id);
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
      className="bg-white rounded-lg  min-w-full lg:w-7/12 flex flex-col items-center"
      data-testid="map-pane"
    >
      <div className="flex items-center justify-end w-full ">
        {paneControls && (
          <div className="flex-shrink-0 py-6">{paneControls}</div>
        )}
      </div>
      <MapContainer
        center={center} // Initial map center
        zoom={zoom} // Initial map zoom level
        scrollWheelZoom={true} // Enable scroll wheel zooming
        className="markercluster-map h-[500px] w-full rounded-md shadow-inner" // Tailwind classes for styling
        style={{ zIndex: 0 }} // Ensure map is not covered by other elements in the DOM
      >
        {/* TileLayer defines the map tiles (e.g., OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
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
                  // Base styles - matching CustomDot defaults
                  'rounded-full transition-all duration-200 ease-in-out',
                  'border border-[#155dfc]', // Default stroke color from CustomDot

                  // Size and state-based styling
                  isCurrentSelected
                    ? [
                        'w-6 h-6', // 24px diameter (selectRadius = 12 * 2)
                        'bg-[#fff]', // selectFill color
                        'border-[#155dfc]', // selectedStroke color
                        'border-[1px]', // selectedStrokeWidth
                        // Inner dot effect using box-shadow or pseudo-element
                        'shadow-[inset_0_0_0_7px_#00c950]', // Creates inner white circle (selectedInnerFill)
                      ]
                    : [
                        'w-3 h-3', // 12px diameter (defaultRadius = 6 * 2)
                        'bg-[#8ec5ff]', // defaultFill color
                        'border-[#155dfc]', // default stroke
                        'border-[1px]', // default strokeWidth
                      ],

                  // Highlight state (hover effect)
                  isCurrentHighlighted &&
                    !isCurrentSelected && [
                      'w-[18px] h-[18px]', // 18px diameter (highlightRadius = 9 * 2)
                      'bg-[#2b7fff]', // highlightFill color
                    ],

                  // Highlight ring effect (equivalent to the ring you had)
                  isCurrentHighlighted &&
                    'ring-2 ring-[#2b7fff] ring-opacity-50',
                ),
                iconSize: isCurrentSelected
                  ? [24, 24]
                  : isCurrentHighlighted
                    ? [18, 18]
                    : [12, 12],
                iconAnchor: isCurrentSelected
                  ? [12, 12]
                  : isCurrentHighlighted
                    ? [9, 9]
                    : [6, 6],
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
                  {/* Tooltip content shown on marker hover */}
                  <Tooltip direction="top" offset={[0, -15]} opacity={1}>
                    <div className="bg-white  text-white p-1 rounded-lg backdrop-blur-sm max-w-[250px]">
                      {/* Quick info header */}
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                        <span className="font-semibold text-sm text-blue-600">
                          Quick Info
                        </span>
                      </div>

                      {/* Key details only - limit to most important fields */}
                      <div className="space-y-1">
                        {Object.entries(item)
                          .filter(([key]) => {
                            // Show only the most relevant fields in tooltip
                            const importantFields = [
                              'magnitude',
                              'mag',
                              'depth',
                              'place',
                              'time',
                              'title',
                            ];
                            return importantFields.some((field) =>
                              key.toLowerCase().includes(field.toLowerCase()),
                            );
                          })
                          .slice(0, 4) // Limit to 4 most important fields
                          .map(([key, value]) => {
                            const formattedKey = key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())
                              .trim();

                            const formattedValue = (() => {
                              if (typeof value === 'number') {
                                if (key.toLowerCase().includes('mag')) {
                                  return `${value.toFixed(1)} M`;
                                }
                                if (key.toLowerCase().includes('depth')) {
                                  return `${value.toFixed(1)} km`;
                                }
                                if (key.toLowerCase().includes('time')) {
                                  return new Date(value).toLocaleDateString();
                                }
                                return value.toFixed(1);
                              }
                              if (
                                typeof value === 'string' &&
                                value.length > 30
                              ) {
                                return value.substring(0, 30) + '...';
                              }
                              return String(value);
                            })();

                            return (
                              <div
                                key={key}
                                className="flex justify-between items-center text-xs"
                              >
                                <span className="text-gray-600 font-semibold mr-2">
                                  {formattedKey} :
                                </span>
                                <span className="text-gray-900 font-medium">
                                  {formattedValue}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Tooltip>
                </Marker>
              );
            }
            return null; // Don't render marker if lat/lng are invalid
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default MapPane;
