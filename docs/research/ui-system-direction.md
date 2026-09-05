# Research: modern pixel-futurist UI direction

**Status: `proposed`; documentary research; implementation: not started.**

**User preferences: `proposed`; pending validation with a prototype and testing.**

**Source consultation date:** 2026-09-04.

This document compares current options for a future Nuxt interface and proposes a visual direction for `alerts.fishing`. It does not claim that an application, UI system, installed dependency, map, real data, or integration exists. The existing architecture keeps Nuxt, Vue, TypeScript, Tailwind CSS, shadcn-vue, and Lucide in `proposed` status; this research may inform a later decision but does not replace it.

## Research specification

### Problem

The experience must turn complex fishing conditions into an understandable local decision without confusing score, confidence, and safety. At the same time, it needs its own identity—coastal futurism, marine telemetry, and modern pixel styling—that remains restrained, legible on the move, and suitable for lengthy explanatory or regulatory text.

A library with too much built-in styling can lead to a generic appearance. A completely headless foundation can offer more identity, but shifts the cost of building, testing, and maintaining every visual, responsive, and accessible pattern to the product.

### Goals

- Compare no more than four current approaches compatible with Vue/Nuxt.
- Propose three specific, comparable visual intensities.
- Recommend an initial foundation that supports a small vertical slice without compromising a distinctive identity.
- Define verifiable visual guidance for score, confidence, safety, windows, and session recording.
- Preserve privacy, provenance, and unambiguous labels for any mock content.

### Requirements

- Evaluate accessibility, maturity, customization, performance, responsiveness across sizes, maintenance, development speed, risk of a generic appearance, Nuxt compatibility, and licensing.
- For each direction, cover palette, typography and licenses, radii, borders, shadows, spacing, iconography, motion, components, accessibility, and risks.
- Maintain approximately 80% modern product and 20% pixel character in the recommendation.
- Prioritize the dark theme without blocking a complete, accessible light theme.
- Use pixel or monospaced styling only where it adds hierarchy and identity.
- Avoid copying Atari brands, interfaces, typefaces, icons, *trade dress*, or any other assets; “Atari” describes only an abstract sense of a pixelated retro-futurist console.
- Do not present performance results without a reproducible product measurement.

### Out of scope

- Installing dependencies, creating components, or claiming that they are implemented.
- Designing an advanced map, publishing coordinates, or representing sensitive locations precisely.
- Changing the architecture, closing a decision, or replacing accessibility validation with a vendor claim.
- Creating a brand derived from third-party intellectual property.
- Validating providers, regulations, safety, or real data.

### Research acceptance criteria

- [x] Exactly four current options are compared, including the three required options and one useful headless alternative.
- [x] Each option covers all ten required technical and product criteria.
- [x] The three requested visual directions are presented with all their attributes.
- [x] The initial proposal incorporates the user's stated preferences as `proposed`.
- [x] The recommendation distinguishes what is proposed from what is implemented and lists pending validations.
- [x] External claims are supported by official or primary sources consulted on 2026-09-04.
- [x] Future accessibility, responsive, performance, and visual differentiation validations are derived.

## Preferences received

The following preferences are **`proposed` input**, not an accepted decision or usability evidence:

- balanced pixel intensity;
- dark-first, while maintaining a complete and accessible light mode;
- balanced technical geometry, with square corners and technical borders in moderation;
- brief, precise animations;
- “Balanced Atlantic terminal” as the preferred initial direction.

These preferences justify the initial recommendation but must be evaluated with a prototype that includes realistic content, outdoor mobile use, extended reading, and keyboard navigation.

## Comparison of current approaches

Versions are a snapshot of published packages consulted on 2026-09-04, not versions pinned for the project: UnoCSS 66.10.0, Reka UI 2.10.4, Nuxt UI 4.11.0, PrimeVue 5.0.1, and Ark UI Vue 5.39.1. They must be checked again when an implementation specification is created.

### 1. UnoCSS + Reka UI

