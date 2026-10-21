# Architecture

## Intent and first milestone

Build a public TypeScript reference for experienced automation engineers. The first
milestone is a small executable foundation against the real Toolshop application:
catalogue search/detail in Chromium, API reads and authentication rejection, and
unit-tested environment validation. Phases 2–8 deliberately remain future work.

## Boundaries

```text
Playwright UI tests ── browser context ── hosted Toolshop UI
Playwright API tests ─ request context ── hosted Toolshop API
       │
       └── validated configuration (src/core/config)
Jest unit tests ─────── configuration with explicitly injected environment values
Playwright reporters ─ HTML, JSON, Allure results, failure screenshots/traces
```

`playwright.config.ts` owns browser lifecycle, test matching, diagnostics and projects.
`jest.config.cjs` discovers only compiled unit tests; TypeScript compiles these first.
Jest never controls browser or API workflows. There is no generic base page, service
container or custom runner. Tests initially use Playwright directly so later extracts
are motivated by actual repetition.

The configuration loader is pure: callers pass environment values; it validates HTTP(S)
base URLs and rejects credentials, query strings and fragments. Both root and path-based
deployment URLs end in `/` so future relative requests retain deployment prefixes.
Errors name the setting without echoing its value. Native Node `--env-file-if-exists`
loads an optional ignored `.env`; no dotenv dependency or credentials are needed.

## Runtime and dependencies

Use Node.js 24 LTS and npm, strict TypeScript 6.0.3, Playwright Test, Jest 30,
ESLint 10 with the compatible typescript-eslint 8 parser, Prettier 3 and Allure 3.
Pin exact direct dependencies and commit `package-lock.json`. Jest executes emitted
CommonJS JavaScript from `.build/unit`; this avoids a TypeScript transformer with a
separate compiler compatibility matrix. The compiler uses NodeNext resolution.

Cucumber.js is researched now and installed only in Phase 5 when its first real
business specification exists. Its World will own browser resources and inject
runner-neutral page objects. Allure's Node CLI avoids requiring Java locally.

## Data, isolation and extension points

Hosted scenarios are bounded, read-only and serial (one worker, zero retries). They
discover IDs from current responses instead of pinning ephemeral seed data. Browser
contexts and API contexts are owned by Playwright; no global cookies or shared users.
No account creation, orders, admin changes or source redistribution are required.

Phase 2 introduces pages/components and fixtures around the current scenarios. Page
Factory means explicit lazy construction with Playwright locators, not Selenium's
reflection/decorator mechanism. Phase 3 adds a typed API service and a tiny original,
owned catalogue service/fixtures for deterministic local API quality gates. It is not
a Toolshop clone. Factory and builder models will be shared across test layers.

`npm run verify` is the deterministic local gate (types, lint, format, unit tests).
Hosted smoke is an explicit separate command whose failure propagates normally.
Public application availability is never required for the local gate. No GitHub
Actions run or broader architecture is claimed until its roadmap phase is executed.
