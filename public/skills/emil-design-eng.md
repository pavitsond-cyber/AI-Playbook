# Emil Design Engineering
**Author:** emilkowalski
**Domain:** Craft & Taste
**Purpose:** Emil Kowalski's design-engineering philosophy for UI polish, production-ready frontend craft, and animation quality.

## What It Does
Applies the production craft standard from Emil Kowalski's work — where unseen details compound into interfaces that feel right. Reviews animation specifics, interaction states, button responsiveness, and the micro-decisions that separate good from great.

## Input Requirements
- UI code or component to review (JSX/CSS)
- Animation or interaction to assess
- Target platform: web, iOS, Android

## Output
- Before/After comparison table (Before | After | Why)
- Animation improvement recommendations
- Interaction polish checklist
- Production readiness verdict

## Quality Criteria
Only animate transform and opacity. Buttons must have :active states. Popovers must be origin-aware. No scale(0) entrances. Duration matched to element type.

## Edge Cases
- Animations running 100+ times/day — remove entirely
- Spring animations on hover (overkill) — use easing instead
- CSS-in-JS specificity conflicts masking animation issues
- Gesture-driven interactions that need interruptible springs
- Safari-specific animation rendering differences

## Best Practices
- Specify exact transition properties — never transition: all
- Use ease-out for enters and exits — feels more responsive
- Add transform: scale(0.97) on button :active states
- Anchor popover/dropdown animations to their trigger origin
- Slow-motion test every animation before shipping
