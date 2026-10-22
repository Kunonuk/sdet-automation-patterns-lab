# Implemented pattern catalogue

Only concepts backed by executable code are listed as implemented. SOLID, DRY and
KISS describe design choices rather than ornamental examples for each acronym.

| Concept                                  | Problem it solves and location                                                                                    | Practical example                                                                                                        | Advantages                                                                          | Trade-offs / when not to use                                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page Object Model                        | Tests otherwise own page selectors and interaction details; `src/ui/pages/catalogue.page.ts`, `product.page.ts`   | A spec calls `catalogue.searchFor('pliers')` and asserts `product.name`                                                  | Readable business flows; focused change locations                                   | Keep one-use trivial flows direct when a page object adds no useful boundary; do not hide test expectations in pages.                            |
| Component Object Model                   | Repeated widgets deserve narrower owners; `src/ui/components/`                                                    | Shared navigation is injected into both pages; scoped product-card selection is reused; search/reset share form controls | Composition and reuse without inheritance; scoped locators                          | Extract an actual widget/operation, not a class per DOM node.                                                                                    |
| Typed Playwright fixtures / DI           | Manual setup and hidden global dependencies; `src/core/fixtures/ui.fixture.ts`                                    | `catalogue` and `product` request the same test-scoped `navigation` and built-in Page                                    | Typed autocomplete, explicit dependency graph and automatic test isolation          | Fixture adapters are runner-specific; page/component constructors remain usable independently. No DI container is needed.                        |
| Practical Page Factory concept           | Page objects must be constructed at the right time and scope; `src/core/fixtures/ui.fixture.ts`                   | Playwright lazily calls the constructors only for requested fixtures                                                     | Reuses native lifecycle management and lazy Locators                                | No standalone factory class, Selenium decorators or reflection. Add a factory abstraction only if a real second construction policy requires it. |
| Explicit configuration injection         | Hidden process state makes validation unpredictable; `src/core/config/environment.ts`                             | Jest supplies literal environment maps to `loadEnvironment`                                                              | Deterministic unit validation without mutating global state                         | Two settings do not justify a configuration service or container.                                                                                |
| Composed layers / separation of concerns | Runner, page, widget and business rules change for different reasons; pages, components, fixtures and `tests/ui/` | Search component clicks controls; catalogue coordinates QUERY; tests assert response and visible results                 | Small focused owners; runner-neutral UI classes can support future business runners | More files have a navigation cost; keep the public surface limited to working scenarios.                                                         |
| Test isolation                           | Shared page instances and users cause cross-test dependence; test-scoped UI fixtures                              | Every scenario gets a fresh context through the built-in Page fixture                                                    | No shared cookies, cached DOM handles or worker-level UI state                      | Full parallel/repetition evidence is deferred to Phase 6; public smoke remains one worker.                                                       |

## Concrete principles

- Single responsibility: search controls, card selection and navigation have separate
  component owners; CataloguePage coordinates the page's operations.
- DRY: the two detail workflows share card selection; both pages share navigation;
  tests contain no duplicated selectors or click/fill implementations.
- KISS: explicit constructors, a small fixture graph and native Locators replace a
  generic base-page hierarchy, factory registry and service container.
- Practical dependency injection: fixtures supply Page/navigation through constructors.
  Injection does not by itself establish all five SOLID principles.
- Assertions remain in specs; the card's missing-link guard reports invalid input for
  navigation rather than deciding the business test outcome behind an assertion API.

## POM versus Page Factory

POM is the representation of page behavior. A factory is construction policy. In this
project, lazy typed fixtures are the composition root and factory mechanism; pages
are the resulting UI objects. Playwright's Locators resolve elements on use, so a
Selenium-style initialization pass is unnecessary. No distinct Factory Pattern class
or data factory is claimed for Phase 2.

## Planned, not yet implemented

- Phase 3: typed API service, shared runtime-validated models, data Factory and Builder.
- Phase 4: DDT and a small KDT dispatch table sharing existing business operations.
- Phase 5: selected Cucumber Given–When–Then specifications with independent lifecycle.
- Phase 6: bounded parallel/repeat reliability verification.

Read `ARCHITECTURE.md` and ADR 008 for extension points and rejected alternatives.
