# Shape
**Author:** pbakaus
**Domain:** Systems & Quality
**Purpose:** Structured design interview that produces an actionable brief before any coding starts. Senior IC and lead-level thinking before building.

## What It Does
Runs a structured problem framing session that produces a proper design brief. Prevents the most common failure mode in design engineering: building the wrong thing well.

## Input Requirements
- Feature or problem to brief
- Existing context, constraints, and stakeholder requirements
- Team context: solo, squad, or cross-functional

## Output
- Problem statement (what are we actually solving?)
- Success criteria (how do we know if it worked?)
- Constraints (technical, time, design system, business)
- Out-of-scope (what are we explicitly not doing?)
- Open questions (what must be resolved before building?)

## Brief Structure
1. User need — what is the user actually trying to do?
2. Business goal — what does success look like for the product?
3. Constraints — time, tech, system, regulatory
4. Design principles — what values guide decisions when tradeoffs appear?
5. Scope — what's in, what's out, what's deferred?

## Quality Criteria
A complete brief must have a falsifiable success metric. Constraints must be explicit. Open questions must be assigned to someone. Scope must define what is not being built.

## Edge Cases
- Feature requests that are solutions disguised as problems
- Stakeholder requirements that contradict each other
- Time constraints that force scope cuts — document them explicitly
- Requests with no clear user need — flag before proceeding

## Best Practices
- Never start coding before the brief is approved
- A brief that takes 30 minutes saves days of misdirection
- Constraints are as important as goals — document them first
- Write success criteria in measurable terms
- Brief for the user's job, not the feature's functionality
