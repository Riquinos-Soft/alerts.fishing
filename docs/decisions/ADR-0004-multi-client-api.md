# ADR-0004: client-independent API

- **Status:** `proposed`; pending human review.
- **Date:** 2026-09-04.
- **Implementation:** not started.
- **Related decisions:** [ADR-0002: modular monolith](ADR-0002-modular-monolith.md) and [ADR-0003: web application first](ADR-0003-web-first.md), both `decided` as directions and not implemented.

## Context

The web application is the first accepted direction, but the product may later need a public website, a Nuxt application, iOS and Android clients, and internal automations. If the first backend reflects Nuxt components, a mobile platform, or the commercial name, every future client will inherit that coupling or duplicate fishing, authorization, and privacy rules.

A verifiable boundary is also needed for time, units, errors, pagination, compatibility, images, identity, caching, notifications, and location. That boundary must not turn internal modules into distributed services or expand the MVP, which still excludes authentication and native applications.

The [multi-client API architecture](../architecture/multi-client-api.md) contains the problem, requirements, acceptance criteria, plan, derived tests, risks, and sources for this proposal.

## Proposed decision

Subject to review, adopt a client-agnostic HTTP JSON API as the input adapter for the modular monolith:

- the domain and application would remain independent of HTTP, OpenAPI, frameworks, platforms, providers, and commercial branding;
- the API would translate a prior OpenAPI contract into application commands, queries, and results;
- infrastructure would implement ports for persistence and providers without deciding visibility or domain rules;
- public web, Nuxt, iOS, Android, and automations would consume shared capabilities with their own permissions, not per-client domain variants;
- the major version would appear in the base path, while compatible evolution would remain within that version;
- errors, UTC and IANA zones, units, cursors, filters, idempotency, caching, and observability would follow the conventions in the associated specification;
- images, OAuth/OIDC authentication with PKCE, and notifications would be future capabilities subject to separate specifications;
- precise location would be filtered in the application before serialization, and hiding it would never be delegated to the client.

This proposal does not define endpoints, select providers, or create microservices.

## Consequences

### Expected benefits

- The same use case could be exposed to several clients without moving rules into their interfaces.
- OpenAPI would enable contract reviews, breaking-change detection, and future generation of typed clients.
- Cross-cutting policies would have a single, verifiable reference.
- Modular-monolith boundaries would remain visible without distribution costs.
- Privacy would not depend on every client correctly hiding data it had already received.

### Costs and constraints

- Every behavior change would require a specification, contract update, compatibility tests, and documentation synchronization.
- DTOs would require explicit mapping instead of reusing internal entities.
- Maintaining coexisting versions and old mobile clients would have an operational cost.
- OpenAPI and generators could disagree about `nullable`, enums, dates, or binary data and require tests per language.
- Uploads, identity, push, and geographic data would require threat modeling and legal decisions before implementation.

## Alternatives considered

### Nuxt-specific backend

Not proposed because it would turn the first interface into a business boundary and make native or automated clients harder. A future backend-for-frontend for web sessions could exist as an adapter, but would not own the fishing rules.

### Separate contracts per client

Not proposed as a starting point because it would multiply semantics, authorization, and compatibility. Specific projections or adapters could be justified, provided they sit on top of the same use cases and policies.

### Sharing internal entities directly

Not proposed because it would couple persistence and domain to the public representation, increase the data surface, and make evolution unsafe.

### GraphQL from the outset

Not proposed: the current problem does not demonstrate a need for arbitrary selection or federation, and it would add field-level authorization, caching, query-cost, and tooling decisions before the first vertical slice.

### Microservices by module

Rejected because it contradicts [ADR-0002](ADR-0002-modular-monolith.md) and adds premature distribution without evidence of scale or organizational need.

## Risks

- The contract may couple to the first client even if its names appear generic.
- Apparently additive evolution may break generators or clients with closed enums.
- Caches, telemetry, images, and notifications may reveal location outside the main response.
- A uniform API may conceal insufficient object- or field-level authorization.
- Technical drafts for idempotency and rate limiting may change before implementation.
- Mobile versions may require old contracts to be maintained longer than planned.

## Assumptions and pending points

- `proposed`: HTTP JSON and OpenAPI cover the first application boundary.
- `proposed`: path-based major versioning is understandable for all planned clients.
- `needs-validation`: exact OpenAPI version and compatibility with FastAPI and TypeScript, Swift, and Kotlin generators.
- `needs-validation`: deprecation window, SLO, quotas, retention, and support policy.
- `needs-validation`: web-session architecture, identity provider, and permissions model.
- `needs-validation`: controls, provider, and cost for images and notifications.
- `needs-validation`: specific legal obligations for accounts, location, tokens, consent, and deletion.

## Required validation

Before changing the ADR status:

1. Review criteria AC-01 through AC-15 in the [architecture specification](../architecture/multi-client-api.md).
2. Test a minimal read-and-write OpenAPI contract against the planned web client.
3. Run linting, contract tests, breaking-change analysis, and privacy fixtures without claiming that this implements the product.
4. Run a generation and compilation test only for languages whose adoption is being evaluated.
5. Review authorization, location, cache, file, notification, and telemetry threats.
6. Revisit regulatory sources and IETF drafts on the implementation date.
7. Obtain explicit human acceptance; until then, this ADR remains `proposed`.

## Sources

Official and primary sources consulted on 2026-09-04; the full annotated list appears in the [associated architecture](../architecture/multi-client-api.md#sources-consulted):

- [OpenAPI Specification](https://spec.openapis.org/oas/).
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html).
- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html).
- [RFC 8252: OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252.html).
- [W3C Trace Context](https://www.w3.org/TR/trace-context/).
- [Reglamento (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

## Adoption status

Not accepted and not implemented. This ADR does not change the current scope or authorize building endpoints, authentication, native clients, uploads, or notifications.
