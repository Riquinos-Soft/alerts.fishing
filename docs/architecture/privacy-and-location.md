# Privacy and location

**Status: `decided` for privacy by default; specific controls: `proposed`.**

Exact location will never be public by default. Visibility must be explicit, revocable, and appropriate to the sensitivity of the spot.

## Planned levels

- **User only:** exact location.
- **Safety contact:** exact, temporary location with consent and expiration.
- **Trusted circle:** visibility selected by the user.
- **Public community:** delayed, approximate location.
- **Sensitive spots:** hidden location.

## Rules

- Public, exact, real-time location will not be the default behavior.
- A recommendation must not reveal coordinates unless they are public, necessary, and verified.
- Precise geometry and public representation must be modeled separately.
- Sharing for safety does not imply consent to publish or retain indefinitely.
- It must be possible to withdraw future access without misleadingly rewriting public history.

## Pending

- `needs-validation`: appropriate precision, delay, and aggregation for the community.
- `needs-validation`: retention, consent, and deletion of location data.
- `needs-validation`: criteria for classifying sensitive spots.
- `needs-validation`: applicable legal requirements before handling personal location.

[Strava Beacon](https://support.strava.com/en-us/articles/15401829-strava-beacon) is recorded as an external product reference with `not-integrated` status; its behavior and terms must be reviewed before deriving requirements.