**Overall fit: high visual control, high composition cost.**

- **Accessibility:** Reka UI states alignment with WAI-ARIA patterns, keyboard navigation, and focus management, and notes that the product remains responsible for labels and context. It is a solid foundation, not certification of the outcome.
- **Maturity:** Reka is the evolution of Radix Vue and provides more than 40 primitives; UnoCSS maintains official integrations and an extensible engine. There are two maintenance surfaces, and their versions will need to be coordinated.
- **Customization:** this approach offers the most freedom. Reka imposes no styles, while UnoCSS supports custom rules, *shortcuts*, variants, and presets; it fits technical borders, pixel modules, and semantic tokens well.
- **Performance:** UnoCSS generates utilities on demand, and Reka claims *tree-shaking* for unused primitives. This suggests the potential for contained output, but size and interaction cost can only be judged on a prototype against a measured budget.
- **Responsive:** UnoCSS facilitates rules and variants but does not itself provide a responsive architecture. The team must define reflow, density, gestures, and mobile composition for each pattern.
- **Maintenance:** requires maintaining tokens, recipes, composed components, and regression tests. Initial freedom becomes ongoing ownership of the system.
- **Development speed:** medium to low at first; it improves once an internal component layer exists. It is disproportionate if the first vertical mainly needs conventional cards, states, forms, and overlays.
- **Non-generic appearance:** excellent; the result inherits no predefined visual language.
- **Nuxt compatibility:** both provide an official Nuxt module. Reka documents SSR and a historical hydration consideration for Vue versions before 3.5, so the exact matrix must be verified with the selected versions.
- **License:** UnoCSS and Reka UI are published under MIT.

**`proposed` conclusion:** reserve as an alternative if the Nuxt UI prototype shows that the visual layer requires too many overrides or if owning a lower-level design system becomes a decision. It is not the first choice for maximizing speed in the initial vertical slice.

### 2. Nuxt UI

**Overall fit: best initial balance among speed, integration, and theming capability.**

- **Accessibility:** relies on Reka UI for ARIA, keyboard, and focus. The documentation acknowledges that use-case testing remains necessary.
- **Maturity:** the v4 branch unified the open offering and documents more than 125 components, TypeScript, internationalization, color mode, and examples. This breadth reduces the number of basic patterns that would need to be invented.
- **Customization:** provides semantic colors; background, text, border, and radius variables; typed variants; and global or per-slot adjustments. In principle, this is sufficient for a custom theme layer, but it must be tested on dense components.
- **Performance:** the integration supports SSR, and the library uses Tailwind CSS and Reka UI. It is not assumed to be the lightest option; CSS, JavaScript, hydration, and the components actually imported must be measured.
- **Responsive:** includes responsive components and layouts, but mobile hierarchy, reordering of score/confidence/safety, and thumb navigation remain product decisions.
- **Maintenance:** one high-level library reduces custom code and aligns with the already `proposed` Tailwind. The cost is following its APIs, versions, and composition decisions.
- **Development speed:** high for cards, forms, navigation, overlays, tables, and color mode. Typed APIs and auto-imports support a short vertical slice.
- **Non-generic appearance:** medium by default and high only if palette, typography, radii, shadows, density, and variants are deliberately replaced. Using defaults would produce a recognizably generic appearance.
- **Nuxt compatibility:** direct and official; it also supports Vue without Nuxt. Of the four, it has the lowest-friction integration for the `proposed` stack.
- **License:** MIT for Nuxt UI v4 according to official documentation and repository.

**`proposed` conclusion:** recommended initial option, conditional on a one- or two-flow visual *spike* demonstrating sufficient identity, accessibility, and a reasonable override cost.

### 3. PrimeVue in unstyled mode

**Overall fit: broad feature set, but current licensing risk and unnecessary complexity for the first vertical slice.**

