# ADR-0001: independent repository

- **Status:** `decided`.
- **Date:** 2026-09-02.

## Context

`alerts.fishing` needs its own source of truth for vision, research, decisions, architecture, specifications, and progress. Its domain, evolution, and documentation must be understandable without depending on another product.

## Decision

Maintain `alerts.fishing` as a completely independent repository and as an Obsidian vault that is also readable on GitHub.

## Consequences

- Every decision needed to understand the product is documented here.
- Documentation links are relative and do not require Obsidian plugins.
- External references are identified as sources or external products, never as internal features that are already available.
- The repository maintains its own roadmap, specifications, ADRs, and changelog.

## Boundaries

This decision does not imply that a functional application exists. In the current state, only documentation is being prepared.
