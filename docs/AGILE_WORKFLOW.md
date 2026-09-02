# Flujo ágil del portafolio

## Unidad de trabajo

Cada cambio se expresa como historia breve: “Como visitante, quiero…, para…”. Debe incluir alcance, criterios de aceptación, estados vacíos o de error relevantes, impacto responsive, accesibilidad, idiomas y evidencia esperada.

## Ciclo

1. Descubrimiento: entender problema, usuario y restricción.
2. Diseño: definir flujo, contenido y estados antes del detalle visual.
3. Entrega incremental: dividir en cambios pequeños y revisables.
4. Documentación continua: actualizar changelog y documentos relacionados junto con el código.
5. Validación: ejecutar la puerta automática y revisar la experiencia y documentación afectadas.
6. Cierre: comprobar la definición de terminado y preparar una solicitud de cambio.

## Tablero sugerido

- Backlog: ideas todavía no refinadas.
- Ready: alcance y aceptación definidos.
- In progress: una entrega activa por responsable.
- Review: código, diseño y contenido listos para revisión.
- Done: validado, documentado de acuerdo con la matriz de impacto e integrado.

## Convenciones

- Ramas: `feature/descripcion`, `fix/descripcion`, `docs/descripcion`.
- Commits: verbos claros y un solo propósito.
- Solicitudes de cambio: contexto, evidencia, riesgos y checklist de calidad.
- Decisiones técnicas importantes: se registran en `docs/decisions/` cuando aparezcan.
- Ningún cambio de código avanza a Done sin `CHANGELOG.md`, documentación relacionada y justificación de los documentos revisados sin cambios.
