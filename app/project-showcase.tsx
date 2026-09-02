'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight, CarFront, ChartNoAxesCombined, CreditCard } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import styles from './project-showcase.module.css';
import { useLocale } from './locale-provider';

const previews = [
  {
    number: '01',
    name: 'Observa',
    category: 'Datos y monitoreo',
    categoryEn: 'Data and monitoring',
    description: 'Indicadores, alertas y territorio convertidos en una lectura accionable.',
    descriptionEn: 'Indicators, alerts and territory turned into an actionable reading.',
    icon: ChartNoAxesCombined,
    href: '/proyectos/observa',
    status: 'Explorar',
    statusEn: 'Explore',
    visual: 'chart',
    statement: 'Detectar cambios antes de que se conviertan en problemas.',
    statementEn: 'Detect changes before they become problems.',
    skills: ['Dataviz', 'Mapas', 'Estados críticos'],
    skillsEn: ['Dataviz', 'Maps', 'Critical states'],
    result: 'Lectura rápida sin perder trazabilidad.',
    resultEn: 'Fast reading without losing traceability.',
  },
  {
    number: '02',
    name: 'Ruta',
    category: 'Operación de flota',
    categoryEn: 'Fleet operations',
    description: 'Vehículos, prioridades y mantenimientos organizados en un solo flujo.',
    descriptionEn: 'Vehicles, priorities and maintenance organized in one flow.',
    icon: CarFront,
    href: null,
    status: 'En diseño',
    statusEn: 'In design',
    visual: 'route',
    statement: 'Coordinar una operación completa desde una vista priorizada.',
    statementEn: 'Coordinate a complete operation from a prioritized view.',
    skills: ['Flujos', 'Roles', 'Caché de datos'],
    skillsEn: ['Flows', 'Roles', 'Data caching'],
    result: 'Procesos dispersos convertidos en acción.',
    resultEn: 'Scattered processes turned into action.',
  },
  {
    number: '03',
    name: 'Mesa',
    category: 'Pagos con QR',
    categoryEn: 'QR payments',
    description: 'Una experiencia móvil simple para revisar, dividir y pagar una cuenta.',
    descriptionEn: 'A simple mobile experience to review, split and pay a bill.',
    icon: CreditCard,
    href: null,
    status: 'Planificado',
    statusEn: 'Planned',
    visual: 'payment',
    statement: 'Reducir la fricción en el momento más sensible del servicio.',
    statementEn: 'Reduce friction at the most sensitive point of the service.',
    skills: ['Mobile UX', 'Validación', 'Estados asíncronos'],
    skillsEn: ['Mobile UX', 'Validation', 'Async states'],
    result: 'Un pago breve, claro y confiable.',
    resultEn: 'A short, clear and reliable payment.',
  },
];

