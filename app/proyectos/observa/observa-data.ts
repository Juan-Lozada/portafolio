export const overviewMetrics = [
  { label: 'Estabilidad', value: '97,8%', delta: '+1,2%', tone: 'good' },
  { label: 'Estaciones activas', value: '24 / 25', delta: '96% cobertura', tone: 'good' },
  { label: 'Alertas abiertas', value: '08', delta: '2 críticas', tone: 'warning' },
  { label: 'Registros hoy', value: '1,84 M', delta: '+4,7%', tone: 'neutral' },
];

export const trendValues = [54, 61, 58, 66, 72, 69, 78, 74, 82, 79, 88, 84, 91, 87, 94, 92];

export const recentAlerts = [
  { level: 'Crítica', station: 'Valle Central', message: 'Señal fuera de umbral', time: 'Hace 4 min' },
  { level: 'Media', station: 'Costa Sur', message: 'Intermitencia detectada', time: 'Hace 18 min' },
  { level: 'Baja', station: 'Cordillera Norte', message: 'Validación pendiente', time: 'Hace 42 min' },
];

export const stationSummary = [
  { name: 'Cordillera Norte', code: 'EST-012', stability: '99,2%', status: 'Operativa' },
  { name: 'Valle Central', code: 'EST-008', stability: '91,6%', status: 'Revisar' },
  { name: 'Costa Sur', code: 'EST-021', stability: '97,4%', status: 'Operativa' },
];
