# Make Interfaces Feel Better
**Author:** jakubkrehel
**Domain:** Motion & Interaction
**Purpose:** Polish micro-interactions, typography details, and visual refinements that make interfaces feel noticeably more considered.

## What It Does
Targets the small, high-leverage details that make an interface feel crafted: hover state quality, focus ring design, typography kerning, icon alignment, transition feel, and the dozens of micro-decisions that users never consciously notice — but definitely feel.

## Input Requirements
- Interface or component to improve
- Current implementation
- Target quality level or reference

## Output
- Micro-interaction improvement list
- Typography refinements (size, weight, leading, tracking)
- Visual detail polish with before/after
- Priority: quick wins vs. deeper work

## What Gets Checked
- Hover states: are they instant or delayed? Are they meaningful?
- Focus indicators: visible, intentional, not just browser default
- Typography: optical alignment, kerning, consistent scale
- Icon alignment: pixel-perfect vertical alignment with text
- Loading skeletons: do they match the shape of real content?
- Scroll behaviour: smooth, snappy in the right places
- Input feedback: immediate confirmation of user action

## Quality Criteria
Hover states must be immediate (no delay). Focus indicators must be visible and intentional. Typography must be optically aligned. Every interaction must provide visible feedback.

## Edge Cases
- Components where micro-interactions feel out of place (data tables)
- Interfaces where users move fast and hover states are irrelevant
- Touch interfaces where hover states never trigger
- Accessibility requirements that override custom focus styles

## Best Practices
- Hover states: change 1–2 properties max — subtlety beats drama
- Focus rings: custom is better than browser default; don't remove them
- Typography: use optical sizing for large display text
- Align icons to cap height, not baseline or middle
- Loading states must match real content dimensions exactly
