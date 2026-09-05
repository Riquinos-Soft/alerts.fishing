# ADR-0002: modular monolith

- **Status:** `decided` as a direction; implementation not started.
- **Date:** 2026-09-02.

## Context

The product must first validate a complete, local fishing decision. Prematurely distributing spots, conditions, scoring, recommendations, sessions, and feedback would increase operational complexity and make it harder to change boundaries that are still immature.

## Decision

Build the first application as a modular monolith, with lightweight separation between domain, application, infrastructure, and API.

The planned modules are `spots`, `conditions`, `scoring`, `recommendations`, `sessions`, and `feedback`. External providers will remain behind interfaces, and OpenAPI will be the planned contract between frontend and backend.

## Consequences

- Conceptually simple deployment and development during validation.
- Explicit module boundaries without the cost of a distributed architecture.
- Simpler transactions and cross-cutting evaluation at the outset.
- Dependencies between modules will need to be monitored to avoid a monolith without boundaries.

## Alternatives considered

- Microservices from the outset: rejected due to premature complexity.
- Application without modular boundaries: rejected because it would make it harder to isolate the domain, providers, and scoring evolution.
