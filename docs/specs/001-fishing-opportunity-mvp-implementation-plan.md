# Proposed implementation plan for Specification 001

- **Status:** `proposed`.
- **Parent:** [Specification 001: fishing opportunity MVP](001-fishing-opportunity-mvp.md), `decided`.
- **Implementation:** not started.
- **Last updated:** 2026-09-05.

This plan translates the accepted product contract into a reviewable first vertical slice. [ADR-0005](../decisions/ADR-0005-initial-vertical-slice-delivery.md) records approval of the D1 delivery boundary and D2 initial scaffold stack, and authorizes D3 only as a reversible spike. This plan does not close the parent specification, prove any acceptance criterion, or describe application behavior that already exists.

## Problem

Specification 001 defines an end-to-end fishing decision and learning journey, but before this plan the repository did not define the smallest delivery shape, synthetic examples, UI states, test evidence, or ordered implementation increments. Without that detail, implementation could accidentally broaden scope, make mock data appear real, merge score with confidence or safety, or omit blank sessions.

## Goals

- Deliver one coherent web-first demonstration journey from opportunity comparison through feedback confirmation.
- Preserve exactly three demonstration spots, European seabass, shore spinning, and a horizon no greater than 72 hours.
- Make every scenario value visibly mock or simulated and avoid implying verified local knowledge.
- Keep the explainable 0–100 score, confidence, and independent safety gate semantically and visually separate.
- Demonstrate that safety can invalidate an otherwise favorable-score window.
- Treat sessions with catches and blank sessions as equally valid outcomes.
- Derive verifiable tests and evidence from every parent acceptance criterion before application work begins.
- Keep this slice reversible and independent of external providers, accounts, a real API, and persistence infrastructure.

## Out of scope

- Real weather, oceanographic, regulatory, safety, access, geographic, or spot-condition data.
- Coordinates, maps with precise geometry, live location, or claims about actual local conditions.
- A scoring formula, calibrated weights, catch probability, forecast accuracy, or promises of catches.
- API or OpenAPI operations, endpoints, server implementation, databases, provider adapters, authentication, accounts, or durable cross-device persistence.
- Payments, Telegram, YouTube, social features, machine learning, LLMs, agents, and native applications.
- Installing dependencies, generating the application scaffold, or implementing behavior as part of this documentation increment.
- Final adoption of fonts, icons, or the Balanced Atlantic terminal visual direction before D3 spike evidence is reviewed.

## Fixed product boundary

The implementation must not expand or reduce the parent scope:

- demonstration spots: Aguete, Praia do Santo (Seixo), and Placeres/Lourizán, and no others;
- target and method: European seabass by shore spinning;
- time range: relative mock windows wholly contained within the next 72 hours;
- decision: where, when, and how to fish, expressed as demonstration guidance without a catch promise;
- explanation: 0–100 non-probabilistic score with favorable and unfavorable factors, a separate confidence assessment, and a separate safety gate;
- learning: record whether the person fished, zero or more catches, and feedback about the decision and its explanation.

The three spot names are the only local identity asserted. Boundaries, coordinates, access, regulations, hazards, and conditions remain `needs-validation` and must not be inferred from the scenarios.

## Minimum end-to-end journey

The required journey has four steps:

1. **Opportunity list.** Show comparable mock windows for exactly the three demonstration spots. Each item exposes its mock label, relative window inside 72 hours, European seabass, shore spinning, score, confidence, and safety state. An invalidated item remains visible for comparison but cannot appear actionable.
2. **Opportunity detail.** Show the selected window, mock recommendation, favorable and unfavorable simulated factors, confidence reasons, safety result and limitations, and a visible or retrievable demonstration scoring version. Safety takes precedence over score.
3. **Record session or blank session.** From a selected opportunity, record whether the person fished, zero or more catches, and feedback. Zero catches must require no workaround and must not be styled as an error. For an invalidated opportunity, no action may suggest using the window, but retrospective decision feedback remains available and does not override the mock invalidation.
4. **Feedback confirmation.** Confirm the linked recommendation, whether the session is blank or contains catches, and the submitted usefulness feedback. The proposed frontend-only adapter retains the record for the current demonstration run so it can be rendered and reviewed in this confirmation state; reload, account history, and durable persistence are outside this slice.

Back navigation within the active run must preserve the current demonstration selection and unsaved form state. No route or API endpoint is specified by this plan.

## Synthetic scenario catalog

### Catalog rules

