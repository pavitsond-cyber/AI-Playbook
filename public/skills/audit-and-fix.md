# Audit and Fix
**Author:** AccessLint
**Domain:** Accessibility
**Purpose:** Full accessibility audit and remediation workflow for WCAG issues — not just surface-level scanning, but systematic fix implementation.

## What It Does
Runs a comprehensive accessibility audit covering automated detection, manual pattern checking, and systematic fix implementation. Covers visual, interactive, and semantic accessibility layers.

## Input Requirements
- URL, component, or codebase to audit
- WCAG target level: A, AA, or AAA
- Platform context: web, mobile web, native

## Output
- WCAG violations with WCAG criterion reference
- Severity: Critical (blocks use) / Serious / Moderate / Minor
- Fix recommendation with code snippet
- Verification method (automated / manual)
- Remediation priority list

## Audit Coverage
- Color contrast (text, UI components, non-text)
- Keyboard navigation and focus management
- Screen reader semantics (ARIA roles, labels, descriptions)
- Touch target sizing (≥44×44px minimum)
- Form accessibility (labels, errors, instructions)
- Dynamic content (live regions, focus management after updates)
- Images (alt text, decorative vs informative)

## Quality Criteria
All Critical and Serious issues must be resolved before launch. Focus management must be explicitly designed, not accidental. All interactive elements must be keyboard operable.

## Edge Cases
- Third-party widgets that cannot be modified (document + warn)
- Design patterns where accessibility conflicts with aesthetics (custom dropdowns)
- Dynamic content where focus management is complex
- International sites where screen reader support varies by language

## Best Practices
- Automated tools catch ~30% of issues — manual testing is essential
- Test with an actual screen reader (NVDA, VoiceOver, JAWS)
- Fix focus management last — it depends on everything else being correct
- Colour contrast must be checked in both light and dark mode
- Involve users with disabilities in testing when possible
