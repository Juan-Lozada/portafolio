# Brand — JL Interface System

## Propósito

Demostrar cómo Juan Lozada convierte datos y operaciones en interfaces claras, confiables y fáciles de usar. La marca debe sentirse profesional, serena y técnica, sin parecer una plantilla genérica.

## Personalidad

- Clara: jerarquía evidente y textos breves.
- Útil: cada elemento comunica o permite una acción.
- Precisa: estados, unidades y resultados son inequívocos.
- Cercana: lenguaje directo, sin tono frío ni grandilocuente.

## Fundamentos visuales

- Verde principal: `#155B43`; verde profundo Observa: `#0D3B2D`.
- Superficie clara: `#FFFFFF`; lienzo Observa: `#F1F5F2`.
- Texto principal: `#17261F`; texto secundario: `#66786E`.
- Éxito: `#23845E`; advertencia: `#B56720`.
- Bordes suaves, radios de 10–21 px y sombras de baja opacidad.
- No usar degradados decorativos. Glassmorphism se limita a barras o capas que necesitan conservar contexto; neumorphism solo como relieve sutil.

## Tipografía y espaciado

Usar la pila tipográfica del sistema para priorizar velocidad. Títulos compactos, interletraje levemente negativo y párrafos con ancho legible. La escala espacial parte de 4 px y privilegia 8, 12, 16, 24, 32 y 48 px.

## Componentes y estados

Botones con verbo explícito, foco visible y área táctil cercana a 44 px. Tarjetas con una idea principal. Cada módulo debe contemplar carga, error, vacío, éxito y reducción de movimiento.

## Movimiento

Motion se usa para cambios de módulo y narrativa de scroll; Morphicons para transiciones de iconos. Duraciones habituales: 160–260 ms; entradas narrativas hasta 700 ms. Usar curvas `cubic-bezier(.22,1,.36,1)` y respetar `prefers-reduced-motion`.

## Mapas y gráficas

Leaflet + OpenStreetMap para cartografía demostrativa gratuita; ECharts en canvas para visualizaciones. La interfaz nunca debe ocultar atribución, bloquear el mapa durante cargas posteriores ni simular datos reales.
