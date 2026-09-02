'use client';

import Link from 'next/link';
import { CarFront, CreditCard } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import LanguageToggle from '../language-toggle';
import ThemeToggle from '../theme-toggle';
import { useLocale } from '../locale-provider';
import { pendingProjects, type PendingProjectId } from './pending-projects';
import styles from './project-coming-soon.module.css';

export default function ProjectComingSoon({ projectId }: { projectId: PendingProjectId }) {
  const { copy } = useLocale();
  const project = pendingProjects[projectId];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.back} href="/#proyectos">
          <span aria-hidden="true">←</span> {copy('Portafolio', 'Portfolio')}
        </Link>
        <div className="header-actions"><LanguageToggle /><ThemeToggle /></div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="project-title">
          <span className={styles.status}><i aria-hidden="true" />{copy('En construcción', 'Under construction')}</span>
          <p className={styles.category}>{copy(project.category[0], project.category[1])}</p>
          <h1 id="project-title">{project.name}</h1>
          <p className={styles.description}>{copy(project.description[0], project.description[1])}</p>
          <p className={styles.notice}>
            {copy('Esta aplicación aún está en desarrollo. Pronto estará disponible para que puedas probarla.', 'This application is still in development. It will be available to try soon.')}
          </p>
          <div className={styles.actions}>
            <Link className="button button-primary" href="/proyectos/observa">{copy('Probar Observa', 'Try Observa')} <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/#proyectos">{copy('Volver a proyectos', 'Back to projects')}</Link>
          </div>
          <p className={styles.available}>{copy('Observa ya tiene una demo disponible.', 'An Observa demo is already available.')}</p>
        </section>

        <section className={styles.preview} aria-labelledby="preview-title">
          <div className={styles.windowBar}>
            <span aria-hidden="true"><i /><i /><i /></span>
            <span>{project.name} / {copy('Vista conceptual', 'Concept preview')}</span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.icon} aria-hidden="true">
              <MorphIcon icon={projectId === 'ruta' ? CarFront : CreditCard} size={36} strokeWidth={1.5} />
            </div>
            <h2 id="preview-title">{copy('Lo que viene', 'What is coming')}</h2>
            <p>{copy('Módulos previstos para esta experiencia.', 'Planned modules for this experience.')}</p>
            <ol className={styles.modules}>
              {project.modules.map((module, index) => (
                <li key={module[1]}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <strong>{copy(module[0], module[1])}</strong>
                  <span className={styles.planned}>{copy('Previsto', 'Planned')}</span>
                </li>
              ))}
            </ol>
            <p className={styles.caption}>{copy('Vista ilustrativa. No representa una aplicación funcional.', 'Illustrative preview. This is not a working application.')}</p>
          </div>
        </section>

        <section className={styles.skills} aria-labelledby="skills-title">
          <h2 id="skills-title">{copy('Habilidades que mostrará', 'Skills this project will demonstrate')}</h2>
          <ul>{project.skills.map((skill) => <li key={skill[1]}>{copy(skill[0], skill[1])}</li>)}</ul>
        </section>
      </main>

      <footer className={styles.footer}>
        {copy('Una interfaz personalizada, construida paso a paso.', 'A custom interface, built step by step.')}
      </footer>
    </div>
  );
}
