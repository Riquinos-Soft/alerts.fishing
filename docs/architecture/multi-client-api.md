# Proposed architecture for a multi-client API

- **Status:** `proposed`.
- **Implementation:** not started.
- **Last updated:** 2026-09-04.
- **Related decision:** [ADR-0004: client-independent API](../decisions/ADR-0004-multi-client-api.md), also `proposed`.

This document is an architecture specification for review. It does not describe existing endpoints, clients, authentication, integrations, or infrastructure, and it does not expand the scope of the [first vertical slice](../specs/001-fishing-opportunity-mvp.md).

## Problem

The web-first direction needs to evolve without making Nuxt the implicit backend contract. At the same time, a future iOS or Android application and possible internal automations should consume the same use cases without duplicating rules, filtering sensitive data differently, or coupling the fishing domain to a commercial brand.

Without explicit conventions, each client could introduce incompatible names, time formats, units, pagination, errors, authentication, or privacy policies. Correcting those differences later would increase the cost of evolution and the risk of exposing locations, credentials, or device tokens.

## Goals

- Propose a single HTTP contract that is agnostic to client type.
- Preserve the [decided modular monolith](../decisions/ADR-0002-modular-monolith.md) and its domain boundaries.
- Make the required cross-cutting rules explicit before defining endpoints.
- Enable compatible evolution and future generation of typed clients from OpenAPI.
- Apply privacy by default to location, images, notifications, and observability.
- Turn the acceptance criteria of this proposal into validations for the future contract.

## Out of scope

- Designing or implementing specific endpoints.
- Implementing an API, server, client, authentication, storage, image upload, or notifications.
- Selecting an identity, storage, CDN, telemetry, or push-messaging provider.
- Changing the web-first priority or adding native applications to the MVP.
- Designing microservices, a service mesh, or network contracts between internal modules.
- Setting quotas, sizes, retention periods, SLOs, or compatibility windows without product and operational evidence.
- Presenting still-unverified data, coordinates, regulations, or conditions as real.

## Principles and boundaries

### One deployment, explicit boundaries

The proposal retains a single modular monolith. The API is an input adapter in the same deployment, not a separate service. Adding another client does not create another backend or authorize diverging rules.

The proposed dependency direction is `API -> application -> domain`; infrastructure implements ports required by the application or domain. Specifically:

- **Domain:** fishing concepts and invariants such as spots, conditions, scoring, recommendations, sessions, and feedback. It knows nothing about HTTP, OpenAPI, Nuxt, mobile platforms, providers, or commercial names.
- **Application:** orchestrates use cases, transactions, authorization, and visibility policies. It receives transport-independent commands and queries.
- **API:** authenticates context when appropriate, validates representations, translates DTOs into application inputs, and translates results into HTTP. It contains no scoring rules or independent privacy decisions.
- **Infrastructure:** persistence and replaceable adapters for external providers, objects, identity, push, and telemetry. It does not decide on its own which locations a person can view.

API DTOs are not domain entities. Public, private, and administrative projections will be modeled by capability and policy, not by client name. No domain module will import types generated from OpenAPI.

### Planned clients

The contract must be able to serve, without consumer-specific semantics:

- the public web, for explicitly publishable resources;
- the future Nuxt web application;
- future iOS and Android clients;
- future internal automations with their own identity and permissions.

Differences in interface, local caching, or device capabilities belong to each client adapter. A client does not receive more data by declaring itself mobile, web, or internal: identity, permission, and resource policy govern the response.

## Contract requirements

### R-API-001 — OpenAPI as a prior contract

- `proposed`: maintain an OpenAPI description as the source of truth for the HTTP boundary before implementing each operation.
- The description will pin an exact version in the OpenAPI 3.1 family and include stable operation identifiers, schemas, formats, security, examples, and all known responses.
- `needs-validation`: confirm the OpenAPI patch version and compatibility among the validator, FastAPI, and generators before the first contract. The official catalog already contains versions 3.2 and 3.1; the selected ecosystem is not assumed to support both equally.
- Every future operation must link to a use case and approved acceptance criteria; publishing OpenAPI does not demonstrate that the operation exists or works.

