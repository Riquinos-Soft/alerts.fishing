# Research: mobile delivery strategy

**Status:** `proposed` (recommendation pending validation; no clients or integrations are implemented).
**Consultation date:** 2026-09-03.
**Context:** `alerts.fishing` will be the public site; `app.alerts.fishing` will be the Nuxt application. iOS and Android come later and share a client-independent API.

## Problem and goal

We need to choose a delivery path that enables early validation of maps, camera, notifications, community, location, and possible offline use, with the lowest reasonable maintenance cost and risk. The goal is not to promise native parity: it is to preserve the option to evolve when usage evidence justifies an installed application.

## Decision requirements

- Reuse the planned investment in Nuxt/Vue/TypeScript and the common API contract.
- Support adding maps, photo capture, push, location (including background if proven necessary), and offline storage.
- Compare native experience, operational and publishing costs, time to a test, maintenance, testing, and CI/CD.
- Do not expose sensitive coordinates by default or assume that a platform API behaves identically on iOS and Android.

## Out of scope

This research does not select a map provider, push service, synchronization library, monetization model, minimum OS version, or UI design. It also does not implement clients, plugins, endpoints, pipelines, or an application.

## Alternatives compared

### PWA on Nuxt (first phase)

Nuxt can generate static output with `nuxt generate`, or deploy SSR/Node; the chosen mode must make explicit which routes require a server ([Nuxt deployment](https://nuxt.com/docs/3.x/getting-started/deployment), consulted 2026-09-03). A PWA shares nearly all existing code (Vue UI, web logic, and API), avoids two binaries, and does not require a store account to distribute a URL.

The browser provides camera access through web APIs subject to permissions and a secure context, foreground location, and local storage; maps and offline synchronization depend on libraries and cache design. Web Push requires the Push API, Notifications API, a Service Worker, and a server that manages VAPID; Safari permits push in web apps added to the Home Screen from iOS/iPadOS 16.4, not in a normal Safari tab ([Apple web push](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers), consulted 2026-09-03; [WebKit 16.4](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), consulted 2026-09-03). Background delivery and continuous location access are constrained by the browser and system; they must not be treated as equivalent to a native service.

**Proposed assessment:** this is the fastest and cheapest route for validating the vertical slice, deep links, permissions, field use, and demand for installation. The experience can be excellent for consultation, recording, and occasional capture, but uneven support for background location, push on iOS, and deep offline use is a `needs-validation` risk.

### Capacitor around the Nuxt/PWA application

Capacitor can be added to an existing JavaScript project and keeps a web UI within a native runtime; it exposes plugins for Camera, Geolocation, Notifications, and Filesystem, as well as an API for custom plugins ([Capacitor documentation](https://capacitorjs.com/docs), consulted 2026-09-03; [Capacitor](https://capacitorjs.com/), consulted 2026-09-03). Nuxt will need to produce a web bundle compatible with `webDir`; if SSR is needed, the container does not replace the server and must consume the remote API (a technical inference to validate with a minimal test).

It reuses most of the web UI and domain, but adds Xcode/Gradle projects, permissions, signing, plugins, and testing on two platforms. Camera, files, local/push notifications, and basic location have a clear path; background location, geofencing, native-performance maps, and robust offline synchronization may require specific configuration or external plugins. Publishing is subject to the App Store and Play Store. Apple requires an app to provide utility and UI beyond a repackaged website ([App Review 4.2](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality), consulted 2026-09-03); therefore, a wrapper without native value risks rejection (inference, not a guarantee). Google Play also applies functionality and data requirements as applicable.

**Proposed assessment:** this is the least disruptive bridge if the PWA has already been validated and one or two specific native capabilities emerge. It does not eliminate native lifecycle costs or guarantee that community plugins comply with policies or support every version.

### Expo + React Native

The Expo SDK provides packages for camera, location, and other device functions ([Expo SDK](https://docs.expo.dev/versions/latest/), consulted 2026-09-03); `expo-maps` covers native maps on iOS and Android ([Expo Maps](https://docs.expo.dev/versions/latest/sdk/maps/), consulted 2026-09-03). Expo Location documents foreground/background permissions and different limitations: on Android, a terminated app does not automatically restart for geofencing; iOS has region limits and requires `Always` permission for background use ([Expo Location](https://docs.expo.dev/versions/latest/sdk/location/), consulted 2026-09-03). Push relies on APNs/FCM and requires a development build; background delivery is not guaranteed ([Expo notifications](https://docs.expo.dev/push-notifications/what-you-need-to-know/), consulted 2026-09-03).

The UI cannot be reused directly from Vue/Nuxt: the API, types, rules, and perhaps domain packages are shared, but screens must be rewritten in React Native and the team must learn it. The result is more native than a WebView and has an official build/submit/update path: EAS documents Build, Submit, and OTA updates, with the caveat that native or permission changes require a new binary ([EAS tutorial](https://docs.expo.dev/tutorial/eas/introduction/), consulted 2026-09-03; [EAS Update](https://docs.expo.dev/eas-update/introduction/), consulted 2026-09-03). EAS is optional: self-hosted builds and CI are also possible; its pricing and limits must be verified before budgeting.

**Proposed assessment:** the best candidate when evidence requires camera/maps/push/background with a consistent native UX on both platforms. It has more upfront time, permission surface, and maintenance cost than PWA/Capacitor, although it reduces WebView dependence.

### Flutter (control alternative)

Flutter compiles native applications for mobile, web, and desktop from one codebase ([Flutter FAQ](https://docs.flutter.dev/resources/faq), consulted 2026-09-03). Its UI and Dart language do not reuse Vue screens; it can share the API contract and, with additional work, platform-agnostic logic. Packages exist for platform services, but support, license, quality, and coverage for background/maps must be audited per package ([Flutter add-to-app](https://docs.flutter.dev/add-to-app), consulted 2026-09-03).

**Proposed assessment:** it adds value as a comparison if a highly polished mobile UX is prioritized and the team accepts a second stack. In the current context it does not outperform PWA/Capacitor reuse or Expo's official path, so it remains `future` unless a performance/UX test changes the decision.

## Comparison by criterion

- **Code and team:** PWA reuses Nuxt/Vue/TypeScript almost entirely; Capacitor reuses the UI and adds native code; Expo reuses API/types/domain but rewrites the UI in React Native; Flutter rewrites the UI and switches to Dart. This assessment is an inference based on the documented architectures.
- **Native experience:** PWA depends on the browser; Capacitor is web-first with native integration points; Expo and Flutter render native/compiled UI. Actual perception requires testing on low-end devices.
- **Cost and time:** PWA has the lowest incremental cost and shortest path; Capacitor adds store configuration; Expo/Flutter require a new UI and toolchain. These are relative comparisons, not budgets. External costs (accounts, maps, push, CI, and observability) must be verified by provider. Apple publishes USD 99/year for App Store distribution ([membership](https://developer.apple.com/support/compare-memberships/), consulted 2026-09-03), and Google publishes a USD 25 one-time Play Console registration fee ([Play Console](https://support.google.com/googleplay/android-developer/answer/6112435), consulted 2026-09-03); taxes, region, and future changes remain `needs-validation`.
- **Stores and rejection:** PWA avoids store review (although it can later be distributed through wrappers); Capacitor, Expo, and Flutter must comply with both stores. Apple 4.2 means a limited-utility web-content wrapper risks rejection; no technology guarantees approval.
- **Maps:** PWA uses web maps and can cache tiles subject to licensing; Capacitor can retain the web map or use a native SDK/plugin; Expo provides `expo-maps`; Flutter depends on the selected package/SDK. Tile licensing, attribution, coverage, cost, and offline use are `needs-validation`.
- **Camera and files:** web APIs cover basic capture in a PWA; Capacitor and Expo provide documented plugins; Flutter requires selecting and maintaining packages. Uploading, compression, EXIF, and photo permissions require privacy testing.
- **Push:** PWA uses Web Push and has the Home Screen condition on iOS; Capacitor/Expo/Flutter use APNs/FCM through native code. Delivery, permissions, deep links, frequency, and behavior with a terminated app must never be taken for granted.
- **Background location:** this criterion most clearly separates the options. PWA must not promise it; Capacitor/Flutter depend on plugins and policies; Expo documents specific permissions and limitations. It should be enabled only after a validated safety/usefulness case and legal/privacy review.
- **Offline:** PWA can use a Service Worker + IndexedDB, but quota, eviction, and synchronization are browser-specific; Capacitor adds a native filesystem; Expo/Flutter provide native storage. Every option requires defining conflicts, encryption, expiration, and which data may be stored locally.
- **Maintenance and testing:** PWA concentrates on a browser matrix; Capacitor adds WebView + iOS + Android; Expo adds React Native + two OSs; Flutter adds Dart/Flutter + two OSs. All four require physical devices for camera, permissions, push, battery, and intermittent connectivity.
- **CI/CD:** PWA fits the web pipeline; Capacitor/Expo/Flutter require signing, artifacts, internal channels, and store review. Expo offers EAS as a documented option; Capacitor and Flutter leave more decisions to Xcode/Gradle or the selected CI.

## Phased recommendation (all `proposed`)

1. **Web validation:** first deliver `app.alerts.fishing` as an installable PWA. Measure completion of the opportunity journey, session recording, retention, permission errors, actual offline use, and push/camera requests. Do not promise background location or data accuracy.
2. **PWA hardening:** test Safari on iOS, Chrome on Android, and desktop on real devices; document push, camera, location, and cache limitations; establish an offline data policy and map budget. Keep the PWA as the main client only if the criteria pass.
3. **Capacitor spike (if warranted):** package a static Nuxt route and test camera, filesystem, deep links, push, and a map on iOS/Android. Continue only if it provides a measurable capability without duplicating most of the UI.
4. **Expo/React Native (if warranted):** activate when two or more critical capabilities are unreliable on web/Capacitor, or retention justifies a dedicated mobile UX. Share API, contracts, and domain; do not force Vue components to be shared.
5. **Flutter `future`:** reconsider only if a comparative test demonstrates a material performance/UX or native-capability advantage over Expo and it offsets the cost of changing stacks.

### Decision triggers

- `needs-validation`: device testing confirms that a critical capability fails or is too fragile in PWA.
- `needs-validation`: users request reliable notifications with the app closed, geofencing, or frequent capture without connectivity.
- `needs-validation`: metrics show that native installation improves retention or safety over the PWA.
- `needs-validation`: licenses, quotas, costs, or map/push policies change the total cost.
- `needs-validation`: store review identifies unmet privacy, content, or utility requirements.

## Acceptance criteria for this research

- [ ] PWA, Capacitor, and Expo/React Native are compared; Flutter is justified as a fourth alternative.
- [ ] Each criterion (reuse, UX, cost/time, stores, maps, camera, push, background location, offline, maintenance, testing, CI/CD, and team) has a conclusion and its limitations.
- [ ] Platform claims link to official/primary sources and include a consultation date.
- [ ] Inferences, proposals, and `needs-validation` points are labeled; no code, endpoint, client, or integration is claimed to exist.
- [ ] The recommendation is phased and contains verifiable triggers.

## Risks, assumptions, and pending validations

- OS, browser, SDK, and policy limitations change; review sources before starting each phase.
- It is assumed that the API will be client-agnostic and that the team knows Vue/TypeScript; both are `needs-validation` planning premises.
- No map, push, storage, or CI provider coverage, license, or price is assumed.
- Exact location and fishing data may be sensitive: validate minimization, consent, retention, and security before synchronizing offline or sharing.
- Test on real hardware, intermittent networks, and with the app terminated; record OS, browser/SDK, device version, and outcome.

## Technical plan and derived tests (proposed)

1. Freeze the API contract and shared types without coupling them to a client.
2. Build the minimal PWA and a manual/automated test matrix for installation, navigation, camera, location, push, and offline use.
3. Measure the web phase exit metrics for an agreed period.
4. Only when a trigger activates, run a Capacitor or Expo spike with the same API and permission tests.
5. Before publishing an app, review privacy, sensitive data, developer accounts, signing, metadata, review, and rollback.

Tests must verify observable behavior (including denied permissions, revocation, terminated app, battery, and loss of connectivity), not just that an API returns success. No laboratory result turns a platform limitation into a production guarantee.

## Sources and limitations

The URLs above are official documentation from Expo, Capacitor, Nuxt, WebKit/Apple, Google Play, and Flutter, consulted on 2026-09-03. No data or SDK has been integrated; prices and policies are snapshots and must be checked again. The comparison of cost, speed, and team capability is an inference from the architecture and the documentary context of `alerts.fishing`, not a quote or guarantee.
