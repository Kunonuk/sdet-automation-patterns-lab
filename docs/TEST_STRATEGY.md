# Test strategy

## Risk and runner ownership

| Layer          | Current target       | Responsibility                                                                              | Gate                                       |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Jest           | Configuration loader | Defaults, URL normalization, deployment prefixes, invalid settings, no secret leakage       | Deterministic; no network/browser          |
| Playwright API | Real public Toolshop | Catalogue response and current-ID detail; search relevance; anonymous `/users/me` rejection | Explicit external smoke                    |
| Playwright UI  | Real public Toolshop | Search/detail, empty-search/reset and detail/Home workflows                                 | Explicit external smoke; headless Chromium |
| Cucumber       | Deferred to Phase 5  | Cart business workflow using existing pages/actions                                         | Not installed or executed yet              |

Phase 2 UI specs use the typed fixtures in `src/core/fixtures/ui.fixture.ts`.
Integration assertions exercise real pages/components; Jest continues to validate
pure configuration behavior rather than mock Playwright's methods. The fixture graph
is lazy and test-scoped. It does not change native Page/context ownership or the
single-worker public policy.

The pyramid begins with cheap isolated framework tests. A small number of API and UI
smokes provide integration evidence. Phase 3 supplies an owned local catalogue API
for deterministic API contracts; Phase 7 turns the local gate into required GitHub
Actions checks and runs hosted scenarios separately. No CI execution is claimed now.

## Public environment policy

Use a single worker and no automatic retries, bounded timeouts, native auto-waiting
and observed `data-test` selectors. Discover current product IDs instead of storing
seeds. Never assert entire catalogue size, fixed prices or data ordering. No accounts
or orders are created; GET reads do not require cleanup. A future cart scenario must
own its cart and clean up only that cart. Avoid destructive/admin endpoints entirely.

Do not intercept network calls to make external smoke pass. An outage is a reported
failure, not a skip or a green test. Never use headed mode, Playwright UI, Inspector,
`PWDEBUG`, unconditional sleeps or retry loops to hide unstable behavior.

## Execution and diagnostics

Run `npm run verify`, then `npm run test:external`. Run the exact UI/API project for
targeted investigation. Failure-only screenshots, retained failure traces, JSON,
Playwright HTML and Allure results provide diagnostics; these can contain runtime
data and must be reviewed before sharing. Always record test counts, skipped tests,
retries, command exit status and blockers in `PROGRESS.md`.

Before claiming reporting works, generate a report and inspect result files. Before
claiming GitHub publication, verify public visibility and the remote commit. Verify
new source behavior with meaningful tests; do not test prose or mirror constants.

## Phase 2 diagnostics and isolation evidence

The expected red abstraction run and the subsequent corrected empty-state locator
failure emitted Playwright screenshots, error context and retained traces. Allure's
nested step attachments reference those artifacts. The full corrected run contains
six passed executions (three API, three UI), zero skips/retries and no stale red entries.
The successful navigation and recovery tests use fresh native per-test contexts;
parallel/repeat stress evidence remains Phase 6 work.
