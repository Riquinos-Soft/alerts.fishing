# Métricas de éxito

**Estado: `proposed`; definiciones y objetivos: `needs-validation`.**

## Métrica principal

**Decisiones de pesca consideradas útiles por pescador activo.**

La métrica busca capturar valor en la decisión, aunque una sesión termine sin capturas. Requiere definir qué es un pescador activo, cómo se solicita feedback y qué umbral representa utilidad.

## Métricas secundarias

- sesiones registradas;
- porcentaje de sesiones con feedback;
- porcentaje de bolos registrados;
- utilidad percibida de la explicación;
- precisión histórica cuando exista suficiente información;
- retención;
- alertas que terminan en sesión.

## Guardrails

- No utilizar la cantidad de peces muertos como métrica principal.
- No confundir capturas con calidad de decisión.
- Segmentar resultados por versión del scoring, confianza y disponibilidad de datos.
- Evitar afirmar precisión estadística antes de contar con una muestra suficiente y un método documentado.

