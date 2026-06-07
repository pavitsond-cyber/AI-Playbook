
# Persona Researcher Skill

## Overview
**Domain:** Knowledge Work / Research & Analysis  
**Purpose:** Conduct persona research by collecting, synthesizing, and analyzing data from Google Workspace applications to generate actionable persona insights.

**Description:**  
This skill allows AI agents to act as persona researchers, integrating with Google Workspace tools like Drive, Gmail, Calendar, Sheets, Docs, and Chat. It can gather relevant information, perform structured analysis, and produce synthesized outputs for product, UX, or marketing teams. The skill leverages AI agent capabilities for automated summarization and persona construction.

The skill is designed to dynamically access Google Workspace APIs via CLI, enabling real-time collection of documents, emails, calendar events, and sheets relevant to user research, and convert them into structured persona insights.

---

## Key Features

- Integrates with Drive, Gmail, Calendar, Sheets, Docs, and Chat.  
- Dynamically collects and aggregates data from multiple sources.  
- Analyzes user behavior, interactions, and communication patterns.  
- Generates synthesized persona profiles including needs, goals, and pain points.  
- Produces structured outputs ready for reports, presentations, or dashboards.  
- Supports AI agent workflows for automation and scalable research.

---

## Usage

Install via npx CLI:

```
npx skills add https://github.com/googleworkspace/cli --skill persona-researcher
```

Typical tasks include:

- Creating personas from user emails, meeting notes, and form responses.  
- Summarizing user trends and interactions across multiple Google Workspace apps.  
- Generating structured persona reports for stakeholders.  
- Automating data collection and aggregation for persona research projects.

---

## Methodology

1. Identify relevant data sources within Google Workspace (emails, documents, sheets, calendar events).  
2. Collect and clean data to focus on relevant user information.  
3. Analyze user patterns, behaviors, goals, and pain points.  
4. Synthesize findings into structured persona profiles.  
5. Format outputs for presentation or further research use.

---

## Input Requirements

- **Workspace Data Sources:** Google Docs, Sheets, Gmail threads, Calendar events, Drive files.  
- **Research Focus:** Target personas or user types.  
- **Output Format:** Structured persona profile, summary report, or presentation-ready document.  
- **Optional:** Filters by date range, user segment, or project.

---

## Output Structure

| Field | Description |
|-------|-------------|
| `personaName` | Generated name or label for the persona |
| `userSegment` | Segment or type of users analyzed |
| `goals` | Key goals of the persona |
| `painPoints` | Main pain points or challenges |
| `behaviors` | Observed behaviors and patterns |
| `preferences` | Noted preferences or choices |
| `sourceReferences` | Links or citations of analyzed Workspace data |
| `summaryInsights` | Concise synthesis of persona characteristics |
| `actionableRecommendations` | Suggested actions or strategies based on persona findings |

---

## Edge Cases

- Multiple personas in overlapping data — skill prioritizes relevant segment information.  
- Conflicting or incomplete data — highlights uncertainty and recommends follow-up research.  
- Multi-team or cross-functional data — normalizes terminology and context for clarity.  
- International users or multiple languages — ensures accurate interpretation of textual data.