- **Accessibility:** PrimeVue documents semantics, keyboard support, and details per component. Unstyled mode preserves base behavior and accessibility, but the product takes responsibility for visual states, contrast, and focus.
- **Maturity:** it has a long history and a broad suite. However, the MIT PrimeVue 4 repository was archived in June 2026, and current development continues in PrimeVue 5 under PrimeUI; this change reduces the historical comparability of maintenance and licensing.
- **Customization:** unstyled mode removes theme rules and variables. The Pass Through API allows classes, attributes, and events on internal parts, with global or local configuration. It offers high control, although it couples recipes to each component's anatomy.
- **Performance:** the Nuxt module advertises auto-imports with *tree-shaking*. The suite is broad and must be measured using the actual selection; there is no basis for declaring it superior to the other options.
- **Responsive:** provides rich data components but does not solve adapting a fishing experience to mobile devices. Some enterprise patterns may require a card or stacked-view alternative.
- **Maintenance:** the license change, use of a key, and major-version transition increase operational overhead. The unstyled preset also requires maintaining styles for each internal part.
- **Development speed:** high if complex data components are immediately required; medium with a completely custom visual language due to theming work.
- **Non-generic appearance:** high in unstyled mode when designed from custom tokens; medium-to-high risk of drifting toward a generic enterprise dashboard if conventions or presets are reused uncritically.
- **Nuxt compatibility:** official module for PrimeVue 5 with auto-imports and public license-key configuration. Integration exists, but the key and its terms must be reviewed before adoption.
- **License:** `needs-validation`. PrimeVue 5.0.1 is no longer MIT: it uses the PrimeUI license. Among other limits, the Community license requires fewer than five developers, fewer than ten employees, less than one million dollars in annual revenue or budget, no more than three million in external funding, exclusion of the public sector, a key, and annual renewal. PrimeVue 4 and earlier remain MIT, but their repository is archived. No variant should be adopted without reviewing eligibility, cost, obligations, and the update horizon.

**`proposed` conclusion:** not recommended initially. Reconsider only if a verified requirement for a table, calendar, or other complex widget offsets the licensing and coupling, and after legal/commercial review.

### 4. Ark UI for Vue

**Overall fit: modern headless alternative useful for complex interactions.**

- **Accessibility:** documents WAI-ARIA patterns and keyboard support per component; its logic is based on Zag.js state machines. Accessible names, focus styling, and assistive-technology testing still belong to the product.
- **Maturity:** provides more than 40 components for Vue, React, Solid, and Svelte, maintained by the Chakra UI team. The frequent changelog shows active evolution as well as recent SSR and accessibility fixes that should be monitored.
- **Customization:** completely unstyled and granular; supports CSS, utilities, or any styling system. It enables a highly distinctive identity without fighting defaults.
- **Performance:** the component-package and state-machine architecture is promising for selective imports. The vendor's comparative performance claim is not adopted without a reproducible Nuxt benchmark.
- **Responsive:** imposes no layout. It includes useful primitives, but the entire responsive experience and outdoor density must be designed and tested locally.
- **Maintenance:** complex logic remains in Zag/Ark while the team maintains wrappers, styles, and visual tests. Its multi-framework API adds a layer that must be verified in Nuxt SSR.
- **Development speed:** medium. It may accelerate complex selects, popovers, sliders, and dialogs, but is slower than Nuxt UI for building a coherent product from scratch.
- **Non-generic appearance:** excellent because it provides no default aesthetic.
- **Nuxt compatibility:** the official package supports Vue, and Nuxt examples exist, but an integration as direct as those for Nuxt UI, Reka, or PrimeVue is not documented. A *spike* must test SSR, teleports, IDs, and hydration.
- **License:** MIT.

**`proposed` conclusion:** a useful second headless alternative when state machines or patterns that the initial option does not cover well are needed. Do not mix it preemptively with Reka UI: that would duplicate primitives and criteria without a demonstrated need.

## Synthesis and technical recommendation