- Every catalog item below is **mock and simulated**. Its spot association is for demonstration only.
- Every relative time, value, score, factor, confidence reason, safety state, and recommendation is **mock**; none comes from observation or a provider.
- The labels “Mock demonstration data” and “Simulated — not current conditions” must remain visible in list and detail states.
- No catalog item contains coordinates, verified regulations, verified access information, actual local conditions, or a safety fact.
- Scores express only relative demonstration potential under mock scoring version `mock-score-v0`; they are not probabilities and do not predict or promise a catch.
- The synthetic catalog is deterministic so tests can reproduce the comparison. It is not evidence for a real scoring formula.

### Scenario M-01 — usable favorable comparison

- **Mock spot:** Aguete; the name is real context, while all attached content is simulated.
- **Mock window:** +12 to +15 hours from the demonstration clock, wholly inside the mock 72-hour horizon.
- **Mock score:** 82/100 under simulated scoring version `mock-score-v0`; explicitly not a probability.
- **Mock score interpretation:** favorable only for comparison inside this synthetic catalog; it does not establish a real threshold.
- **Mock favorable factor:** simulated moderate onshore wind alignment, `+18` demonstration points.
- **Mock favorable factor:** simulated rising-tide phase, `+14` demonstration points.
- **Mock unfavorable factor:** simulated bright mid-window light, `-7` demonstration points.
- **Mock confidence:** high demonstration confidence because the simulated inputs are marked 100% complete and 1 hour old; this describes mock data quality only.
- **Mock safety:** permitted for demonstration, with the explicit limitation that this is not a real safety assessment or guarantee.
- **Mock recommendation:** compare this as the strongest currently usable demonstration window and use shore spinning with a simulated steady retrieve; no catch is promised.

### Scenario M-02 — favorable score invalidated by safety

- **Mock spot:** Praia do Santo (Seixo); the name is real context, while all attached content is simulated.
- **Mock window:** +20 to +23 hours from the demonstration clock, wholly inside the mock 72-hour horizon.
- **Mock score:** 76/100 under simulated scoring version `mock-score-v0`; explicitly not a probability.
- **Mock score interpretation:** favorable only for comparison inside this synthetic catalog; it does not establish a real threshold.
- **Mock favorable factor:** simulated low-light timing, `+16` demonstration points.
- **Mock favorable factor:** simulated water movement, `+12` demonstration points.
- **Mock unfavorable factor:** simulated crosswind variability, `-6` demonstration points.
- **Mock confidence:** medium demonstration confidence because the simulated inputs are marked 80% complete and 3 hours old; this describes mock data quality only.
- **Mock safety:** invalidated by a synthetic safety test flag. The flag is invented solely to demonstrate gate precedence and is not a statement about this place or time.
- **Mock recommendation:** do not present this simulated window as fishable; the invalidated safety gate overrides the favorable mock score. This is neither real safety guidance nor legal certainty.

### Scenario M-03 — usable unfavorable comparison

- **Mock spot:** Placeres/Lourizán; the name is real context, while all attached content is simulated.
- **Mock window:** +30 to +33 hours from the demonstration clock, wholly inside the mock 72-hour horizon.
- **Mock score:** 38/100 under simulated scoring version `mock-score-v0`; explicitly not a probability.
- **Mock score interpretation:** unfavorable only for comparison inside this synthetic catalog; it does not establish a real threshold.
- **Mock favorable factor:** simulated cloud cover, `+8` demonstration points.
- **Mock unfavorable factor:** simulated weak water movement, `-15` demonstration points.
- **Mock unfavorable factor:** simulated wind mismatch, `-12` demonstration points.
- **Mock confidence:** high demonstration confidence because the simulated inputs are marked 100% complete and 1 hour old; this describes mock data quality only.
- **Mock safety:** caution for demonstration, based on a synthetic flag rather than verified conditions or regulations.
- **Mock recommendation:** use this as the lower-potential, still-comparable demonstration option and consider another mock window; no catch or safe outing is promised.

### Scenario M-04 — incomplete or stale confidence

- **Mock spot:** Aguete; the name is real context, while all attached content is simulated.
- **Mock window:** +60 to +63 hours from the demonstration clock, wholly inside the mock 72-hour horizon.
- **Mock score:** 64/100 under simulated scoring version `mock-score-v0`; explicitly not a probability.
- **Mock score interpretation:** mixed only for comparison inside this synthetic catalog; it does not establish a real threshold.
- **Mock favorable factor:** simulated low-light timing, `+11` demonstration points.
- **Mock unfavorable factor:** simulated missing wind direction input, `-4` demonstration points applied only by the mock fixture.
- **Mock confidence:** low demonstration confidence because the simulated inputs are marked 60% complete and 14 hours old; the incomplete/stale state does not alter the score into a probability.
- **Mock safety:** caution for demonstration because the synthetic safety inputs are incomplete; this is not a verified safety fact or guarantee.
- **Mock recommendation:** compare only with strong limitations and seek current authoritative information outside this demonstration before any real decision; no catch is promised.

