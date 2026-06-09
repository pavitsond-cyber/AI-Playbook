# OKLCH Color Skill
**Author:** jakubkrehel
**Domain:** Systems & Quality
**Purpose:** Build consistent, accessible, tunable color systems using OKLCH — the perceptually uniform color space for modern design systems.

## What It Does
Replaces HSL-based color systems with OKLCH for perceptually consistent color scales. OKLCH provides uniform lightness steps, making it possible to create accessible color ramps that work consistently across hues without manual adjustment.

## Why OKLCH Over HSL
- Perceptually uniform — equal lightness steps look equal across hues
- Better contrast prediction — APCA-compliant accessible palettes
- Wide gamut ready — works with P3 displays
- Easier tuning — adjust L (lightness), C (chroma), H (hue) independently

## Input Requirements
- Current color system or brand palette to convert
- Accessibility requirements (AA/AAA contrast targets)
- Design system context (Figma tokens, CSS variables, Tailwind)

## Output
- OKLCH color tokens (CSS custom properties)
- Accessibility contrast scores per token pair
- Color ramps (50–950 scale or custom)
- Migration guide from existing color system

## Token Structure
--color-brand-500: oklch(55% 0.18 260);
--color-brand-600: oklch(48% 0.18 260);
(L decreases consistently; C and H stay stable)

## Quality Criteria
Every interactive element color pair must meet WCAG AA (4.5:1 text, 3:1 UI). Lightness steps must be perceptually uniform. Semantic color tokens must be defined separately from primitive tokens.

## Edge Cases
- Brand colors that don't map cleanly to OKLCH gamut
- Dark mode variants where chroma must be reduced to avoid over-saturation
- Components with multiple color dependencies that cascade on change
- Browsers that partially support OKLCH (fallback strategy needed)

## Best Practices
- Define primitives (--color-blue-500) separately from semantics (--color-primary)
- Use OKLCH for ramp generation; output hex/hsl fallbacks for compatibility
- Test color tokens with a colorblind simulation before finalising
- Keep chroma consistent within a hue family — only vary L for ramps
- Document the OKLCH values alongside hex for design tool handoff
