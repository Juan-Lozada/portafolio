'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useSyncExternalStore } from 'react';
import { BarChart3, ChevronLeft, Database, Gauge, MapPinned, Menu, PanelLeftClose, Settings2, X } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import OverviewModule from './overview-module';
import LanguageToggle from '../../language-toggle';
import { useLocale } from '../../locale-provider';
import styles from './observa.module.css';

const ChartsModule = dynamic(() => import('./charts-module'), { ssr: false, loading: () => <ModuleLoading /> });
const DataModule = dynamic(() => import('./data-module'), { loading: () => <ModuleLoading /> });
const GeoModule = dynamic(() => import('./geo-module'), { ssr: false, loading: () => <ModuleLoading /> });
const AdminModule = dynamic(() => import('./admin-module'), { loading: () => <ModuleLoading /> });
const TourGeoPreviewMap = dynamic(() => import('./geo-preview-map'), { ssr: false, loading: () => <div className={styles.previewMapLoading} /> });

export type ModuleId = 'overview' | 'charts' | 'data' | 'geo' | 'admin';
type SidebarMode = 'expanded' | 'hidden';

const noStoreSubscribe = () => () => undefined;
type TourPreviewKind = 'welcome' | 'navigation' | 'metrics' | 'charts' | 'data' | 'geo' | 'admin';

const tourSteps: Array<{ title: string; text: string; windowTitle: string; preview: TourPreviewKind; module: ModuleId }> = [
  { title: 'Conoce Observa en menos de un minuto.', text: 'Este recorrido abre cada módulo real y te muestra qué problema resuelve antes de que lo explores por tu cuenta.', windowTitle: 'Vista general del producto', preview: 'welcome', module: 'overview' },
  { title: 'La navegación organiza toda la operación.', text: 'Desde el lateral puedes entrar a los cinco módulos, compactar el menú para ganar espacio u ocultarlo en pantallas pequeñas.', windowTitle: 'Navegación principal', preview: 'navigation', module: 'overview' },
  { title: 'El resumen prioriza decisiones rápidas.', text: 'Las tarjetas muestran estabilidad, estaciones, alertas y volumen. Debajo aparecen tendencias y eventos que requieren atención.', windowTitle: 'Resumen operacional', preview: 'metrics', module: 'overview' },
  { title: 'Las visualizaciones permiten investigar patrones.', text: 'Aquí puedes comparar tendencias, distribuciones y relaciones. Los filtros cambian el periodo sin abandonar el contexto.', windowTitle: 'Galería de visualizaciones', preview: 'charts', module: 'charts' },
  { title: 'Los datos consolidados explican cada métrica.', text: 'La tabla permite buscar, filtrar y revisar estado, calidad y estabilidad por estación para pasar del indicador al registro.', windowTitle: 'Datos consolidados', preview: 'data', module: 'data' },
  { title: 'El geocentro conecta el dato con el territorio.', text: 'El mapa real permite acercar, mover y seleccionar estaciones. Cada punto actualiza su estado, señal y último valor en el panel lateral.', windowTitle: 'Monitoreo territorial', preview: 'geo', module: 'geo' },
  { title: 'Administración completa el flujo operativo.', text: 'El CRUD permite crear, editar y retirar estaciones de la demostración, con formularios simples y estados claramente identificados.', windowTitle: 'Administración de estaciones', preview: 'admin', module: 'admin' },
];

function ModuleLoading() {
  const { copy } = useLocale();
  return <div className={styles.moduleLoading} aria-label={copy('Cargando módulo', 'Loading module')}><span /><span /><span /></div>;
}

