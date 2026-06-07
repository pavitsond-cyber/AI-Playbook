
# Localization QA Agent

## Skill Overview
**Domain:** Product / Content Localization  
**Purpose:** Check translated product content for accuracy, fluency, tone, and cultural appropriateness.

**Description:**  
This skill helps review translated content against the source language version. It evaluates whether translations maintain factual accuracy, consistent tone, natural fluency, and cultural relevance. The goal is to ensure high-quality translations that match the intended intent and user expectations.

---

## Methodology

1. **Compare Translations Against Source**  
   Evaluate across these dimensions:
   - **Accuracy:** Are factual details correct? (prices, times, locations, inclusions)  
   - **Completeness:** Is any content missing?  
   - **Tone:** Does it match the intended brand voice? (enthusiastic but not hyperbolic, informative but engaging)  
   - **Fluency:** Does it read naturally in the target language?  
   - **Cultural adaptation:** Are culturally specific references handled correctly? (measurements, date formats, norms)  
   - **SEO:** Are target-language keywords included naturally?  

2. **Score Each Dimension**  
   Pass, minor issue, major issue, critical error.  

3. **Classify Overall Quality**  
   - **Publish-ready:** No issues or only minor stylistic preferences  
   - **Needs editing:** Minor issues requiring a native speaker fix  
   - **Needs retranslation:** Major accuracy or fluency issues  

4. **Report Issues**  
   For each problem, provide: the text, the problem, and a suggested correction.

---

## Quality Criteria

- Accuracy issues are critical — incorrect prices, times, or policies can harm users.  
- Assess likelihood of machine-generated vs human translations.  
- Verify proper nouns are handled correctly (some should translate, some not).  
- Ensure UI text fits display constraints.

---

## Input Requirements

- **Source Content:** Original product text (usually English)  
- **Translated Content:** Target language translation to review  
- **Target Language:** e.g., Spanish, French, Japanese  
- **Content Type:** title, description, highlights, FAQs, policy  
- **Optional:** Target market/region (e.g., Latin America vs Spain for Spanish)

---

## Output Format

| Field | Description |
|-------|-------------|
| `overallQuality` | Overall translation quality |
| `accuracyScore` | Score for factual accuracy |
| `fluencyScore` | Score for readability and natural language |
| `toneScore` | Score for tone consistency |
| `culturalAdaptationScore` | Score for cultural appropriateness |
| `issues` | Description of each issue |
| `issueType` | Accuracy, tone, fluency, cultural, SEO |
| `issueSeverity` | Minor, major, critical |
| `originalText` | Source text |
| `translatedText` | Translation text |
| `suggestedCorrection` | Recommended fix |
| `translationMethod` | Human or machine-generated |

---

## Edge Cases

- Regional differences in language (e.g., European vs Latin American Spanish)  
- Puns or culturally specific phrases that require adaptation  
- Translations longer than source content, potentially breaking layout  
- Machine-like monotone translations lacking engaging tone  
- Errors in source content — flag but do not propagate into translation
