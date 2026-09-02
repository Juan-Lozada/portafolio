'use client';

import ThemeToggle from './theme-toggle';
import ProjectShowcase from './project-showcase';
import Reveal from './reveal';
import LanguageToggle from './language-toggle';
import { useLocale } from './locale-provider';

export default function Home() {
  const { copy } = useLocale();
  const capabilities = copy([
    { value: '03+', label: 'años desarrollando productos web' },
    { value: 'React + TS', label: 'especialización técnica principal' },
    { value: 'Producto', label: 'datos, monitoreo y administración' },
  ], [
    { value: '03+', label: 'years building web products' },
    { value: 'React + TS', label: 'core technical specialization' },
    { value: 'Product', label: 'data, monitoring and administration' },
  ]);
  const repositoryUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL;
  const projectSignals = copy([
    { code: '01', name: 'Observa', detail: 'Datos y monitoreo', status: 'Demo disponible' },
    { code: '02', name: 'Ruta', detail: 'Operación de flota', status: 'En construcción' },
    { code: '03', name: 'Mesa', detail: 'Pagos con QR', status: 'En construcción' },
  ], [
    { code: '01', name: 'Observa', detail: 'Data and monitoring', status: 'Demo available' },
    { code: '02', name: 'Ruta', detail: 'Fleet operations', status: 'Under construction' },
    { code: '03', name: 'Mesa', detail: 'QR payments', status: 'Under construction' },
  ]);
  const principles = copy([
    ['01', 'Entender', 'Partir desde el problema, el usuario y el contexto del negocio.'],
    ['02', 'Simplificar', 'Reducir carga cognitiva antes de sumar componentes o tecnología.'],
    ['03', 'Construir', 'Entregar porciones pequeñas, reutilizables y fáciles de revisar.'],
    ['04', 'Validar', 'Probar comportamiento, accesibilidad y rendimiento antes de cerrar.'],
  ], [
    ['01', 'Understand', 'Start with the problem, the user and the business context.'],
    ['02', 'Simplify', 'Reduce cognitive load before adding components or technology.'],
    ['03', 'Build', 'Deliver small, reusable pieces that are easy to review.'],
    ['04', 'Validate', 'Test behavior, accessibility and performance before closing.'],
  ]);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Juan Lozada, inicio">
          <span className="brand-mark" aria-hidden="true">JL</span>
          <span className="brand-copy">
            <strong>Juan Lozada</strong>
            <small>Front-End Developer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={copy('Navegación principal', 'Main navigation')}>
          <a href="#proyectos">{copy('Proyectos', 'Projects')}</a>
          <a href="#sistema">{copy('Sistema', 'System')}</a>
          <a href="#experiencia">{copy('Experiencia', 'Experience')}</a>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <ThemeToggle />
          <a className="header-cta" href="#contacto">{copy('Contactar', 'Contact')}</a>
        </div>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="availability">
            <span aria-hidden="true" />
            {copy('Disponible para oportunidades remotas o híbridas', 'Available for remote or hybrid opportunities')}
          </p>
          <p className="eyebrow">{copy('Front-End semisenior · React + TypeScript', 'Mid-level Front-End · React + TypeScript')}</p>
          <h1 id="hero-title">
            {copy('Desarrollador Front-End especializado en ', 'Front-End Developer specializing in ')}
            <em>React &amp; TypeScript.</em>
          </h1>
          <p className="hero-description">
            {copy('Diseño y desarrollo interfaces para plataformas de datos, monitoreo y administración, con foco en claridad, rendimiento y mantenibilidad.', 'I design and build interfaces for data, monitoring and administration platforms, focused on clarity, performance and maintainability.')}
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">{copy('Explorar proyectos', 'Explore projects')}</a>
            <a className="button button-secondary" href="#experiencia">{copy('Ver experiencia', 'View experience')}</a>
            {repositoryUrl ? <a className="button button-tertiary" href={repositoryUrl} target="_blank" rel="noreferrer">{copy('Revisar código', 'Review source')}</a> : null}
          </div>

          <dl className="capability-list" aria-label={copy('Resumen profesional', 'Professional summary')}>
            {capabilities.map((item) => (
              <div key={item.value}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="signal-panel" aria-label={copy('Proyectos del portafolio', 'Portfolio projects')}>
          <div className="panel-topline">
            <div>
              <span>Portfolio system</span>
              <strong>{copy('Señales de producto', 'Product signals')}</strong>
            </div>
            <span className="live-badge">v0.1</span>
          </div>

          <div className="signal-summary">
            <p>{copy('Estado general', 'Overall status')}</p>
            <strong>{copy('Base en construcción', 'Foundation in progress')}</strong>
            <span>{copy('3 productos · 1 sistema visual', '3 products · 1 visual system')}</span>
          </div>

          <ol className="project-signal-list">
            {projectSignals.map((project) => (
              <li key={project.code}>
                <span className="project-code">{project.code}</span>
                <span className="project-name">
                  <strong>{project.name}</strong>
                  <small>{project.detail}</small>
                </span>
                <span className="project-status">{project.status}</span>
              </li>
            ))}
          </ol>

          <div className="panel-footer">
            <span>JL Interface System</span>
            <span aria-hidden="true">↗</span>
          </div>
        </aside>
      </section>

      <ProjectShowcase />

      <Reveal>
      <section className="system-section" id="sistema" aria-labelledby="system-title">
        <div className="system-copy">
          <p className="eyebrow">JL Interface System</p>
          <h2 id="system-title">{copy('Un sistema visual para todo el portafolio.', 'One visual system for the entire portfolio.')}</h2>
          <p>
            {copy('Un sistema propio de tokens, componentes y patrones compartidos por todo el portafolio. Construido para mantener claridad, accesibilidad y velocidad sin hacer que cada producto se vea igual.', 'A custom system of tokens, components and patterns shared across the portfolio. Built for clarity, accessibility and speed without making every product look the same.')}
          </p>
          <span className="text-link">{copy('Foundations v0.1 · Tokens semánticos · Componentes accesibles', 'Foundations v0.1 · Semantic tokens · Accessible components')}</span>
        </div>

        <div className="token-board" aria-label={copy('Muestra de fundamentos visuales', 'Visual foundations sample')}>
          <div className="token-board-header">
            <span>Foundations · v0.1</span>
            <span>Light / Dark</span>
          </div>
          <div className="color-tokens" aria-label="Tokens de color">
            <span className="color-token token-canvas"><small>Canvas</small></span>
            <span className="color-token token-surface"><small>Surface</small></span>
            <span className="color-token token-brand"><small>Brand</small></span>
            <span className="color-token token-accent"><small>Accent</small></span>
          </div>
          <div className="component-sample">
            <div>
              <span className="sample-label">Button / Primary</span>
              <span className="sample-button">{copy('Acción principal', 'Primary action')}</span>
            </div>
            <div>
              <span className="sample-label">Status / Success</span>
              <span className="sample-status"><i aria-hidden="true" /> {copy('Operativo', 'Operational')}</span>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal delay={0.04}>
      <section className="process-section" aria-labelledby="process-title">
        <div className="section-heading process-heading">
          <div>
            <p className="eyebrow">{copy('Forma de trabajo', 'How I work')}</p>
            <h2 id="process-title">{copy('Entender. Simplificar. Construir. Validar.', 'Understand. Simplify. Build. Validate.')}</h2>
          </div>
          <p>{copy('Un proceso pequeño y repetible que conecta producto, diseño y desarrollo.', 'A small, repeatable process connecting product, design and development.')}</p>
        </div>
        <ol className="principles-list">
          {principles.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      </Reveal>

      <Reveal delay={0.04}>
      <section className="experience-section" id="experiencia" aria-labelledby="experience-title">
        <div className="experience-heading">
          <p className="eyebrow">{copy('Experiencia', 'Experience')}</p>
          <h2 id="experience-title">{copy('Experiencia aplicada a productos operacionales.', 'Experience applied to operational products.')}</h2>
        </div>
        <article className="experience-card">
          <div className="experience-meta">
            <span>{copy('Jul 2023 — Actualidad', 'Jul 2023 — Present')}</span>
            <span>React · TypeScript · Next.js</span>
          </div>
          <div className="experience-content">
            <h3>{copy('Desarrollador Front-End', 'Front-End Developer')}</h3>
            <p>
              {copy('Desarrollo y evolución de plataformas de gestión, monitoreo y visualización. Trabajo principalmente con React, interfaces complejas, APIs, permisos, mapas, gráficos y flujos administrativos.', 'Development and evolution of management, monitoring and visualization platforms. I work mainly with React, complex interfaces, APIs, permissions, maps, charts and administrative flows.')}
            </p>
            <ul>
              <li>{copy('Dashboards, alarmas, validaciones y reportabilidad.', 'Dashboards, alerts, validation and reporting.')}</li>
              <li>{copy('Componentes reutilizables, diseño responsivo y modo oscuro.', 'Reusable components, responsive design and dark mode.')}</li>
              <li>{copy('Integración con Laravel, Node.js, PostgreSQL y APIs REST.', 'Integration with Laravel, Node.js, PostgreSQL and REST APIs.')}</li>
              <li>{copy('Pruebas, rendimiento, caché y mejora de sistemas existentes.', 'Testing, performance, caching and improvement of existing systems.')}</li>
            </ul>
          </div>
        </article>
      </section>
      </Reveal>

      <Reveal>
      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <p className="eyebrow">{copy('Contacto', 'Contact')}</p>
        <h2 id="contact-title">{copy('¿Construimos algo claro y útil?', 'Shall we build something clear and useful?')}</h2>
        <p>
          {copy('Estoy disponible para oportunidades Front-End semisenior, remotas o híbridas, en equipos de producto y tecnología.', 'I am available for mid-level Front-End opportunities, remote or hybrid, in product and technology teams.')}
        </p>
        <div className="contact-actions">
          <a className="button contact-primary" href="https://www.linkedin.com/in/juanlozadao/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a className="button contact-secondary" href="https://github.com/Juan-Lozada" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      </Reveal>

      <footer className="site-footer">
        <span>Juan Lozada · Front-End Developer</span>
        <span>{copy('Diseñado y desarrollado con una interfaz y un sistema visual personalizados.', 'Designed and built with a custom interface and visual system.')}</span>
      </footer>
    </main>
  );
}
