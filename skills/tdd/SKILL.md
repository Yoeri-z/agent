---
name: tdd
description: "Orchestrates the red-green-refactor TDD workflow. Use when writing new code or modifying existing logic."
---

# TDD Plan

When creating a plan make sure it follows these steps sequentially. Do not skip steps.

1. **Scaffold mocks** — Generate mocks/stubs for all dependencies of the code under test.
2. **Write tests** — Write unit tests per test-rules. Cover happy path, edge cases, and error cases.
3. **Red phase** — Run tests. Assert they compile and fail with expected errors (no false passes).
4. **Review** — Pass test files to the `testreviewer` subagent. Incorporate feedback.
5. **Adapt** — If test signatures or interfaces require changes to source stubs/interfaces, apply them. Verify tests still compile.
6. **Green phase** — Implement the code under test. Run tests until all pass.
7. **Verify** — Full test suite green. No skipped tests. No flaky behavior.
