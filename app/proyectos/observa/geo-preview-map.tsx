'use client';

import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet';
import styles from './observa.module.css';

const previewStations: Array<{ coordinates: [number, number]; warning?: boolean }> = [
  { coordinates: [-33.38, -70.47] },
  { coordinates: [-33.45, -70.65], warning: true },
  { coordinates: [-33.62, -71.02] },
  { coordinates: [-33.57, -70.32] },
];

const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function GeoPreviewMap() {
  return (
    <MapContainer
      center={[-33.49, -70.67]}
      zoom={9}
      className={styles.previewLeafletMap}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      preferCanvas
    >
      <TileLayer url={tileUrl} maxZoom={19} keepBuffer={2} updateWhenIdle />
      {previewStations.map((station, index) => (
        <CircleMarker
          key={`${station.coordinates[0]}-${station.coordinates[1]}`}
          center={station.coordinates}
          radius={index === 1 ? 8 : 6}
          pathOptions={{
            color: '#ffffff',
            fillColor: station.warning ? '#b56720' : '#155b43',
            fillOpacity: 1,
            opacity: 1,
            weight: 3,
          }}
        />
      ))}
    </MapContainer>
  );
}