**Initial `proposed` recommendation: Nuxt UI v4 on its Reka UI and Tailwind CSS foundation, with a custom `alerts.fishing` token and variant layer.**

The recommendation prioritizes time to a verifiable vertical slice, direct compatibility with the already `proposed` stack, component coverage, and an accessible foundation. It does not recommend adopting the default appearance: identity should reside in semantic tokens, typography, composition, iconography, and a few custom variants.

The decision must remain reversible:

1. define tokens independent of the library and commercial name;
2. compose a *spike* with an opportunity list, window details, safety gate, and blank-session recording;
3. measure overrides, CSS/JavaScript, hydration, and accessibility;
4. continue with Nuxt UI if the visual character can be achieved without repetitive exceptions;
5. evaluate UnoCSS + Reka UI if the spike reveals structural friction, not merely minor preferences;
6. use Ark UI only for a verified complex interaction and PrimeVue only after resolving licensing and functional need.

Mixing primitive libraries in the first vertical slice is not proposed.

## Visual directions

The colors are design seeds, not approved tokens. The listed contrast ratios were calculated with the WCAG relative-luminance formula for specific text/background pairs; every state, transparency, overlay, map, and theme must be checked again in context.

### Direction 1: Minimal coast

**Status: `proposed`; low pixel intensity.**

A quiet, highly restrained interface: open space, clean horizons, and primary data without console ornamentation.

- **Palette:** dark `#071B24`, surface `#0D2832`, text `#ECF8F6`, secondary text `#ACC5C5`, turquoise `#4FD1C5`, coral `#FF8A73`; light `#F4F8F6`, surface `#FFFFFF`, text `#102A30`, secondary `#52696D`, turquoise `#006F69`, coral `#A93A2C`. Listed text/accent pairs on the base background range approximately from 5.45:1 to 16.22:1.
- **Fonts and licenses:** Geist Sans for reading and Geist Mono only for time, version, and values; family under SIL Open Font License 1.1. Do not use Geist Pixel.
- **Radii:** 8 px on cards, 6 px on controls, circles only for indicators that require them; no repeated decorative pills.
- **Borders:** 1 px, low contrast, with an accent line only on selected or critical states.
- **Shadows:** nearly absent; elevation through surface contrast, with a soft ambient shadow only on overlays.
- **Spacing:** 4 px base scale, generous 16/24/32 px rhythm, medium density for secondary data.
- **Iconography:** Lucide, 1.75–2 px stroke, always with text or an accessible name when communicating an action or state.
- **Motion:** 100–160 ms for feedback and 180–220 ms for overlays; opacity and 2–4 px movement, without sweeps or blinking.
- **Components:** flat opportunity cards, simple timeline, three clearly separated blocks for score/confidence/safety, prose explanation, and a restrained session form.
- **Accessibility:** this direction has the least noise; maintain high-contrast focus, do not rely on coral/turquoise for meaning, and preserve 44 px as the internal touch-target goal even though WCAG AA permits 24 px under specific conditions.
- **Risks:** insufficient identity, resemblance to other minimalist products, and a weaker telemetry signal. It may feel too editorial for quick coastal decisions.

### Direction 2: Balanced Atlantic terminal

**Status: `proposed`; recommended initial direction.**

Combines a modern product with marine-terminal details: approximately 80% functional clarity and 20% pixel character. It should feel technical and sophisticated, never childish or like a generic arcade game.

