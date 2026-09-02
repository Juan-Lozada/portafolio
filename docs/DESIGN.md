# Design

## Arquitectura de experiencia

La página principal presenta perfil, proyectos, sistema de diseño, forma de trabajo, experiencia y contacto. Cada proyecto abre una experiencia independiente con navegación y lenguaje visual propios, pero comparte accesibilidad, i18n y fundamentos de marca.

## Responsive

Diseño mobile first. En Observa, el sidebar puede ocultarse, compactarse o ampliarse; las tablas permiten desplazamiento horizontal y el mapa adapta su tamaño con `ResizeObserver`. En escritorio se aprovecha el ancho sin aumentar innecesariamente el tamaño de títulos.

## Interacción

- Homepage: previews animados y relato controlado por scroll.
- Observa: navegación sin recargas, módulos diferidos y recorrido guiado solo en la primera visita.
- Mapas: desplazamiento inercial, vectores en canvas, selector de estaciones y estado de carga inicial no bloqueante.
- Accesibilidad: HTML semántico, foco visible, etiquetas ARIA y alternativa para movimiento reducido.

## Criterios de aceptación

Todo cambio visual debe revisarse en 375 px, 768 px y 1280 px, con teclado, tema claro/oscuro cuando aplique, español/inglés y `prefers-reduced-motion`.
