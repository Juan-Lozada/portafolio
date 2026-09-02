# Módulo: proyectos en construcción

## Propósito y estado real

Ruta (`/proyectos/ruta/`) y Mesa (`/proyectos/mesa/`) son páginas informativas navegables, no aplicaciones terminadas. Comunican que pronto habrá una demo para probar, sin fechas, porcentajes de avance ni acciones ficticias. Observa conserva su demo funcional.

## Estructura y contratos

- `app/proyectos/pending-projects.ts`: contenido bilingüe tipado, módulos previstos y habilidades por proyecto. `PendingProjectId` limita las opciones a `ruta` y `mesa`.
- `app/proyectos/project-coming-soon.tsx`: pantalla compartida, navegación con `next/link`, idioma y tema.
- `app/proyectos/project-coming-soon.module.css`: estilo mobile first basado en tokens; entrada breve de la ventana y sus filas, sin animaciones infinitas. Movimiento reducido elimina estas entradas.
- `app/proyectos/ruta/page.tsx` y `mesa/page.tsx`: puntos de entrada estáticos con metadatos y URL canónica propia.

La vista conceptual es informativa: sus filas no son botones ni controles deshabilitados. Los enlaces reales permiten regresar a `/#proyectos` o probar `/proyectos/observa`. No se capturan datos ni se agregan servicios, dependencias o variables.

## Alcance previsto

- Ruta: vehículos, mantenimiento y seguimiento; flujos administrativos, visualización geográfica y gestión de estados.
- Mesa: menú digital, división de cuenta y confirmación de pago; diseño móvil, validación y estados asíncronos.

Estos elementos describen intención de desarrollo, no funcionalidad disponible.

## Validación y evolución

`project-coming-soon.test.tsx` verifica ambos proyectos, aviso explícito, módulos previstos, enlaces y traducción persistente. `metadata-routes.test.ts` cubre las rutas públicas. Validar visualmente 375, 768 y 1280 px, tema claro/oscuro, teclado y movimiento reducido. El build debe generar ambos `index.html` con la ruta base de GitHub Pages.

Al comenzar una app funcional, reemplazar su página, actualizar estado y enlaces en `app/page.tsx` y `app/project-showcase.tsx`, retirar su contenido pendiente si deja de usarse y crear documentación de dominio. Mantener estable la URL pública para no romper enlaces compartidos.

## Impacto documental

Se actualizan README, changelog, manual técnico, sitemap, contenido, diseño, marca, calidad y módulo de la portada. Se revisan `docs/REFERENCES.md`, `docs/DEPLOYMENT.md`, `.env.example` y `app/robots.ts` sin cambios: se mantienen bibliotecas, proceso de publicación, variables y política de rastreo existentes. Observa no cambia internamente.