### R-API-002 — Versioning and compatibility

- `proposed`: use a major-version segment in the base path, conceptually `/api/v1`; no resource path is defined here.
- The API version, OpenAPI document version, and scoring version are separate concepts.
- Only compatible changes will be allowed within a major version: adding operations, adding optional response fields, and accepting new inputs without changing previous meaning.
- Removing or renaming fields, tightening previously accepted validation, changing units or types, reusing values, changing observable authorization, or adding values to a closed enum will be treated as potentially incompatible.
- Unknown response fields must be ignorable; unknown inputs will be rejected consistently to detect client errors unless a schema explicitly documents extensibility.
- A breaking change will require a new major version, migration guide, coexistence period, and usage telemetry. Deprecation will be announced in the contract and, if adopted in the implementation, through `Deprecation`, a migration link, and `Sunset` in accordance with the applicable RFCs.
- `needs-validation`: minimum support duration, retirement policy, and consumers that must approve a breaking change.

### R-API-003 — Resources, identifiers, and representations

- Resources will use lowercase plural nouns in `kebab-case`; actions will be expressed through HTTP semantics or, when they do not fit, as documented subresources, never as hidden arbitrary verbs.
- JSON will use `lowerCamelCase`. Identifiers will be opaque, stable, immutable strings; clients will not infer type, order, date, or permissions from them.
- Contract names will come from the ubiquitous fishing language defined in the [domain map](domain-map.md), not from Nuxt, an operating system, or the commercial product name.
- Representations will distinguish absence, `null`, zero, and an empty collection. Every field will have an explicit description, requirement level, and evolution rules.
- The language of user-facing text will not change the semantics of codes, states, or identifiers. Content localization remains `needs-validation`.

### R-API-004 — Consistent errors

- Errors will use `application/problem+json` in accordance with RFC 9457, with `type`, `title`, `status`, `detail`, and `instance` when applicable.
- Proposed extensions: a stable machine-readable `code`, an opaque `requestId`, and an `invalidParams` collection with a field pointer and stable reason for validation errors.
- Clients will make decisions based on status, `type`, or `code`; they will never parse localized `title` or `detail`.
- The API will not expose traces, queries, internal names, credentials, the existence of unauthorized resources, or private coordinates through errors.
- Authentication, authorization, conflict, precondition, validation, usage-limit, and temporary-failure cases will retain distinct HTTP meanings. Retries will be indicated only when safe.

### R-API-005 — Instants, civil time zones, and calendars

- Every exchanged and persisted instant will be represented in UTC using the RFC 3339 profile and a `Z` suffix.
- When a decision depends on civil time, an IANA database identifier such as `Europe/Madrid` will also be transported; an offset such as `+02:00` does not replace a zone.
- Civil dates, local times, and instants will be distinct types. Daylight-saving conversion will be performed at the boundary using a known version of the time-zone database.
- Every interval will document inclusivity; the proposed convention for queries is an inclusive start and exclusive end.
- Locale-formatted dates and ambiguous abbreviations will not be exchanged. A user's time-zone preference does not alter the instant of a condition or recommendation.
- `needs-validation`: policy for nonexistent or duplicated local times and retention of the time-zone database version for historical reproduction.

### R-API-006 — Units of measure

- Each environmental or activity quantity will have a numeric value and an unambiguous unit code; the unit will not be encoded in the field name.
- `proposed`: use UCUM codes in the contract and one canonical unit per quantity for calculation and comparison. Metric or imperial preference will be a presentation responsibility.
- Conversion will not reduce domain precision or change scoring thresholds. Rounding, precision, and the meaning of missing values will be documented per field.
- `needs-validation`: review UCUM 2.2 coverage and licensing for the specific fishing quantities before fixing the catalog.

