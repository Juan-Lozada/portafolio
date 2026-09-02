# Gobierno de documentación

## Regla principal

La documentación es parte del producto. Todo cambio se entrega con el código, las pruebas y los documentos relacionados sincronizados en la misma modificación. No se acepta “documentar después”.

Toda modificación de código o configuración debe actualizar:

1. `CHANGELOG.md`, siempre.
2. Al menos un documento relacionado de la matriz siguiente.
3. Pruebas o estrategia de validación cuando cambie comportamiento.

La comprobación automática valida la presencia de estas actualizaciones; la revisión humana valida que expliquen correctamente el resultado real.

## Matriz de impacto

| Tipo de cambio | Documentos que se deben revisar y actualizar cuando corresponda |
| --- | --- |
| Página, proyecto o módulo nuevo | `README.md`, `docs/modules/<MODULO>.md`, `docs/MANUAL_TECNICO.md`, `docs/SITEMAP.md`, `app/sitemap.ts`, `docs/CONTENT.md`, `docs/DESIGN.md`, `docs/QUALITY.md` |
| Ruta, ancla o navegación | `docs/SITEMAP.md`, `app/sitemap.ts`, `app/robots.ts`, README y documentación del módulo |
| Componente, patrón visual o animación | `docs/BRAND.md`, `docs/DESIGN.md`, documentación del módulo y manual técnico |
| Texto, traducción, estado o terminología | `docs/CONTENT.md`, documentación del módulo y skill de español si cambia una regla lingüística |
| Arquitectura, datos o contrato | `docs/MANUAL_TECNICO.md`, `docs/modules/`, `docs/REFERENCES.md` y una decisión técnica si el impacto es relevante |
| Dependencia o biblioteca | README, `docs/MANUAL_TECNICO.md`, `docs/REFERENCES.md`, `package.json` y archivos de instalación |
| Variable de entorno o integración | `.env.example`, README, `docs/DEPLOYMENT.md`, `SECURITY.md` y manual técnico |
| Prueba o puerta de calidad | `docs/QUALITY.md`, README, workflow relacionado y documentación del módulo cubierto |
| Regla, skill, prompt o workflow | `AGENTS.md`, `.agents/README.md`, `prompts/README.md`, `docs/AGILE_WORKFLOW.md`, `docs/QUALITY.md` y `CONTRIBUTING.md` |
| Corrección de defecto | `CHANGELOG.md`, documento del módulo y manual técnico cuando la causa revele una decisión o riesgo reusable |

“Revisar” no significa modificar todos los archivos de una fila sin necesidad. Significa comprobarlos conscientemente, actualizar los que hayan quedado desactualizados y explicar en la solicitud de cambio por qué los demás conservan vigencia.

## Procedimiento obligatorio

### Antes de implementar

1. Leer `AGENTS.md` y el workflow correspondiente.
2. Identificar el tipo de cambio en la matriz.
3. Anotar documentos candidatos y criterios de aceptación documental.

### Durante la implementación

1. Actualizar documentación junto con el comportamiento, no al final de memoria.
2. Mantener ejemplos, rutas, comandos, variables y nombres iguales al código.
3. Crear `docs/modules/<MODULO>.md` cuando aparezca un dominio nuevo.
4. Añadir una entrada breve en `CHANGELOG.md` bajo `Sin publicar`.

### Antes de cerrar

1. Ejecutar `npm run docs:check`.
2. Ejecutar `npm run check` y `npm run build`.
3. Completar la sección “Impacto documental” de la solicitud de cambio.
4. Informar documentos modificados y documentos revisados sin cambios, con su razón.

## Criterio de rechazo

Se rechaza o se mantiene abierto cualquier cambio que tenga documentación inexistente, obsoleta, contradictoria con el código, sin paridad lingüística o sin registro en el changelog.
