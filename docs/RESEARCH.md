# Research evidence — 2026-10-21

## Application and usage

- [Hosted Toolshop UI](https://practicesoftwaretesting.com/) identifies as v5.0.
- [Swagger UI](https://api.practicesoftwaretesting.com/api/documentation) points to
  [its live OpenAPI document](https://api.practicesoftwaretesting.com/docs?api-docs.json).
  The contract identifies `Toolshop API`, version `5.0.0` and the public API server.
- [Upstream repository](https://github.com/testsmith-io/practice-software-testing)
  describes the practice application and hosted environments.
- [Upstream license](https://github.com/testsmith-io/practice-software-testing/blob/main/LICENSE)
  restricts public redistribution, commercial use and third-party services. No source,
  image assets, complete schemas or seed content from it are included here.

Read-only HTTP checks observed `200` for `/products?page=1`, `/categories` and
`/products/search?q=pliers`. Product listing/search use a paginated `data` array.
Products include current `id`, `name`, numeric `price`, category/brand and image
metadata. IDs are generated and must not be pinned in tests.

The reviewed OpenAPI documents `/products/{productId}`, filters `by_brand`,
`by_category`, `between` and `sort`, category trees, `/users/login`, `/users/register`,
`/users/me`, cart creation/read/item quantity/deletion. This confirms capability,
not successful execution of every endpoint. Accounts/authenticated writes/cart
effects are deferred; no login or account creation is part of foundation smoke.

Candidate later workflows: filter by a discovered category; sort a returned result
set; validate login fields; reject anonymous account access; add/remove an owned cart
item; isolate factory data locally. Verify the live DOM/contract again before each.

## Technology selection

Registry `latest` metadata and selected versions' engine/peer fields were fetched
before installation. These are observations, not perpetual latest-version claims.

| Package | Selected / researched stable version | Compatibility |
| --- | --- | --- |
| Node | Installed 24.16.0, LTS major 24 | Meets selected engines; runtime major recorded in `.nvmrc` |
| TypeScript | 6.0.3 | Latest 7.0.2 exceeds ESLint parser's `<6.1.0` peer bound |
| Playwright Test | 1.64.1 | Node >=20 |
| Jest / globals | 30.5.2 | Node 24 supported |
| Node types | 24.19.2 | Match runtime major |
| ESLint / @eslint/js | 10.13.0 / 10.0.1 | Node >=24 supported; JS config requires ESLint 10 |
| typescript-eslint | 8.72.0 | ESLint 8/9/10; TypeScript >=4.8.4 <6.1.0 |
| Prettier | 3.9.10 | Node >=14 |
| allure-playwright | 3.14.0 | Playwright >=1.62.0 |
| Allure Node CLI | 3.21.0 | Install/execute to confirm complete runtime compatibility |
| Cucumber.js (deferred) | 13.3.0 | Node 22, 24 or >=26 |
| allure-cucumberjs (deferred) | 3.14.0 | Cucumber >=10.8.0 |

Sources: [Node release schedule](https://github.com/nodejs/Release),
[Playwright installation](https://playwright.dev/docs/intro),
[Jest TypeScript guidance](https://jestjs.io/docs/getting-started#using-typescript),
[typescript-eslint compatibility](https://typescript-eslint.io/users/dependency-versions/),
[Allure Playwright](https://allurereport.org/docs/playwright/),
[Allure 3 installation](https://allurereport.org/docs/install/),
[Cucumber installation](https://github.com/cucumber/cucumber-js/blob/main/docs/installation.md),
and the named packages' metadata at `https://registry.npmjs.org/`.

Jest's compiled-JavaScript approach avoids adding ts-jest just to bridge a compiler
version gap. No unused Cucumber packages are installed in the foundation milestone.