### R-API-007 — Collections, cursors, and filters

- Potentially growing collections will use opaque cursor pagination, not offsets. The response will distinguish items, an optional next cursor, and whether another page exists.
- The cursor will be bound to identity or visibility, filters, sort order, and page size; it will have integrity protection and documented expiration and will never include decodable coordinates or sensitive data.
- Ordering will be stable and use the identifier as a tie-breaker. An exact total will not be promised when costly to calculate or able to change during traversal.
- Each collection will declare a closed set of filters and sort orders. There will be no generic language for querying arbitrary fields.
- Sets will be expressed as repeatable parameters; time ranges will follow R-API-005. Unknown parameters or invalid combinations will produce a validation problem.
- `needs-validation`: minimum and maximum limits, cursor duration, and consistency guarantees between pages.

### R-API-008 — Safe writes and idempotency

- The idempotency semantics defined by HTTP for standard methods will be respected. Updates that could overwrite concurrent changes will use preconditions, such as ETag and `If-Match`, when required by the use case.
- Retriable non-idempotent writes may require an opaque idempotency key. Its proposed scope combines principal, method, target, and key; the same key with the same body repeats the result, while the same key with another body produces a conflict.
- The server must define retention, concurrent-request status, body fingerprinting, and which response is replayed. Deduplication does not replace invariants and transactional constraints.
- `needs-validation`: the name `Idempotency-Key` and its syntax are not yet a stable standard; the consulted IETF draft has expired. Its status and tooling support will be reviewed before freezing the contract.

### R-API-009 — Image upload and delivery

- `proposed`: separate authorization and metadata from the byte plane. The API would create a limited intent, and the client would transfer to object storage using short-lived authorization; completing the intent would not automatically make the image public.
- Objects will remain private and quarantined until their actual type, size, dimensions, and decodability are validated. A minimal allowlist of formats will be permitted, a storage name not controlled by the user will be generated, and EXIF data and coordinates will be removed before any visible derivative is created.
- An image will pass through explicit states such as pending, ready, or rejected. Processing and completion will be retry-safe, and private delivery will use short-lived authorization.
- An arbitrary URL will never be accepted for the server to download without specific SSRF controls. A client-supplied filename and `Content-Type` are not sufficient evidence.
- Quotas, antivirus, moderation, transformations, formats, sizes, retention, and deletion remain `needs-validation` before an operation is specified.

### R-API-010 — Future authentication and authorization

Authentication and accounts remain outside the MVP. If approved in a later specification:

- `proposed`: base delegated authentication on OAuth 2.0/OIDC with the authorization code flow and PKCE, following RFC 9700.
- The web will evaluate a backend-for-frontend pattern with a `Secure`, `HttpOnly`, and `SameSite` session; native clients will be public clients, use the external user agent, and use secure system storage in accordance with RFC 8252.
- Shared secrets will not be embedded in distributed applications. Internal automations will use workload identity or a separate confidential client, minimum permissions, and rotatable credentials.
- Access tokens will have narrow audience and scope and short lifetimes; refresh, rotation, revocation, and issuer-binding strategy remains to be designed.
- The application will check object-, action-, and field-level authorization in every use case. An opaque identifier and CORS are not authorization controls.
- `needs-validation`: provider, account recovery, MFA, web-session handoff, mobile storage, scope model, and legal requirements before creating the contract.

### R-API-011 — CORS and browser protection

- CORS will be disabled except for browser clients that genuinely need it and configured per environment with exact origins.
- Credentials will not be combined with a wildcard origin. Methods, exposed headers, permitted headers, and preflight duration will be minimized.
- CORS does not replace authentication, authorization, or CSRF protection. If the web uses cookies, operations with effects must have an explicit CSRF defense.
- OAuth redirects and permitted origins will have separate lists; an arbitrary `Origin` will not be reflected.

### R-API-012 — Usage limits

