# Architecture decisions

## ADR 001 — Deliver one verified foundation first (2026-10-21)

Accepted. Implement Phases 0–1 only in this execution. Keep direct Playwright flows
until repetition justifies pages, components and factories. Reject an empty framework
scaffold or simultaneous implementation of all patterns: neither provides evidence of
maintainability. Cost: later phases must refactor existing working tests.

The supplied brief explicitly requests immediate autonomous execution. Its detailed
scope is the design authority; the design and plan live in `ARCHITECTURE.md`,
`TEST_STRATEGY.md` and `IMPLEMENTATION_PLAN.md`. No additional approval gates are added.

## ADR 002 — Separate deterministic checks and hosted smoke

Accepted. Default `npm test` runs unit tests; `npm run verify` adds static checks.
`npm run test:external` runs the real read-only Toolshop UI/API suite at one worker
and zero retries. Never substitute intercepted responses and call them end-to-end.
Reject the public demo as a required deterministic CI dependency. A lightweight owned
catalogue API is planned for Phase 3; a full commerce backend is out of scope.

## ADR 003 — Select compatible stable versions, not every latest major

Accepted. npm metadata on 2026-10-21 lists TypeScript 7.0.2 as latest, but
typescript-eslint 8.72.0 requires `>=4.8.4 <6.1.0`. Use stable TypeScript 6.0.3.
Node 24 meets all selected engine ranges; `@types/node` follows runtime major 24.
Jest uses compiled TypeScript without ts-jest/ts-node/Babel. Cucumber 13.3.0 supports
Node 24 but is deferred to Phase 5. Recheck all metadata before future upgrades.

## ADR 004 — Original automation, no redistributed application

Accepted. Toolshop's current upstream license permits private/internal/non-commercial
use and restricts public redistribution and commercial use. This public project ships
only original tests/configuration/documentation, with links to upstream. Do not copy
Toolshop source, images, seed descriptions, OpenAPI documents or credentials into it.
No application license is asserted or replaced by this repository.

## ADR 005 — Native environment loading and explicit injection

Accepted. Node 24 loads optional `.env`; a pure typed loader validates only supported
URL settings. Reject a config singleton and unnecessary dotenv dependency. Tests pass
literal maps, avoiding mutations of global `process.env`. URLs with userinfo or
query/fragment data are invalid to keep secrets out of diagnostics.

## ADR 006 — Node-native Allure reporting

Accepted. Use `allure-playwright` results and the `allure` 3 CLI to generate a static
report. Reject the Java-based Allure 2 command line: Java is absent on this machine
and a global Java installation is unnecessary. Playwright HTML is a second convenient
local viewer. Report directories and failure attachments are ignored by Git.

Post-verification refinement: Allure emitted skipped entries even for `--list`.
Clear generated results before each external command and clean the report when
generating it, so discovery and previous runs cannot pollute current results.
Clear compiled Jest output before compilation so renamed/deleted TypeScript tests
cannot survive as stale JavaScript.

## ADR 007 — Feature branches and PR review

Accepted after the user's explicit workflow correction. `main` retains the initial
planning baseline through a history-preserving revert. The foundation is restored on
`feat/foundation`, based on that revert, and proposed in a PR to `main`. Source, tests
and dependency versions remain unchanged. Future authorized implementation commits
belong on feature branches; direct-to-main publication requires an explicit exception.
No force-push, history rewrite or automatic PR merge is part of this correction.

## ADR 008 — Composed pages with lazy typed fixture construction (2026-10-21)

Accepted for Phase 2. Add CataloguePage and ProductPage, compose focused search/card/
navigation components, and inject Page/navigation with typed test-scoped fixtures.
The same navigation dependency serves both pages in a scenario. POM owns operations
and exposes Locators; tests own expectations, response checks and rendered-state polls.
Only Playwright type imports are allowed in page/component modules.

Reject a base-page hierarchy, interface per class, DI container and separate cached
Page Factory registry. The fixture graph already supplies lazy construction, scope
and teardown; native Locators already resolve elements on use. Preserve direct
constructors so future Cucumber consumers can supply their own context lifecycle.
Do not install Cucumber or implement the API/data abstractions scheduled for Phase 3.

Search/reset use observed HTTP QUERY responses registered before the form action.
Keep transport coordination in CataloguePage and return native Responses to the test;
SearchComponent owns only controls. Rejected: arbitrary waits, status assertions
hidden inside methods, and replacing live workflows with intercepted responses.
Cost: a future Toolshop transport change must update page coordination and specs.

The first reset integration run showed `search_completed` stays visible as the result
container. Scope the empty-state locator to its actual no-products message rather
than treating the container as an empty state. The unchanged test then passed.

PR #1 was merged before this phase; `feat/phase-2-ui-architecture` starts at merged
main `075026d`. Commit/push only this feature branch. A new PR or merge still needs
explicit user authorization; this request authorizes implementation, commit and push.
