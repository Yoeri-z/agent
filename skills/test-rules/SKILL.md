---
name: test-rules
description: "Enforces what to test, what to skip, and how to write tests. Use when writing or reviewing tests."
---

# Test Rules

Never write integration tests unprompted; explicit requests still follow all rules below. Always check code you
write for unit-test candidates per the criteria below.

Write unit tests for:

- Pure functions and algorithms
- Data parsing and database pipelines
- Boundary conditions and edge cases
- Business logic and state machines

Do not write unit tests for:

- Passthrough functions
- UI structures and styling
- Third party libraries and frameworks
- Heavy IO, database and network wiring

Always follow these rules when writing tests:

- Be expressive and readable.
- Abstract repetitive setup into named helper functions; keep test inputs visible in the test body (abstract the
mechanism, not the data).
- Use setup/teardown when tests share a setup.
- No conditional or branching logic.
- Keep tests isolated.
- Never manipulate time or microtasks; if unavoidable, use a test harness designed for it.
- Separate Arrange, Act, Assert with blank lines.
- Unit tests: at most 1-2 assertions, always at the end.
