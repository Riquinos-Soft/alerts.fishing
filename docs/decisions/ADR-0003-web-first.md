# ADR-0003: web application first

- **Status:** `decided` as a direction; implementation not started.
- **Date:** 2026-09-02.

## Context

The priority is to validate whether a local, explainable, and evaluable recommendation helps people make fishing decisions. Building web and native experiences simultaneously would broaden the scope before usefulness has been demonstrated.

## Decision

Build the web application first, with a PWA as the initially proposed direction. Consider an iOS application only after validating the product and understanding real native needs.

## Consequences

- A single initial journey concentrates learning and effort.
- The vertical slice can validate score, confidence, safety, sessions, and blank sessions before native investment.
- Native-only capabilities remain outside the MVP.
- A future iOS application must be justified by evidence, not automatic parity.

## Subsequent status

- `proposed`: initial PWA.
- `future`: iOS application after product validation.
