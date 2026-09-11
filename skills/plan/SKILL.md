---
name: plan
description: Create a plan for the user. Use when the user uses any 'plan' trigger phrases.
---
Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it. If the entire design tree is finished a plan should be able to form.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Format a round like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Stop early if answers turn trivial or the remaining frontier is low-value — don't interview for its own sake; wrap up the frontier with your recommended answers and move to confirmation. Do not act on it until the user confirms you have reached a shared understanding.

After the user confirms, invoke the `tdd` skilla and write the plan to a markdown file at the project root (e.g. `<TOPIC>_PLAN.md`).

The written plan must be **self-contained**: an agent or person who did not see this planning session must be able to understand the goal and implement from the file alone. Do not write it as a transcript of the conversation. Include:

- **Overview / goal** — what is being built and what "done" means, stated up front.
- **Background / current state** — the facts discovered during exploration (what exists today, what blocks the goal), with file paths. Never assume the reader already knows them.
- **Decisions and rationale** — every settled decision *and why*, including rejected alternatives and the reason they were rejected. State outcomes, not just conclusions.
- **The full design tree** — the complete map of decisions reached.
- **Phase-based implementation plan** — concrete, file-level steps grouped into ordered phases.
- **Verification** — how the result will be tested and validated.
- **Non-goals / risks** — anything explicitly out of scope, and environment assumptions the reader must verify.