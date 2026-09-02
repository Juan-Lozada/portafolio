# Registro de cambios

Los cambios relevantes se documentan aquí antes de publicarse.

## Sin publicar

### Añadido

- Páginas de Ruta y Mesa en construcción: vista conceptual animada, módulos previstos, habilidades y navegación de retorno, en español e inglés.
- Pruebas de contenido, idioma y navegación para proyectos pendientes; ambas rutas incluidas en el sitemap.
- Regla transversal de sincronización documental, matriz de impacto, verificación automática y checklist de revisión.
- Repositorio público y flujo de publicación del portafolio en GitHub Pages.
- Primera publicación verificada en `https://juan-lozada.github.io/portafolio/`.
- Exclusión de artefactos locales de análisis para evitar publicar rutas del equipo.
- Normalización de finales de línea y tratamiento explícito de recursos binarios para colaboración multiplataforma.

### Cambiado

- Las tarjetas y el relato de la portada permiten abrir Ruta y Mesa; sus estados distinguen las aplicaciones pendientes de la demo disponible de Observa.
- La página principal presenta un perfil profesional más compacto y legible para reclutadores.
- El proyecto genera una exportación estática compatible con GitHub Pages.
- La puerta de calidad incluye lint, tipos, pruebas automatizadas y validación documental.
- Los medios de contacto públicos se limitan a LinkedIn y GitHub.

### Eliminado

- PDF del CV, correo, ubicación y perfil de Get on Board de la interfaz y los metadatos públicos.

### Corregido

- Los paneles inactivos del relato por scroll no interceptan clics ni reciben foco; la alternativa de movimiento reducido también incluye enlaces a los proyectos.
- `robots.txt` y `sitemap.xml` se generan explícitamente como rutas estáticas en Next.js.
