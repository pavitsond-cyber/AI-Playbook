# Overdrive
**Author:** pbakaus
**Domain:** Performance
**Purpose:** Build advanced animations, shaders, and ambitious interaction systems — for interfaces that push beyond conventional motion design.

## What It Does
Provides a framework for building the most ambitious frontend animation systems: WebGL shaders, canvas-based effects, complex scroll orchestration, and physics simulations. For when standard CSS/JS animation is not enough.

## Input Requirements
- Ambitious interaction concept or reference
- Technical constraints (browser support, device targets)
- Performance budget and target frame rate

## Technologies Covered
- **WebGL/Three.js** — shader-based visual effects, 3D transforms
- **Canvas 2D** — particle systems, generative graphics, pixel manipulation
- **GSAP ScrollTrigger** — complex scroll-driven animation orchestration
- **Framer Motion** — advanced physics and spring orchestration
- **CSS Houdini** — paint worklets for custom effects
- **Web Animations API** — programmatic, performant animation

## Output
- Implementation architecture recommendation
- Technology choice with rationale
- Performance strategy (budget allocation)
- Progressive enhancement approach for lower-end devices
- Code architecture for maintainability

## Quality Criteria
Ambitious animations must degrade gracefully on lower-end hardware. Performance budget must be defined before building. Animation must serve a clear purpose — ambition is not a purpose.

## Edge Cases
- Shaders that are GPU-intensive on mobile devices
- Complex scroll orchestration that breaks on iOS Safari
- Canvas animations conflicting with browser accessibility tree
- WebGL not supported in some enterprise browser environments
- Ambitious effects that conflict with prefers-reduced-motion

## Best Practices
- Define the performance budget first: what fps, on what device?
- Build the progressive enhancement fallback before the ambitious version
- Use OffscreenCanvas for heavy computation off the main thread
- Test on real devices — desktop DevTools throttling is not representative
- Every ambitious animation needs a reduced-motion alternative
