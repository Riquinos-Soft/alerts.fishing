# ADR-0001: repositorio independiente

- **Estado:** `decided`.
- **Fecha:** 2026-09-02.

## Contexto

`alerts.fishing` necesita una fuente de verdad propia para visión, investigación, decisiones, arquitectura, especificaciones y progreso. Su dominio, evolución y documentación deben poder entenderse sin depender de otro producto.

## Decisión

Mantener `alerts.fishing` como repositorio completamente independiente y como vault de Obsidian legible también desde GitHub.

## Consecuencias

- Toda decisión necesaria para comprender el producto se documenta aquí.
- Los enlaces documentales son relativos y no requieren plugins de Obsidian.
- Las referencias externas se identifican como fuentes o productos externos, nunca como funcionalidades internas ya disponibles.
- El repositorio conserva su propio roadmap, especificaciones, ADR y changelog.

## Límites

Esta decisión no implica que exista una aplicación funcional. En el estado actual solo se prepara la documentación.

