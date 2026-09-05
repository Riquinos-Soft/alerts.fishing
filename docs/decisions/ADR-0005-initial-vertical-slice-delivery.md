# ADR-0005: initial vertical slice delivery

- **Status:** D1 and D2 are `decided`; D3 remains `proposed` with a reversible spike authorized.
- **Date:** 2026-09-05.
- **Implementation:** not started.
- **Related decisions:** [ADR-0002: modular monolith](ADR-0002-modular-monolith.md) and [ADR-0003: web application first](ADR-0003-web-first.md).
- **Related specification:** [Specification 001 implementation plan](../specs/001-fishing-opportunity-mvp-implementation-plan.md).

## Context

[Specification 001](../specs/001-fishing-opportunity-mvp.md) defines the accepted first fishing-opportunity journey, but application work needs an explicit delivery boundary, a reproducible initial stack, and a reversible way to test the proposed visual direction. These choices must enable a small demonstration without implying that an API, durable data, verified fishing information, application scaffold, or completed behavior already exists.

The approval source is the user's explicit approval on 2026-09-05: D1 and D2 are accepted, while D3 is authorized only as a reversible spike whose evidence will inform a later visual-adoption decision.

## Decision status

- **D1 — `decided`:** frontend-only demonstration boundary and current-run state.
- **D2 — `decided`:** initial application path, toolchain, framework, UI library, and test stack.
- **D3 — `proposed`, spike authorized:** visual direction and navigation treatment; final adoption remains pending evidence.

The mixed status is intentional. Authorizing the D3 spike does not make its visual direction a decided product identity.

## D1 — delivery boundary

The first vertical slice will be a frontend-only web demonstration using deterministic in-process mock fixtures and an in-memory adapter for session and feedback state. State lasts only for the current demonstration run so the confirmation journey can be reviewed.

The slice includes no real API, authentication, database, durable browser persistence, provider integration, or verified live fishing, safety, or regulatory data. All scenario content remains explicitly mock or simulated. This delivery choice does not supersede the modular-monolith direction or make frontend fixtures the future fishing-domain or API contract.

## D2 — initial scaffold stack

The application will live under `apps/web/`. The following exact versions are approved for the initial scaffold, but are not installed by this decision:

- Node.js `24.19.0` — toolchain runtime, not an application package;
- npm `11.17.0` — toolchain package manager, not an application package;
- Nuxt `4.5.2` — MIT;
- Vue `3.5.42` — MIT;
- TypeScript `7.0.2` — Apache-2.0;
- Nuxt UI `4.11.0` — MIT;
- Vitest `4.1.11` — MIT;
- `@nuxt/test-utils` `4.2.0` — MIT;
- `@vue/test-utils` `2.5.0` — MIT;
- `@playwright/test` `1.63.0` — Apache-2.0.

Nuxt UI is selected for the spike because it provides direct Nuxt, SSR, TypeScript, and color-mode integration; broad component coverage for rapid delivery of this small vertical slice; a Reka UI accessibility foundation; semantic tokens and typed variants; an MIT license; and a built-in `DashboardSidebar` ecosystem suitable for testing the proposed navigation. These foundations do not certify the resulting product's accessibility, and Nuxt UI's default styling must not become the product identity.

No package is added or installed by this ADR. License metadata and the selected version matrix must be checked in the generated dependency artifacts during scaffolding, without silently changing the approved versions.

## D3 — authorized reversible visual spike

The spike may test Nuxt UI v4 with the [Balanced Atlantic terminal direction](../research/ui-system-direction.md#direction-2-balanced-atlantic-terminal):

- dark-first presentation with a complete, accessible light mode;
- restrained pixel accents rather than pixel styling for prose or forms;
- moderate technical geometry;
- brief, precise motion with reduced-motion parity;
- a collapsible left sidebar on desktop and mobile-appropriate navigation.

D3 remains `proposed`. The spike must gather evidence about comprehension, accessibility, responsive behavior, differentiation from Nuxt UI defaults, override fragility, SSR and hydration, performance, and licenses. Final visual adoption requires explicit review of that evidence; the spike may be revised or discarded and must not be presented as completed product styling.

## Reversibility constraints

- Define library-independent semantic tokens without Nuxt UI or commercial product names.
- Keep fishing-domain logic independent of the commercial name and of presentation libraries.
- Do not mix primitive libraries in the initial slice.
- Fall back to UnoCSS plus Reka UI if achieving the direction requires repetitive or fragile Nuxt UI overrides.
- Consider Ark UI only for a demonstrated complex interaction that the chosen foundation cannot handle cleanly.
- Consider PrimeVue only after both a demonstrated need and its license terms are validated.
- Keep the D3 spike isolated so rejecting it does not invalidate D1, D2, or the parent specification.

## Consequences

- The initial scaffold has a fixed location and reproducible version target.
- The smallest journey can be evaluated without backend, identity, persistence, provider, or live-data work.
- Current-run state is deliberately disposable and cannot support reload, account history, synchronization, or cross-device claims.
- Nuxt UI accelerates conventional layout, form, navigation, and state work, while product-level accessibility and visual differentiation remain the team's responsibility.
- A future real API and persistence adapter can replace demonstration boundaries without changing the fishing concepts if domain logic stays independent.
- The selected stack introduces framework and component-library coupling that must be contained behind semantic tokens, local composition, and tests.

## Alternatives considered

### Backend or durable persistence in the first slice

Rejected because it broadens the first validation journey before the mock experience demonstrates value and would introduce API, privacy, identity, and operational decisions outside Specification 001.

### UnoCSS plus Reka UI from the outset

Reserved as the fallback. It provides greater visual control but requires more composition and maintenance for a small journey whose first need is rapid, testable delivery.

### Mixing Nuxt UI with another primitive library

Rejected initially because overlapping accessibility and interaction foundations would increase behavior, SSR, styling, and test complexity without a demonstrated interaction gap.

### PrimeVue or Ark UI as the default foundation

Not selected. PrimeVue requires license and product-need validation; Ark UI is reserved for a demonstrated complex interaction where its state-machine primitives provide clear evidence of value.

## Risks, assumptions, and pending validation

- **Risk:** mock content could be mistaken for live fishing or safety guidance; persistent labeling and comprehension tests remain mandatory.
- **Risk:** current-run state could be mistaken for durable persistence; the interface and evidence must state the boundary directly.
- **Risk:** Nuxt UI defaults could produce a generic identity or require fragile overrides; the isolated spike must compare the customized result with defaults and record override cost.
- **Risk:** the approved version matrix may expose compatibility, SSR, hydration, or tooling problems during scaffolding; resolve these with evidence and a follow-up decision rather than silently changing this ADR.
- **Assumption:** deterministic frontend fixtures and in-memory state are sufficient to evaluate the accepted journey before real integrations.
- `needs-validation`: D3 comprehension, accessibility, responsive, performance, differentiation, and override-cost evidence.
- `needs-validation`: actual dependency-tree licenses and transitive obligations after a lockfile exists.
- `needs-validation`: whether Ark UI or another specialist primitive is needed for any concrete complex interaction.
- `needs-validation`: PrimeVue eligibility, terms, and functional need before any future adoption.

## Validation

Before the scaffold is described as complete, verify the approved versions, resolved licenses, framework build, type checking, and the repository's actual test commands. Before D3 can become `decided`, exercise the representative opportunity card, safety gate, detail, blank-session form, desktop sidebar, and mobile navigation in both themes and record the validation evidence required by the implementation plan.

This ADR records decisions and spike authorization only. It does not create `apps/web/`, install dependencies, prove tests, implement application functionality, close Specification 001, or accept the final visual direction.
