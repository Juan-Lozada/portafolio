# Módulo: página principal

## Propósito

Presentar en pocos segundos el perfil profesional de Juan Lozada, su especialización en React y TypeScript, experiencia y proyectos demostrativos. El primer bloque prioriza lectura humana y extracción automática: cargo, tecnologías, experiencia, propuesta de valor y enlaces verificables aparecen como texto semántico.

Los únicos medios de contacto publicados son LinkedIn y GitHub. El repositorio no incorpora CV, correo, ubicación ni otros datos personales.

## Componentes

- `app/page.tsx`: estructura, contenido bilingüe y contacto.
- `app/project-showcase.tsx`: tarjetas previas y relato animado por desplazamiento.
- `app/project-showcase.module.css`: movimiento y visualizaciones ficticias.
- `app/reveal.tsx`: apariciones progresivas con respeto por movimiento reducido.
- `app/layout.tsx`: metadatos sociales, canónicos y datos estructurados Person.

## Reglas de diseño

Los encabezados comunican una sola idea y se limitan visualmente a una o dos líneas en anchos habituales. Las animaciones apoyan la jerarquía, pero el contenido sigue completo en HTML y conserva alternativa sin movimiento.