- Limits will vary by risk: IP or network before authentication and principal, installation, or capability after authentication. Uploads, login, recovery, export, and device registration will require stricter policies than public reads.
- A rate-limited request will receive `429 Too Many Requests`, an RFC 9457 problem, and `Retry-After` when a useful wait can be provided. Clients will use backoff with jitter and will not retry indefinitely.
- Partitioning keys and internal capacity will not be exposed in ways that facilitate abuse. Rate limits do not replace storage quotas, concurrency limits, or protection for sensitive flows.
- `needs-validation`: real quotas and adoption of `RateLimit-Policy`/`RateLimit`; these fields remained an active IETF draft on the consultation date.

### R-API-013 — Caching and concurrency

- RFC 9111 semantics and directives, ETag, and conditional requests will be used when the representation permits.
- Only anonymous, explicitly public content may use shared caching. Account data, tokens, precise locations, upload intents, and authorization responses will be `private` or `no-store` according to risk.
- The cache key must include every dimension that changes an authorized representation. `Vary` will be limited to necessary headers to prevent fragmentation and mixing of permissions.
- A notification or error never overrides the resource's caching rules on its own. TTL, revalidation, and tolerance for stale data will be decided per use case.
- `needs-validation`: cache classification, TTL, and invalidation strategy for each future operation.

### R-API-014 — Future notifications and device registrations

- The application will produce a notification intent after confirming the state change; a provider-specific adapter will perform delivery. The domain will know nothing about APNs, FCM, or Web Push.
- A notification is a hint that may be duplicated, delayed, or lost. It will contain an opaque identifier and minimal metadata; the client will query the API for current state.
- Registrations will be associated with installation, platform, environment, provider, optional account, consent, preferences, and update date. Multiple devices, rotation, revocation, and removal of invalid or inactive registrations will be supported.
- Tokens or installation identifiers will be operational secrets: encrypted at rest, hidden from logs and errors, and never used as user identity.
- The visible payload will not include coordinates, a sensitive spot name, tokens, or details that reveal activity on a locked screen. Expiration, collapsing, and deduplication will prevent stale alerts.
- `needs-validation`: channels, providers, platform-specific consent, retention, inactivity threshold, and delivery guarantees. Current Apple and Firebase documentation confirms that identifiers can change and must be kept up to date.

### R-API-015 — Location privacy

- The [decided location privacy](privacy-and-location.md) is preserved: private precise geometry and approximate public representation are separate data.
- The application will select an authorized projection before serialization. A public client will never receive extra precision merely to hide it in its interface.
- Endpoints, filters, cursors, errors, images, notifications, caches, logs, traces, metrics, and analytics will follow the same sensitivity classification.
- Precision will be reduced and, where appropriate, delayed before crossing the API boundary. Access to precise location will be auditable and revocable under the approved policy.
- Consent to publish will not be inferred from recording a session, uploading a photo, or temporarily sharing with a safety contact.
- `needs-validation`: legal basis, consent, retention, export, deletion, resolution, and delay with current legal review. The proposal applies minimization and privacy by design but does not provide legal certainty.

### R-API-016 — Observability without leakage

- Every request will have an opaque identifier and may propagate `traceparent` according to W3C Trace Context. This is also useful in a monolith and does not justify distributing it.
- Structured logs, metrics, and traces will use route templates, operation, status, latency, size, and outcome; they will never use materialized paths with identifiers as a high-cardinality dimension.
- Full bodies, credentials, cookies, idempotency keys, device tokens, signed URLs, EXIF, and precise coordinates will not be logged. Redaction will occur before telemetry export.
- Access to sensitive location, permission changes, exports, and administrative actions will have a separate, integrity-protected audit trail with `needs-validation` retention.
- The semantic-conventions version and sampling policy will be fixed. SLIs, SLOs, alerts, and provider remain `needs-validation`.

### R-API-017 — Typed clients and evolution

