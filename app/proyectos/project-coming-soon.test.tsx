import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LocaleProvider from '../locale-provider';
import ProjectComingSoon from './project-coming-soon';
import { pendingProjects, type PendingProjectId } from './pending-projects';

// Icon geometry belongs to Morphicons; these tests cover copy and navigation.
vi.mock('morphicons/react', () => ({ MorphIcon: () => <svg aria-hidden="true" /> }));

describe('proyectos en construcción', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it.each(['ruta', 'mesa'] as PendingProjectId[])('presenta %s sin prometer funciones disponibles', (projectId) => {
    render(<LocaleProvider><ProjectComingSoon projectId={projectId} /></LocaleProvider>);
    expect(screen.getByRole('heading', { level: 1, name: pendingProjects[projectId].name })).toBeInTheDocument();
    expect(screen.getByText('En construcción')).toBeInTheDocument();
    expect(screen.getByText(/Pronto estará disponible/)).toBeInTheDocument();
    expect(screen.getAllByText('Previsto')).toHaveLength(3);
    expect(screen.getByText(/No representa una aplicación funcional/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Probar Observa/ })).toHaveAttribute('href', '/proyectos/observa');
    expect(screen.getByRole('link', { name: 'Volver a proyectos' })).toHaveAttribute('href', '/#proyectos');
  });

  it.each(['ruta', 'mesa'] as PendingProjectId[])('traduce el contenido de %s y conserva la preferencia', (projectId) => {
    render(<LocaleProvider><ProjectComingSoon projectId={projectId} /></LocaleProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar el idioma a inglés' }));
    expect(screen.getByText('Under construction')).toBeInTheDocument();
    expect(screen.getByText(/It will be available to try soon/)).toBeInTheDocument();
    expect(screen.getAllByText('Planned')).toHaveLength(3);
    expect(screen.queryByText('En construcción')).not.toBeInTheDocument();
    for (const plannedModule of pendingProjects[projectId].modules) expect(screen.getByText(plannedModule[1])).toBeInTheDocument();
    for (const skill of pendingProjects[projectId].skills) expect(screen.getByText(skill[1])).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute('href', '/#proyectos');
    expect(window.localStorage.getItem('jl-portfolio-locale')).toBe('en');
  });
});
