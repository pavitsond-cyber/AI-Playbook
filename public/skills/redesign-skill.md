# Redesign Skill
**Author:** Leonxlnx
**Domain:** Systems & Quality
**Purpose:** Audit and upgrade existing interfaces to premium quality while preserving all functionality — improvement without disruption.

## What It Does
Systematically reviews existing interfaces for quality gaps and produces a prioritised upgrade plan. Ensures redesign work improves craft without breaking existing functionality, patterns, or user expectations.

## Input Requirements
- Existing interface (screenshots, code, or URL)
- Current functionality that must be preserved
- Quality target or reference for the upgrade

## Output
- Quality audit findings (current state vs. target)
- Redesign recommendations with priority
- Before/after for key changes
- Risk assessment: what might break

## Audit Dimensions
- Visual quality — typography, spacing, color, depth
- Interaction quality — hover states, transitions, feedback
- Consistency — pattern adherence across components
- Accessibility — contrast, focus, semantic HTML
- Performance — animation cost, asset optimization

## Quality Criteria
Every change must preserve existing functionality. Priority order: accessibility > consistency > visual quality > delight. No redesign ships without a regression check.

## Edge Cases
- Legacy codebases where CSS specificity makes changes risky
- Designs where users have learned the current (even if bad) patterns
- Components shared across multiple products — changes have wide impact
- Accessibility improvements that change visual weight significantly

## Best Practices
- Audit before redesigning — understand what works before changing anything
- Preserve functional patterns even when upgrading aesthetics
- Test redesigned components against the original user flows
- Prioritise accessibility improvements first — they improve everything
- Document the reasoning for every change that breaks from the original