- `future`: generate transport clients from the OpenAPI document after validating compatibility with TypeScript, Swift, and Kotlin.
- Generated clients will expose DTOs and HTTP operations, not domain entities or rules. Each application may wrap them in its own presentation models.
- Generator, configuration, and version will be pinned; the contract will have fixtures and compilation tests in the languages actually supported before publishing a version.
- No Nuxt, iOS, or Android customization will change the shared meaning of a resource. New capabilities will be discovered through the contract and permissions, not through branches based on `User-Agent`.
- `needs-validation`: generators and handling of `nullable`, open enums, dates, integers, binary data, and errors in each language.

## Cross-cutting security and privacy

Threat modeling will be performed before approving an operation, with particular attention to object- and field-level authorization, unrestricted resource consumption, SSRF, file upload, enumeration, replay, shared caches, and secret exposure. The OWASP API Security Top 10 2023 will guide the review but does not by itself constitute evidence of security.

The default policy will be deny and minimize. Contracts must support responses that do not confirm the existence of an unauthorized resource. Domain decisions about safety, confidence, and regulations will remain independent of the score and cannot be weakened for a client's convenience.

## Acceptance criteria for this proposal

- [ ] **AC-01:** human review confirms that the domain/application/API/infrastructure boundaries preserve the modular monolith and dependency direction.
- [ ] **AC-02:** a test contract can represent the same use case for web, Nuxt, iOS, Android, and automation without client-named fields or rules.
- [ ] **AC-03:** the OpenAPI linter accepts the pinned version, and all documented errors validate against a shared RFC 9457 schema.
- [ ] **AC-04:** contract tests verify major versioning, names, opaque identifiers, uniform rejection of unknown input, and compatibility of additive changes.
- [ ] **AC-05:** fixtures cover UTC, IANA zone, daylight-saving transitions, intervals, and units without depending on the client's locale.
- [ ] **AC-06:** pagination tests demonstrate stable ordering, an opaque cursor bound to filters, rejection of a tampered cursor, and absence of sensitive data.
- [ ] **AC-07:** retry and concurrency tests demonstrate the agreed semantics for idempotency, preconditions, and keys reused with a different body.
- [ ] **AC-08:** an image security test rejects a false type, excessive size, and an invalid file; removes location metadata; and keeps the unapproved object outside public access.
- [ ] **AC-09:** object- and field-level authorization tests deny precise location to an identity without permission regardless of client type.
- [ ] **AC-10:** CORS tests deny unregistered origins, and limit tests return `429`, a consistent problem, and a documented wait.
- [ ] **AC-11:** cache tests prevent private responses from being stored or mixed and validate revalidation of public content.
- [ ] **AC-12:** notification fixtures contain no sensitive data, tolerate duplicate delivery and registration rotation, and require querying current state.
- [ ] **AC-13:** test telemetry enables correlation without bodies, credentials, sensitive identifiers, coordinates, or per-resource cardinality.
- [ ] **AC-14:** selected typed clients compile against compatible fixtures and deliberately detect an incompatible change.
- [ ] **AC-15:** a final review confirms that OpenAPI, behavior, tests, ADR, and documentation do not contradict one another or claim nonexistent implementation.

No criterion is met: there is not yet an OpenAPI contract or implementation against which to run these tests.

## Proposed technical plan

Each step requires an approved specification and a small increment:

1. Review and accept or reject [ADR-0004](../decisions/ADR-0004-multi-client-api.md), first resolving questions that block the minimum contract.
2. Define reusable OpenAPI conventions for identifiers, time, units, problems, cursors, and request metadata.
3. Design a single read operation for the vertical slice and derive its tests from AC-01 through AC-06, AC-09, AC-11, and AC-13.
4. Design a single write for the vertical slice and derive tests from AC-03, AC-04, AC-07, AC-09, and AC-13.
5. Validate actual compatibility with the web client without introducing Nuxt types into the domain or application.
6. Address images, authentication, notifications, and native clients only in approved future specifications, using the corresponding criteria.
7. Automate linting, breaking-change diffs, contract tests, and documentation synchronization before publishing each contract.

