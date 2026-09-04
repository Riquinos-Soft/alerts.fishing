# Working rules for agents

These rules apply to future changes in `alerts.fishing`.

## Repository scope

- This repository belongs exclusively to `alerts.fishing`.
- Do not introduce references or dependencies to `alerts.surf`.
- Do not couple future fishing-domain logic to the product's commercial name.
- Preserve the existing documentation structure and content.
- Keep `.obsidian/` intact and ignored.
- Do not perform work outside the requested objective.

## Before changing the repository

- Read [docs/Home.md](docs/Home.md) before making broad changes.
- Review Git status and preserve all existing user changes.
- Confirm in the documentation what is decided, proposed, pending validation, or reserved for the future.

## Mandatory Spec-Driven Development

Any feature or behavior change must follow this sequence before it is considered complete:

1. Create or update a specification.
2. Define the problem, goals, requirements, and what is out of scope.
3. Establish verifiable acceptance criteria.
4. Identify risks, assumptions, and points pending validation.
5. Prepare the technical plan and divide it into small tasks.
6. Derive tests from the acceptance criteria.
7. Implement only what the specification defines.
8. Run the relevant validations.
9. Synchronize the documentation, decisions, and changelog.
10. Confirm that the implementation and specification do not contradict each other.

Do not implement any significant feature without an approved specification or one explicitly marked with the appropriate status. Preserve the existing documentation states:

- `decided`: current accepted decision, although it may not yet be implemented.
- `proposed`: proposed direction pending confirmation.
- `future`: work outside the immediate scope and reserved for a later phase.
- `needs-validation`: hypothesis, data, or decision that requires evidence or a current source.
- `not-integrated`: identified source without technical integration.

Do not describe anything as implemented while it is still a proposal.

## Working approach

- Work in small, verifiable vertical slices linked to a fishing-domain need.
- Do not add dependencies without explicit justification.
- Do not create microservices prematurely; the decided direction is a modular monolith.
- Do not present mock, simulated, or demonstration data as real data.
- Do not provide legal or safety certainty without current, verified official sources.
- Do not publish sensitive coordinates or make an exact location public by default.
- Keep specifications and implemented behavior synchronized.
- Run the available validations before declaring a task complete.

## Documentation and decisions

- Update affected documentation after significant changes.
- Update [docs/changelog.md](docs/changelog.md) with significant changes.
- Create an ADR when an architectural decision is significant.
- Record sources, consultation date, license, attribution, and limitations when incorporating external data.

## Mandatory atomic commits

- Each commit must represent one logical, reversible unit.
- All completed modifying work must be validated and committed before starting a new requested unit.
- Separate documentation, infrastructure, test, and application changes when they represent different intentions.
- Always review `git diff` and `git diff --staged` before committing.
- Add files using explicit paths. Do not use `git add .`, `git add -A`, or indiscriminate equivalents.
- Do not mix unrelated changes or changes belonging to someone else.
- Do not create empty commits for analysis-only tasks.
- Do not modify published commits or use `--amend`, destructive rebase, force push, or destructive commands without explicit authorization.
- Do not include secrets, credentials, local Obsidian files, or unnecessary generated artifacts.
- Run the relevant validations before committing.
- Use Conventional Commit messages that describe the real intent of the change.
- After committing, run `git status --short`.
- If any pending changes remain, explain them explicitly before continuing.

## External operations

- Do not commit, push, or deploy unless explicitly requested.
- Do not replace official or external references with unverified claims of your own.
