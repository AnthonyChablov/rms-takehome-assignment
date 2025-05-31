import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CustomMarker from './components/CustomMarker/CustomMarker';

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapPaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
  selected?: Set<string | number | null>;
  setSelected?: (item: Set<string | number>) => void;
  addSelected?: (item: T) => void;
  removeSelected?: (id: string | number) => void;
  isSelected?: (id: string | number) => boolean;
  latitudeKey?: string;
  longitudeKey?: string;
  idKey?: string;
  xAxisKey: string | null;
  setXAxisKey: (key: string) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string) => void;
  paneControls?: React.ReactNode;
}

function MapPane<T extends Record<string, any>>({
  data,
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  addSelected,
  removeSelected,
  isSelected,
  latitudeKey = 'latitude',
  longitudeKey = 'longitude',
  idKey = 'id',
  xAxisKey,
  setXAxisKey,
  yAxisKey,
  setYAxisKey,
  paneControls = null,
}: MapPaneProps<T>) {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(2);

  const handleMarkerClick = (item: T) => {
    if (
      addSelected &&
      removeSelected &&
      isSelected &&
      item[idKey] !== undefined
    ) {
      if (isSelected(item[idKey])) {
        removeSelected(item[idKey]);
      } else {
        addSelected(item[idKey]);
      }
    }
  };

  const handleMarkerMouseOver = (item: T) => {
    if (setHighlighted) {
      setHighlighted(item);
    }
  };

  const handleMarkerMouseOut = (item: T) => {
    if (setHighlighted && highlighted && highlighted[idKey] === item[idKey]) {
      setHighlighted(null);
    }
  };

  return (
    <div
      className="bg-white rounded-lg min-w-full lg:w-7/12 flex flex-col items-center"
      data-testid="map-pane"
    >
      <div className="flex items-center justify-end w-full">
        {paneControls && (
          <div className="flex-shrink-0 py-6">{paneControls}</div>
        )}
      </div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="markercluster-map h-[500px] w-full rounded-md shadow-inner"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => {
          const lat = item[latitudeKey];
          const lng = item[longitudeKey];
          const itemId = item[idKey];
          // CustomMarker will handle the validation and rendering
          return (
            <CustomMarker
              key={itemId || index}
              item={item}
              highlighted={highlighted}
              isSelected={isSelected}
              idKey={idKey}
              latitudeKey={latitudeKey}
              longitudeKey={longitudeKey}
              handleMarkerClick={handleMarkerClick}
              handleMarkerMouseOver={handleMarkerMouseOver}
              handleMarkerMouseOut={handleMarkerMouseOut}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapPane;
