# Animate
**Author:** pbakaus
**Domain:** Motion & Interaction
**Purpose:** Design purposeful animation and micro-interactions that support usability and delight — not decoration.

## What It Does
Evaluates and designs animations that have functional purpose. Every animation must earn its place by improving spatial understanding, providing feedback, or preventing jarring state changes.

## Input Requirements
- Interaction or animation to design or review
- User flow context — what just happened, what comes next
- Platform and performance constraints

## Output
- Animation specification (trigger, duration, easing, properties)
- Micro-interaction design
- Timing recommendations
- Remove/keep/refine verdict for each animation

## Quality Criteria
Every animation must have a clear purpose: spatial consistency, state indication, feedback, explanation, or preventing jarring changes. "It looks cool" is not a purpose.

## Edge Cases
- Animations that run on every user interaction (too frequent)
- State transitions where the user needs instant feedback
- Reduced motion preference not respected
- Animations that delay task completion
- Complex sequences that break on interruption

## Best Practices
- Evaluate frequency before adding animation — 100+ times/day = no animation
- Enter animations: ease-out. Exit: ease-out. Movement: ease-in-out
- Never use transition: all — always specify exact properties
- Test with prefers-reduced-motion enabled
- Duration: button 100–160ms, dropdown 150–250ms, modal 200–500ms
