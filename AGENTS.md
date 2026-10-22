# Continuation instructions

1. Read `docs/PROGRESS.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `PATTERNS.md`,
   `DECISIONS.md` and `TEST_STRATEGY.md` before implementation.
2. Inspect Git status and actual code/test state; resume the next incomplete task.
   Do not recreate completed components or implement every remaining phase at once.
3. Use Node 24 LTS, npm 11 and committed dependency versions. Keep TypeScript strict.
   Recheck engines/peers before any requested dependency changes.
4. Run browser automation headlessly. Inspect `playwright.config.ts` and npm wrappers
   first; avoid `PWDEBUG`, headed mode, UI mode, Inspector and unconditional sleeps.
5. Hosted smoke is read-only, one worker, zero retries. No account creation, orders,
   destructive API calls, copied Toolshop source/assets or hardcoded live IDs.
6. `npm run verify` is deterministic. `npm run test:external` contacts Toolshop and
   must remain separate; never conceal an outage with mocks, skips or retries.
7. After substantial changes run type/lint/format and relevant tests; record exact
   commands, counts, failures and blockers. Update persistent docs after milestones.
8. Never claim a pattern, CI run, browser matrix or verification that does not exist.
   Do not commit, push or publish unless the current user request authorizes it.
9. For authorized commit/push work, use a feature branch and a pull request. Do not
   publish implementation commits directly to `main` unless the user explicitly
   requests that exception. Opening or merging a PR still requires user authorization.
