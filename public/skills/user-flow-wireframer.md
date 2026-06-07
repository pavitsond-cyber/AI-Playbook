
# User Flow Wireframer

## Skill Overview
**Domain:** Design  
**Purpose:** Generate wireframe specifications for multi-step user journeys. Focus on clarity, consistency, and comprehensive coverage of happy paths, error states, and edge cases.

**Description:**  
This skill equips designers to create complete user flow wireframes that can be implemented by engineering teams. Each flow includes screens, transitions, decision points, data inputs/outputs, error handling, and state variations. The goal is to ensure seamless and intuitive experiences for users across platforms.

---

## Methodology

1. **Define User Goal & Entry Points**  
   - Identify where the user starts the flow (homepage, deep link, email, push notification).  

2. **Map the Happy Path**  
   - Outline the ideal sequence of screens from entry to completion with minimal friction.  

3. **Identify Decision Points**  
   - Determine where users make choices that branch the flow (e.g., select date, choose variant, apply filter).  

4. **Design Each Screen**  
   - Define content hierarchy, key elements, primary CTA, secondary actions, and navigation patterns.  

5. **Map Error and Edge States**  
   - Specify what happens when something goes wrong at each step (out of stock, payment failure, network error).  

6. **Define Transitions**  
   - Specify how the user moves between screens (push, modal, drawer, inline expansion).  

7. **Identify Data Dependencies**  
   - Document information from previous steps that each screen requires.  

---

## Wireframe Specification per Screen

- **Screen Name and Purpose:** What the user does on the screen.  
- **Content Blocks:** Ordered list of content areas with placeholder descriptions.  
- **Primary Action:** Main CTA and its effect.  
- **Secondary Actions:** Back, skip, or alternative paths.  
- **State Variations:** Loading, empty, error, success.  
- **Data Inputs/Outputs:** What data is collected and displayed.  
- **Transitions:** Screen-to-screen navigation.  
- **Error States:** Recovery options and guidance for the user.  
- **Flow Diagram:** Visual representation of the screen within the overall journey.

---

## Quality Criteria

- Core flows should have ≤7 steps for critical tasks; each extra step reduces efficiency.  
- Every screen must include a clear back/escape path.  
- Error states must include recovery actions.  
- Loading states must be specified for screens fetching data.  
- Flows should remain cohesive with consistent visual and interaction patterns.

---

## Input Requirements

- **User Goal:** The task the user is trying to accomplish.  
- **Entry Points:** Possible starting locations for the user.  
- **Platform:** Web, iOS, Android, or cross-platform.  
- **Optional:** Technical/business constraints, existing patterns, analytics data.

---

## Edge Cases

- Authentication required mid-flow — preserve context during login or signup.  
- Mobile web users switching to app mid-flow — maintain state continuity via deep links or saved progress.  
- Real-time data dependencies — handle stale or unavailable data gracefully.  
- Multiple user personas — design branching flows optimized for different user types.  
- Third-party redirects — ensure return journeys and error handling are clear.

---

## Output Template

| Field | Description |
|-------|-------------|
| `screenName` | Name of the screen |
| `purpose` | User objective on this screen |
| `contentBlocks` | Ordered content sections with placeholders |
| `primaryAction` | Main CTA and its effect |
| `secondaryActions` | Back, skip, alternative paths |
| `stateVariations` | Loading, empty, error, success states |
| `dataInputs` | Data collected from the user |
| `dataOutputs` | Data displayed from prior steps |
| `transitions` | Screen-to-screen navigation |
| `errorStates` | Recovery guidance and fallback flows |
| `flowDiagram` | Visual representation within the journey |
