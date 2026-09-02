# Portafolio de Juan Lozada

Portafolio profesional y laboratorio de producto construido con Next.js, React y TypeScript. Presenta experiencia Front-End semisenior mediante casos ficticios de visualización de datos, monitoreo, administración y pagos, unidos por una interfaz y un sistema visual personalizados.

- Sitio público: [juan-lozada.github.io/portafolio](https://juan-lozada.github.io/portafolio/)
- Código fuente: [github.com/Juan-Lozada/portafolio](https://github.com/Juan-Lozada/portafolio)

## Qué demuestra

- Arquitectura modular, TypeScript estricto y componentes reutilizables.
- Diseño mobile first, navegación por teclado y preferencia de movimiento reducido.
- Contenido completo en español latinoamericano e inglés.
- Visualización con ECharts, mapas con Leaflet y animación con Motion y Morphicons.
- Metadatos sociales, datos estructurados, `robots.txt` y `sitemap.xml`.
- Pruebas, validación automática y exportación estática para GitHub Pages.
- Documentación técnica, de diseño, contenido, calidad y flujo ágil.

Todos los productos, marcas, métricas y registros operacionales de las demostraciones son ficticios.

## Estado de los proyectos

- **Observa:** demo disponible de datos y monitoreo.
- **Ruta y Mesa:** páginas navegables de construcción, con módulos y habilidades previstos; las aplicaciones aún no están disponibles para prueba. Incluyen acceso a Observa y regreso al portafolio.

El contrato de estas páginas está en `docs/modules/PENDING_PROJECTS.md`.

## Requisitos

- Node.js 22.13 o superior.
- npm incluido con Node.js.

## Instalación local

```bash
git clone <url-del-repositorio>
cd <carpeta-del-repositorio>
npm ci
copy .env.example .env.local
npm run check
npm run dev
```

Abrir `http://localhost:3000`. En macOS o Linux, reemplazar `copy` por `cp`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo. |
| `npm run lint` | Reglas de código, React y Next.js. |
| `npm run typecheck` | Contratos TypeScript sin generar archivos. |
| `npm run test:run` | Pruebas automatizadas en una ejecución. |
| `npm run test:coverage` | Informe de cobertura en consola y HTML. |
| `npm run docs:check` | Comprueba changelog y documentación relacionada. |
| `npm run check` | Puerta local: documentación, lint, tipos y pruebas. |
| `npm run build` | Ejecuta la puerta y genera el sitio en `out/`. |
| `npm run preview` | Sirve localmente el resultado estático ya construido. |

## Estructura

```text
app/
  page.tsx                  página principal
  project-showcase.tsx      proyectos y relato por desplazamiento
  locale-provider.tsx       idioma persistente
  proyectos/observa/        aplicación demostrativa modular
  proyectos/ruta/           página de Ruta en construcción
  proyectos/mesa/           página de Mesa en construcción
  proyectos/pending-projects.ts      contenido tipado de proyectos pendientes
  proyectos/project-coming-soon.tsx  pantalla compartida de construcción
docs/
  modules/                  documentación por módulo
  BRAND.md                  identidad y sistema visual
  MANUAL_TECNICO.md         arquitectura explicada para entrevistas
  QUALITY.md                estrategia y puerta de calidad
  AGILE_WORKFLOW.md         forma de trabajo incremental
  DEPLOYMENT.md             publicación estática
.agents/                    reglas, skill lingüístico y workflows
prompts/                    plantillas de creación, cambio y corrección
.github/workflows/          validación y publicación reproducibles
public/                     imagen social e iconos públicos
```

## Variables públicas

`.env.example` documenta los valores permitidos. Todo nombre que empiece por `NEXT_PUBLIC_` se incorpora al navegador y nunca debe contener secretos. GitHub Actions calcula la URL, ruta base y vínculo al repositorio para cada publicación.

## Calidad y colaboración

Antes de proponer un cambio se actualizan `CHANGELOG.md` y los documentos definidos por `docs/DOCUMENTATION_GOVERNANCE.md`; después se ejecutan `npm run check` y `npm run build`. La misma validación corre en solicitudes de cambio y antes de generar el artefacto de GitHub Pages.

## GitHub Pages

El proyecto utiliza Project Pages sin depender de un servidor Next.js. Cada push a `main` valida y publica el sitio mediante GitHub Actions. Consulta `docs/DEPLOYMENT.md` para conocer el flujo y sus restricciones.

## Documentación

- `docs/MANUAL_TECNICO.md`: arquitectura y guía de estudio para entrevistas.
- `docs/BRAND.md`: identidad, tokens, componentes y movimiento.
- `docs/CONTENT.md`: voz, traducción y convenciones.
- `docs/DESIGN.md`: experiencia responsive y accesibilidad.
- `docs/REFERENCES.md`: fuentes técnicas y referencias visuales.
- `docs/SITEMAP.md`: rutas y módulos actuales.
- `docs/DOCUMENTATION_GOVERNANCE.md`: matriz obligatoria para mantener código y documentos sincronizados.
- `docs/modules/`: contratos específicos de cada parte del producto.

## Uso responsable

No se incluyen secretos ni integraciones productivas. Antes de hacer público el repositorio se debe elegir una licencia; descargar el código para revisión no concede por sí solo derechos de reutilización.
