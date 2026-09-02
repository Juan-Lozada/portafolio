'use client';

import { useEffect, useState } from 'react';
import { LocateFixed, Radio } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import { Circle, CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import styles from './observa.module.css';
import { useLocale } from '../../locale-provider';

const stations = [
  { id: 'EST-012', name: 'Cordillera Norte', coordinates: [-33.38, -70.47] as [number, number], status: 'Operativa', signal: 98, value: '18,4 °C' },
  { id: 'EST-008', name: 'Valle Central', coordinates: [-33.45, -70.65] as [number, number], status: 'Revisar', signal: 76, value: '32,1 µg/m³' },
  { id: 'EST-021', name: 'Costa Sur', coordinates: [-33.62, -71.02] as [number, number], status: 'Operativa', signal: 94, value: '68,7%' },
  { id: 'EST-017', name: 'Quebrada Este', coordinates: [-33.57, -70.32] as [number, number], status: 'Operativa', signal: 91, value: '52,6%' },
];

const networkRoute: [number, number][] = stations.map((station) => station.coordinates);

const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileAttribution = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ?? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);

  return null;
}

export default function GeoModule() {
  const { copy } = useLocale();
  const [selected, setSelected] = useState(stations[1]);
  const [tilesReady, setTilesReady] = useState(false);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTileError((current) => current || !tilesReady);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [tilesReady]);

  return (
    <section className={styles.module} aria-labelledby="geo-title">
      <header className={styles.moduleHeader}>
        <div><p>{copy('Monitoreo territorial', 'Territorial monitoring')}</p><h1 id="geo-title">{copy('Centro geográfico', 'Geo center')}</h1></div>
        <span className={styles.realtimeBadge}><MorphIcon icon={Radio} size={15} /> {copy('En tiempo real', 'Real time')}</span>
      </header>

      <div className={styles.geoLayout}>
        <div className={styles.mapContainer} role="region" aria-label={copy('Mapa interactivo de estaciones', 'Interactive station map')}>
          <MapContainer
            center={[-33.47, -70.67]}
            zoom={10}
            minZoom={8}
            maxZoom={17}
            scrollWheelZoom
            zoomControl
            attributionControl
            preferCanvas
            zoomAnimation
            fadeAnimation
            markerZoomAnimation
            inertia
            inertiaDeceleration={2800}
            inertiaMaxSpeed={1400}
            easeLinearity={0.22}
            wheelDebounceTime={28}
            wheelPxPerZoomLevel={90}
            className={styles.leafletMap}
          >
            <TileLayer
              attribution={tileAttribution}
              url={tileUrl}
              maxZoom={19}
              keepBuffer={2}
              updateWhenIdle
              updateWhenZooming={false}
              eventHandlers={{
                load: () => { setTilesReady(true); setTileError(false); },
                tileerror: () => { if (!tilesReady) setTileError(true); },
              }}
            />
            <ResizeMap />
            <Circle center={[-33.47, -70.67]} radius={23500} pathOptions={{ color: '#155b43', fillColor: '#84b69e', fillOpacity: 0.08, weight: 1.5 }} />
            <Polyline positions={networkRoute} pathOptions={{ color: '#155b43', opacity: 0.62, weight: 2, dashArray: '7 8' }} />
            {stations.map((station) => (
              <CircleMarker
                key={station.id}
                center={station.coordinates}
                radius={selected.id === station.id ? 12 : 9}
                pathOptions={{ color: '#ffffff', fillColor: station.status === 'Revisar' ? '#b56720' : '#155b43', fillOpacity: 1, opacity: 1, weight: selected.id === station.id ? 5 : 4 }}
                eventHandlers={{ click: () => setSelected(station) }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>{station.name} · {station.signal}%</Tooltip>
                {selected.id === station.id ? <Popup closeButton={false}><strong>{station.name}</strong><br />{copy(station.status, station.status === 'Revisar' ? 'Review' : 'Operational')} · {station.value}<br /><small>{copy('Dato recibido ahora', 'Data received now')}</small></Popup> : null}
              </CircleMarker>
            ))}
          </MapContainer>

          <div className={styles.mapStationSelector} aria-label={copy('Seleccionar estación', 'Select station')}>
            {stations.map((station) => <button key={station.id} type="button" aria-pressed={selected.id === station.id} onClick={() => setSelected(station)}>{station.id}</button>)}
          </div>
          {!tilesReady && !tileError ? <div className={styles.mapLoading}><span /><strong>{copy('Cargando cartografía', 'Loading map')}</strong></div> : null}
          {tileError ? <div className={styles.mapError}><strong>{copy('No se pudo cargar la cartografía.', 'The map could not be loaded.')}</strong><span>{copy('Comprueba la conexión a internet y vuelve a intentar.', 'Check your internet connection and try again.')}</span></div> : null}
          <div className={styles.mapStatus}><span><i /> {copy('Operativa', 'Operational')}</span><span><i /> {copy('Revisar', 'Review')}</span></div>
        </div>

        <aside className={styles.geoInspector}>
          <div className={styles.inspectorTitle}><span><MorphIcon icon={LocateFixed} size={17} /></span><div><small>{copy('Estación seleccionada', 'Selected station')}</small><strong>{selected.name}</strong></div></div>
          <dl><div><dt>{copy('Código', 'Code')}</dt><dd>{selected.id}</dd></div><div><dt>{copy('Estado', 'Status')}</dt><dd data-status={selected.status}>{copy(selected.status, selected.status === 'Revisar' ? 'Review' : 'Operational')}</dd></div><div><dt>{copy('Señal', 'Signal')}</dt><dd>{selected.signal}%</dd></div><div><dt>{copy('Último valor', 'Latest value')}</dt><dd>{selected.value}</dd></div></dl>
          <div className={styles.signalMeter}><span><i style={{ width: `${selected.signal}%` }} /></span><small>{copy('Conectividad de la estación', 'Station connectivity')}</small></div>
          <div className={styles.liveFeed}><strong>{copy('Actividad', 'Activity')}</strong>{copy(['Dato recibido · ahora', 'Validación automática · 8 s', 'Sincronización · 21 s'], ['Data received · now', 'Automatic validation · 8 s', 'Synchronization · 21 s']).map((item) => <span key={item}><i />{item}</span>)}</div>
        </aside>
      </div>
    </section>
  );
}
