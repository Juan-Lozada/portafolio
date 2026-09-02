# Publicación estática en GitHub Pages

- Repositorio: https://github.com/Juan-Lozada/portafolio
- URL pública: https://juan-lozada.github.io/portafolio/
- Modalidad: GitHub Project Pages mediante GitHub Actions.

## Arquitectura de publicación

Next.js genera HTML, CSS y JavaScript dentro de `out/`. GitHub Actions instala exactamente las dependencias bloqueadas, ejecuta lint, tipos, pruebas y build, y solo entonces entrega ese directorio a GitHub Pages.

El flujo calcula automáticamente:

- `NEXT_PUBLIC_BASE_PATH`: vacío para `<usuario>.github.io` o `/repositorio` para Project Pages.
- `NEXT_PUBLIC_SITE_URL`: URL canónica usada por metadatos, robots y sitemap.
- `NEXT_PUBLIC_REPOSITORY_URL`: vínculo visible para revisar el código.

## Activación inicial

1. Subir el proyecto al repositorio sin archivos `.env.local`.
2. En GitHub, abrir Settings → Pages.
3. Elegir GitHub Actions como fuente.
4. Confirmar que la rama pública se llame `main` o ajustar ambos workflows.
5. Ejecutar “Deploy GitHub Pages” manualmente o hacer push a `main`.

Los pasos 1 y la preparación técnica ya se completaron el 2 de septiembre de 2026. La activación se verifica mediante la ejecución real del workflow y la respuesta pública de la URL.

## Restricciones conscientes

GitHub Pages sirve contenido estático. No procesa secretos, sesiones de servidor, bases de datos ni formularios privados. Las demostraciones usan datos ficticios y estado local; una futura API debe vivir en un servicio separado con autenticación y controles propios.

## Antes de publicar

- Elegir y añadir una licencia; no se presume autorización de reutilización.
- Comprobar que el repositorio y los recursos públicos no contengan datos personales ni secretos.
- Reemplazar `NEXT_PUBLIC_SITE_URL` local mediante el workflow.
- Proteger `main` y exigir que el workflow Quality termine correctamente.
- Revisar la URL final en móvil, escritorio, teclado y lector de pantalla.
