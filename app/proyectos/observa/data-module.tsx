'use client';

import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import styles from './observa.module.css';
import { useLocale } from '../../locale-provider';

const rows = [
  ['REG-10482', 'Cordillera Norte', 'Temperatura', '18,4 °C', '99,2%', 'Validado', '10:42'],
  ['REG-10481', 'Valle Central', 'Partículas', '32,1 µg/m³', '91,6%', 'Revisar', '10:41'],
  ['REG-10480', 'Costa Sur', 'Humedad', '68,7%', '97,4%', 'Validado', '10:39'],
  ['REG-10479', 'Valle Central', 'Temperatura', '21,7 °C', '95,8%', 'Validado', '10:37'],
  ['REG-10478', 'Cordillera Norte', 'Presión', '1014 hPa', '98,9%', 'Validado', '10:36'],
  ['REG-10477', 'Costa Sur', 'Viento', '18,2 km/h', '94,1%', 'Pendiente', '10:34'],
  ['REG-10476', 'Quebrada Este', 'Humedad', '52,6%', '96,2%', 'Validado', '10:32'],
  ['REG-10475', 'Litoral Norte', 'Temperatura', '17,1 °C', '92,8%', 'Revisar', '10:30'],
];

export default function DataModule() {
  const { copy } = useLocale();
  const variableLabel = (value: string) => copy(value, value === 'Temperatura' ? 'Temperature' : value === 'Partículas' ? 'Particles' : value === 'Humedad' ? 'Humidity' : value === 'Presión' ? 'Pressure' : value === 'Viento' ? 'Wind' : value);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Todos');
  const filtered = useMemo(() => rows.filter((row) => (status === 'Todos' || row[5] === status) && row.join(' ').toLowerCase().includes(query.toLowerCase())), [query, status]);
  return (
    <section className={styles.module} aria-labelledby="data-title">
      <header className={styles.moduleHeader}><div><p>{copy('Consolidación', 'Consolidation')}</p><h1 id="data-title">{copy('Datos consolidados', 'Consolidated data')}</h1></div><button className={styles.moduleAction} type="button"><MorphIcon icon={Download} size={16} /> {copy('Exportar CSV', 'Export CSV')}</button></header>
      <div className={styles.dataMetrics}><article><span>{copy('Registros procesados', 'Processed records')}</span><strong>1.843.290</strong><small>{copy('Hoy', 'Today')}</small></article><article><span>{copy('Integridad', 'Integrity')}</span><strong>98,6%</strong><small>+0,8%</small></article><article><span>{copy('Pendientes', 'Pending')}</span><strong>184</strong><small>{copy('0,01% del total', '0.01% of total')}</small></article></div>
      <div className={styles.dataWorkspace}>
        <div className={styles.dataToolbar}><label><MorphIcon icon={Search} size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy('Buscar registro o estación', 'Search record or station')} /></label><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label={copy('Filtrar por estado', 'Filter by status')}><option value="Todos">{copy('Todos', 'All')}</option><option value="Validado">{copy('Validado', 'Validated')}</option><option value="Revisar">{copy('Revisar', 'Review')}</option><option value="Pendiente">{copy('Pendiente', 'Pending')}</option></select><span>{filtered.length} {copy('resultados', 'results')}</span></div>
        <div className={styles.tableScroll}><table className={styles.dataTable}><thead><tr><th>ID</th><th>{copy('Estación', 'Station')}</th><th>{copy('Variable', 'Variable')}</th><th>{copy('Valor', 'Value')}</th><th>{copy('Estabilidad', 'Stability')}</th><th>{copy('Estado', 'Status')}</th><th>{copy('Hora', 'Time')}</th></tr></thead><tbody>{filtered.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 4 ? <span className={styles.stabilityCell}><i style={{ width: cell }} />{cell}</span> : index === 5 ? <em data-status={cell}>{copy(cell, cell === 'Validado' ? 'Validated' : cell === 'Revisar' ? 'Review' : 'Pending')}</em> : index === 2 ? variableLabel(cell) : cell}</td>)}</tr>)}</tbody></table></div>
      </div>
    </section>
  );
}