function AnimatedPreview({ type }: { type: string }) {
  const { copy } = useLocale();
  if (type === 'chart') {
    return (
      <div className={styles.chartPreview} aria-hidden="true">
        <div><span>{copy('Calidad', 'Quality')}</span><strong>96,8%</strong></div>
        <div className={styles.miniBars}>{[38, 55, 46, 68, 61, 82, 74].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
        <small><i /> {copy('Sistema operativo', 'System operational')}</small>
      </div>
    );
  }

  if (type === 'route') {
    return (
      <div className={styles.routePreview} aria-hidden="true">
        <span className={styles.routeLine} />
        <i className={styles.routePointOne} /><i className={styles.routePointTwo} /><i className={styles.routePointThree} />
        <div className={styles.vehicleChip}><span>12</span><small>{copy('Vehículos activos', 'Active vehicles')}</small></div>
      </div>
    );
  }

  return (
    <div className={styles.paymentPreview} aria-hidden="true">
      <div className={styles.phoneMockup}>
        <span>{copy('Tu cuenta', 'Your bill')}</span><strong>$ 42.800</strong>
        <i><b /> {copy('Pago protegido', 'Protected payment')}</i>
      </div>
      <div className={styles.paymentPulse}>✓</div>
    </div>
  );
}

function StoryPanel({ project, index, progress }: { project: (typeof previews)[number]; index: number; progress: MotionValue<number> }) {
  const { locale, copy } = useLocale();
  const ranges = [
    { input: [0, 0.08, 0.28, 0.39], opacity: [1, 1, 1, 0], y: ['0%', '0%', '-4%', '-14%'], scale: [1, 1, .98, .94] },
    { input: [0.27, 0.39, 0.61, 0.72], opacity: [0, 1, 1, 0], y: ['14%', '0%', '-4%', '-14%'], scale: [.94, 1, .98, .94] },
    { input: [0.6, 0.72, 0.94, 1], opacity: [0, 1, 1, 1], y: ['14%', '0%', '0%', '0%'], scale: [.94, 1, 1, 1] },
  ][index];
  const opacity = useTransform(progress, ranges.input, ranges.opacity);
  const y = useTransform(progress, ranges.input, ranges.y);
  const scale = useTransform(progress, ranges.input, ranges.scale);

  return (
    <motion.article className={styles.storyPanel} style={{ opacity, y, scale }} aria-hidden={undefined}>
      <div className={styles.storyCopy}>
        <span className={styles.storyNumber}>{project.number} / 03</span>
        <p>{locale === 'en' ? project.categoryEn : project.category}</p>
        <h3>{locale === 'en' ? project.statementEn : project.statement}</h3>
        <ul>{(locale === 'en' ? project.skillsEn : project.skills).map((skill) => <li key={skill}>{skill}</li>)}</ul>
        <strong>{locale === 'en' ? project.resultEn : project.result}</strong>
        {project.href ? <Link href={project.href}>{copy('Abrir experiencia', 'Open experience')} <span aria-hidden="true">↗</span></Link> : <span className={styles.comingSoon}>{copy('Caso en desarrollo', 'Case in progress')}</span>}
      </div>
      <div className={styles.storyVisual}>
        <div className={styles.storyWindowBar}><span /><span /><span /><small>{project.name.toLowerCase()}.demo</small></div>
        <AnimatedPreview type={project.visual} />
      </div>
    </motion.article>
  );
}

function ScrollStory() {
  const { locale, copy } = useLocale();
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: .25 });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = latest < .34 ? 0 : latest < .67 ? 1 : 2;
    setActive((current) => current === next ? current : next);
  });

  if (reduceMotion) {
    return (
      <div className={styles.reducedStories}>
        {previews.map((project) => (
          <article key={project.name}>
            <div><span>{project.number}</span><h3>{locale === 'en' ? project.statementEn : project.statement}</h3><p>{locale === 'en' ? project.resultEn : project.result}</p></div>
            <AnimatedPreview type={project.visual} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.scrollStory} ref={target}>
      <div className={styles.stickyStage}>
        <div className={styles.storyRail} aria-label="Progreso de proyectos">
          <motion.span className={styles.railProgress} style={{ scaleY: progress }} />
          {previews.map((project, index) => <span key={project.name} className={index === active ? styles.activeRailItem : ''}>{project.number}</span>)}
        </div>
        <div className={styles.morphingProjectIcon} aria-hidden="true">
          <MorphIcon icon={previews[active].icon} size={24} strokeWidth={1.7} spring="smooth" />
        </div>
        <div className={styles.storyStack}>
          {previews.map((project, index) => <StoryPanel key={project.name} project={project} index={index} progress={progress} />)}
        </div>
        <p className={styles.scrollHint}>{copy('Desliza para transformar la experiencia', 'Scroll to transform the experience')} <span aria-hidden="true">↓</span></p>
      </div>
    </div>
  );
}

function PreviewCard({ project, index }: { project: (typeof previews)[number]; index: number }) {
  const { locale } = useLocale();
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const content = (
    <motion.article
      className={styles.previewCard}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cardTopline}>
        <span>{project.number}</span>
        <span>{locale === 'en' ? project.statusEn : project.status}</span>
      </div>
      <AnimatedPreview type={project.visual} />
      <div className={styles.cardCopy}>
        <div className={styles.iconShell}>
          <MorphIcon icon={hovered && project.href ? ArrowUpRight : project.icon} size={20} strokeWidth={1.8} spring="smooth" />
        </div>
        <p>{locale === 'en' ? project.categoryEn : project.category}</p>
        <h3>{project.name}</h3>
        <span>{locale === 'en' ? project.descriptionEn : project.description}</span>
      </div>
    </motion.article>
  );

  return project.href ? <Link className={styles.cardLink} href={project.href}>{content}</Link> : <div className={styles.cardLink}>{content}</div>;
}

export default function ProjectShowcase() {
  const { copy } = useLocale();
  return (
    <section className={styles.showcase} id="proyectos" aria-labelledby="projects-title">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy('Proyectos en movimiento', 'Projects in motion')}</p>
          <h2 id="projects-title">{copy('Tres productos, tres problemas concretos.', 'Three products, three concrete problems.')}</h2>
        </div>
        <p>{copy('Pasa sobre cada experiencia para descubrirla. Los datos, marcas y escenarios son completamente ficticios.', 'Hover over each experience to discover it. All data, brands and scenarios are entirely fictional.')}</p>
      </div>
      <div className={styles.previewGrid}>
        {previews.map((project, index) => <PreviewCard key={project.name} project={project} index={index} />)}
      </div>
      <div className={styles.storyHeading}>
        <span>{copy('De problema a producto', 'From problem to product')}</span>
        <p>{copy('Una misma base de diseño se adapta a tres contextos distintos mientras avanzas.', 'One design foundation adapts to three different contexts as you move forward.')}</p>
      </div>
      <ScrollStory />
    </section>
  );
}
