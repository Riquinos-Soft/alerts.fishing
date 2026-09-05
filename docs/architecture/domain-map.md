# Domain map

**Status: `proposed`; requires validation during the vertical slice.**

## Main concepts

- **Spot:** fishing area and its local context; it may have private or approximate geometry.
- **Species:** fishing target; initially European seabass.
- **Technique:** fishing method used; initially shore spinning.
- **Condition:** environmental value with a source, validity period, and known quality.
- **Window:** interval within the 72-hour horizon being evaluated.
- **Score:** non-probabilistic potential rating from 0 to 100.
- **Confidence:** independent assessment of data freshness, completeness, and suitability.
- **Safety status:** independent gate that can invalidate a window.
- **Recommendation:** explained decision combining spot, window, species, technique, score, confidence, and safety.
- **Session:** outing recorded by a person, including when it ends without catches.
- **Feedback:** assessment of the usefulness of the decision and explanation.
- **Scoring version:** reproducible identifier for rules and parameters.

## Planned relationships

A recommendation evaluates a window for a spot, species, and technique. It consumes conditions with provenance, produces a score, confidence, and explanation, and passes through a safety gate. A session can later be linked to that recommendation and generate feedback, catches, or a blank session.

## Module boundaries

- `spots` maintains identity, context, and visibility policy.
- `conditions` normalizes external data without making decisions on its own.
- `scoring` evaluates potential and exposes its factors and version.
- `recommendations` composes the decision and applies the safety gate.
- `sessions` records what happened, not only catches.
- `feedback` evaluates usefulness and informs subsequent analysis.

## Pending

- `needs-validation`: exact vocabulary for catches, effort, lures, and sea state.
- `needs-validation`: cardinalities and linking rules when a session covers several spots or techniques.
- `needs-validation`: safe, verifiable geographic boundaries for the initial spots.