## Risks, assumptions, and pending decisions

- `proposed`: HTTP JSON and OpenAPI are sufficient for the first public boundary; this must be confirmed with a real vertical slice.
- `proposed`: a major version in the path is simpler for mobile clients and caches than header negotiation.
- `needs-validation`: compatibility among OpenAPI 3.1, FastAPI, and TypeScript, Swift, and Kotlin generators.
- `needs-validation`: compatibility, retirement, and support policy for application versions that do not update immediately.
- `needs-validation`: threat and operational cost of objects, image analysis, and signed URLs.
- `needs-validation`: legal and platform requirements for identity, geolocation, notifications, and deletion.
- `needs-validation`: whether the IETF idempotency and rate-limit drafts change before implementation.
- `needs-validation`: cardinality and redaction limits that preserve diagnosis without exposing sensitive fishing activity.
- Risk: a shared schema may become an anemic domain model if DTOs are reused within the core.
- Risk: optional fields without a presence policy may create silent incompatibilities between clients.
- Risk: a cache, trace, image, or notification may bypass primary filtering and reveal location.
- Risk: treating push as guaranteed delivery may leave the client with stale or duplicated state.
- Risk: generated clients may appear compatible even though behavior has changed.

## Sources consulted

All sources were consulted on 2026-09-04. RFCs and specifications are used as technical references; mentioning them does not imply integration.

- [OpenAPI Specification, catalog, and published versions](https://spec.openapis.org/oas/) — official OpenAPI Initiative source; exact version remains subject to compatibility validation.
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) and [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) — HTTP semantics, methods, preconditions, and caching.
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) — base problem format and warning about exposing internal details.
- [RFC 3339: Date and Time on the Internet](https://www.rfc-editor.org/rfc/rfc3339.html), [RFC 9557: Timestamps with Additional Information](https://www.rfc-editor.org/rfc/rfc9557.html), and [IANA Time Zone Database](https://www.iana.org/time-zones) — instants and civil time zones.
- [UCUM Specification](https://ucum.org/ucum) and [UCUM 2.2 artifacts](https://ucum.org/docs/artifacts) — unambiguous unit codes; license and specific coverage pending review.
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700.html) and [RFC 8252: OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252.html) — future direction for web and mobile authentication.
- [WHATWG Fetch Standard](https://fetch.spec.whatwg.org/) — normative browser CORS model.
- [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html) and [IETF RateLimit draft -11](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) — stable `429` and still-evolving quota fields.
- [IETF Idempotency-Key draft -07](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) — expired draft consulted only as background, not as a standard.
- [RFC 9745: Deprecation](https://www.rfc-editor.org/rfc/rfc9745.html) and [RFC 8594: Sunset](https://www.rfc-editor.org/rfc/rfc8594.html) — communication of deprecation and retirement.
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) and [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) — risk catalog and upload controls; security references, not certification.
- [W3C Trace Context](https://www.w3.org/TR/trace-context/) and [OpenTelemetry Semantic Conventions 1.44.0](https://opentelemetry.io/docs/specs/semconv/) — telemetry propagation and vocabulary; the HTTP conventions still contain different stability levels.
- [Apple: Registering your app with APNs](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns) and [Firebase: registration management](https://firebase.google.com/docs/cloud-messaging/manage-tokens) — rotation, multiplicity, and cleanup of device registrations; no provider is selected.
- [Reglamento (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) — official source for minimization and protection by design; specific legal application requires current professional validation.

## Documentary definition of done

This proposal can become an accepted decision only when:

- a responsible person reviews the ADR and resolves or explicitly accepts the blocking `needs-validation` points;
- a vertical-slice specification derives a contract and tests from these criteria;
- sources with changing status are reviewed again on the implementation date;
- validations demonstrate that contract, clients, and behavior match;
- the affected documentation and changelog are synchronized in the change that implements the decision.

In the current state, there is no implementation to declare complete.
