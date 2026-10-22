# Architecture

## Current scope

Phases 0–2 establish an executable TypeScript foundation and composed UI architecture
against the real Toolshop application. Phase 2 preserves the working search/detail
flow and adds empty-search recovery and shared navigation coverage. Phases 3–8 remain
future work; no API service, data factory, Cucumber runner or CI workflow is implied.

## Boundaries and dependencies

```text
UI specs (business assertions, Given–When–Then steps, result polling)
  └── src/core/fixtures/ui.fixture.ts (test-scoped composition root)
       ├── NavigationComponent ← built-in Page
       ├── CataloguePage ← same Page + NavigationComponent
       │    ├── SearchComponent (input, submit, reset)
       │    └── ProductCardComponent (scoped card, selected name/URL, click)
       └── ProductPage ← same Page + NavigationComponent

API specs → built-in request context → hosted Toolshop API
Jest → pure configuration loader with explicitly injected environment values
Playwright reporters → HTML, JSON, Allure results and failure attachments
```

Page/component modules import only Playwright types. They do not import `test`,
`expect`, fixtures or configuration, and contain no business assertions. UI specs
import the extended `test` and re-exported `expect` from the fixture module. API
specs keep their original runner import and independent request context.

## Page and component responsibilities

`CataloguePage` opens the catalogue, coordinates search/reset with the actual QUERY
responses, and exposes result, term and empty-state locators. `ProductPage` represents
the detail heading and shared navigation. Neither inherits from a generic base page.

`SearchComponent` owns the form controls and their interactions. `NavigationComponent`
represents the same header on both screens. `ProductCardComponent` is scoped to a
selected link; it captures the current name and destination before clicking. This
small UI selection record is not an API model or data factory. No live IDs are pinned.

Locators use observed `data-test` contracts (configured centrally) and semantic roles.
They remain lazy Playwright Locators, not stored element handles, so re-rendered
results are resolved again. The no-products locator targets the actual message inside
`search_completed`; that container also remains present when results exist.

Page actions register response listeners before submitting/resetting. Native Response
objects return to the tests for status/request assertions. A received response alone
is not treated as rendered UI: tests use auto-retrying assertions and bounded polling
for nonempty relevant names, the empty message, the cleared input and restored cards.
No unconditional waits, custom retry loop or hidden assertion helper is used.

## Fixtures, dependency injection and Page Factory concepts

The typed `navigation`, `catalogue` and `product` fixtures are test-scoped and lazy.
A scenario requesting catalogue/product causes Playwright to resolve the same Page
and navigation dependencies, then explicitly construct the required objects. The
built-in fixtures retain browser/context/page creation and teardown, including failure.
No worker-scoped page, global singleton, mutable shared user or extra disposal layer
is introduced. Public tests still use one worker and zero retries; broader parallel
verification belongs to Phase 6.

POM describes how pages expose UI behavior. Page Factory describes how those objects
are constructed and supplied. Here the fixture dependency graph supplies that factory
role. Playwright's Locators already resolve elements lazily, so Selenium decorators,
reflection and eager element initialization would add no value. A separate registry
or cached `Pages` facade would duplicate the fixtures' lifecycle management and is
intentionally omitted. Direct construction remains supported for another consumer:

```typescript
const navigation = new NavigationComponent(page);
const catalogue = new CataloguePage(page, navigation);
```

A future Cucumber World can own its browser context and construct the same objects;
it must supply compatible baseURL/test-ID configuration. This is an extension point,
not an implemented Cucumber integration. No new runner dependency was installed.

## Engineering principles and trade-offs

- SRP: form interactions, card selection, shared navigation, page orchestration,
  fixture construction and business expectations each have a focused owner.
- DRY: specs reuse selectors/actions through page/components. Header reuse occurs
  across both pages, card behavior across two scenarios, and search controls across
  search and recovery workflows.
- KISS and composition: two pages and three small components; no inheritance,
  interface-per-class, DI container, service locator or factory registry.
- Practical DI: constructors receive the actual Page and navigation component from
  fixtures. No claim is made that adding these classes proves every SOLID principle.
- Isolation: fixtures wrap the built-in per-test context rather than sharing browser
  state. UI integration is verified with real browser tests rather than mocks of
  Playwright method calls.

Native response synchronization couples catalogue operations to the observed Toolshop
transport. It keeps UI timing explicit without introducing the future API service
layer. A transport change requires updating this page and its integration expectations.
Only methods needed by current business scenarios are exposed; expand deliberately.

## Runtime, configuration and reporting

Node.js 24 LTS/npm, strict TypeScript 6.0.3, Playwright Test, Jest 30, ESLint 10 with
compatible typescript-eslint, Prettier 3 and Allure 3 remain locked and unchanged.
Jest cleans and executes compiled CommonJS unit tests; no ts-jest/ts-node/Babel setup.
The pure environment loader validates URL defaults/overrides without global mutation
or secret leakage. Optional `.env` loading uses Node's native flag.

`npm run verify` remains deterministic after installation. Hosted smoke is separate,
read-only and explicitly fails on outages. `npm run test:external` clears old Allure
results; report generation cleans its output. Failure screenshots and retained traces
were observed during Phase 2's expected red run and a corrected locator failure.
Generated artifacts stay ignored. CI and the minimal owned local catalogue API remain
future phases; no hosted application source/assets are redistributed.

References: [Playwright POM](https://playwright.dev/docs/pom),
[fixtures](https://playwright.dev/docs/test-fixtures),
[locators](https://playwright.dev/docs/locators).
