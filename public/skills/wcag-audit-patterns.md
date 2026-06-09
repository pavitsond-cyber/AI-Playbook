# WCAG Audit Patterns
**Author:** wshobson
**Domain:** Accessibility
**Purpose:** WCAG 2.2 audits combining automated scanning with manual verification patterns — more rigorous than automated tools alone.

## What It Does
Provides structured patterns for WCAG 2.2 compliance testing that go beyond automated scanning. Covers the manual verification steps that automation cannot catch and documents them as repeatable, testable patterns.

## Input Requirements
- Interface or component to audit
- WCAG 2.2 target level (A, AA, or AAA)
- Screen reader and browser combination to test

## WCAG 2.2 Key New Criteria
- 2.4.11 Focus Not Obscured (Minimum) — focused element not fully hidden
- 2.4.12 Focus Not Obscured (Enhanced) — focused element fully visible
- 2.5.3 Label in Name — visible label matches accessible name
- 2.5.7 Dragging Movements — alternatives to pointer-based dragging
- 2.5.8 Target Size (Minimum) — 24×24px minimum touch target
- 3.2.6 Consistent Help — help mechanisms in consistent location
- 3.3.7 Redundant Entry — don't ask for information already provided
- 3.3.8 Accessible Authentication — no cognitive function test required

## Output
- Automated findings (axe/Lighthouse scan results)
- Manual check results per WCAG 2.2 criterion
- Pattern violations with WCAG reference
- Remediation guidance with priority

## Quality Criteria
AA compliance is the minimum for public-facing products. Every criterion must be tested with both automated tools AND manual verification. Screen reader testing is non-negotiable.

## Edge Cases
- WCAG 2.2 criteria that conflict with 2.1 patterns (document the decision)
- Components where full compliance requires significant redesign
- Complex keyboard interactions (grids, trees, comboboxes) that require bespoke patterns
- Timeout and session management which has WCAG 2.1.1 implications

## Best Practices
- Run axe-core or Deque tools first to catch automatable issues
- Create a manual test script for each WCAG criterion
- Test with keyboard-only navigation before screen reader testing
- Document tested combinations: browser + assistive technology + OS
- Retest after every significant UI change