- **Palette:** dark-first `#061822`, surface `#0A2531`, raised `#103541`, text `#ECFAF7`, secondary `#AAC6C5`, turquoise `#39DAC7`, Atlantic blue `#3E8FD8`, coral `#FF8069`; light `#F3F8F7`, surface `#FFFFFF`, raised `#DCEBE8`, text `#102930`, secondary `#4F686D`, turquoise `#007C74`, blue `#25639A`, coral `#B43F31`. Listed pairs on the base background range approximately from 4.74:1 to 16.86:1; combinations on alternate surfaces, transparencies, and states remain unvalidated.
- **Fonts and licenses:** Geist Sans for navigation, explanations, and regulations; Geist Mono for time, score, freshness, and versions; Geist Pixel Square or Grid only for short titles, section labels, or window numbering. The entire family uses SIL OFL 1.1.
- **Radii:** 6 px on containers, 4 px on controls, and some square cuts on headers or module corners; avoid turning every block into an angular box.
- **Borders:** 1 px technical border, segmented separators only on the timeline and telemetry, and dual signaling—icon/text plus color—for states.
- **Shadows:** short, cool elevation (`0 8px 24px` at low opacity) only on overlays; very subtle turquoise glow exclusively for focus or active data, never around continuous text.
- **Spacing:** 4 px base; 8/12 px inside telemetry, 16/20 px on cards, and 24/32 px between regions. Retain enough space for touch use.
- **Iconography:** ISC-licensed Lucide as the coherent foundation; a subset of custom marine pictograms could be studied later, always original, optically compatible, and with a documented license. Safety icons cannot be decorative or depend on color.
- **Motion:** 120–180 ms for state changes, 180–240 ms for panels; maximum stagger of 30 ms in a short list, precise curve without bounce, and a no-motion alternative through `prefers-reduced-motion`.
- **Components:** 72 h horizon header, opportunity cards, segmented time ruler, sparingly used data capsules, non-probabilistic score gauge, independent confidence module, dominant safety gate, favorable/unfavorable factors, and session/blank-session recording. Any initial geographic representation must be abstract, mock, and non-sensitive; advanced maps remain `future`.
- **Accessibility:** sans-serif prose, constrained reading width, monospaced/pixel fonts never used for lengthy regulations, redundant text/icon/color hierarchy, persistent focus, DOM order matching visual order, and a light theme with functional parity.
- **Risks:** overuse of panels, uppercase, grids, or glow; confusing terminal aesthetics with greater certainty; excessive compression; or drifting toward a video-game appearance. The 80/20 boundary must be reviewed as a whole, not applied literally to every component.

### Direction 3: Intense pixel futurism

**Status: `proposed`; expressive alternative, not initially recommended.**

A pronounced coastal console: visible grid, pixel display type, and prominent telemetry states.

- **Palette:** dark `#040F18`, surface `#071D29`, text `#F1FBF8`, secondary `#AAC3C4`, cyan `#2EE6CD`, electric blue `#4B9FFF`, coral `#FF725E`; light `#F1F7F5`, surface `#FFFFFF`, text `#0A252C`, secondary `#4A6368`, turquoise `#00786F`, blue `#245E9B`, coral `#B6382C`. Listed pairs on the base background range approximately from 4.94:1 to 18.31:1.
- **Fonts and licenses:** Atkinson Hyperlegible Next for extended reading and Geist Mono for data; Geist Pixel Grid/Square for display. Atkinson and Geist are distributed under SIL OFL 1.1.
- **Radii:** 0–2 px, stepped cuts, and orthogonal outlines. Touch controls retain a large area even if they appear compact.
- **Borders:** 1 px grid, clipped corners, and ticks; no more than two simultaneous levels to avoid fragmenting content.
- **Shadows:** no naturalistic shadow; very limited state halos and surfaces separated by contrast.
- **Spacing:** 4 px base with higher internal density, offset by 24–32 px between main modules.
- **Iconography:** Lucide within custom pixel frames; clarity must never be replaced by cryptic glyphs. Do not recreate recognizable controls, logos, or symbols from retro brands.
- **Motion:** sweeps or stepped reveals only as isolated ornamental details, under 240 ms; never in alerts, reading, or primary navigation; reduced version without movement.
- **Components:** situation panel, time grid, denser telemetry, selection cursors, and pixel separators. Score, confidence, and safety remain separate and are named in natural language.
- **Accessibility:** restrict uppercase and pixel type to short fragments, permit zoom/reflow, provide a complete light theme, test outdoor visibility, and retain standard interaction patterns even when the skin is experimental.
- **Risks:** fatigue, lower comprehension, apparent density, arcade aesthetics, false technological authority, and high visual-maintenance cost. It may compete with content and degrade trust.

