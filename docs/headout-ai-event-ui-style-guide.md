# Headout AI Event UI Style Extraction

Source: [`aromalashok-ho/headout-ai-event`](https://github.com/aromalashok-ho/headout-ai-event)  
Revision inspected: `5cdddc1` (`main`, fetched June 12, 2026)  
Stack: Next.js 16.2.9, React 19.2.4, Tailwind CSS 4, Lucide

This document extracts the repository's visual system and reusable UI recipes.
The companion file [`styles/headout-ai-event-ui.css`](../styles/headout-ai-event-ui.css)
contains portable tokens, materials, controls, and motion primitives.

## 1. Visual Direction

- Mobile-first, event-focused experience presented as a centered app surface.
- Cinematic underwater imagery behind a dark navy legibility wash.
- White typography with low-opacity secondary text.
- Frosted and refractive glass for cards, circular controls, and overlays.
- Large, low-weight display headlines paired with restrained text typography.
- Rounded geometry throughout: 8px fields, 12px media, 16px cards, pill CTAs.
- Motion communicates depth: content rises on entry and pages slide horizontally.

## 2. Design Tokens

### Color

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#0e1439` | Main background, dark text on white CTAs |
| `ink` | `#141b34` | Secondary dark brand color |
| `glow-pink` | `#ff7ad5` | Pink accent |
| `glow-rose` | `#f692a8` | Ratings and error accent |
| `card` | `rgba(255,255,255,.04)` | Quiet translucent surface |
| `card-border` | `rgba(255,255,255,.10)` | Default translucent border |
| Primary text | `#fff` | Headlines and important labels |
| Secondary text | `rgba(255,255,255,.90)` | Body copy |
| Tertiary text | `rgba(255,255,255,.60)` | Metadata and supporting labels |
| Placeholder | `rgba(255,255,255,.40)` | Form placeholders |

The source rarely introduces extra hues. Hierarchy comes from white opacity,
surface translucency, blur, and typography rather than a broad palette.

### Typography

**Display:** `halyard-display`, generic sans-serif fallback  
**Text:** `halyard-text`, generic sans-serif fallback

| Role | Family | Size | Weight | Line height |
| --- | --- | --- | --- | --- |
| Landing headline | Display | 38px | 400 | 1.1 |
| Inner-page H1 | Display | 42px | 400 | 1.1 |
| Section title | Display | 24px | 500 | 1.2 |
| Docked title | Display | 20px | 500 | 26px |
| Card/item title | Display | 18-20px | 500 | 26px |
| Button/label | Display | 16px | 500 | normal |
| Body | Text | 16px | 300 | 1.5 |
| Metadata | Text | 14px | 300 | normal |
| Helper label | Text | 12px | 300 | normal |

Display type carries titles, buttons, tabs, and labels. Text type carries
descriptions, form input, metadata, and helper copy.

### Spacing And Shape

- App width: `430px` maximum.
- Horizontal page padding: `24px`.
- Top page padding: safe area plus `32px`.
- Bottom page padding: safe area plus `40px`.
- Header-to-content gap: `48px`.
- Major section gap: `32px`.
- Landing headline/card-region gap: `36px`.
- Card stack gap: `20px`.
- Standard card padding: `20px`.
- Main card radius: `16px`.
- Media/button-panel radius: `12px`.
- Input radius: `8px`.
- Pill controls: `9999px`.
- Circular icon control: `44px`.

Safe-area values are used on the shell, sticky header, sheets, and lightboxes.

## 3. Page Shell

The entire experience is framed by a reusable shell:

```text
relative min-height: 100dvh
  fixed full-viewport brand background
  centered 430px content column
    header
    48px top gap
    page content
```

Landing pages use a fixed looping video with two overlay washes:

```css
linear-gradient(to bottom, rgba(14,20,57,.9), rgba(14,20,57,.4), rgba(14,20,57,.7))
linear-gradient(to right, rgba(14,20,57,.65), rgba(14,20,57,.1), transparent)
```

Text-heavy inner pages replace the video with a static full-column image. That
image lives inside the transitioning page column, so it moves with the page.

## 4. Glass Material

The common `.frost-surface` recipe is:

```css
background: rgba(255, 255, 255, 0.12);
border: 1px solid rgba(255, 255, 255, 0.18);
backdrop-filter: blur(28px) saturate(160%);
box-shadow: 0 3px 10px -8px rgba(0, 0, 0, 0.3);
```

Hover raises the fill to `.17` and slightly deepens the shadow.

The source adds two engine-specific enhancements:

1. Chromium builds a rounded-rectangle SVG displacement map and applies it to
   `backdrop-filter` for edge refraction.
2. Safari uses a three-stop translucent gradient, a 20px blur, an inset top
   highlight, and a faint inset ring to imitate the material.

Important implementation detail: an opacity-animated ancestor becomes a
backdrop root and can stop glass from seeing the fixed background. The source
therefore makes card wrappers transform-only in Chromium and fades inner layers.

## 5. Component Recipes

### Navigation Card

- Frost surface, 16px radius, clipped overflow.
- Two-line card padding: `16px 24px 16px 16px`.
- Title-only card padding: `20px`.
- Title: 18px display medium, 26px line height.
- Subtitle: 16px text light, 85% white.
- Content reserves `56px` on the right for decoration.
- Optional external arrow shifts `2px` up and right on hover.
- Decorative SVG icon is used as a CSS mask:
  - `78px` square
  - `15deg` rotation
  - offset `-18px` bottom and `-14px` right
  - white at 40%
  - 3px backdrop blur

### Back/Close Control

- 44px circle.
- Frost surface.
- 24px back icon or 20px close icon.
- White foreground.
- 40% white focus outline with 2px offset.

### Sticky Header

- Sticks at safe-area top plus 32px.
- When the main title scrolls away, a 20px docked title fades and slides in.
- A navy `.85` blurred backdrop grows behind the header.
- The bottom 62px of the backdrop fades out with a mask gradient.

### Content Card

- Frost surface, 16px radius, 20px padding.
- Section eyebrow: 18px display medium at 60% white.
- Rows separated by `rgba(255,255,255,.08)`.
- Row gap and separator padding: 24px.
- Item title: 20px display medium.
- Body: 16px text light at 90% white.

### Primary CTA

- Full-width pill.
- White background, `night` foreground.
- `24px 14px` padding.
- 16px display medium.
- Optional 16px icon.
- Hover: white at 90%.
- Disabled: 60% opacity.

### Form Fields

- Full width, 8px radius.
- `rgba(255,255,255,.04)` fill.
- `rgba(255,255,255,.10)` border.
- `16px 12px` padding.
- 16px text light.
- Focus: border `.30`, fill `.06`, no default outline.
- Textareas are fixed-height and not resizable.
- Labels are 16px display medium with 12px vertical field gap.

### Rating

- Five 32px Lucide stars.
- Inactive: white at 30%.
- Active: `glow-rose` stroke and fill.
- Each star has a padded, keyboard-focusable button target.

### Segmented Control

- Full-width pill with 1px white/15 border and white/5 fill.
- 4px inner padding.
- A white active pill occupies half the width.
- Active pill slides in 300ms using `cubic-bezier(.32,.72,0,1)`.
- Active text uses `night`; inactive text uses white/70.

### Bottom Sheet

- Mobile width capped at 430px.
- Top corners: 24px.
- `night` at 90%, 24px backdrop blur.
- Top border white/15.
- Upward shadow: `0 -12px 40px -12px rgba(0,0,0,.6)`.
- Backdrop: black/50 plus medium blur.
- 40px by 4px drag handle at white/25.
- Drag dismiss threshold: 110px.
- Entrance: 400ms spring-like slide up.
- Exit: 280ms ease-in slide down.

### Floorplan Lightbox

- Full viewport at `night`/95.
- 44px frosted close control.
- White/10 helper pill at the safe-area bottom.
- Supports pinch zoom, wheel zoom, drag pan, and double-tap zoom.
- Scale range is 1x to 5x; double-tap target is 2.5x.

## 6. Motion System

| Motion | Duration | Easing | Behavior |
| --- | --- | --- | --- |
| Background video fade | 700ms | default | Opacity 0 to 1 |
| Content reveal | 700ms | `.22,1,.36,1` | Fade + rise 16px |
| Card rise | 1300ms | `.22,1,.36,1` | Rise 32px, 150ms stagger |
| Page navigation | 420ms | `.32,.72,0,1` | Directional slide + 26% parallax |
| Bottom sheet in | 400ms | `.32,.72,0,1` | Slide from bottom |
| Bottom sheet out | 280ms | ease-in | Slide to bottom |
| Embedded frame reveal | 450ms | ease, 350ms delay | Fade |
| Tab/media crossfade | 200-300ms | default | Opacity |

Forward navigation slides the new page from the right while the old page drifts
left by 26%. Back navigation reverses that relationship. The fixed video remains
stationary. Native browser swipe gestures suppress the custom transition.

The `page` view-transition group has its default animation disabled, while both
old and new snapshots use `height: auto` and `width: 100%`. This prevents the
browser from morphing page height or vertical position when routes have different
content heights or scroll offsets; only the authored X-axis motion remains.

Every animation and transition is effectively disabled under
`prefers-reduced-motion: reduce`.

## 7. Responsive Strategy

This is intentionally a phone-sized experience rather than a fluid desktop
layout. On wide screens, the app remains a centered 430px column. `dvh`/`lvh`
and safe-area insets address mobile browser chrome and notched devices.

The background remains viewport-sized, while page content scrolls independently.
Overlays and sheets are full viewport but cap their visible card to 430px.

## 8. Interaction And Accessibility

- Dialogs use `role="dialog"` and `aria-modal="true"`.
- Escape closes sheets and lightboxes.
- Page scrolling is locked while overlays are open.
- Focus-visible rings are explicit on cards, stars, map preview, and controls.
- Rating uses radio semantics and descriptive labels.
- Decorative images/icons are hidden from assistive technology.
- Text selection is disabled globally for the event-like touch experience, but
  restored for inputs, textareas, and selects.
- Interactive elements are excluded from the tap-generated bubble effect.
- Reduced-motion preferences are honored globally and for view transitions.

## 9. Asset Treatment

- Background video uses `object-fit: cover`, position `68% 60%`, scale `1.2`,
  and transform origin `78% 100%`.
- A static fallback appears only when autoplay is rejected.
- Content images use 16:9 framing, cover behavior, 16px radius, and white/10 border.
- Brand icons stay monochrome and become translucent glass masks.
- Lucide icons use 1.5px to default stroke weight, usually at 16-24px.

## 10. Source Map

The styling is primarily defined in:

- `src/app/globals.css`: fonts, tokens, glass, view transitions, reveals, sheet,
  and bubble effects.
- `src/components/EventShell.tsx`: width, safe areas, backgrounds, and page frame.
- `src/components/LinkCard.tsx`: navigation-card and masked-icon recipe.
- `src/components/LiquidGlass.tsx`: Chromium refraction and Safari detection.
- `src/components/StickyHeader.tsx`: docked-title treatment.
- `src/components/ArExperienceSheet.tsx`: sheet, tabs, imagery, and CTA.
- `src/components/FeedbackForm.tsx`: fields, ratings, errors, and success state.
- `src/components/FloorplanViewer.tsx`: preview and full-screen image viewer.
- `src/components/LandingContent.tsx`: staged entrance choreography.

## 11. Adoption Notes

- Prefer self-hosting all licensed Halyard weights. The source mixes one local
  display file with Adobe Typekit URLs, which adds a runtime network dependency.
- Import the companion CSS once from the root layout or merge its tokens into
  the existing Tailwind `@theme` block.
- Apply `.headout-event-theme` to a route-level wrapper instead of `body` when
  adopting the visual language for only part of an existing site.
- Use `.hai-frost`, `.hai-card`, `.hai-primary-button`, and `.hai-field` as the
  portable equivalents of the source recipes.
- Keep the source's backdrop-root constraint in mind before combining glass
  with transforms, filters, opacity animations, or persistent view-transition
  names.
