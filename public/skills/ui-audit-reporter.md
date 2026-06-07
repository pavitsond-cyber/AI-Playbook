
# UI Audit Reporter – Senior & Lead Designer Guide

## Skill Overview
**Domain:** Design  
**Purpose:** Audit screens for visual consistency, spacing, and design system compliance at a senior or lead level. Focus on measurable, high-impact issues that affect usability, accessibility, and visual cohesion.  

**Description:**  
This skill enables designers to perform a structured UI audit, identifying violations of a design system, visual inconsistencies, spacing errors, typography mismatches, and accessibility gaps that degrade the user experience. Senior designers can use this to ensure product screens meet high-quality standards and remain consistent across multiple platforms.

---

## Methodology

1. **Analyze Against Design System**  
   - Compare screens or components against tokens for color, spacing, typography, border radius, shadows, and components.  
   - Flag undocumented or one-off components.  

2. **Visual Consistency Check**  
   - Ensure similar elements behave and appear identically across screens.  
   - Verify interaction patterns are consistent.  

3. **Spacing & Alignment**  
   - Check padding, margins, and gaps against the design system’s scale (e.g., 4, 8, 12, 16, 24, 32, 48px).  

4. **Typography**  
   - Confirm headings, body text, labels, captions follow the correct font size, weight, and line height.  

5. **Color Usage**  
   - Validate semantic colors (primary, destructive, muted) and ensure sufficient contrast ratios for accessibility.  

6. **Responsive Behavior**  
   - Assess screen adaptation across breakpoints and platforms (web desktop, web mobile, iOS, Android).  

---

## Audit Categories

| Category       | Description |
|----------------|-------------|
| **Consistency** | Components look and behave identically across screens |
| **Spacing**     | All spacing follows the design system scale |
| **Typography**  | Font sizes, weights, line heights match the type scale |
| **Color**       | Semantic colors used correctly; sufficient contrast |
| **Components**  | Standard components used; avoid custom one-offs |
| **Accessibility** | Touch targets ≥44px; contrast ≥4.5:1; focus indicators visible |

---

## Quality Criteria

- Each finding must include: element, current state, expected state, location reference, design token reference, recommendation.  
- Prioritize findings:  
  - **Critical:** breaks usability  
  - **Major:** noticeable inconsistency  
  - **Minor:** polish or refinement  
- Group related issues to avoid repetition across multiple screens.  

---

## Input Requirements

- **Screen URL / Figma Link**: The UI to audit.  
- **Design System Reference**: Tokens, components, guidelines.  
- **Audit Scope**: Full screen, specific component, or specific category.  
- **Optional**: Platform, previous audit, known exceptions.  

---

## Edge Cases

- Component not yet in design system → flag as undocumented.  
- Screen built on outdated design system version → note version.  
- Dark mode may have different issues → audit separately.  
- Campaign-specific deviations → verify exceptions.  
- Accessibility contrast failures caused by background images → suggest overlays rather than only flagging.

---

## Output Template

| Field | Description |
|-------|-------------|
| `findingId` | Unique ID for the finding |
| `category` | Audit category (Consistency, Spacing, Typography, etc.) |
| `severity` | Critical / Major / Minor |
| `element` | Element under review |
| `currentState` | How it currently appears |
| `expectedState` | How it should appear per design system |
| `location` | Screenshot or Figma reference |
| `designTokenReference` | Token reference or style guide link |
| `recommendation` | Suggested corrective action |  

---

## Best Practices for Senior & Lead Designers

- Focus on measurable and high-impact issues rather than subjective preferences.  
- Verify consistency across multiple screens before marking a finding.  
- Include references to design tokens and system guidelines for each recommendation.  
- Always consider accessibility and responsiveness in audits.  
- Use grouped reporting to reduce redundancy and improve clarity for engineering teams.  
