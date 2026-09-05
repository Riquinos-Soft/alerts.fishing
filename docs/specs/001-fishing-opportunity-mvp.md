# Specification 001: fishing opportunity MVP

**Status: `decided`. Implementation: not started.**

The specification is accepted as the documentary contract for the first vertical slice. Its documentary completion does not imply that the acceptance criteria have been met or that an implementation exists.

The reviewable technical breakdown is recorded in the [proposed implementation plan](001-fishing-opportunity-mvp-implementation-plan.md); it does not change this specification's `decided` status or indicate that implementation has started.

## Problem

Generic weather information forces anglers to interpret scattered variables without sufficient spot context. What is missing is a local decision that explains potential, data quality, and safety restrictions and can be evaluated after the session.

## User

An angler targeting European seabass by shore spinning in Rías Baixas who wants to decide whether, where, and when to organize a session during the next 72 hours.

## Main story

As an angler, I want to compare demonstration opportunities for my spots within the next 72 hours, understand why they are recommended and with what confidence, check whether they are safe, and then record the outcome even if I catch nothing.

## Scope

- Aguete, Praia do Santo (Seixo), and Placeres/Lourizán as demonstration spots.
- European seabass and shore spinning.
- 72-hour horizon.
- Unambiguously labeled mock data.
- Score from 0 to 100 with positive and negative factors.
- Independent confidence with an explanation of simulated freshness and completeness.
- Separate safety gate capable of invalidating a window.
- Recommendation about where, when, and how to fish without promising catches.
- Subsequent recording of a session, zero or more catches, and feedback.

## Out of scope

- Real weather or oceanographic data.
- Unverified coordinates or local conditions presented as facts.
- Authentication, payments, advanced maps, and Telegram.
- YouTube API, social network, and real-time location.
- Machine learning, LLMs, and agents.
- iOS application.
- Legal advice or safety guarantees.

## Conceptual model

- **Spot:** demonstration identity and context labeled as mock when unverified.
- **Window:** future interval within 72 hours.
- **Mock conditions:** simulated factors with declared freshness and completeness.
- **Score:** rating from 0 to 100, version, and explanation; it is not a probability.
- **Confidence:** separate assessment of data quality.
- **Safety:** independent status: permitted for demonstration, caution, or invalidated.
- **Recommendation:** composition of spot, window, species, technique, score, confidence, safety, and explanation.
- **Session:** completed or recorded activity, optionally linked to a recommendation.
- **Outcome:** zero or more catches; zero catches constitutes a valid blank session.
- **Feedback:** assessment of the usefulness of the decision and explanation.

## Expected behavior

1. The person sees mock opportunities for the three spots over 72 hours.
2. Each opportunity separates score, confidence, and safety.
3. Opening an opportunity displays positive factors, negative factors, and limitations.
4. An unsafe window appears invalidated even if it has good fishing potential.
5. No recommendation promises catches or appears to use real data.
6. After an outing, the person records whether they fished, the outcome, and perceived usefulness.
7. The system accepts and retains a session without catches as valid information.

## Acceptance criteria

- [ ] Exactly the three demonstration spots and the initial method are displayed.
- [ ] The visible horizon does not exceed 72 hours.
- [ ] All simulated data is identified as mock or demonstration data.
- [ ] Each opportunity displays a score between 0 and 100 without calling it a probability.
- [ ] Score and confidence appear as separate concepts.
- [ ] At least one favorable and one unfavorable factor are explained when they exist in the mock scenario.
- [ ] The demonstration scoring version is visible or retrievable.
- [ ] At least one scenario exists where safety invalidates a window with a favorable score.
- [ ] The recommendation avoids guarantees of catches and legal or safety certainty.
- [ ] A session linked to a recommendation can be recorded.
- [ ] A blank session can be recorded without forcing a catch.
- [ ] Feedback on the decision and explanation can be recorded.
- [ ] Exact real-time location is not published.

## Risks

- Mock data could be mistaken for real information.
- A numerical score could be interpreted as a probability or promise.
- The demonstration could appear to have unverified knowledge of a spot.
- Safety and regulatory information could be perceived as guarantees.
- Recording only successful sessions would bias evaluation.
- An overly broad design would prevent validation of the main journey.

## Open questions

- `needs-validation`: what minimum factors make the explanation useful?
- `needs-validation`: how can confidence be expressed without false precision?
- `needs-validation`: which safety states and messages are understandable?
- `needs-validation`: what minimum effort data does a session need?
- `needs-validation`: how should a decision considered useful be measured?
- `needs-validation`: what non-sensitive and non-misleading representation should be used for the spots?

## Definition of done

- All applicable acceptance criteria have been verified.
- The complete journey works with mock data and without external integrations.
- The differences between score, confidence, and safety are understandable.
- One session with catches and one blank session have been tested.
- Unverified data, coordinates, regulations, or safety information are not presented as facts.
- The documentation, specification, and behavior are synchronized.
- The available validations have been run and the changelog updated.