M-01, M-02, and M-03 form the minimum three-spot comparison. M-02 proves that safety can invalidate a favorable score. M-04 proves that incomplete or stale mock inputs lower confidence independently of the score.

## Conceptual UI states and information hierarchy

### Global content rules

- A persistent “Mock demonstration data” banner appears before decision content.
- The spot name is text-only; no coordinates, precise map marker, access claim, or local-condition assertion appears.
- “Score,” “Confidence,” and “Safety” always have separate headings, descriptions, semantics, and accessible names. They never share one gauge or combine into a single status.
- The score includes “0–100 relative demonstration score — not a probability.”
- Confidence explains simulated freshness and completeness in words as well as values.
- Safety is the dominant gate. `Invalidated` is expressed by text and icon in addition to color, disables any action that suggests using the window, and remains visible beside any favorable score. A separate retrospective feedback action may record what the person actually decided without making the window eligible.
- Catch-neutral language and hierarchy give blank sessions the same prominence as sessions with catches.

### State hierarchy

1. **Opportunity list — ready.** Mock banner; 72-hour scope; European seabass and shore spinning context; then cards ordered for comparison. Within each card: spot and relative window, safety gate, score, confidence, factor summary, and detail action.
2. **Opportunity list — no selection.** The same catalog remains visible; the interface does not imply that a default card has been chosen for a real outing.
3. **Opportunity detail — eligible.** Mock banner and spot/window context; safety; score with version; confidence with completeness/freshness; positive and negative factors; limitations and non-guarantee; then the recording action.
4. **Opportunity detail — invalidated.** Mock banner and invalidation appear before score. The favorable score stays visible for comprehension testing, but the planning action is replaced by an explanation of why this synthetic gate wins; a distinct retrospective outcome action remains available.
5. **Opportunity detail — low confidence.** Low-confidence explanation appears immediately after safety and before factor detail; the score remains unchanged and visibly separate.
6. **Session form — initial.** Linked recommendation summary, “Did you fish?” control, optional catch collection defaulting to zero, and feedback fields. No catch field is required to save a blank session.
7. **Session form — blank session.** “Fished, zero catches” is a valid neutral state. Feedback about usefulness and explanation remains available.
8. **Session form — catches.** Zero or more catch entries may be added without changing the validity or visual worth of the session.
9. **Session form — validation feedback.** Field-specific, programmatically associated messages preserve entered values and focus the first invalid field; catch count zero is never an error.
10. **Feedback confirmation.** Show the retained in-run record, link to the chosen mock recommendation, blank/catch outcome, feedback, and an explicit demonstration-only notice.
11. **Unexpected-state fallback.** Explain that demonstration content could not be shown, expose a retry/reset action, and never substitute unlabeled values. The exact delivery mechanism remains subject to implementation approval.

Loading, server error, authentication, synchronization, and provider outage states are not part of a frontend-only deterministic catalog. If the approved framework introduces hydration or asset-loading states, their treatment must be specified in the implementation increment rather than presented here as existing behavior.

### Visual input authorized for a reversible spike

