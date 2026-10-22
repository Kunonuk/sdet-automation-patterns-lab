# Continuation checkpoint

Updated: 2026-10-21 (America/Edmonton).

## Current phase

Phase 0 — COMPLETED. Phase 1 — COMPLETED (implementation and verification).
The foundation is proposed on `feat/foundation` in [PR #1](https://github.com/Kunonuk/sdet-automation-patterns-lab/pull/1); it is open and not merged.
Phases 2–8 are NOT_STARTED.

## Completed work

- Public repository confirmed public. Initial planning commit `7797428` is the
  baseline on `main`; foundation implementation is restored on `feat/foundation`:
  https://github.com/Kunonuk/sdet-automation-patterns-lab.
- Toolshop v5 UI, OpenAPI, catalogue/search/categories and anonymous profile behavior
  researched; upstream license reviewed. Original automation only, no accounts created.
- Exact compatible npm dependencies and lockfile, strict TypeScript, Playwright UI/API
  projects, compiled Jest unit tests, ESLint, Prettier and native `.env` loading.
- Pure injected configuration with 22 meaningful unit cases; independent callers,
  defaults, path prefixes, malformed/credential-bearing URLs and secret-safe errors.
- Three real API scenarios and one real headless UI search/detail workflow passed.
- HTML/JSON/Allure reporting; generated Allure dashboard visually inspected headlessly.
  Per-run cleanup removes discovery leftovers; report contains four executed passes.
- Independent read-only review found no critical/important defects. Its empty query/
  fragment delimiter finding was reproduced (4 failures, 18 passes) and fixed (22 passes).
- Permanent independent checkout: `/Users/admin/AquaProjects/sdet-automation-patterns-lab`.
- Final LockThreat verification: clean `LGH-5031`; unstaged and staged diffs empty.
- User requested correcting the direct-to-main publication. Revert `cdc9d5f`
  restores the planning-only tree on `main` without rewriting history. The feature
  branch descends from this revert and restores the foundation for a meaningful PR.
- Implementation/config/test files are byte-identical to the previously verified
  milestone `1e26b89`; only branch-workflow instructions and checkpoint text change.

## Last successful verification

`npm run verify` is rerun for the PR migration. The external smoke and report results
below are from the earlier verified milestone; they are not new browser executions.
No source, test or dependency changes were made during the Git workflow correction.

| Command / inspection                                   | Observed result                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `npm ci --cache /private/tmp/sdet-npm-cache --no-fund` | Clean locked install; 521 packages added, 522 audited.                                 |
| `npm run verify`                                       | Typecheck, zero-warning lint, format and 22 Jest tests passed.                         |
| `env -u PWDEBUG -u HEADED npm run test:external`       | 4 passed: 3 API, 1 UI; 0 failed/skipped/flaky/retries; one worker; 8.3s.               |
| `npm run report:allure`                                | Static report generated; statistic exactly `total: 4, passed: 4`.                      |
| Disposable local headless report probe                 | Dashboard rendered 100%, total 4, passed 4; zero page exceptions; screenshot reviewed. |

Ignored artifacts: `test-results/results.json`, `test-results/allure-preview.png`,
`playwright-report/index.html`, `allure-results/`, `allure-report/index.html`.
The disposable probe is validation evidence, not part of the tracked test suite.

## Known failures / environment observations

- Sandboxed shell DNS cannot reach external hosts. Network-enabled execution works;
  the initial authentication error disappeared without changing credentials.
- Initial SSH push was denied to an unrelated `dmytro-cl` identity; the existing
  `Kunonuk` HTTPS credential helper pushed successfully. No global auth/Git changes.
  Commits use the authenticated account's public noreply address.
- `npm audit`: 19 moderate findings from one Jest transitive `sprintf-js` advisory;
  zero high/critical. Deprecated transitive glob notice remains. See DEPENDENCIES.
- Initial UI inspection timed out waiting for GET parameters. Instrumentation showed
  QUERY with a JSON body; the final scenario observes that operation and passes.
- Discovery left four skipped Allure entries. Per-run cleanup resolved this;
  the regenerated report has exactly four passed executions.
- First visual report probe looked for a name inside a collapsed suite and timed out;
  the corrected dashboard probe passed. Allure 3.21.0 requests optional
  `widgets/metrics.json` although it was not emitted, producing a 404 console message.
  Rendering succeeds with zero page exceptions. No dependency was patched.
- Missing optional `.env` and inherited NO_COLOR/FORCE_COLOR produce informational
  Playwright messages. No effect on results. Java is absent; Allure 3 does not need it.
- Failure-only screenshot/trace configuration exists; deliberate fault-injection
  verification remains deferred. CI, Cucumber, additional browsers and later patterns
  have not been executed or implemented.

## Remaining work and next action

Review the foundation PR and merge only with explicit user authorization. Continue
work on feature branches rather than publishing implementation directly to `main`.
Phase 2 follows the accepted foundation: extract focused catalogue/detail pages,
reusable components and typed fixtures. Do not implement all phases together.

On continuation, read this file, ROADMAP, ARCHITECTURE, DECISIONS, PATTERNS and
TEST_STRATEGY, then inspect actual code/Git/test state. Resume; do not recreate work.