function TourPreview({ kind }: { kind: TourPreviewKind }) {
  const { copy } = useLocale();
  if (kind === 'navigation') return <div className={styles.previewNavigationStage}><div className={styles.previewNavigation}>{copy(['Resumen', 'Visualizaciones', 'Datos', 'Geocentro', 'Administración'], ['Overview', 'Visualizations', 'Data', 'Geo center', 'Administration']).map((item, index) => <span key={item} data-active={index === 0}><i />{item}</span>)}</div><div className={styles.previewNavigationWorkspace}><span /><strong>{copy('Área de trabajo', 'Workspace')}</strong><div><i /><i /><i /><i /></div></div></div>;
  if (kind === 'metrics') return <div className={styles.previewMetrics}>{copy([['Estabilidad', '97,8%'], ['Estaciones', '24 / 25'], ['Alertas', '08'], ['Registros', '1,84 M']], [['Stability', '97.8%'], ['Stations', '24 / 25'], ['Alerts', '08'], ['Records', '1.84 M']]).map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>;
  if (kind === 'charts') return <div className={styles.previewCharts}><article><span>{copy('Tendencia', 'Trend')}</span><div>{[42, 61, 53, 76, 68, 88, 82].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article><article><span>{copy('Distribución', 'Distribution')}</span><b /><b /><b /></article></div>;
  if (kind === 'data') return <div className={styles.previewData}><header><span>{copy('Estación', 'Station')}</span><span>{copy('Estado', 'Status')}</span><span>{copy('Calidad', 'Quality')}</span></header>{copy([['Cordillera Norte', 'Operativa', '99,2%'], ['Valle Central', 'Revisar', '91,6%'], ['Costa Sur', 'Operativa', '97,4%']], [['North Range', 'Operational', '99.2%'], ['Central Valley', 'Review', '91.6%'], ['South Coast', 'Operational', '97.4%']]).map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>;
  if (kind === 'geo') return <div className={styles.previewGeo}><div className={styles.previewGeoMap}><TourGeoPreviewMap /></div><aside><span>{copy('Estación seleccionada', 'Selected station')}</span><strong>{copy('Valle Central', 'Central Valley')}</strong><small>{copy('76% de señal · dato recibido ahora', '76% signal · data received now')}</small><b><i style={{ width: '76%' }} /></b></aside></div>;
  if (kind === 'admin') return <div className={styles.previewAdmin}><button type="button" tabIndex={-1}>+ {copy('Nueva estación', 'New station')}</button>{copy(['Cordillera Norte', 'Valle Central', 'Costa Sur'], ['North Range', 'Central Valley', 'South Coast']).map((item, index) => <div key={item}><span>{item}</span><em>{index === 1 ? copy('Revisión', 'Review') : copy('Operativa', 'Operational')}</em><b>•••</b></div>)}</div>;
  return <div className={styles.previewWelcome}><span>O</span><div><strong>Observa</strong><small>{copy('Visualización · territorio · administración', 'Visualization · territory · administration')}</small></div></div>;
}

export default function ObservaDashboard() {
  const { copy } = useLocale();
  const modules = copy([
    { id: 'overview' as const, label: 'Resumen', detail: 'Estado general', icon: Gauge },
    { id: 'charts' as const, label: 'Visualizaciones', detail: 'Galería de gráficas', icon: BarChart3 },
    { id: 'data' as const, label: 'Datos', detail: 'Consolidados', icon: Database },
    { id: 'geo' as const, label: 'Geocentro', detail: 'Monitoreo territorial', icon: MapPinned },
    { id: 'admin' as const, label: 'Administración', detail: 'Estaciones y usuarios', icon: Settings2 },
  ], [
    { id: 'overview' as const, label: 'Overview', detail: 'Overall status', icon: Gauge },
    { id: 'charts' as const, label: 'Visualizations', detail: 'Chart gallery', icon: BarChart3 },
    { id: 'data' as const, label: 'Data', detail: 'Consolidated records', icon: Database },
    { id: 'geo' as const, label: 'Geo center', detail: 'Territorial monitoring', icon: MapPinned },
    { id: 'admin' as const, label: 'Administration', detail: 'Stations and users', icon: Settings2 },
  ]);
  const localizedTourSteps = copy(tourSteps, [
    { title: 'Meet Observa in under a minute.', text: 'This tour opens each real module and shows the problem it solves before you explore it on your own.', windowTitle: 'Product overview', preview: 'welcome' as const, module: 'overview' as const },
    { title: 'Navigation organizes the entire operation.', text: 'Use the sidebar to enter all five modules, compact the menu for more room, or hide it on smaller screens.', windowTitle: 'Main navigation', preview: 'navigation' as const, module: 'overview' as const },
    { title: 'The overview prioritizes fast decisions.', text: 'Cards show stability, stations, alerts and volume. Trends and events requiring attention appear below.', windowTitle: 'Operational overview', preview: 'metrics' as const, module: 'overview' as const },
    { title: 'Visualizations help investigate patterns.', text: 'Compare trends, distributions and relationships. Filters change the period without losing context.', windowTitle: 'Visualization gallery', preview: 'charts' as const, module: 'charts' as const },
    { title: 'Consolidated data explains every metric.', text: 'Search, filter and review status, quality and stability by station to move from the indicator to the record.', windowTitle: 'Consolidated data', preview: 'data' as const, module: 'data' as const },
    { title: 'The geo center connects data to territory.', text: 'The real map supports zooming, panning and station selection. Each point updates status, signal and latest value.', windowTitle: 'Territorial monitoring', preview: 'geo' as const, module: 'geo' as const },
    { title: 'Administration completes the workflow.', text: 'The CRUD lets you create, edit and remove demo stations with simple forms and clearly identified states.', windowTitle: 'Station administration', preview: 'admin' as const, module: 'admin' as const },
  ]);
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('expanded');
  const [tourForced, setTourForced] = useState(false);
  const [tourDismissed, setTourDismissed] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const hydrated = useSyncExternalStore(noStoreSubscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  const active = modules.find((module) => module.id === activeModule) ?? modules[0];
  const tourSeen = hydrated && window.localStorage.getItem('observa-tour-v2') === 'done';
  const tourOpen = hydrated && !tourDismissed && (tourForced || !tourSeen);

  function navigate(module: ModuleId) {
    setActiveModule(module);
    if (window.innerWidth < 760) setSidebarMode('hidden');
  }

  function closeTour() {
    window.localStorage.setItem('observa-tour-v2', 'done');
    setActiveModule('overview');
    setTourForced(false);
    setTourDismissed(true);
    setTourStep(0);
  }

  function startTour() {
    setActiveModule('overview');
    setSidebarMode('expanded');
    setTourStep(0);
    setTourDismissed(false);
    setTourForced(true);
  }

  function moveTour(next: number) {
    // The guided window owns the demonstration. Keeping the workspace on the
    // overview prevents heavy modules (especially Leaflet) from competing with it.
    setTourForced(true);
    setTourDismissed(false);
    setTourStep(next);
    if (next === 1) setSidebarMode('expanded');
    else if (window.innerWidth < 760) setSidebarMode('hidden');
  }

  return (
    <main className={styles.appShell} data-sidebar={sidebarMode}>
      <aside className={`${styles.sidebar} ${tourOpen && tourStep === 1 ? styles.tourFocus : ''}`} aria-label={copy('Navegación de Observa', 'Observa navigation')}>
        <div className={styles.sidebarHeader}>
          <button className={styles.productBrand} type="button" onClick={() => navigate('overview')} aria-label="Ir al resumen"><span>O</span><strong>Observa</strong></button>
          <button className={styles.hideSidebar} type="button" onClick={() => setSidebarMode('hidden')} aria-label={copy('Ocultar navegación', 'Hide navigation')}><MorphIcon icon={X} size={18} strokeWidth={1.8} /></button>
        </div>

        <nav className={styles.sideNav}>
          <span className={styles.navSectionLabel}>{copy('Operación', 'Operations')}</span>
          {modules.map((module) => (
            <button key={module.id} type="button" className={activeModule === module.id ? styles.activeLink : ''} onClick={() => navigate(module.id)} aria-current={activeModule === module.id ? 'page' : undefined}>
              <span className={styles.navIcon}><MorphIcon icon={module.icon} size={19} strokeWidth={1.7} /></span>
              <span className={styles.navCopy}><strong>{module.label}</strong><small>{module.detail}</small></span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <span className={styles.liveChip}><i /> {copy('Red conectada', 'Network connected')}</span>
          <Link href="/"><MorphIcon icon={ChevronLeft} size={16} /> <span>{copy('Volver al portafolio', 'Back to portfolio')}</span></Link>
        </div>
      </aside>

      {sidebarMode === 'hidden' && !tourOpen ? (
        <aside className={styles.collapsedDock} aria-label={copy('Acceso rápido a los módulos', 'Quick module access')}>
          <button
            className={`${styles.dockCurrent} ${styles.activeDockItem}`}
            type="button"
            onClick={() => setSidebarMode('expanded')}
            aria-label={`${copy('Módulo actual', 'Current module')}: ${active.label}. ${copy('Abrir navegación completa', 'Open full navigation')}`}
            aria-current="page"
          >
            <MorphIcon icon={active.icon} size={19} strokeWidth={1.8} spring="smooth" />
            <span>{active.label}</span>
          </button>
          <nav className={styles.collapsedDockNav}>
            {modules.filter((module) => module.id !== activeModule).map((module) => (
              <button
                key={module.id}
                type="button"
                onClick={() => navigate(module.id)}
                aria-label={module.label}
              >
                <MorphIcon icon={module.icon} size={18} strokeWidth={1.75} spring="smooth" />
                <span>{module.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      ) : null}

      {sidebarMode !== 'hidden' ? <button className={styles.mobileScrim} type="button" aria-label={copy('Cerrar navegación', 'Close navigation')} onClick={() => setSidebarMode('hidden')} /> : null}

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeading}>
            <button className={styles.sidebarTrigger} type="button" onClick={() => setSidebarMode(sidebarMode === 'hidden' ? 'expanded' : 'hidden')} aria-label={sidebarMode === 'hidden' ? copy('Mostrar navegación', 'Show navigation') : copy('Ocultar navegación', 'Hide navigation')}><MorphIcon icon={sidebarMode === 'hidden' ? Menu : PanelLeftClose} size={19} strokeWidth={1.8} spring="snappy" /></button>
            <div><span>Observa</span><strong>{active.label}</strong></div>
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.lastUpdate}><i /> {copy('Actualizado hace 18 s', 'Updated 18 s ago')}</span>
            <LanguageToggle compact />
            <button type="button" onClick={startTour}>{copy('Ver recorrido', 'Take the tour')}</button>
            <span className={styles.userBadge} aria-label={copy('Usuario demostrativo', 'Demo user')}>JL</span>
          </div>
        </header>

        <div className={`${styles.content} ${tourOpen && tourStep >= 2 ? styles.tourFocus : ''}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeModule} initial={reduceMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: .24, ease: [0.22, 1, 0.36, 1] }}>
              {activeModule === 'overview' ? <OverviewModule onNavigate={navigate} tourFocus={tourOpen && tourStep === 2} /> : null}
              {activeModule === 'charts' ? <ChartsModule /> : null}
              {activeModule === 'data' ? <DataModule /> : null}
              {activeModule === 'geo' ? <GeoModule /> : null}
              {activeModule === 'admin' ? <AdminModule /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {tourOpen ? (
        <div className={styles.tourLayer}>
          <div className={styles.tourShowcase}>
            <div className={styles.tourWindow} aria-label={`${copy('Demostración', 'Demo')}: ${localizedTourSteps[tourStep].windowTitle}`}>
              <header><span>{copy('Vista guiada', 'Guided view')}</span><strong>{localizedTourSteps[tourStep].windowTitle}</strong><i>{copy('En vivo', 'Live')}</i></header>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className={styles.tourPreviewTransition}
                  key={localizedTourSteps[tourStep].preview}
                  initial={reduceMotion ? false : { opacity: 0, y: 10, scale: .99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: .99 }}
                  transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TourPreview kind={localizedTourSteps[tourStep].preview} />
                </motion.div>
              </AnimatePresence>
            </div>
            <section className={styles.tourDialog} role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-live="polite">
              <button className={styles.closeTour} type="button" onClick={closeTour} aria-label={copy('Cerrar recorrido', 'Close tour')}>×</button>
              <div className={styles.tourProgress}><span>{copy('Paso', 'Step')} {tourStep + 1} {copy('de', 'of')} {localizedTourSteps.length}</span><div>{localizedTourSteps.map((step, index) => <i key={step.preview} data-active={index <= tourStep} />)}</div></div>
              <h2 id="tour-title">{localizedTourSteps[tourStep].title}</h2>
              <p>{localizedTourSteps[tourStep].text}</p>
              <div className={styles.tourActions}>
                <button type="button" onClick={tourStep === 0 ? closeTour : () => moveTour(tourStep - 1)}>{tourStep === 0 ? copy('Omitir', 'Skip') : copy('Anterior', 'Previous')}</button>
                <button className={styles.primaryTourAction} type="button" onClick={tourStep === localizedTourSteps.length - 1 ? closeTour : () => moveTour(tourStep + 1)}>{tourStep === localizedTourSteps.length - 1 ? copy('Explorar Observa', 'Explore Observa') : copy('Siguiente', 'Next')}</button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </main>
  );
}
