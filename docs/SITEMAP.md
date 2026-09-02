# Sitemap

El sitemap ejecutable se genera en `app/sitemap.ts` y queda disponible en `/sitemap.xml`.

```text
/
├── #inicio
├── #proyectos
├── #sistema
├── #experiencia
├── #contacto
├── /proyectos/observa
│   ├── Resumen
│   ├── Visualizaciones
│   ├── Datos consolidados
│   ├── Centro geográfico
│   └── Administración
├── /proyectos/ruta        En construcción
└── /proyectos/mesa        En construcción
```

Los módulos de Observa son estados internos de una misma ruta y no se publican como URLs separadas. Ruta y Mesa tienen páginas informativas reales, con metadatos propios y prioridad 0.3 en el sitemap; no representan aplicaciones funcionales. Todas las rutas se exportan con barra final y admiten acceso directo en GitHub Pages.
