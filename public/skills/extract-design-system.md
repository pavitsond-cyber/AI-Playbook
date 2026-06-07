
# Extract Design System Skill

## Overview
**Domain:** Design / Frontend Engineering  
**Purpose:** Reverse-engineer design tokens (colors, typography, spacing, border radius, shadows) from any public website and generate starter JSON and CSS custom properties for local projects.

**Description:**  
This skill allows AI agents or developers to extract a starter design system from a website. It produces normalized token files, CSS custom properties, and JSON outputs ready for integration into local projects. It works as a CLI tool or AI agent workflow (Claude, Cursor, Codex).

---

## What It Extracts

| Token Category | Examples |
|----------------|---------|
| Colors         | Brand palette, backgrounds, text, borders |
| Typography     | Font families, sizes, weights, line heights |
| Spacing        | Padding and margin scale |
| Border Radius  | Button, card, pill radii |
| Shadows        | Box-shadow values across elevation levels |

Outputs a W3C-compatible `tokens.json` and a `tokens.css` file of CSS custom properties, ready to drop into any project.

---

## Quick Start

Install the skill:

```
npx skills add arvindrk/extract-design-system --skill extract-design-system
```

Run it from a supported coding agent or CLI with a public website URL:

```
Extract the design system from https://stripe.com and generate starter token files for this project.
```

Expected outputs:

- `.extract-design-system/raw.json`
- `.extract-design-system/normalized.json`
- `design-system/tokens.json`
- `design-system/tokens.css`

---

## Methodology

1. Analyze a public website for visual primitives.  
2. Extract raw design tokens for color, typography, spacing, radius, and shadows.  
3. Normalize outputs into a stable JSON structure.  
4. Generate local CSS custom properties.  
5. Summarize findings for review and further styling or application changes.

---

## Use Cases

- Quickly bootstrap a design system from an existing website.  
- Generate starter token files for new projects or prototypes.  
- Feed extracted tokens into design-to-code workflows with AI agents.  
- Compare and adapt visual styles from competitors or reference products.

---

## Notes

- Skill is standalone or integrates with AI agents (Claude, Cursor, Codex).  
- Designed for repeatable, agent-based extraction workflows.  
- Outputs can be used directly in local projects or as a base for further styling.

