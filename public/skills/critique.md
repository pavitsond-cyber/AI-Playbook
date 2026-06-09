# Critique
**Author:** pbakaus
**Domain:** Systems & Quality
**Purpose:** Structured UX scoring with persona checks and remediation guidance — systematic design review with actionable outputs.

## What It Does
Runs structured critique sessions against defined UX criteria. Scores each dimension, checks against relevant user personas, and produces a prioritised remediation list. Makes critique consistent, documented, and actionable.

## Input Requirements
- Design or prototype to critique
- Target persona or user type
- Evaluation criteria (or defaults to standard UX heuristics)

## Output
- Dimension scores (1–5) with rationale
- Persona check findings
- Priority issue list (P0/P1/P2)
- Remediation guidance for each finding
- Summary verdict: ship / revise / rework

## Scoring Dimensions
- Clarity — is the purpose of this screen immediately clear?
- Efficiency — can the user complete the task with minimum effort?
- Feedback — does the system confirm user actions?
- Error prevention — does the design prevent common mistakes?
- Recovery — can users easily undo or correct errors?
- Consistency — does this match established patterns?

## Quality Criteria
Every score must have a specific rationale. Every P0 finding must have a remediation. Persona checks must reference actual user goals, not assumed ones.

## Edge Cases
- Designs optimised for one persona that break for another
- Trade-offs where fixing one dimension degrades another
- Designs that score well on heuristics but fail in real usage
- Context-dependent UX that changes by device or environment

## Best Practices
- Score independently before discussing — then compare
- P0 means launch blocker — use this rating sparingly
- Reference specific user goals in persona checks
- Remediation should be actionable, not aspirational
- Document accepted trade-offs explicitly
