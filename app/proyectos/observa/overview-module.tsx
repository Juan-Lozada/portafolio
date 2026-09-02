'use client';

import { ArrowRight, BellRing, Database, MapPinned } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import dynamic from 'next/dynamic';
import type { ModuleId } from './observa-dashboard';
import { overviewMetrics, recentAlerts, stationSummary, trendValues } from './observa-data';
import styles from './observa.module.css';
import { useLocale } from '../../locale-provider';

const GeoPreviewMap = dynamic(() => import('./geo-preview-map'), { ssr: false });

export default function OverviewModule({ onNavigate, tourFocus }: { onNavigate: (module: ModuleId) => void; tourFocus: boolean }) {
  const { copy } = useLocale();
  const metrics = copy(overviewMetrics, [
    { label: 'Global stability', value: '97.8%', delta: '+1.2% vs. yesterday', tone: 'good' },
    { label: 'Connected stations', value: '24 / 25', delta: '1 intermittent', tone: 'warning' },
    { label: 'Open alerts', value: '08', delta: '2 critical', tone: 'warning' },
    { label: 'Records today', value: '1.84 M', delta: '+8.4% volume', tone: 'good' },
  ]);
  const alerts = copy(recentAlerts, [
    { level: 'Critical', station: 'Central Valley', message: 'Signal outside threshold', time: '4 min ago' },
    { level: 'Medium', station: 'South Coast', message: 'Intermittent connectivity', time: '18 min ago' },
    { level: 'Low', station: 'North Range', message: 'Validation pending', time: '42 min ago' },
  ]);
  const stations = copy(stationSummary, [
    { name: 'North Range', code: 'EST-012', stability: '99.2%', status: 'Operational' },
    { name: 'Central Valley', code: 'EST-008', stability: '91.6%', status: 'Review' },
    { name: 'South Coast', code: 'EST-021', stability: '97.4%', status: 'Operational' },
  ]);
  return (
    <section className={styles.module} aria-labelledby="overview-title">
      <header className={styles.moduleHeader}>
        <div><p>{copy('Resumen operacional', 'Operational overview')}</p><h1 id="overview-title">{copy('Estado general', 'Overall status')}</h1></div>
        <div className={styles.periodFilter}><button className={styles.activePeriod} type="button">24 h</button><button type="button">{copy('7 días', '7 days')}</button><button type="button">{copy('30 días', '30 days')}</button></div>
      </header>

      <div className={`${styles.metricGrid} ${tourFocus ? styles.tourFocus : ''}`}>
        {metrics.map((metric) => <article className={styles.metricCard} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small data-tone={metric.tone}><i />{metric.delta}</small></article>)}
      </div>

      <div className={styles.overviewGrid}>
        <article className={`${styles.panel} ${styles.trendPanel}`}>
          <div className={styles.panelHeader}><div><span>{copy('Estabilidad de red', 'Network stability')}</span><strong>{copy('Últimas 24 horas', 'Last 24 hours')}</strong></div><button type="button" onClick={() => onNavigate('charts')}>{copy('Ver análisis', 'View analysis')} <MorphIcon icon={ArrowRight} size={15} /></button></div>
          <div className={styles.trendSummary}><strong>{copy('97,8%', '97.8%')}</strong><span>{copy('Objetivo ≥ 95%', 'Target ≥ 95%')}</span></div>
          <div className={styles.sparkBars} role="img" aria-label="Tendencia ascendente de estabilidad">{trendValues.map((value, index) => <i key={index} style={{ height: `${value}%` }} />)}</div>
        </article>

        <article className={`${styles.panel} ${styles.coveragePanel}`}>
          <div className={styles.panelHeader}><div><span>{copy('Cobertura territorial', 'Territorial coverage')}</span><strong>{copy('25 estaciones', '25 stations')}</strong></div><button type="button" onClick={() => onNavigate('geo')} aria-label={copy('Abrir centro geográfico', 'Open geo center')}><MorphIcon icon={MapPinned} size={17} /></button></div>
          <div className={styles.miniMap} aria-label={copy('Vista previa geográfica', 'Geographic preview')}><GeoPreviewMap /></div>
          <div className={styles.coverageLegend}><span><i />{copy('24 conectadas', '24 connected')}</span><span><i />{copy('1 intermitente', '1 intermittent')}</span></div>
        </article>

        <article className={`${styles.panel} ${styles.alertsPanel}`}>
          <div className={styles.panelHeader}><div><span>{copy('Centro de alertas', 'Alert center')}</span><strong>{copy('Actividad reciente', 'Recent activity')}</strong></div><span className={styles.panelIcon}><MorphIcon icon={BellRing} size={17} /></span></div>
          <div className={styles.alertList}>{alerts.map((alert) => <div key={`${alert.station}-${alert.time}`}><i data-level={alert.level} /><span><strong>{alert.message}</strong><small>{alert.station}</small></span><time>{alert.time}</time></div>)}</div>
        </article>

        <article className={`${styles.panel} ${styles.dataPanel}`}>
          <div className={styles.panelHeader}><div><span>{copy('Datos consolidados', 'Consolidated data')}</span><strong>{copy('Calidad por estación', 'Quality by station')}</strong></div><button type="button" onClick={() => onNavigate('data')} aria-label={copy('Abrir datos consolidados', 'Open consolidated data')}><MorphIcon icon={Database} size={17} /></button></div>
          <div className={styles.compactTable}>{stations.map((station) => <div key={station.code}><span><strong>{station.name}</strong><small>{station.code}</small></span><b>{station.stability}</b><em data-status={station.status}>{station.status}</em></div>)}</div>
        </article>
      </div>
      <p className={styles.demoNote}>{copy('Información demostrativa · Actualización simulada en tiempo real', 'Demo information · Simulated real-time updates')}</p>
    </section>
  );
}