## Initial system proposal

### Principles

1. **Decision before decoration.** The first reading must always be when, where in a non-sensitive manner, how, safety, and confidence.
2. **Three signals, three treatments.** Score, confidence, and safety do not share a gauge or an exclusive color. Safety can invalidate a favorable window.
3. **Honest telemetry.** Technical aesthetics do not imply real precision. Mock data is persistently labeled as simulated or demonstration data.
4. **Pixel as an accent.** Apply it to display text, numbering, and dividers; not to paragraphs, forms, or regulations.
5. **Dark-first, light parity.** Both themes retain hierarchy, contrast, states, and functionality.
6. **Visible privacy.** An unverified or sensitive location never becomes precise through visual treatment.

### `proposed` tokens

- **Semantic color:** `canvas`, `surface`, `surface-raised`, `text`, `text-muted`, `border`, `action`, `info`, `positive`, `caution`, `danger`, `focus`; the “Balanced Atlantic terminal” seeds are a starting point, not encoded domain names.
- **Typography:** Geist Sans 16 px/1.5 as an indicative base; Geist Mono with tabular figures for values; Geist Pixel limited to a short line and display sizes. Load only the weights and subsets actually used and provide system fallbacks.
- **Geometry:** global radius near 6 px, controls at 4 px, and square cuts on identifying modules; states do not change geometry dramatically if that would shift layout.
- **Border and elevation:** 1 px technical border; no more than three surfaces; shadows only for temporary hierarchy. Focus is not replaced by ambient shadow.
- **Spacing:** 4/8/12/16/20/24/32/48 scale; touch-target goal of 44 × 44 CSS px for frequent or critical actions.
- **Iconography:** ISC-licensed Lucide, consistent optical sizes of 18/20/24 px, visible text on critical actions, and `aria-hidden` for decoration.
- **Motion:** 120/180/240 ms durations; transform/opacity properties when appropriate; no decorative loops; reduce or remove motion when requested by the system.

### Priority components

- **Opportunity card:** demonstration spot, window, method, non-probabilistic score, confidence, and safety status; persistent mock label.
- **72 h time selector:** concise horizontal reading with a reflow alternative; does not depend on dragging or color.
- **Window details:** favorable and unfavorable factors, visible or retrievable provenance/version, and limitations.
- **Safety gate:** independent block capable of invalidating a window; direct text, icon, and semantic state. Never a guarantee.
- **Confidence:** level and explanation of simulated freshness/completeness, visually distinct from the score.
- **Session recording:** supports a catch or blank session, effort, and feedback without visually rewarding only success.
- **Navigation:** minimal for the vertical slice; clear mobile hierarchy before introducing a persistent dashboard.

### Responsive behavior

- **Mobile:** one column, opportunity as the primary unit, priority given to safety and the next window, frequent actions within thumb reach, and no essential content available only on hover.
- **Tablet:** list and detail may coexist if the actual width permits; do not assume landscape orientation.
- **Desktop:** list-detail or panel composition, with constrained reading width for explanations. More space does not justify more data.
- **Reflow:** test at an equivalent 320 CSS px and 200% zoom without loss of content or function; dense tables must transform or scroll while retaining their name/context.
- **Outdoors:** validate brightness, glare, gloves, or wet hands as research context; do not claim that a palette works on the coast without testing.

### Proposed minimum accessibility

- Target WCAG 2.2 AA, subject to audit; normal text at least 4.5:1, large text and non-text boundaries/states at least 3:1 where applicable.
- Complete keyboard navigation with visible focus not obscured by fixed bars or panels.
- Touch areas of 44 × 44 CSS px as an internal goal for frequent actions; never go below the AA criterion of 24 × 24 without meeting its spacing exceptions.
- States expressed with text, icon/shape, and color; do not make the score the sole explanation.
- Stable semantic order, descriptive headings, form labels, and restrained announcements for important changes.
- Respect `prefers-reduced-motion`, zoom, reflow, text size, and high-contrast themes when feasible.
- Manual testing with keyboard and screen readers in addition to automation. The Reka/Nuxt UI foundation does not replace these tests.

