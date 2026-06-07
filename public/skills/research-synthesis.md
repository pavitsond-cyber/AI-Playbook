
# Research Synthesis Skill

## Overview
**Domain:** Knowledge Work / Research & Analysis  
**Purpose:** Automate and enhance research synthesis by summarizing, organizing, and analyzing data from multiple sources, delivering actionable insights for decision-making.

**Description:**  
This skill enables AI agents to act as a research assistant capable of handling complex workflows, synthesizing large amounts of data, generating summaries, and producing structured outputs. It is intended to streamline knowledge work for research, competitive analysis, product discovery, or strategy planning.

The skill bundles connectors, slash commands, and sub-agents to allow the AI to pull relevant information from multiple tools, process it, and present clear, actionable summaries.

---

## Key Features

- Collect information from multiple sources and databases (Slack, Notion, Jira, Asana, Figma, Amplitude, etc.).  
- Summarize and organize research into coherent structures.  
- Synthesize insights across datasets and documents.  
- Produce structured outputs for reports, presentations, or strategic documents.  
- Support slash commands and workflow integration for automation in collaborative environments.  
- Provide actionable recommendations based on analyzed data.

---

## Usage

Install via npx CLI:

```
npx skills add https://github.com/anthropics/knowledge-work-plugins --skill research-synthesis
```

Typical tasks include:

- Synthesizing research findings from user interviews, surveys, or experiments.  
- Building competitive battlecards from market research data.  
- Preparing executive summaries or stakeholder-ready reports.  
- Tracking trends and insights across multiple data sources.  
- Auto-generating structured knowledge bases for team reference.

---

## Methodology

1. Identify relevant sources of data and research materials.  
2. Extract key information and categorize by relevance and topic.  
3. Summarize findings into concise notes.  
4. Cross-analyze data to detect patterns, anomalies, and actionable insights.  
5. Format the output according to the target format (report, dashboard, brief, or presentation).  

---

## Input Requirements

- **Research Data Sources:** URLs, documents, datasets, or integrated tool connectors.  
- **Focus Areas:** Specific topics, questions, or goals for the synthesis.  
- **Output Format:** Structured report, summary, brief, or visualization template.  
- **Optional:** Filters, date ranges, or audience specifications.

---

## Output Structure

| Field | Description |
|-------|-------------|
| `summary` | Concise summary of key insights |
| `actionableInsights` | List of recommended actions or decisions |
| `sourceReferences` | Links or citations of the data sources used |
| `synthesisMethod` | Methodology used to aggregate and analyze data |
| `keyFindings` | Highlighted trends, patterns, or discoveries |
| `visualizations` | Optional charts, tables, or diagrams to support insights |
| `limitations` | Notes on any gaps, uncertainties, or assumptions |

---

## Edge Cases

- Data sources with conflicting or inconsistent information — provide reconciled summary and note uncertainties.  
- Large volumes of unstructured data — prioritize key findings using relevance scoring.  
- Cross-functional or multi-team inputs — normalize terminology and context for clarity.  
- Time-sensitive research — highlight recent and high-impact findings first.  
- Multi-language or international sources — ensure synthesized insights are accurate across languages.

---

## Best Practices

- Always document source references for traceability.  
- Highlight actionable items for decision-making efficiency.  
- Keep outputs concise, clear, and structured for stakeholder consumption.  
- Maintain consistent formatting and methodology for repeatable processes.  
- Validate synthesis accuracy by cross-checking critical data points.
