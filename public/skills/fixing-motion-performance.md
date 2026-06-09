# Fixing Motion Performance
**Author:** ibelick
**Domain:** Performance
**Purpose:** Fix compositor property issues, layout thrashing, and scroll-linked motion performance — the CPU-heavy animation problems senior engineers own.

## What It Does
Diagnoses and fixes the animation performance issues that aren't obvious in development but degrade real-user experience: layout thrashing, non-compositor animations, expensive scroll handlers, and paint storms.

## Input Requirements
- Animation or scroll interaction with performance issues
- Browser performance profile (Chrome DevTools trace)
- Current implementation (CSS or JS animation)

## Performance Issues Addressed
- **Layout thrashing** — reading and writing DOM layout properties in the same frame
- **Non-compositor animations** — animating properties that trigger layout or paint (width, height, top, left, padding, margin)
- **Expensive scroll handlers** — scroll events without requestAnimationFrame or IntersectionObserver
- **Paint storms** — large painted areas repainting on every frame
- **JavaScript animation loop** — setInterval/setTimeout instead of requestAnimationFrame

## Only Animate These (GPU-composited)
- transform (translate, scale, rotate, skew)
- opacity
- filter (with caveats)
- will-change (use sparingly as a hint, not a fix)

## Output
- Performance diagnosis with DevTools evidence
- Compositor property recommendations
- Refactored animation code
- Before/after frame rate comparison target

## Quality Criteria
Target 60fps (16.7ms per frame) for all visible animations. Scroll-linked animations must use IntersectionObserver or CSS scroll-timeline. No layout or paint triggers in animation loop.

## Edge Cases
- Animations that need to animate layout properties (size/position) — use FLIP technique
- will-change overuse creating excessive GPU memory consumption
- Scroll-linked parallax on mobile where GPU memory is constrained
- Hardware acceleration creating font rendering differences in Safari

## Best Practices
- Use Chrome DevTools Performance tab — look for forced reflows and paint costs
- Replace top/left with transform: translate() for all positional animations
- Use IntersectionObserver for scroll-triggered animations, not scroll events
- Add will-change sparingly — only for elements you know will animate
- Test performance on mid-range Android, not just your development machine
