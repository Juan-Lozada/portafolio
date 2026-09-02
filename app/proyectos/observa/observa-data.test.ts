import { describe, expect, it } from 'vitest';
import { overviewMetrics, recentAlerts, stationSummary, trendValues } from './observa-data';

describe('datos demostrativos de Observa', () => {
  it('mantiene identificadores de estación únicos', () => {
    const codes = stationSummary.map((station) => station.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('entrega series y resúmenes utilizables por los módulos', () => {
    expect(overviewMetrics.length).toBeGreaterThanOrEqual(4);
    expect(recentAlerts.length).toBeGreaterThan(0);
    expect(trendValues).toHaveLength(16);
    expect(trendValues.every((value) => value >= 0 && value <= 100)).toBe(true);
  });
});
