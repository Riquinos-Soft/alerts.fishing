# ADR-0002: monolito modular

- **Estado:** `decided` como dirección; implementación no iniciada.
- **Fecha:** 2026-09-02.

## Contexto

El producto debe validar primero una decisión pesquera completa y local. Distribuir prematuramente spots, condiciones, scoring, recomendaciones, sesiones y feedback elevaría la complejidad operativa y dificultaría cambiar límites todavía inmaduros.

## Decisión

Construir la primera aplicación como monolito modular, con separación ligera entre dominio, aplicación, infraestructura y API.

Los módulos previstos son `spots`, `conditions`, `scoring`, `recommendations`, `sessions` y `feedback`. Los proveedores externos quedarán detrás de interfaces y OpenAPI será el contrato previsto entre frontend y backend.

## Consecuencias

- Despliegue y desarrollo conceptualmente simples durante la validación.
- Límites de módulo explícitos sin coste de una arquitectura distribuida.
- Transacciones y evaluación transversal más sencillas al inicio.
- Será necesario vigilar dependencias entre módulos y evitar un monolito sin límites.

## Alternativas consideradas

- Microservicios desde el inicio: descartados por complejidad prematura.
- Aplicación sin límites modulares: descartada porque dificultaría aislar dominio, proveedores y evolución del scoring.

