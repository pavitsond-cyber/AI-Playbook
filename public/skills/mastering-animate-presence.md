# Mastering Animate Presence
**Author:** raphaelsalaja
**Domain:** Motion & Interaction
**Purpose:** Deep dive into Framer Motion AnimatePresence patterns — mount, unmount, and transition orchestration done right.

## What It Does
Covers the most common pain point in production React animation: correctly orchestrating enter/exit animations with AnimatePresence. Addresses mode strategies, key management, custom components, and sequential orchestration.

## Input Requirements
- Framer Motion component with enter/exit animations
- React component context (conditional render, list, routing)
- Desired transition feel (immediate, sequential, staggered)

## Output
- Correct AnimatePresence implementation
- Exit animation specification
- Mode recommendation (sync, wait, popLayout)
- Orchestration pattern for complex sequences

## Key Patterns
- mode="wait" — waits for exit before enter (sequential feel)
- mode="sync" — overlapping enter/exit (faster feel)
- mode="popLayout" — animates layout shift on removal
- Custom exit variants — don't rely only on initial/animate
- key prop management — critical for triggering re-animation

## Quality Criteria
Exit animations must complete before component is removed from DOM. Key props must be stable and unique. Exit variants must be explicitly defined.

## Edge Cases
- AnimatePresence inside a conditional render without a key
- Nested AnimatePresence causing double exit animations
- Route changes where components need to share exit context
- List items where layout shift fights exit animation
- Custom components not forwarding motion props correctly

## Best Practices
- Always define explicit exit variants — don't just invert initial
- Use unique, stable keys for list items animated in/out
- mode="wait" for modals; mode="sync" for tabs; mode="popLayout" for lists
- Wrap AnimatePresence as high as possible in the tree
- Test exit animations in isolation before integrating
