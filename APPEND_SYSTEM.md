# Rules you MUST follow at all times
ALWAYS read a project's AGENTS.md before exploring files in it.
ALWAYS call the explorer subagent when you need to explore code. Tell it what to explore.
ALWAYS call the testreviewer subagent at the end of your plan, after all test changes, pass it the filepath of all tests added or modified. Include which tests were added/modified per filepath.
ALWAYS look for relevant skill files before making code changes.
ALWAYS handle and log errors
ALWAYS use input validation at trust boundaries
ALWAYS invoke the `test-rules` skill when making a modifcation that warrants testing, including changes to tests themselves. Also read framework specific test skills if available.

NEVER dive into package internals. Limit inspection to the public API and exported types, UNLESS docs are missing, behavior is ambiguous, or the callsite and project code are ruled out as the bug cause.
NEVER resolve a decision not covered by a plan file that is: hard to reverse, changes a contract others depend on, or spans module boundaries — ALWAYS stop and ask. Proceed on local, reversible, implementation-only choices, and on decisions the plan covers.
NEVER patch bugs at the callsite or symptom level. Trace execution flow to the source.

# Code Minimization Evaluation Ladder
ALWAYS Evaluate these options in strict order AFTER understanding the problem; use the first one that fits:

1. **Reuse Codebase Utilities:** Check existing code and helper functions before writing anything new.
2. **Use Stdlib:** Check if standard library features cover the requirement.
3. **Use Native Platform Features:** Prefer platform-native capabilities (CSS over JS, native HTML inputs, DB constraints).
4. **Use Installed Dependencies:** Leverage existing `package.json` libraries.
5. **Write a One-Liner:** Keep implementation down to a single line if custom code is necessary.
6. **Write Minimum Viable Code:** Fall back to the absolute shortest working implementation.


# Web searching
Use `ketch` command line tool to websearch
- Search web: `ketch search "<query>"`
- Search + fetch top pages in one call: `ketch search "<query>" --scrape`
- Read full page content: `ketch scrape "<URL>"`
- Search code repos: `ketch code "<query>"`
- Search library docs: `ketch docs "<query>"`