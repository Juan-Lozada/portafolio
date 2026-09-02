'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import styles from './observa.module.css';
import { useLocale } from '../../locale-provider';

type Station = { id: string; name: string; region: string; type: string; status: string };
const initialStations: Station[] = [
  { id: 'EST-012', name: 'Cordillera Norte', region: 'Metropolitana', type: 'Ambiental', status: 'Activa' },
  { id: 'EST-008', name: 'Valle Central', region: 'Metropolitana', type: 'Mixta', status: 'Revisión' },
  { id: 'EST-021', name: 'Costa Sur', region: 'Valparaíso', type: 'Meteorológica', status: 'Activa' },
  { id: 'EST-017', name: 'Quebrada Este', region: 'Metropolitana', type: 'Ambiental', status: 'Activa' },
];
const emptyStation: Station = { id: '', name: '', region: 'Metropolitana', type: 'Ambiental', status: 'Activa' };

export default function AdminModule() {
  const { copy } = useLocale();
  const [stations, setStations] = useState(initialStations);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Station | null>(null);
  const [form, setForm] = useState<Station>(emptyStation);
  const filtered = useMemo(() => stations.filter((station) => Object.values(station).join(' ').toLowerCase().includes(query.toLowerCase())), [stations, query]);

  function openCreate() { setEditing(null); setForm({ ...emptyStation, id: `EST-${String(30 + stations.length).padStart(3, '0')}` }); }
  function openEdit(station: Station) { setEditing(station); setForm(station); }
  function closeForm() { setForm(emptyStation); setEditing(null); }
  function submit(event: FormEvent) { event.preventDefault(); setStations((current) => editing ? current.map((station) => station.id === editing.id ? form : station) : [...current, form]); closeForm(); }
  function remove(id: string) { setStations((current) => current.filter((station) => station.id !== id)); }
  const formOpen = Boolean(form.id);

  return (
    <section className={styles.module} aria-labelledby="admin-title">
      <header className={styles.moduleHeader}><div><p>{copy('Configuración operacional', 'Operational configuration')}</p><h1 id="admin-title">{copy('Administración', 'Administration')}</h1></div><button className={styles.moduleAction} type="button" onClick={openCreate}><MorphIcon icon={Plus} size={16} /> {copy('Nueva estación', 'New station')}</button></header>
      <div className={styles.adminSummary}><article><strong>{stations.length}</strong><span>{copy('Estaciones', 'Stations')}</span></article><article><strong>{stations.filter((station) => station.status === 'Activa').length}</strong><span>{copy('Activas', 'Active')}</span></article><article><strong>04</strong><span>{copy('Roles configurados', 'Configured roles')}</span></article></div>
      <div className={styles.adminPanel}>
        <div className={styles.dataToolbar}><label><MorphIcon icon={Search} size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy('Buscar estación', 'Search station')} /></label><span>{filtered.length} {copy('registros', 'records')}</span></div>
        <div className={styles.adminList}>{filtered.map((station) => <article key={station.id}><span><strong>{station.name}</strong><small>{station.id}</small></span><span>{station.region}</span><span>{copy(station.type, station.type === 'Ambiental' ? 'Environmental' : station.type === 'Meteorológica' ? 'Meteorological' : 'Mixed')}</span><em data-status={station.status}>{copy(station.status, station.status === 'Activa' ? 'Active' : station.status === 'Revisión' ? 'Review' : 'Inactive')}</em><div><button type="button" onClick={() => openEdit(station)} aria-label={`${copy('Editar', 'Edit')} ${station.name}`}><MorphIcon icon={Pencil} size={15} /></button><button type="button" onClick={() => remove(station.id)} aria-label={`${copy('Eliminar', 'Delete')} ${station.name}`}><MorphIcon icon={Trash2} size={15} /></button></div></article>)}</div>
      </div>
      {formOpen ? <div className={styles.modalLayer}><form className={styles.adminForm} onSubmit={submit}><div className={styles.formHeader}><div><span>{editing ? copy('Editar registro', 'Edit record') : copy('Nuevo registro', 'New record')}</span><strong>{editing ? editing.name : copy('Crear estación', 'Create station')}</strong></div><button type="button" onClick={closeForm} aria-label={copy('Cerrar formulario', 'Close form')}><MorphIcon icon={X} size={17} /></button></div><label>{copy('Código', 'Code')}<input required value={form.id} onChange={(event) => setForm({ ...form, id: event.target.value })} /></label><label>{copy('Nombre', 'Name')}<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><div className={styles.formGrid}><label>{copy('Región', 'Region')}<select value={form.region} onChange={(event) => setForm({ ...form, region: event.target.value })}><option>Metropolitana</option><option>Valparaíso</option><option>O’Higgins</option></select></label><label>{copy('Tipo', 'Type')}<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option value="Ambiental">{copy('Ambiental', 'Environmental')}</option><option value="Meteorológica">{copy('Meteorológica', 'Meteorological')}</option><option value="Mixta">{copy('Mixta', 'Mixed')}</option></select></label></div><label>{copy('Estado', 'Status')}<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="Activa">{copy('Activa', 'Active')}</option><option value="Revisión">{copy('Revisión', 'Review')}</option><option value="Inactiva">{copy('Inactiva', 'Inactive')}</option></select></label><div className={styles.formActions}><button type="button" onClick={closeForm}>{copy('Cancelar', 'Cancel')}</button><button type="submit">{editing ? copy('Guardar cambios', 'Save changes') : copy('Crear estación', 'Create station')}</button></div></form></div> : null}
    </section>
  );
}