The [Balanced Atlantic terminal research direction](../research/ui-system-direction.md#direction-2-balanced-atlantic-terminal) remains `proposed`, but D3 authorizes an isolated, reversible Nuxt UI v4 spike. It may test hierarchy, restrained pixel accents, moderate technical geometry, a dark-first presentation with complete accessible light-mode parity, brief precise reduced-motion-aware transitions, a collapsible desktop left sidebar, and mobile-appropriate navigation. Final adoption is not decided; palette, typography, components, accessibility, performance, licensing, outdoor comprehension, differentiation, and override cost require spike evidence and explicit review. Technical styling must not imply that synthetic data is precise or authoritative.

## Approved delivery boundary and scaffold stack

### Decision gates

- **Decided:** web-first, as recorded by [ADR-0003](../decisions/ADR-0003-web-first.md).
- **D1 — `decided`:** a frontend-only web demonstration backed by deterministic in-process mock fixtures and an in-memory session/feedback adapter. There is no real API or durable storage; the record lasts only for the current demonstration run and supports the confirmation evidence.
- **D2 — `decided`:** the initial scaffold lives at `apps/web/` and uses the exact toolchain, application, UI, and test versions recorded in [ADR-0005](../decisions/ADR-0005-initial-vertical-slice-delivery.md). The decision does not mean the path, manifest, lockfile, dependencies, or scaffold exists yet.
- **D3 — `proposed`, spike authorized:** test Nuxt UI v4 with the Balanced Atlantic terminal direction under the reversible boundary in ADR-0005. Final visual adoption remains pending evidence.
- **Outside this slice:** API and OpenAPI operations, endpoints, backend/provider adapters, authentication, accounts, databases, browser storage intended as durable persistence, and external data integrations.
- **Decided direction but not implemented by this slice:** modular monolith. The frontend mock delivery must not establish client-owned fishing rules as the future domain boundary.

The D1 and D2 gates are satisfied for the initial scaffold. D3 permits only the smallest representative spike; production adoption of the visual direction still requires an explicit approve, revise, or reject decision after evidence is reviewed.

### D2 version and license record

- **Toolchain:** Node.js `24.19.0` is the compatibility runtime for Nuxt and tooling, and Bun `1.4.1` is the MIT-licensed package manager; both are toolchain components, not application packages.
- **MIT application packages:** Nuxt `4.5.2`, Vue `3.5.42`, Nuxt UI `4.11.0`, Vitest `4.1.11`, `@nuxt/test-utils` `4.2.0`, and `@vue/test-utils` `2.5.0`.
- **Apache-2.0 application packages:** TypeScript `7.0.2` and `@playwright/test` `1.63.0`.

Ordinary package scripts in the future scaffold must use `bun run`. The explicit Bun-runtime opt-in form `bun --bun` is not approved by D2; Node.js remains the compatibility runtime. Neither the Node.js runtime nor the Bun runtime has been exercised in this repository, so compatibility remains pending validation.

The future scaffold must commit `bun.lock` and use `bun install --frozen-lockfile` or the equivalent `bun ci` command for reproducible CI installs. The official release, command, lockfile, license, consultation-date, and source limitations are recorded in [ADR-0005](../decisions/ADR-0005-initial-vertical-slice-delivery.md#d2--initial-scaffold-stack).

Nuxt UI is selected for the spike because it directly integrates with Nuxt, SSR, TypeScript, and color mode; covers the small vertical's common components; builds on Reka UI's accessibility foundation; supports semantic tokens and typed variants; is MIT-licensed; and includes a `DashboardSidebar` ecosystem for the proposed navigation test. Its default styling is not the product identity, and its foundation does not replace product-level accessibility validation.

### Conceptual responsibilities

- **Mock catalog fixture:** owns only deterministic, explicitly simulated scenario data and its labels.
- **Domain-facing demonstration logic:** enforces spot/method/horizon invariants, score bounds, score/confidence separation, safety precedence, and blank-session validity without depending on commercial branding.
- **Journey state:** holds selected opportunity, form draft, saved current-run session, and feedback for confirmation.
- **Presentation:** renders list, detail, form, validation, and confirmation states without creating domain facts.
- **Test fixtures and evidence:** reuse catalog identifiers and assertions without copying an alternative source of truth.

The approved application root is `apps/web/`; exact files beneath it will be established by the scaffold and later implementation increments. The conceptually owned areas are `mock catalog`, `domain-facing demonstration logic`, `journey state`, `list/detail presentation`, and `session/feedback presentation`; naming them does not claim those areas or the application root exist.

## Acceptance-criterion traceability and derived tests

The identifiers below are local traceability labels. Each entry quotes one parent criterion exactly once, then maps it to tests and expected evidence without changing its meaning.

### AC-001

**Parent criterion:** “Exactly the three demonstration spots and the initial method are displayed.”

- **Derived tests:** a domain/catalog test rejects missing, duplicate, or additional spots and any species/technique other than European seabass and shore spinning; a list component test asserts the three names and method context; an end-to-end test visits each detail from the list.
- **Expected evidence:** passing catalog and component assertions plus screenshots or an end-to-end trace showing Aguete, Praia do Santo (Seixo), and Placeres/Lourizán only.

### AC-002

**Parent criterion:** “The visible horizon does not exceed 72 hours.”

- **Derived tests:** a unit test verifies that every interval begins at or after the demonstration clock and ends at or before +72 hours; boundary fixtures cover exactly +72 hours and a rejected interval beyond it; the list/detail integration test shows only in-range windows.
- **Expected evidence:** passing boundary-test output and a rendered horizon label or trace.

### AC-003

**Parent criterion:** “All simulated data is identified as mock or demonstration data.”

- **Derived tests:** fixture-schema validation requires an explicit mock marker; component tests assert the persistent list/detail/form/confirmation labels; an end-to-end content scan rejects unlabeled scenario values; a comprehension check asks participants whether the information is current or simulated.
- **Expected evidence:** passing schema and UI assertions, state screenshots, and a short comprehension record in which participants identify the content as simulated.

### AC-004

**Parent criterion:** “Each opportunity displays a score between 0 and 100 without calling it a probability.”

- **Derived tests:** unit tests accept inclusive bounds 0 and 100 and reject out-of-range values; component and end-to-end tests assert each visible score and the “not a probability” explanation; a repository content scan rejects probability language applied to the score.
- **Expected evidence:** boundary-test output, list/detail screenshots, and content-scan results.

### AC-005

**Parent criterion:** “Score and confidence appear as separate concepts.”

- **Derived tests:** domain tests vary confidence without changing the same mock score; component tests assert separate headings and accessible regions; a comprehension check asks participants to explain the difference using M-04.
- **Expected evidence:** passing independence and semantics assertions plus recorded comprehension observations.

### AC-006

**Parent criterion:** “At least one favorable and one unfavorable factor are explained when they exist in the mock scenario.”

- **Derived tests:** catalog tests require factor direction and mock label; detail component tests render all existing favorable and unfavorable factors for M-01 through M-04; an end-to-end check opens a scenario containing both directions and reads their explanations.
- **Expected evidence:** fixture-validation output and detail-state screenshots or trace.

### AC-007

**Parent criterion:** “The demonstration scoring version is visible or retrievable.”

- **Derived tests:** catalog/domain tests require the mock version identifier; detail component and end-to-end tests assert that `mock-score-v0` is visible or available through an accessible disclosure.
- **Expected evidence:** passing assertions and a detail screenshot or accessibility-tree excerpt showing the version.

### AC-008

**Parent criterion:** “At least one scenario exists where safety invalidates a window with a favorable score.”

- **Derived tests:** a domain test proves M-02 retains score 76 while its independent safety result is invalidated; component tests assert invalidation dominates the hierarchy, removes the planning action, and keeps retrospective feedback distinct; an end-to-end test compares M-01 with M-02 and confirms M-02 is not an eligible planning option.
- **Expected evidence:** safety-precedence test output and list/detail/end-to-end captures for M-02.

### AC-009

**Parent criterion:** “The recommendation avoids guarantees of catches and legal or safety certainty.”

- **Derived tests:** a content test checks required non-guarantee language and rejects promise/certainty phrases in recommendation fixtures; a comprehension review asks participants whether any item guarantees a catch or safe/legal conditions; documentation review confirms all real safety and regulations remain unverified.
- **Expected evidence:** content-scan output, comprehension notes, and documentation-consistency checklist.

### AC-010

**Parent criterion:** “A session linked to a recommendation can be recorded.”

- **Derived tests:** domain/state tests require a valid catalog recommendation identifier on a saved session; component/integration tests carry the selection into the form and confirmation; an end-to-end test records a session from M-01 and verifies the link in confirmation.
- **Expected evidence:** passing state and integration tests plus an end-to-end trace of the linked record.

### AC-011

**Parent criterion:** “A blank session can be recorded without forcing a catch.”

- **Derived tests:** domain tests accept zero catches; form tests save “fished, zero catches” without a catch entry or validation error; an end-to-end test completes and confirms a blank session.
- **Expected evidence:** passing zero-boundary tests and the blank-session confirmation trace.

### AC-012

**Parent criterion:** “Feedback on the decision and explanation can be recorded.”

- **Derived tests:** state tests retain both feedback dimensions for the active run; form/integration tests validate labels and carry submitted feedback into confirmation; an end-to-end test submits and re-reads both values.
- **Expected evidence:** passing state/form assertions and a confirmation capture containing the submitted feedback.

### AC-013

**Parent criterion:** “Exact real-time location is not published.”

- **Derived tests:** fixture validation rejects coordinate and real-time-location fields; rendered-output and repository scans reject coordinate-like values and precise map links; a privacy review confirms that only demonstration spot names are exposed.
- **Expected evidence:** passing schema/content scans and a signed privacy checklist for every rendered state.

### Cross-cutting validation suites

- **Unit/domain:** catalog invariants, 72-hour bounds, score bounds and terminology, independent confidence, safety precedence, linked sessions, zero catches, and current-run feedback retention.
- **Component/integration:** persistent mock labels, hierarchy and semantic regions, factor explanations, scoring version, invalidation behavior, form validation, selection/state transfer, and confirmation.
- **End to end:** eligible M-01 list-to-confirmation journey, M-01 blank-session journey, M-02 favorable-but-invalidated journey, M-04 low-confidence comprehension, and all-three-spot comparison.
- **Accessibility:** automated checks as a baseline; keyboard-only operation; visible and unobscured focus; names/roles/states; heading and DOM order; form labels/errors; text-icon-color redundancy; 320 CSS px reflow; 200% zoom; light/dark contrast if both themes are approved; reduced-motion parity; VoiceOver plus one other representative screen reader.
- **Comprehension:** participants distinguish score from probability, confidence from score, and safety from both; identify mock data; understand that M-02 is invalidated; recognize that blank sessions are valid; and detect no catch, legal, or safety guarantee.
- **Privacy/content:** no exact coordinates, precise maps, live-location fields, unverified facts, or real-data claims; spot names are the only local assertions.
- **Documentation consistency:** Spec 001 remains `decided` and open, this plan remains `proposed` until approval, scenario and UI scope match, and no document claims implementation or integrations exist.

## Ordered delivery increments

Each increment is intended to be one small, reversible PR. Documentation, application, tests, and infrastructure remain separate when they express different intentions. Later increments depend on explicit approval and must follow the repository's atomic-commit rules.

### Increment 0 — record delivery decisions

- **Intent:** documentation only.
- **Conceptually owned files/areas:** ADR-0005, this plan, the decision index, and changelog.
- **Dependencies:** explicit user approval of D1 and D2 and reversible-spike authorization for D3.
- **Validations:** Markdown links, criterion traceability, terminology/claim scans, complete diff review.
- **Completion condition:** the decisions are recorded without changing the plan's `proposed` status, closing Spec 001, or adding application and dependency files.

### Increment 1 — create the approved minimal shell

- **Intent:** infrastructure/scaffolding only, after D2.
- **Conceptually owned areas:** `apps/web/` package manifest and committed `bun.lock`, framework configuration, minimal application shell, and tool configuration.
- **Dependencies:** the decided D1 and D2 boundaries in ADR-0005, including recorded versions/licenses and justified dependencies.
- **Validations:** reproducible install with `bun install --frozen-lockfile` or `bun ci`; framework-provided build/type-check/lint categories discovered from the approved manifest; clean dependency/license review. Application commands must be recorded only after scripts exist.
- **Completion condition:** a minimal web shell runs without fishing behavior, mock scenarios, or claims that Spec 001 is implemented.

### Increment 2 — add deterministic mock domain/catalog behavior

- **Intent:** application/domain behavior only.
- **Conceptually owned areas:** mock catalog fixture, catalog invariants, domain-facing demonstration types/logic, and in-memory ports; no UI styling or real integration.
- **Dependencies:** Increment 1 and approval of the exact M-01 through M-04 fixtures.
- **Validations:** unit/domain categories for AC-001, AC-002, AC-004 through AC-008, AC-010 through AC-013; content/privacy scan.
- **Completion condition:** deterministic behavior represents only the approved catalog, rejects invalid states, and contains no provider, API, auth, or durable persistence code.

### Increment 3 — add domain and fixture tests

- **Intent:** tests only, reviewable independently from behavior where practical.
- **Conceptually owned areas:** unit/domain test suite and reusable test builders limited to the catalog contract.
- **Dependencies:** Increment 2 and an available approved test runner.
- **Validations:** run the repository-defined unit test command and inspect failure messages and coverage of catalog boundaries; do not invent a coverage target without approval.
- **Completion condition:** tests demonstrate the mapped domain invariants and fail when safety precedence, bounds, labels, or blank-session validity are broken.

### Increment 4 — implement unstyled list and detail journey

- **Intent:** application presentation only.
- **Conceptually owned areas:** opportunity list/detail views or components, accessible semantic structure, journey selection state, and content strings.
- **Dependencies:** Increments 2–3; approved information hierarchy. Visual-system adoption is not required.
- **Validations:** component/integration categories for AC-001 through AC-009 and AC-013; keyboard and semantic-order review; rendered content/privacy scan.
- **Completion condition:** all three spots are comparable, M-02 is visibly invalidated despite score 76, M-04 explains low confidence, and every value remains labeled mock.

### Increment 5 — implement session, blank session, and feedback

- **Intent:** application presentation/state only.
- **Conceptually owned areas:** session form, optional catch collection, feedback fields, current-run state adapter, and confirmation view.
- **Dependencies:** Increment 4 and the decided D1 current-run retention boundary.
- **Validations:** component/integration and end-to-end categories for AC-010 through AC-012, including one catch session and one blank session; form accessibility.
- **Completion condition:** both outcomes save without bias, feedback is confirmed, and no durable storage or account claim is introduced.

### Increment 6 — add journey and accessibility tests

- **Intent:** tests only.
- **Conceptually owned areas:** end-to-end scenarios, accessibility checks, comprehension protocol, and evidence index.
- **Dependencies:** Increments 4–5 and approved browser/test tooling.
- **Validations:** all mapped end-to-end paths, automated and manual accessibility categories, privacy scan, and facilitated comprehension checks.
- **Completion condition:** evidence is linked to all AC-001 through AC-013, with failures and pending manual evidence explicit.

### Increment 7 — authorized visual-system spike and decision

- **Intent:** isolated, reversible research spike; production adoption only after a later final D3 decision.
- **Conceptually owned areas:** representative card, detail safety gate, blank-session form, semantic tokens, light/dark samples, and spike measurements.
- **Dependencies:** decided D2; D3 spike authorization; the [UI research](../research/ui-system-direction.md); version/license revalidation.
- **Validations:** comprehension, keyboard, screen readers, contrast, 320 px/200% reflow, reduced motion, visual differentiation, dependency/license inventory, and measured production artifacts against a separately approved budget.
- **Completion condition:** gather enough evidence to approve, revise, or reject Balanced Atlantic terminal on Nuxt UI explicitly; discard the spike if rejected. A spike alone is neither final visual adoption nor implementation of the vertical slice.

### Increment 8 — synchronize completion documentation

- **Intent:** documentation only, after all applicable evidence exists.
- **Conceptually owned files/areas:** Spec 001 acceptance checkboxes and status wording, plan status, Home status, changelog, and evidence links.
- **Dependencies:** all applicable parent criteria verified and reviewer approval.
- **Validations:** documentation consistency, complete link check, claim scan, full relevant test suite, and diff review.
- **Completion condition:** only then may documentation say the slice is implemented or the parent definition of done is met. This current plan does not perform Increment 8.

No API, provider, authentication, persistence-infrastructure, or native-client increment belongs in this slice.

## Planned validation commands and evidence

The current repository has no application manifest or validated scripts, so this plan does not invent executable command names. After Increment 1, each PR must inspect the approved manifest and contributor documentation, record the actual commands, and run the applicable categories:

- formatting and linting;
- type checking;
- unit/domain tests;
- component/integration tests;
- production build;
- end-to-end browser tests;
- automated accessibility checks and the manual accessibility protocol;
- content, privacy, and mock-label scans;
- Markdown relative-link validation;
- `git diff --check`, complete unstaged/staged diff review, and explicit-path Git status review.

Evidence should include the command, exact revision, environment, result, and any skipped/manual gate. Screenshots supplement semantic and behavioral assertions; they do not replace tests. Comprehension evidence must record the task and observed interpretation without presenting a small study as statistical validation.

## Risks and mitigations

- **Mock data appears real.** Use persistent labels, repeat the limitation in details and confirmation, reject unlabeled fixtures, and test comprehension.
- **Score is read as probability or promise.** Pair every score with non-probabilistic wording, explain factors/version, scan content, and test comprehension.
- **Confidence looks like a second score.** Use a separate named region and reasons based only on simulated freshness/completeness; avoid a shared gauge.
- **Safety looks like a score penalty.** Preserve an independent state and make M-02 visibly ineligible as a planning option while its score remains favorable.
- **Synthetic local details are mistaken for facts.** Prefix all scenario fields as mock, avoid coordinates/regulations/access claims, and state that factor associations are invented.
- **Blank-session bias.** Default catches to zero, make catch entry optional, use neutral confirmation language, and test the zero boundary.
- **Current-run retention is mistaken for persistence.** Label the demonstration boundary and keep accounts, browser persistence, database storage, and synchronization outside the slice.
- **Frontend fixtures become the future domain or API contract.** Isolate them behind domain-facing interfaces and do not invent endpoints or client-branded concepts.
- **A visual terminal style implies certainty.** Treat the direction as an optional input, validate comprehension, and prioritize plain-language limitations over decoration.
- **Approved dependencies create lock-in or resolve incompatibly.** Preserve the exact D2 record, inventory resolved versions/licenses during scaffolding, and require a follow-up decision for any change; isolate and discard the D3 spike if necessary.
- **Accessibility is inferred from a component library.** Require product-level automated and manual validation for actual states.

## Assumptions and open questions

- **Assumption:** a deterministic frontend-only mock is sufficient to evaluate the parent journey before real integrations.
- **Decided boundary:** current-run in-memory retention provides reviewable confirmation without durable browser persistence, account history, or synchronization.
- **Assumption:** relative windows anchored to a visible demonstration clock avoid implying a current forecast.
- `needs-validation`: what minimum session effort fields are required beyond “did you fish,” zero or more catches, and usefulness feedback?
- `needs-validation`: what response format best measures usefulness of the decision and explanation without false precision?
- `needs-validation`: what confidence vocabulary is most understandable without resembling a probability?
- `needs-validation`: which exact mock factor explanations are useful and clearly fictional?
- `needs-validation`: which safety labels and invalidation copy are understood without suggesting real authority?
- `needs-validation`: what non-sensitive representation of each spot name avoids implying verified boundaries or access?
- `needs-validation`: do the approved D2 versions resolve together and match their recorded licenses when the scaffold and lockfile exist?
- `needs-validation`: which exact scaffold, build, type-check, and test commands exist after `apps/web/` is generated?
- `needs-validation`: does the Balanced Atlantic terminal spike pass comprehension, accessibility, responsive, performance, and licensing gates under D3?

## Validation gates

- **V0 — plan review:** scope, states, catalog, all 13 criterion mappings, tasks, and claims remain reviewable; the plan stays `proposed` until separately accepted.
- **V1 — delivery boundary: passed by decision.** D1 approves current-run retention and excludes API, provider, authentication, database, durable browser persistence, and live-data integrations.
- **V2 — scaffold decision: passed; resolution evidence pending.** D2 fixes `apps/web/`, the exact toolchain and packages, and their recorded licenses. Actual commands, compatibility, resolved licenses, build, and tests can be verified only after scaffolding and must not be claimed yet.
- **V3 — behavior evidence:** domain, component, and end-to-end tests cover AC-001 through AC-013 without omitted or weakened criteria.
- **V4 — human quality:** accessibility, comprehension, mock-data clarity, privacy, and safety-precedence reviews pass or retain visible blockers.
- **V5 — visual adoption:** D3 is authorized only for a reversible spike; final adoption must approve, revise, or reject the proposed visual input using spike evidence.
- **V6 — completion sync:** implementation and documentation are compared line by line before any completion claim or parent checkbox/status change.

## Rollback and reversibility

- Keep each increment as a logical, atomic, reversible PR and do not mix documentation, infrastructure, application, and tests when their intentions differ.
- The deterministic catalog can be replaced behind its boundary without changing future provider contracts because this slice defines no endpoints.
- The in-memory state adapter can be replaced by approved persistence later without changing the parent fishing concepts.
- Semantic tokens must not include library or commercial product names, allowing the visual spike or component library to be removed.
- Replacing D2 through a follow-up decision or rejecting D3 leaves this documentation plan and parent specification intact; no rejected spike dependency or styling needs to be retained.
- Rollback must never rewrite evidence to imply an invalidated or removed behavior still exists.

## Readiness

The documentation gates for Increment 1 are satisfied: D1 and D2 authorize creation of the minimal scaffold at `apps/web/` with the recorded versions and licenses. No scaffold, dependency, validation command, test, or application behavior exists yet. The D3 authorization also permits an isolated reversible spike, but not production adoption of the proposed visual direction.

Behavior increments after the scaffold are ready only when:

- the relevant proposed plan content and synthetic M-01 through M-04 fixtures are reviewed for that increment;
- the approved D2 versions resolve compatibly, their licenses are confirmed from actual dependency artifacts, and real repository commands are documented;
- M-01 through M-04 and their copy are reviewed as synthetic, non-local claims;
- AC-001 through AC-013 have named tests and evidence owners;
- open questions that affect the journey or data model are resolved or bounded for the slice;
- no prerequisite requires an API, provider, authentication, or persistence integration.

The authorized D3 spike may test styled components now. Reuse of its visual choices in production still requires final D3 adoption based on evidence; unstyled behavior does not depend on that adoption.

## Definition of done

The vertical slice is done only when:

- the complete list → detail → session or blank session → feedback confirmation journey works with clearly labeled mock data;
- the three demonstration spots, European seabass, shore spinning, and no-more-than-72-hour scope are preserved;
- all AC-001 through AC-013 tests and evidence are complete, including one catch session, one blank session, M-02 safety precedence, and M-04 low-confidence comprehension;
- accessibility, comprehension, privacy, and documentation-consistency gates pass with limitations recorded;
- all applicable repository validation commands, link checks, claim scans, and diff checks pass;
- implementation, Spec 001, this plan, Home, decisions, and changelog do not contradict each other;
- no application, API, integration, formula, dependency, legal certainty, safety guarantee, or real-data capability is claimed beyond verified evidence;
- completion documentation is updated in a separate atomic documentation increment after approval.

Until these conditions are met, the parent specification remains `decided` with implementation not started or incomplete, and this document remains a proposed plan rather than evidence of delivery.
