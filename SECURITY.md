# Seguridad

Este repositorio contiene demostraciones estáticas con datos ficticios. No se deben registrar secretos, tokens, credenciales, datos personales de terceros ni información de proyectos reales.

La información pública de contacto se limita a enlaces de LinkedIn y GitHub. No se incluyen CV, correo, ubicación ni archivos personales.

Las variables expuestas al navegador usan `NEXT_PUBLIC_` y son públicas por definición. Los secretos futuros deben permanecer fuera del sitio estático y gestionarse en un servicio de servidor separado.

Los artefactos locales de análisis, caché y compilación (`.graphify/`, `.next/`, `out/`) no se publican porque pueden contener rutas del equipo o información derivada innecesaria para ejecutar el proyecto.

Si el repositorio se publica, los hallazgos sensibles deben informarse mediante una advertencia privada de seguridad de GitHub y no mediante un issue público.
