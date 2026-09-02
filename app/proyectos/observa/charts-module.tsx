'use client';

import { useState } from 'react';
import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import styles from './observa.module.css';
import { useLocale } from '../../locale-provider';

type ChartGroup = 'Todas' | 'Tendencias' | 'Distribución' | 'Correlación';

const axis = { axisLine: { lineStyle: { color: '#cad8ce' } }, axisLabel: { color: '#718178', fontSize: 10 }, splitLine: { lineStyle: { color: '#edf2ee' } } };

function createCharts(english: boolean): Array<{ id: string; group: ChartGroup; title: string; description: string; height: number; option: EChartsOption }> {
return [
  {
    id: 'series', group: 'Tendencias', title: 'Serie multivariable', description: 'Comportamiento de tres señales durante 24 horas.', height: 310,
    option: {
      color: ['#155b43', '#6aa987', '#b56720'], tooltip: { trigger: 'axis' }, legend: { top: 2, right: 0, textStyle: { color: '#66786e', fontSize: 10 } },
      grid: { top: 45, right: 20, bottom: 35, left: 42 }, xAxis: { ...axis, type: 'category', data: ['00', '03', '06', '09', '12', '15', '18', '21', '24'] }, yAxis: { ...axis, type: 'value' },
      series: [
        { name: english ? 'Signal A' : 'Señal A', type: 'line', smooth: true, showSymbol: false, areaStyle: { opacity: .06 }, data: [51, 56, 53, 62, 67, 71, 68, 76, 73] },
        { name: english ? 'Signal B' : 'Señal B', type: 'line', smooth: true, showSymbol: false, data: [43, 47, 50, 48, 57, 61, 64, 62, 69] },
        { name: english ? 'Threshold' : 'Umbral', type: 'line', symbol: 'none', lineStyle: { type: 'dashed', width: 1 }, data: [65, 65, 65, 65, 65, 65, 65, 65, 65] },
      ],
    },
  },
  {
    id: 'heatmap', group: 'Distribución', title: 'Mapa de intensidad', description: 'Concentración de eventos por día y horario.', height: 310,
    option: {
      tooltip: { position: 'top' }, grid: { top: 20, right: 15, bottom: 50, left: 55 },
      xAxis: { ...axis, type: 'category', data: ['00', '04', '08', '12', '16', '20'] }, yAxis: { ...axis, type: 'category', data: english ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
      visualMap: { min: 0, max: 12, calculable: false, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 12, itemHeight: 80, inRange: { color: ['#e8f0ea', '#9cc5ae', '#155b43'] }, textStyle: { color: '#66786e', fontSize: 9 } },
      series: [{ type: 'heatmap', data: Array.from({ length: 42 }, (_, index) => [index % 6, Math.floor(index / 6), (index * 7 + 3) % 13]), emphasis: { itemStyle: { borderColor: '#17261f', borderWidth: 1 } } }],
    },
  },
  {
    id: 'gauge', group: 'Distribución', title: 'Índice de estabilidad', description: 'Cumplimiento ponderado de disponibilidad y calidad.', height: 280,
    option: {
      series: [{ type: 'gauge', startAngle: 210, endAngle: -30, min: 0, max: 100, splitNumber: 5, progress: { show: true, width: 14, itemStyle: { color: '#155b43' } }, axisLine: { lineStyle: { width: 14, color: [[1, '#e3ece6']] } }, axisTick: { show: false }, splitLine: { distance: -19, length: 5, lineStyle: { color: '#fff', width: 2 } }, axisLabel: { distance: 22, color: '#718178', fontSize: 9 }, pointer: { itemStyle: { color: '#17261f' }, width: 4 }, anchor: { show: true, size: 9, itemStyle: { color: '#17261f' } }, title: { offsetCenter: [0, '70%'], color: '#66786e', fontSize: 10 }, detail: { valueAnimation: true, formatter: '{value}%', color: '#17261f', fontSize: 24, offsetCenter: [0, '42%'] }, data: [{ value: 97.8, name: english ? 'Global stability' : 'Estabilidad global' }] }],
    },
  },
  {
    id: 'scatter', group: 'Correlación', title: 'Correlación de variables', description: 'Relación entre carga, latencia y estabilidad.', height: 280,
    option: {
      color: ['#155b43'], tooltip: { trigger: 'item' }, grid: { top: 20, right: 20, bottom: 38, left: 45 }, xAxis: { ...axis, type: 'value', name: english ? 'Load' : 'Carga', nameTextStyle: { color: '#66786e', fontSize: 9 } }, yAxis: { ...axis, type: 'value', name: english ? 'Latency' : 'Latencia', nameTextStyle: { color: '#66786e', fontSize: 9 } },
      series: [{ type: 'scatter', symbolSize: (value: unknown) => 7 + Number((value as number[])[2]) / 3, data: [[12, 22, 15], [18, 29, 22], [26, 27, 18], [34, 42, 26], [42, 38, 31], [47, 55, 36], [55, 48, 28], [62, 67, 42], [71, 59, 37], [78, 76, 48]], itemStyle: { opacity: .72 } }],
    },
  },
]}

export default function ChartsModule() {
  const { locale, copy } = useLocale();
  const [group, setGroup] = useState<ChartGroup>('Todas');
  const charts = createCharts(locale === 'en');
  const visible = group === 'Todas' ? charts : charts.filter((chart) => chart.group === group);
  const titleById: Record<string, string> = copy({ series: 'Serie multivariable', heatmap: 'Mapa de intensidad', gauge: 'Índice de estabilidad', scatter: 'Correlación de variables' }, { series: 'Multivariable series', heatmap: 'Intensity map', gauge: 'Stability index', scatter: 'Variable correlation' });
  const descriptionById: Record<string, string> = copy({ series: 'Comportamiento de tres señales durante 24 horas.', heatmap: 'Concentración de eventos por día y horario.', gauge: 'Cumplimiento ponderado de disponibilidad y calidad.', scatter: 'Relación entre carga, latencia y estabilidad.' }, { series: 'Behavior of three signals over 24 hours.', heatmap: 'Event concentration by day and time.', gauge: 'Weighted availability and quality compliance.', scatter: 'Relationship between load, latency and stability.' });
  const groupLabel = (value: ChartGroup) => copy(value, value === 'Todas' ? 'All' : value === 'Tendencias' ? 'Trends' : value === 'Distribución' ? 'Distribution' : 'Correlation');
  return (
    <section className={styles.module} aria-labelledby="charts-title">
      <header className={styles.moduleHeader}><div><p>{copy('Análisis visual', 'Visual analysis')}</p><h1 id="charts-title">{copy('Galería de gráficas', 'Chart gallery')}</h1></div><div className={styles.filterTabs}>{(['Todas', 'Tendencias', 'Distribución', 'Correlación'] as ChartGroup[]).map((item) => <button key={item} className={group === item ? styles.activePeriod : ''} type="button" onClick={() => setGroup(item)}>{groupLabel(item)}</button>)}</div></header>
      <div className={styles.chartGallery}>
        {visible.map((chart) => <article className={styles.chartPanel} key={chart.id}><div className={styles.chartCardHeader}><div><strong>{titleById[chart.id]}</strong><span>{descriptionById[chart.id]}</span></div><em>{groupLabel(chart.group)}</em></div><ReactECharts option={chart.option} style={{ height: chart.height }} notMerge lazyUpdate opts={{ renderer: 'canvas' }} /></article>)}
      </div>
      <p className={styles.demoNote}>{copy('ECharts · Interacción, ayudas contextuales y actualización dinámica habilitadas', 'ECharts · Interaction, tooltips and dynamic updates enabled')}</p>
    </section>
  );
}
