import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '@/utils/utils';
import { useMap } from 'react-leaflet';

interface CustomMarkerProps<T extends Record<string, any>> {
  item: T;
  highlighted: T | null | undefined;
  isSelected?: (id: string | number) => boolean;
  idKey: string;
  latitudeKey: string;
  longitudeKey: string;
  handleMarkerClick: (item: T) => void;
  handleMarkerMouseOver: (item: T) => void;
  handleMarkerMouseOut: (item: T) => void;
}

function CustomMarker<T extends Record<string, any>>({
  item,
  highlighted,
  isSelected,
  idKey,
  latitudeKey,
  longitudeKey,

  handleMarkerClick,
  handleMarkerMouseOver,
  handleMarkerMouseOut,
}: CustomMarkerProps<T>) {
  const lat = item[latitudeKey];
  const lng = item[longitudeKey];
  const itemId = item[idKey];
  const map = useMap();

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return null;
  }

  const isCurrentHighlighted = highlighted && highlighted[idKey] === itemId;
  const isCurrentSelected =
    isSelected && itemId !== undefined && isSelected(itemId);

  const customIcon = L.divIcon({
    className: cn(
      'rounded-full transition-all duration-200 ease-in-out',
      'border border-[#155dfc]',
      isCurrentSelected
        ? [
            'w-6 h-6',
            'bg-[#fff]',
            'border-[#155dfc]',
            'border-[1px]',
            'shadow-[inset_0_0_0_7px_#00c950]',
          ]
        : ['w-3 h-3', 'bg-[#8ec5ff]', 'border-[#155dfc]', 'border-[1px]'],
      isCurrentHighlighted &&
        !isCurrentSelected && ['w-[18px] h-[18px]', 'bg-[#2b7fff]'],
      isCurrentHighlighted && 'ring-2 ring-[#2b7fff] ring-opacity-50',
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
      key={itemId}
      position={[lat, lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          handleMarkerClick(item);
          map.setView([lat, lng], map.getZoom() + 2, {
            animate: true,
            duration: 0.5,
          });
        },
        mouseover: () => handleMarkerMouseOver(item),
        mouseout: () => handleMarkerMouseOut(item),
      }}
    >
      <Tooltip direction="top" offset={[0, -15]} opacity={1}>
        <div className="bg-white text-white p-1 rounded-lg backdrop-blur-sm max-w-[250px]">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
            <span className="font-semibold text-sm text-blue-600">
              Quick Info
            </span>
          </div>
          <div className="space-y-1">
            {Object.entries(item)
              .filter(([key]) => {
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
              .slice(0, 4)
              .map(([key, value]) => {
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim();
                const formattedValue = (() => {
                  if (typeof value === 'number') {
                    if (key.toLowerCase().includes('mag'))
                      return `${value.toFixed(1)} M`;
                    if (key.toLowerCase().includes('depth'))
                      return `${value.toFixed(1)} km`;
                    if (key.toLowerCase().includes('time'))
                      return new Date(value).toLocaleDateString();
                    return value.toFixed(1);
                  }
                  if (typeof value === 'string' && value.length > 30) {
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

export default CustomMarker;
