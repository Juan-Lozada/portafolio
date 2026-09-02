<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas del proyecto

Antes de cambiar textos, componentes, documentación o traducciones, leer en este orden:

1. `.agents/skills/espanol-latinoamerica/SKILL.md`.
2. `docs/BRAND.md`, `docs/CONTENT.md` y `docs/DESIGN.md`.
3. El módulo actual y sus dependencias; nunca asumir que la estructura no cambió.

## Principios obligatorios

- Español latinoamericano (`es-LA`) es el idioma predeterminado; toda copia nueva debe tener paridad en inglés.
- Usar exclusivamente información ficticia en demostraciones. Nunca exponer clientes, marcas, credenciales, endpoints privados, ubicaciones reales sensibles ni datos operacionales.
- Diseñar mobile first, con accesibilidad por teclado, foco visible, reducción de movimiento y contraste suficiente.
- Mantener una interfaz sobria: sin degradados decorativos, sin brutalismo y sin complejidad que no resuelva una necesidad.
- Conservar la separación entre componentes, contenido, datos de demostración y estilos.
- Las variables públicas llevan `NEXT_PUBLIC_`; los secretos nunca se importan en componentes cliente.
- Antes de cerrar un cambio ejecutar `npm run check` y `npm run build`. Para cambios visuales, comprobar escritorio y móvil.
- El proyecto se desarrolla en localhost. No publicar ni configurar hosting sin autorización explícita.

## Regla crítica: documentación sincronizada

Toda modificación de código, configuración, dependencias, contenido, estilos, pruebas, reglas, workflows, módulos o proyectos debe revisar y actualizar en el mismo cambio la documentación relacionada. Esta obligación forma parte de la definición de terminado y no puede posponerse para una tarea futura.

1. Antes de editar, consultar `docs/DOCUMENTATION_GOVERNANCE.md` e identificar los documentos afectados.
2. Durante el cambio, mantener sincronizados contratos, estructura, decisiones, comandos, variables, rutas, contenido, diseño y pruebas.
3. Registrar toda modificación de código o configuración en `CHANGELOG.md`, dentro de `Sin publicar`.
4. Si cambia una ruta, actualizar `app/sitemap.ts` y `docs/SITEMAP.md`.
5. Si cambia una dependencia, patrón o decisión arquitectónica, actualizar `docs/MANUAL_TECNICO.md` y `docs/REFERENCES.md`.
6. Si se crea o modifica un módulo, actualizar o crear su archivo en `docs/modules/` y revisar README, manual técnico, sitemap, calidad, diseño y contenido.
7. Si cambian reglas, skills, prompts o workflows, actualizar `AGENTS.md`, `.agents/README.md`, `prompts/README.md`, `docs/QUALITY.md` o `docs/AGILE_WORKFLOW.md` según corresponda.
8. Al cerrar, indicar qué documentos se modificaron. Si un documento candidato no necesitó cambios, registrar la razón en la solicitud de cambio o resumen final.

Un cambio de código sin `CHANGELOG.md` y sin al menos un documento relacionado actualizado se considera incompleto. `npm run docs:check` aplica la comprobación estructural mínima; la coherencia semántica sigue siendo responsabilidad de quien implementa y revisa.

## Flujos

Usar `.agents/workflows/change.md`, `.agents/workflows/fix.md` o `.agents/workflows/creation.md` según el tipo de trabajo. Los prompts listos para reutilizar están en `prompts/`.
