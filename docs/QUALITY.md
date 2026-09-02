# Estrategia de calidad

## Puerta obligatoria

`npm run check` verifica sincronización documental, análisis estático, tipos y pruebas automatizadas. `npm run build` vuelve a ejecutar esa puerta mediante `prebuild` antes de producir el sitio estático. La publicación no recibe archivos si cualquiera de estas etapas falla.

## Capas actuales

1. Gobierno documental: exige `CHANGELOG.md` y al menos un documento relacionado ante cambios de código o configuración.
2. ESLint: errores de código, reglas de React y Next.js.
3. TypeScript: contratos de componentes, datos y utilidades sin emitir archivos.
4. Vitest + Testing Library: idioma persistente, rutas públicas y archivos de descubrimiento.
   Las páginas pendientes se prueban para Ruta y Mesa en ambos idiomas, incluyendo enlaces a Observa y retorno, aviso de construcción y módulos previstos.
5. Build estático: comprueba que cada ruta pueda generarse sin servidor.
6. Revisión manual proporcional: coherencia documental, móvil, teclado, contraste, movimiento reducido y recorrido de Observa.

## Criterio de terminado

Un cambio está terminado cuando tiene criterios de aceptación verificables, registra su impacto en `CHANGELOG.md`, mantiene sincronizados los documentos definidos por `docs/DOCUMENTATION_GOVERNANCE.md`, pasa `npm run check` y `npm run build`, conserva ambos idiomas y no introduce datos sensibles. Los defectos deben incluir un caso que falle antes de la corrección cuando sea práctico.

La comprobación automática no sustituye la revisión semántica: detectar un archivo Markdown modificado no demuestra que su contenido describa correctamente el código.

## Próxima evolución

Al estabilizar las pantallas se incorporarán pruebas end-to-end para navegación, recorrido guiado y operaciones CRUD ficticias. Lighthouse CI se añadirá cuando exista una URL pública estable, para evitar mediciones engañosas sobre el servidor de desarrollo.
