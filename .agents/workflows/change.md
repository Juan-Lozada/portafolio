# Flujo: cambio

1. Leer `AGENTS.md`, la skill de español y la documentación de marca/diseño/contenido.
2. Inspeccionar el componente, sus importaciones, estilos, pruebas y rutas relacionadas.
3. Consultar `docs/DOCUMENTATION_GOVERNANCE.md` y listar los documentos afectados.
4. Definir qué comportamiento se conserva y qué cambia.
5. Implementar el cambio mínimo con paridad `es-LA`/`en`.
6. Actualizar `CHANGELOG.md` y todos los documentos relacionados dentro del mismo cambio.
7. Ejecutar `npm run docs:check`, `npm run check` y `npm run build`; revisar móvil, teclado y movimiento reducido.
8. Informar documentos actualizados y justificar cualquier documento candidato que no haya cambiado.
