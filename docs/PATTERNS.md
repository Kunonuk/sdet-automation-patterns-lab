# Pattern catalogue

Only implemented concepts belong in the first table. Future patterns are not implied
by directory names or installed dependencies.

| Concept | Problem and location | Practical example | Advantages | Trade-offs / when not to use |
| --- | --- | --- | --- | --- |
| Explicit dependency injection (planned for foundation) | Hidden environment state; `src/core/config/environment.ts` | Tests pass a literal environment map to `loadEnvironment` | Deterministic validation without changing global environment | A function parameter is enough; do not add a DI container for two settings. |

## Planned, not yet implemented

- Phase 2: Page Object, Component Object, explicit lazy Page Factory concepts, typed Playwright fixtures.
- Phase 3: typed API Service Object, data Factory and Builder with validated invariants.
- Phase 4: DDT and a small KDT dispatch table sharing real business actions.
- Phase 5: selected Given–When–Then Cucumber scenarios with runner-neutral abstractions.

SOLID, DRY and KISS will be linked to concrete code decisions rather than represented
by ornamental classes. The foundation's small pure configuration module and distinct
runner responsibilities are the starting point, not evidence of every future pattern.