## Risks, assumptions, and pending points

- `needs-validation`: Nuxt UI allows sufficient distinctiveness without a fragile accumulation of overrides.
- `needs-validation`: the 80/20 ratio appears sophisticated to real users and not arcade-like, childish, or derivative.
- `needs-validation`: Geist Pixel remains legible at the planned sizes, languages, and devices; otherwise, it must be removed without affecting hierarchy.
- `needs-validation`: light and dark tokens meet contrast requirements in every state, not only in the calculated base pairs.
- `needs-validation`: density works on mobile devices outdoors and for extended reading of explanations.
- `needs-validation`: the score pattern is not interpreted as a probability, and the safety gate dominates even with a high score.
- `needs-validation`: SSR, hydration, teleports, font loading, and dependency tree with pinned versions.
- `needs-validation`: measured CSS, JavaScript, font, rendering, and interaction budget; no product benchmark exists yet.
- `needs-validation`: current cost and terms of every dependency before installation, especially PrimeVue 5/PrimeUI.
- **Assumption:** the first vertical slice uses clearly labeled mock content and does not require advanced maps.
- **Maintenance risk:** mixing primitives or building a complete headless layer before validating the flow.
- **Legal/IP risk:** interpreting “Atari” as permission to imitate recognizable assets. The proposal prohibits such imitation.

## Future technical plan, subject to an approved specification

1. Define semantic color, typography, spacing, geometry, elevation, and motion tokens without coupling them to a library.
2. Pin versions and record licenses for Nuxt UI, Tailwind, Reka, Lucide, and fonts.
3. Create a disposable *spike* of the four critical pieces: card, detail, safety gate, and session/blank-session form.
4. Test dark and light themes, 320 px, 200% zoom, keyboard, focus, screen reader, and reduced motion.
5. Measure the built artifact: CSS, JavaScript, fonts, hydration, and interaction times on representative devices.
6. Evaluate users' understanding of score/confidence/safety and the visual intensity.
7. Document the resulting decision in a specification/ADR if it significantly affects the architecture.
8. Implement in vertical slices only after approving the corresponding specification.

## Tests derived from the criteria

- **Differentiation:** blind comparison between Nuxt UI defaults and the spike; verify that palette, typography, geometry, and composition are distinctive without copied retro references.
- **Comprehension:** ask participants to explain score, confidence, and safety, including a favorable window that has been invalidated.
- **Responsive:** follow the flows at 320, 768, 1024, and 1440 CSS px, in both orientations when applicable and at 200% zoom.
- **Automated accessibility:** run WCAG rules against both themes and every state, recognizing that they do not cover full conformance.
- **Manual accessibility:** keyboard, focus, names/roles/states, VoiceOver, and at least one other representative screen reader.
- **Contrast:** verify every effective combination, including disabled, hover, focus, overlays, graphics, and semitransparency.
- **Motion:** confirm functional parity with `prefers-reduced-motion: reduce` and the absence of essential animation.
- **Performance:** measure production output with actual imports and subsetted fonts; compare against an agreed budget, not vendor marketing.
- **Licenses:** inventory package, version, license, attribution, and obligations before integration.
- **Content:** verify that all simulated data has a persistent label and that no sensitive or unverified coordinates appear.

## Primary and official sources

All were consulted on **2026-09-04**. Component counts, versions, and features reflect that date and may change.

### Libraries

