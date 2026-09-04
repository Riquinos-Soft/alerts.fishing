# Scoring principles

**Status: `decided` for principles; formula and thresholds: `needs-validation`.**

## Meaning

- The score will use a scale from 0 to 100.
- It does not represent a catch probability.
- It summarizes relative potential under a specific algorithm version.
- It must be explainable through positive and negative factors.

## Separation of concepts

Confidence is calculated separately from the score. At a minimum, it must reflect data freshness, completeness, provenance, and spatial or temporal suitability. A high score with low confidence is not equivalent to a strong recommendation.

Safety is an independent gate. It can invalidate a window even when the fishing score is high; it must not be hidden as a simple penalty within the number.

## Traceability

Each evaluation should retain:

- algorithm version;
- factors considered and their positive or negative direction;
- input data, source, and validity time;
- confidence level and reasons;
- safety-gate outcome;
- explanation displayed.

## Factors

The factors and their weights require research. Moon or solunar data, if included, will be a minor factor and will never replace local conditions or observed evidence.

## Evaluation

Versions will later be evaluated using real sessions, catches, blank sessions, and usefulness feedback. No accuracy will be published until sufficient information and a reproducible method are available.

No formula is currently defined or implemented.
