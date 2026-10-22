# Dependency compatibility and risks

Direct development dependencies are exact versions in `package.json`; transitive
versions and integrity hashes are committed in `package-lock.json`. Install with
`npm ci`. Do not run `npm audit fix --force` or regenerate the lockfile casually.

## Observed audit — 2026-10-21

`npm audit --json` reported **19 moderate findings, zero high, zero critical**.
These 19 affected-package entries propagate a single underlying advisory:
[GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c),
denial of service through unbounded precision format specifiers in `sprintf-js`.

Installed path:

```text
jest 30.5.2
  @jest/core 30.5.2
    @jest/transform 30.5.2
      babel-plugin-istanbul 8.0.0
        @istanbuljs/load-nyc-config 1.1.0
          js-yaml 3.15.2
            argparse 1.0.10
              sprintf-js 1.0.3
```

The registry audit proposed downgrading Jest to 25.0.0 and `@jest/globals` to 27.5.1,
which would break the selected compatible runner stack. No forced fix or unverified
transitive override was applied. The affected chain is development tooling; the
repository does not serve it as an application. This narrows exposure but does not
remove the finding. Recheck after upstream releases; do not claim a clean audit.

Installation also printed the deprecation notice for transitive `glob@10.5.0`.
`npm ls --depth=0` reported all selected direct versions without invalid peers.

## Runtime selection

Local verification used Node 24.16.0 and npm 11.13.0. `.nvmrc` selects LTS major 24;
contributors should use an up-to-date supported patch within that major. No global
runtime/package upgrade is performed by this project. `engine-strict` rejects an
incompatible major rather than silently accepting a different compatibility target.

Allure's Node CLI generates reports without Java. Cucumber and its Allure adapter
are researched but deliberately absent from the lockfile until Phase 5 introduces
their first executable scenario. See `RESEARCH.md` before changing versions.
