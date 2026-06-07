
# Design Taste Frontend v1

## Overview
**Domain:** Frontend Design / AI Agent UI Enhancement  
**Purpose:** Upgrade AI-generated interfaces to have strong layout, typography, motion, and spacing. Avoid generic or boilerplate-looking UIs.

**Description:**  
This skill helps evaluate and guide frontend design taste. It ensures that design decisions for UI components follow consistent aesthetic standards, improving visual hierarchy, motion, spacing, and typographic quality. It can be paired with AI image generators (ChatGPT Images, Midjourney) to create reference boards and then hand off frames to Codex, Cursor, or Claude Code for implementation.

---

## Features

- Anti-slop design guidance for AI-generated UIs.
- Layout evaluation: ensure elements are well-aligned and visually balanced.
- Typography guidance: correct font scale, weight, and line height for hierarchy.
- Motion and animation recommendations for natural interaction feedback.
- Spacing guidance to reduce visual clutter and emphasize hierarchy.
- Optional image-generation reference boards for web, mobile, and brand kits.

---

## Usage

Install via npx CLI:

```
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
```

After installation, the skill can be used to:

- Review AI-generated interfaces for visual quality and taste.
- Suggest layout improvements for spacing, alignment, and hierarchy.
- Recommend typographic adjustments for readability and hierarchy.
- Suggest subtle motion or animation adjustments for interaction polish.
- Generate reference frames for frontend implementation.

---

## Notes

- This is the v1 skill; the default skill is now v2 (experimental). You can explicitly install v1 to maintain behavior consistency.
- Skill is designed to be compatible with AI agents, code generation tools, and human review workflows.
- The skill does not depend on any external token or cryptocurrency project.

---

## Edge Cases

- Highly complex AI-generated UIs where multiple elements compete for attention.
- Components with varying proportions across responsive breakpoints.
- Interfaces generated for multiple platforms (web, mobile) simultaneously.
- Pages with large amounts of text or content where hierarchy may be less clear.
- Intentional creative deviations from typical layout or style; skill should evaluate purpose rather than penalize innovation.

