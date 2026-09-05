# Planned architecture

**Overall status: `proposed`; implementation: not started.**

This page documents a technical direction, not components that have already been built.

## Approach

- `decided`: modular monolith to avoid premature distribution.
- `proposed`: lightweight separation between domain, application, infrastructure, and API.
- `proposed`: external providers behind replaceable, observable interfaces.
- `proposed`: OpenAPI as the contract between web and backend.
- `proposed`: versioned scoring to reproduce and evaluate recommendations.
- `proposed`: PostgreSQL with PostGIS for geographic information.

## Planned modules

- `spots`: local context, sensitivity, and geographic representation.
- `conditions`: environmental conditions, provenance, freshness, and completeness.
- `scoring`: factors, version, and fishing-potential calculation.
- `recommendations`: composition of windows, explanations, confidence, and safety gate.
- `sessions`: sessions, catches, and blank sessions.
- `feedback`: perceived usefulness and subsequent evaluation.

See the [domain map](domain-map.md).

## Planned stack

- `proposed`: Nuxt, Vue, and TypeScript.
- `proposed`: Tailwind CSS, shadcn-vue, and Lucide.
- `proposed`: FastAPI and Python.
- `proposed`: PostgreSQL with PostGIS.
- `proposed`: Docker Compose for future local development.
- `proposed`: OpenAPI.
- `proposed`: PWA initially.
- `future`: iOS application after product validation.

None of these elements is implemented in the current documentary state.

## Responsibilities

Deterministic, verifiable logic must govern scoring, safety, and rules. A future LLM could coordinate or explain, but will not be the sole authority. The architecture must preserve the source, version, and time of the data used for a recommendation.
