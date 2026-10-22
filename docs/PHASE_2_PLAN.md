# Phase 2 — UI automation architecture

## Scope and design

Implement only Phase 2 from the user brief. The merged foundation is the baseline
(`075026d`, PR #1). Preserve API coverage, configuration, dependencies, runners,
headless execution, a single hosted worker and zero retries. Do not implement Phase 3,
Cucumber, a local service or new dependencies.

Chosen approach: two focused page objects composed with search, product-card and
navigation components. Typed test-scoped Playwright fixtures construct the objects
lazily and inject the same built-in Page and shared NavigationComponent. Fixtures
are the composition root and practical Page Factory concept. A separate factory
registry/cache, service container and base-page hierarchy would duplicate lifecycle
management already provided by Playwright, so they are rejected.

Page/component modules use Playwright types only, without runner hooks, fixtures or
expect imports. They expose locators and perform operations. Business assertions,
response assertions and result polling remain in tests. Future Cucumber support can
construct these same objects with its own browser lifecycle and shared navigation.

## Interfaces and files

- `src/ui/components/search.component.ts`: search input, submit/reset controls and
  `submit(term: string): Promise<void>` / `reset(): Promise<void>`.
- `src/ui/components/navigation.component.ts`: shared home/sign-in locators and
  `goHome(): Promise<void>`.
- `src/ui/components/product-card.component.ts`: a scoped card link/name and
  `open(): Promise<{ readonly name: string; readonly url: string }>` capturing the
  selected identity before clicking. No fixed live IDs, cached element handles or assertions.
- `src/ui/pages/catalogue.page.ts`: composed navigation/search/first product, result
  names, search term and empty-state locators; `open()`, `searchFor(term)` and
  `clearSearch()`. Search/reset synchronize on the actual HTTP QUERY operations and
  return native Responses for assertions in tests. No custom HTTP client.
- `src/ui/pages/product.page.ts`: detail heading and injected shared navigation.
- `src/core/fixtures/ui.fixture.ts`: exported typed `test`/`expect`; lazy test-scoped
  `navigation`, `catalogue` and `product` fixtures. No browser/context ownership override.
- `tests/ui/catalogue.spec.ts`: existing search/detail refactor and a no-results/reset
  scenario reusing the search component; assertions stay visible.
- `tests/ui/navigation.spec.ts`: current-card detail/home workflow exercising navigation
  composed into both pages. No duplicate search workflow.

## Live observations and review focus

2026-10-21 headless inspection: initial load and reset use QUERY `/products`; search
uses QUERY `/products/search` with a JSON `q` field. Empty results expose
`search_completed` with a no-products message and `search-term`; reset clears the
input and restores cards. Detail uses an H1 product name. `nav-home` and `nav-sign-in`
are present on both screens. No account, cart or order was created.

Review stale DOM races after responses, non-vacuous result assertions, component
locator scoping, preserved selected identity, fresh per-test lifecycle, no selector or
business-action copies in test files, and runner-free page/component modules.

## Execution checklist

- [x] Read persistent memory, existing source/configuration and current remote state.
- [x] Create feature branch from merged main; baseline `npm run verify` (22 unit passes)
      and headless `npm run test:external` (4 passes, no failures/skips/retries).
- [x] Verify new business flows with one bounded headless inspection before coding.
- [x] Write refactored/new UI expectations and a minimal compilable abstraction seam;
      execute the existing scenario and observe failure because page behavior is missing.
- [x] Implement composition and lazy fixtures; execute the full hosted suite, ensuring
      the original three API scenarios and original UI workflow still pass.
- [x] Run typecheck, lint, formatting and Jest; inspect Allure execution counts.
- [x] Review for unnecessary complexity; fix material findings and reverify as needed.
- [x] Update ROADMAP, PROGRESS, ARCHITECTURE, PATTERNS, DECISIONS, TEST_STRATEGY and README.
- [x] Commit and push `feat/phase-2-ui-architecture`; verify the remote SHA and clean
      checkout. Do not update main, merge a PR or proceed to Phase 3.

## Outcome

Independent review: no Critical, Important or Minor findings. `npm run verify` passed
22 Jest tests and all static checks; the full hosted suite passed six scenarios.
The first empty-state implementation targeted a persistent result container and
failed its hidden assertion after reset. Scoping to the actual no-products message
fixed the same test. Failure screenshot/trace attachments were observed and preserved;
Allure's final report contains six passed executions. No Phase 3 work was introduced.
