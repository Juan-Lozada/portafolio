# Manual técnico y guía para entrevistas

## Artefactos locales de análisis

`.graphify/` se utiliza localmente para estudiar relaciones entre archivos y dependencias. Sus manifiestos pueden incluir rutas absolutas del equipo, por lo que el directorio se excluye del repositorio público. El grafo puede regenerarse desde el código fuente y no forma parte del artefacto de producción.

## 1. Qué es el sistema

Este repositorio es un portafolio de producto, no una colección de capturas. La landing explica el perfil profesional y conecta con aplicaciones demostrativas. Observa prueba capacidades de dashboard, visualización, mapas, CRUD, responsive, accesibilidad, animación e internacionalización sin utilizar información confidencial.

## 2. Arquitectura

Next.js 16 usa App Router. `app/layout.tsx` define metadatos, viewport y el proveedor global de idioma. `app/page.tsx` compone la landing. `app/proyectos/observa/page.tsx` conserva metadatos del caso y delega la experiencia interactiva a `observa-dashboard.tsx`.

```text
app/
├── layout.tsx                 Metadatos y contexto global
├── page.tsx                   Landing principal
├── locale-provider.tsx        Estado es-LA/en persistido
├── language-toggle.tsx        Selector accesible
├── project-showcase.tsx       Cards y relato por scroll
└── proyectos/observa/
    ├── observa-dashboard.tsx  Shell, navegación y tour
    ├── overview-module.tsx    Resumen y mapa compacto
    ├── charts-module.tsx      Galería ECharts
    ├── data-module.tsx        Filtros y tabla consolidada
    ├── geo-module.tsx         Leaflet interactivo
    ├── admin-module.tsx       CRUD local demostrativo
    ├── observa-data.ts        Datos ficticios compartidos
    └── observa.module.css     Estilos encapsulados
```

Los componentes con estado o APIs del navegador son Client Components. Las páginas y metadatos permanecen en el servidor cuando no necesitan interactividad. Los módulos pesados de Observa se cargan de forma diferida para reducir el JavaScript inicial.

Ruta y Mesa tienen entradas estáticas en `app/proyectos/ruta/page.tsx` y `app/proyectos/mesa/page.tsx`. Comparten `project-coming-soon.tsx`, sus CSS Modules y el contenido tipado de `pending-projects.ts`. Comunican construcción sin cargar mapas ni gráficas y sin simular funciones disponibles. Sus URLs ya se pueden compartir y figuran en el sitemap. Ver `docs/modules/PENDING_PROJECTS.md` para el contrato y su reemplazo futuro por aplicaciones funcionales.

## 3. Decisiones clave

### Internacionalización

`LocaleProvider` expone `locale`, `setLocale` y `copy(es, en)`. Español latinoamericano es el valor inicial. La elección se guarda en `localStorage` con la clave `jl-portfolio-locale` y también actualiza el atributo `lang` del documento. Para un producto con muchas rutas, el siguiente paso sería mover los diccionarios a archivos por dominio y añadir rutas localizadas; para este alcance, el contexto evita complejidad innecesaria.

### Mapa

Se eligió Leaflet con React Leaflet y teselas de OpenStreetMap porque funciona sin token en una demo local y no depende de WebGL. Los vectores usan canvas (`preferCanvas`) y el movimiento utiliza inercia. Un `ResizeObserver` invalida el tamaño solo cuando cambia el contenedor. La carga de teselas se muestra únicamente al inicio: no se superpone una pantalla cada vez que el usuario desplaza el mapa. El mapa compacto del dashboard es una instancia no interactiva y económica.

En producción se debe contratar o configurar un proveedor de teselas acorde al tráfico, respetar su atribución y monitorear límites de uso.

### Gráficas

ECharts renderiza en canvas y permite líneas suavizadas, heatmap, gauge y scatter. Cada configuración vive cerca de la vista para facilitar la demostración; en un producto real se extraería a fábricas tipadas y adaptadores de API.

### Animación

Motion gestiona transiciones de módulos, entradas y narrativa de scroll. Morphicons anima cambios iconográficos. Las animaciones comunican continuidad y jerarquía, no decoran sin propósito. `prefers-reduced-motion` desactiva o simplifica movimiento.

### Tour

El recorrido abre el módulo al que se refiere cada paso y muestra una ventana previa con controles anterior/siguiente. `observa-tour-v2` registra la primera visita en `localStorage`; “Ver recorrido” lo abre de nuevo explícitamente.

### CRUD

Administración demuestra alta, edición y eliminación con estado local. No existe persistencia ni backend: es una decisión consciente para mantener la demo segura y autónoma. En producción se añadirían API, validación de esquema, permisos, manejo optimista y pruebas de integración.

## 4. Rendimiento y calidad

- Carga diferida de ECharts, Leaflet, datos y administración.
- Mapas vectoriales en canvas y teselas con búfer.
- CSS Modules en Observa para evitar colisiones.
- Sitemap y robots generados mediante Metadata Routes.
- Variables públicas y privadas separadas por convención.
- Mobile first, foco visible, HTML semántico y reducción de movimiento.

Comandos de cierre: `npm run lint`, `npx tsc --noEmit` y `npm run build`. Para cambios visuales se revisan 375, 768 y 1280 px en ambos idiomas.

## 5. Cómo explicarlo en una entrevista

Una respuesta breve:

> Construí un portafolio con Next.js y TypeScript que funciona como producto demostrativo. Separé una landing narrativa de aplicaciones especializadas. En Observa implementé módulos diferidos, ECharts, Leaflet con OpenStreetMap, un CRUD local, un tour persistente y español/inglés. Priorizo carga inicial, accesibilidad, mobile first y datos ficticios para demostrar experiencia sin exponer información privada.

Preguntas frecuentes:

- ¿Por qué Leaflet? Compatibilidad amplia, bajo costo para demo, buena integración React y ausencia de dependencia WebGL.
- ¿Por qué no un framework i18n? El sitio tiene cuatro rutas y contenido local; un contexto tipado cubre el alcance actual. La documentación deja clara la ruta de evolución.
- ¿Cómo evitarías que el dashboard crezca sin control? Separaría dominios, contratos de datos y componentes de presentación; añadiría Storybook, pruebas por flujo y presupuesto de rendimiento.
- ¿Qué falta para producción? Backend, autenticación, permisos, proveedor de mapas con SLA, telemetría, pruebas end-to-end, política de privacidad y despliegue automatizado.
- ¿Cómo proteges confidencialidad? Toda marca, estación, cifra y escenario es ficticio; las variables sensibles quedan del lado servidor y nunca se incluyen en el bundle cliente.

## 6. Deuda conocida y evolución

- Extraer diccionarios grandes a archivos por dominio al crecer el contenido.
- Añadir pruebas unitarias y E2E para idioma, tour, filtros y CRUD.
- Implementar formatos numéricos con `Intl.NumberFormat` por locale.
- Evolucionar las páginas informativas de Ruta y Mesa a aplicaciones funcionales, conservando sus URLs y actualizando estados, pruebas y documentación.
- Añadir mediciones continuas de Core Web Vitals cuando se defina el hosting.
