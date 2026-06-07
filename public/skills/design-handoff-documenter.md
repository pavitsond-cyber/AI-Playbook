
# Design Handoff Documenter – Senior & Lead Designer Guide

## Skill Overview
**Domain:** Design  
**Purpose:** Generate developer-ready specifications from design files with precise measurements, interactions, and tokens. Focus on clarity, completeness, and accuracy to ensure smooth handoff between design and development.

**Description:**  
This skill equips designers to create a comprehensive handoff document for developers, detailing measurements, interactions, animations, responsive behavior, assets, and interactions. The goal is for developers to implement the design pixel-perfectly without ambiguity or repeated clarification.

---

## Methodology

1. **Visual Element Documentation**  
   - Record all visual elements with exact measurements: position, size, padding, margins, border, shadow, opacity.  

2. **Token Mapping**  
   - Map all values to design tokens: e.g., `color-primary`, `spacing-4`, `radius-lg`.  

3. **Interactive States**  
   - Specify every state for interactive elements: default, hover, active, focus, disabled, loading.  

4. **Animations & Transitions**  
   - Document triggers, duration, easing, properties, start/end states.  

5. **Responsive Behavior**  
   - Define layout adjustments at each breakpoint and which elements remain unchanged.  

6. **Assets**  
   - Provide images, icons, and illustrations with exact dimensions, format, compression, and download-ready links.

---

## Handoff Document Structure

- **Component Inventory**: List each unique component with token mappings.  
- **Layout Spec**: Grid, container widths, breakpoint behavior.  
- **Interaction Spec**: State changes, transitions, micro-interactions.  
- **Asset Spec**: Images, icons, illustrations, download-ready files.

---

## Quality Criteria

- Every measurement must reference a design token; avoid arbitrary pixel values.  
- Interactive states must cover all scenarios, including error, empty, and loading.  
- Animations must include duration and easing details.  
- The handoff should allow developers to implement the design fully without asking follow-up questions.

---

## Input Requirements

- **Design File URL or Screenshots**: Figma, Sketch, or equivalent.  
- **Component Scope**: Full page, section, or single component.  
- **Design System Reference**: Token mappings and guidelines.  
- **Optional**: Interaction notes, frontend framework (React, Swift, Kotlin, Flutter).

---

## Edge Cases

- Custom components not in the library → document fully and flag for inclusion.  
- Animated behaviors not obvious in static designs → provide prototype or video reference.  
- Data density variations → document behavior for extremes (1 item vs 100 items).  
- Fonts without web licenses → flag and suggest fallbacks.  
- Third-party UI integrations → clarify boundaries of design implementation.

---

## Output Template

| Field | Description |
|-------|-------------|
| `componentName` | Name of the component |
| `measurements` | Position, size, padding, margin, border, shadow, opacity |
| `tokenMappings` | Mapping of design values to tokens |
| `interactiveStates` | Default, hover, active, focus, disabled, loading |
| `animations` | Trigger, duration, easing, start/end states |
| `responsiveBehavior` | Behavior changes across breakpoints |
| `assetList` | Images, icons, illustrations with dimensions and formats |
| `implementationNotes` | Additional guidance or developer instructions |

---

## Best Practices for Senior & Lead Designers

- Prioritize completeness and measurable accuracy over subjective opinions.  
- Document all edge cases including errors, empty states, and loading states.  
- Reference design tokens for all measurements and colors.  
- Provide developers with all information needed for pixel-perfect implementation.  
- Maintain clarity in responsive behavior, interactive states, and implementation details.  
