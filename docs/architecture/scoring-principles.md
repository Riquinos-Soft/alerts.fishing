# Principios de scoring

**Estado: `decided` para principios; fórmula y umbrales: `needs-validation`.**

## Significado

- El score utilizará una escala de 0 a 100.
- No representa una probabilidad de captura.
- Resume potencial relativo bajo una versión concreta del algoritmo.
- Debe poder explicarse mediante factores positivos y negativos.

## Separación de conceptos

La confianza se calcula aparte del score. Debe reflejar como mínimo frescura, completitud, procedencia y adecuación espacial o temporal de los datos. Un score alto con confianza baja no equivale a una recomendación sólida.

La seguridad es una puerta independiente. Puede invalidar una ventana aunque el score pesquero sea alto; no debe quedar oculta como una simple penalización dentro del número.

## Trazabilidad

Cada evaluación debería conservar:

- versión del algoritmo;
- factores considerados y su dirección positiva o negativa;
- datos de entrada, fuente y momento de validez;
- nivel y causas de confianza;
- resultado de la puerta de seguridad;
- explicación mostrada.

## Factores

Los factores y sus pesos requieren investigación. Luna o solunar, si se incluye, será un factor menor y nunca sustituirá condiciones locales ni evidencia observada.

## Evaluación

Las versiones se evaluarán posteriormente con sesiones reales, capturas, bolos y feedback de utilidad. No se publicará precisión hasta disponer de información suficiente y un método reproducible.

No hay una fórmula definida ni implementada actualmente.