- [UnoCSS — Why UnoCSS](https://unocss.dev/guide/why): on-demand architecture, extensibility, and stated differences from other engines; official source, without adopting its performance claims as benchmarks.
- [UnoCSS — Nuxt module](https://unocss.dev/integrations/nuxt): official installation, configuration, and support matrix.
- [UnoCSS — repository and license](https://github.com/unocss/unocss): code and MIT license; consulted published version was 66.10.0.
- [Reka UI — introduction](https://reka-ui.com/docs/overview/introduction): stated headless scope, customization, typing, and tree-shaking.
- [Reka UI — accessibility](https://reka-ui.com/docs/overview/accessibility): WAI-ARIA, keyboard, focus, and labeling responsibility.
- [Reka UI — Nuxt installation](https://www.reka-ui.com/docs/overview/installation): official module and auto-imports; consulted published version 2.10.4.
- [Reka UI — SSR](https://www.reka-ui.com/docs/guides/server-side-rendering): SSR support and hydration context in older Vue versions.
- [Reka UI — repository](https://github.com/unovue/reka-ui): continuity from Radix Vue and MIT license.
- [Nuxt UI — introduction](https://ui.nuxt.com/docs/getting-started): base technologies, components, accessibility, customization, color mode, and MIT license.
- [Nuxt UI — components](https://ui.nuxt.com/docs/components): catalog and stated responsive patterns; consulted published version 4.11.0.
- [PrimeVue — unstyled mode](https://primevue.dev/theming/unstyled/): separation of styling and behavior in the current version.
- [PrimeVue — Nuxt](https://primevue.dev/nuxt): official module, auto-imports, tree-shaking, and PrimeUI key requirement.
- [PrimeVue — accessibility](https://primevue.dev/guides/accessibility/): general guide and references to component-level details.
- [PrimeVue — npm package](https://www.npmjs.com/package/primevue): current version 5.0.1 and declared PrimeUI license, not MIT.
- [PrimeUI — Community license](https://primeui.dev/eula/community): current criteria, key, renewal, and limits; requires professional review if adoption is considered.
- [PrimeVue 4 — archived repository](https://github.com/primefaces/primevue): historical continuity and confirmation that previous MIT versions remain MIT.
- [Ark UI — about](https://ark-ui.com/docs/overview/about): scope, frameworks, Zag.js architecture, and MIT license.
- [Ark UI — Select](https://ark-ui.com/docs/components/select): official example of a WAI-ARIA and keyboard pattern.
- [Ark UI — changelog](https://ark-ui.com/docs/overview/changelog): recent activity and SSR/accessibility fixes; consulted Vue version 5.39.1.
- [Ark UI — repository](https://github.com/chakra-ui/ark): maintenance, packages, and MIT license.

### Accessibility and visual assets

- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/): normative contrast, reflow, keyboard, focus, motion, and target-size requirements.
- [W3C — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): official interpretation of the 24 × 24 CSS px AA minimum and its exceptions.
- [W3C — Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): reference for the internal 44 × 44 CSS px goal.
- [Vercel — Geist repository](https://github.com/vercel/geist-font): Geist Sans, Mono, and Pixel; SIL OFL 1.1 license; published version visible at consultation was 1.7.1.
- [Vercel — introducing Geist Pixel](https://vercel.com/blog/introducing-geist-pixel): display purpose and variants; aesthetic reference, not a separate license.
- [Braille Institute — Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont): family designed for legibility, Next and Mono variants; font license included by the publisher.
- [Google Fonts — Atkinson Hyperlegible Next](https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblenext): distributed files and SIL OFL 1.1 text for the proposed variant.
- [Lucide — repository](https://github.com/lucide-icons/lucide): icons and ISC license.

## Research outcome

The initial direction remains **`proposed`**, not `decided`: **Balanced Atlantic terminal on Nuxt UI v4**, with custom tokens, Geist Sans/Mono and Geist Pixel as a very limited accent, Lucide as the iconographic foundation, dark-first with a complete light theme, and brief technical motion. The next step is not to install the library, but to approve a spike specification and validate comprehension, differentiation, accessibility, responsive behavior, performance, and licensing with pinned versions.
