# Test strategy

## Risk and runner ownership

| Layer          | Current target       | Responsibility                                                                              | Gate                                       |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Jest           | Configuration loader | Defaults, URL normalization, deployment prefixes, invalid settings, no secret leakage       | Deterministic; no network/browser          |
| Playwright API | Real public Toolshop | Catalogue response and current-ID detail; search relevance; anonymous `/users/me` rejection | Explicit external smoke                    |
| Playwright UI  | Real public Toolshop | Shopper searches for pliers and opens a matching product                                    | Explicit external smoke; headless Chromium |
| Cucumber       | Deferred to Phase 5  | Cart business workflow using existing pages/actions                                         | Not installed or executed yet              |

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
