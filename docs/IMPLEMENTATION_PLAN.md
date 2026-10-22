# Foundation implementation plan

Goal: complete and publish only the Phase 0–1 vertical slice in the supplied brief.
Design authority: `ARCHITECTURE.md`, `TEST_STRATEGY.md` and the original requested scope.
Execution: inline, with verification after each substantial change; preserve the
unrelated LockThreat checkout. The new repository is independent, not a worktree of it.

## Global constraints and review focus

- Node 24/npm; TypeScript 6.0.3 strict; exact compatible direct versions and lockfile.
- Every browser invocation headless; hosted smoke one worker, zero retries.
- No Toolshop source copying, account creation, destructive calls or fixed live IDs.
- Local gate never depends on public demo uptime; hosted smoke failures remain visible.
- Validate malformed/credential-bearing config, deployment paths and injected state.
- Avoid vacuous empty-result assertions and stale product/detail assertions.
- Reporters must not silently overwrite UI/API results between projects.
- No commits, tests or settings changed in the existing LockThreat repository.

## Task 1 — Persistent memory and repository

- [x] Record architecture alternatives, research, license, roadmap and test strategy.
- [ ] Confirm live UI controls using one coherent headless inspection after install.
- [ ] Commit planning milestone; create requested public repository via existing `gh`.
- [ ] Confirm GitHub repository URL, visibility and remote commit.

## Task 2 — Executable toolchain and configuration

Files: `package.json`, lockfile, `tsconfig.json`, `tsconfig.unit.json`,
`playwright.config.ts`, `jest.config.cjs`, `eslint.config.mjs`, formatting/ignore
files, `.env.example`, `src/core/config/environment.ts`, `tests/unit/environment.test.ts`.

Interface: `loadEnvironment(values: Readonly<Record<string, string | undefined>>):
{ uiBaseUrl: string; apiBaseUrl: string }`. Defaults use the two hosted origins.

- [ ] Install researched exact versions; inspect dependency engine/peer output.
- [ ] Write unit cases before implementation. With a minimal placeholder, assert
  defaults, `https://demo.invalid/shop` → `https://demo.invalid/shop/`, independent
  calls, invalid protocol/URL/blank values, credentials/query/fragments rejected
  without echoing supplied secrets. Run `npm run test:unit`; expect assertion failures.
- [ ] Implement the pure URL loader; rerun Jest, expecting all cases to pass.
- [ ] Run `npm run typecheck`, `npm run lint`, `npm run format:check`; expect exit 0.

## Task 3 — Real external smoke and reporting

Files: `tests/ui/catalogue.spec.ts`, `tests/api/catalogue.spec.ts` and
`tests/api/authentication.spec.ts`; reporters in `playwright.config.ts`.

- [ ] Inspect actual DOM test IDs, search behavior, product detail and signed-out
  navigation; document observed evidence before writing the final flows.
- [ ] UI: search pliers, wait for actual search response, assert nonempty matching
  results, open a current result, assert the detail name matches the chosen product.
- [ ] API: list a nonempty page and read a discovered product; verify id/name/price
  agree; search with nonempty relevant results; verify anonymous `/users/me` is 401.
- [ ] Inspect config/wrappers then run
  `env -u PWDEBUG -u HEADED npm run test:external`; expect headless UI/API passes,
  zero retries and zero skipped tests. Do not intercept API calls.
- [ ] Generate Allure with `npm run report:allure`; inspect report files and
  result counts. Failure-only attachments remain configured and ignored by Git.

## Task 4 — Verify and publish the milestone

- [ ] Run clean `npm ci`, `npm run verify`, then external smoke and report generation.
- [ ] Review source, dependency tree, ignored artifacts and tracked-file diff.
- [ ] Replace provisional status in memory/README with exact evidence and next scope.
- [ ] Commit foundation and push only this new repository's `main` branch.
- [ ] Confirm public GitHub repository and matching remote commit; move local repository
  to `/Users/admin/AquaProjects/sdet-automation-patterns-lab` without overwriting a path.
- [ ] Recheck final Git state and the unchanged LockThreat checkout, then stop.
