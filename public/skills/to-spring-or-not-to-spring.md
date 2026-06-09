# To Spring or Not to Spring
**Author:** raphaelsalaja
**Domain:** Motion & Interaction
**Purpose:** When to use spring physics vs. easing — the nuanced motion judgment that separates mid from senior-level animation work.

## What It Does
Provides a decision framework for choosing between spring physics and CSS easing curves. Springs simulate physics; easing follows a predefined curve. Each is correct in different contexts — using the wrong one breaks the motion feel.

## Decision Framework
Use springs when:
- Motion is gesture-driven (drag, swipe, pull-to-refresh)
- Animation needs to be interruptible mid-motion
- Element has perceived physical weight (cards, sheets, drawers)
- You want natural overshoot for delight moments

Use easing when:
- Motion is triggered by state change, not gesture
- Precision timing is required (loading states, data updates)
- Element is lightweight (tooltip, badge, small icon)
- You need exact, predictable duration

## Input Requirements
- Interaction to evaluate (describe or share code)
- Whether the motion is gesture-driven or state-driven
- Target feel: snappy / fluid / natural / precise

## Output
- Spring vs easing recommendation with rationale
- Configuration parameters (stiffness, damping, mass or cubic-bezier)
- Alternative if current choice is wrong

## Quality Criteria
Gesture-driven = spring. State change = easing. Never use spring for loading/data states. Never use linear easing for anything visible to users.

## Edge Cases
- Hybrid interactions that start as gesture but end as state
- Springs that overshoot into clipping bounds
- Springs on mobile where CPU constraints matter
- Interrupting a spring mid-animation with a new trigger

## Best Practices
- Start with easing — add springs only when gesture or weight justify it
- Spring configs: { stiffness: 300, damping: 30 } is a safe starting point
- Test spring overshoot — card drawers look great; text labels do not
- Always set damping to prevent infinite oscillation
- Match spring feel to element mass — drawer feels heavier than tooltip
