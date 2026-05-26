---
title: Annex A — AI-specific assessment items
methodology_version: v1.0.0
parent: core.md
status: stable
license: CC BY 4.0
created: 2026-05-26
---

# Annex A — AI-specific Assessment Items

> Mandatory when the recommender being evaluated is an AI (LLM response). Eleven items, each Pass/Fail with evidence. **Failure of any single item triggers automatic Axis ⑤ (Hallucination) Fail.** When the recommender is a human, this annex does not apply, and Axis ⑤ runs on its five base items only (see `core.md` §3).

> **Why this annex exists separately.** v1.0.0 folded six AI-specific items into Axis ⑤. The author's adversarial pre-review surfaced that this both (a) under-detected the breadth of AI-specific failure modes, and (b) made Axis ⑤ unevenly heavy when the recommender happened to be an AI. v2 splits the AI-specific items into this annex, expands them to eleven, and makes any single Annex A failure equivalent to Axis ⑤ Fail without contaminating the base axis.

---

## A.1 Model identification

Pass criteria:

- Model name, version, call date, `temperature`, `top_p`, `max_tokens` — all disclosed
- System prompt preserved (when present)
- Call path disclosed (API / web / mobile app)
- **Evidence**: full call metadata block, copyable

Failure mode this catches: a recommendation produced under GPT-3.5 in 2023 with no system prompt cannot be reproduced or judged the same way as one produced under Claude Opus 4 in 2026 with a careful system prompt. Without identification, the recommendation cannot be situated in its model's known capability profile.

---

## A.2 Prompt reproducibility

Pass criteria:

- Original prompt text preserved (Markdown / HTML encoding stripped)
- **Three reproductions** performed under the same parameters; all three responses preserved
- For each of the three responses, the recommendation target (ticker / asset) is marked as: match / mismatch / partial match
- **Evidence**: the three full responses, side by side

Failure mode this catches: prompt-engineered cherry-picking. If the recommender ran the prompt twenty times until they got a clean recommendation, the published result is not representative.

---

## A.3 Answer-distribution stability (Stability Score)

Derived from A.2. Pass criteria:

| Distribution | Meaning | Pass criterion |
|---|---|---|
| 3/3 match | Model produces this recommendation stably | ⭕ Pass |
| 2/3 match | Model agrees by majority | △ Partial — answer distribution must be disclosed in body |
| 1/3 or 0/3 | Model produces unstable recommendations | ❌ Fail — the recommendation itself is an artifact of LLM non-determinism |

**The Stability Score must be public-facing** in the published evaluation. AI recommendation stability is itself reader information.

Failure mode this catches: the illusion of authority. A reader sees a single confident recommendation; the reader has no way to know that the same prompt, re-run, would have produced a different recommendation 67% of the time.

---

## A.4 Web search / RAG usage

Pass criteria:

- Web search tool usage disclosed (RAG vs pure training-data inference)
- If RAG was used, **all retrieved result URLs preserved** (to identify sources the model dropped from its citations)
- Tier distribution table for the RAG results (Tier 1 / 2 / 3 per `tier-rulebook.md`)
- **Evidence**: RAG retrieval log

Failure mode this catches: RAG sleight-of-hand. The model retrieves a Tier 1 source and a Tier 3 blog, then cites the blog because it phrased the claim more cleanly. Without the full retrieval log, the reader has no way to know.

---

## A.5 Training-data cutoff

Pass criteria:

- Model's training data cutoff estimated, with explicit handling of post-cutoff events
- Official model-card cutoff cited (URL)
- If the body references post-cutoff events **without** RAG having been used, this is automatic Fail (hallucination signal)
- **Evidence**: model-card URL, post-cutoff event handling note

Failure mode this catches: temporal confabulation. The model confidently discusses an event that occurred after its training cutoff, having actually invented the details.

---

## A.6 Non-existent-citation verification

Pass criteria:

- The AI has not recommended a non-existent **fund, ticker, report, paper, or news article**
- The evaluator personally verifies each cited source in the body
  - For ≤ 10 citations: **exhaustive verification** (no sampling)
  - For > 10 citations: **stratified random sample**, with sampling method documented (patch-pending — see §6 below)
- If even one citation refers to non-existent material → Verdict = Hallucinated, immediately at D+0

**Evidence**: per-citation verification log, marked verified / unverifiable.

Failure mode this catches: the canonical AI failure mode. Confident citation of a paper that does not exist, an analyst report that was never written, a fund ticker that does not trade. The most reliable predictor of recommendation worthlessness.

> **Patch-pending (v1.0.1):** earlier drafts required exhaustive verification regardless of citation count, which made evaluation of citation-heavy recommendations effectively impossible. The patched version permits stratified random sampling for > 10 citations, with sampling method disclosed. Until the patch ships, evaluators may proceed with exhaustive verification or note the sampling approach explicitly in the evaluation page.

---

## A.7 Tense and year accuracy

Pass criteria:

- AI tends to use "recently", "this year", "this quarter" relative to its cutoff, not the publication date. The body must use explicit year/quarter labels (e.g., "Q3 2024" ✓, "the most recent quarter" ✗)
- Every cited event has its actual occurrence date cross-checked against a primary source
- **Evidence**: timestamps cross-referenced

Failure mode this catches: a body that reads as currently relevant but is silently anchored to a 12-month-old training cutoff. Particularly dangerous in fast-moving sectors (semiconductors, regulatory environments, macro policy).

---

## A.8 Correlation-vs-causation confabulation

Pass criteria:

- AI tendency to compress correlation into causation must be checked
- When the body asserts "X causes Y" or "X drives Y", the body must offer a **causal mechanism**, not only a historical correlation coefficient
- A body that claims causation purely on historical correlation triggers Axis ⑥ (Causal Chain) Fail
- **Evidence**: extracted causal mechanism (one paragraph) or noted absence

Failure mode this catches: the most plausible-sounding form of AI economic narrative. "When the 10-year yield rises, gold falls" is a correlation, not a causal claim; many gold rallies have coincided with rising yields. Bodies that present such claims as mechanisms without naming the mechanism fail.

---

## A.9 Self-contradiction check

Pass criteria:

- Cross-check the three A.2 reproductions for **mutual contradiction**
- Example: response 1 says "buy SOXX", response 2 says "sell SOXX" — this is itself evidence against the recommendation's reliability
- Any contradiction discovered must be disclosed in the body
- **Evidence**: contradiction matrix across the three responses

Failure mode this catches: confident recommendations whose confidence is an artifact of single-sample reporting. A model that produces opposite recommendations on alternate runs cannot reasonably be cited as a source of conviction.

---

## A.10 Recursive-AI evaluation ban

Pass criteria:

- If a **second AI** is used to evaluate the recommendation (e.g., another LLM is asked to score the recommender's output), the second AI must also satisfy Annex A in full
- The use of a second AI in scoring must be disclosed in the evaluation frontmatter (`evaluator.ai_assist_in_scoring`)
- **Evidence**: second AI's metadata block, prompts, full responses

Failure mode this catches: the recursive hallucination trap. Evaluator AI accepts recommender AI's confabulation at face value, producing an "evaluation" that is itself confabulated. The cleanest case: an LLM is asked to verify that a cited paper exists, and the LLM hallucinates that yes, it does.

---

## A.11 Inter-rater trigger above public-influence threshold

Pass criteria:

- When the evaluated AI response has crossed a public-influence threshold, an **external evaluator** must participate
  - Threshold examples: recommender follower count ≥ 10,000 / citation count ≥ 100 / media mentions ≥ 5
- External evaluator's verdict and the operator's verdict are both reported, with **agreement / disagreement noted**
- Disagreement → one paragraph in the body explaining the source of disagreement
- **Evidence**: external evaluator's signed verdict block (or anonymized equivalent)

Failure mode this catches: the single-evaluator bias problem. A one-person evaluation of a million-follower recommender does not have the structural credibility to support a Verdict label by itself.

> **Open issue (catalogued in core.md §12):** the external evaluator pool is not yet constituted. Until it is, A.11 cannot be applied in practice. Evaluations of recommenders below the threshold proceed normally; evaluations of above-threshold recommenders must wait until the pool is operational.

---

## Annex A composite block (for the evaluation page)

```
[Annex A — AI-specific] (recommender is an AI)
 A.1 Model identification:           ✅/❌
 A.2 Prompt reproducibility (3x):     ✅/❌
 A.3 Stability Score:                 3/3 | 2/3 | 1/3 | 0/3
 A.4 RAG / web search:                used / not used
     (if used: Tier distribution: T1=N / T2=N / T3=N)
 A.5 Training cutoff:                 YYYY-MM-DD; post-cutoff events handled: ✅/❌
 A.6 Non-existent citations:          0 / N  (verification method: exhaustive / sampled)
 A.7 Tense and year accuracy:         ✅/❌
 A.8 Correlation-vs-causation:        ✅/❌  (causal mechanism present: ✅/❌)
 A.9 Self-contradiction:              ✅/❌  (contradictions disclosed: ✅/❌)
 A.10 Second AI in scoring:           none / used (Annex A applied to it: ✅/❌)
 A.11 Inter-rater (above threshold):  N/A / N evaluators, agreement X%
```

Any single Fail in A.1 – A.11 → automatic Axis ⑤ Fail in the main 6-axis sheet.

---

## Known limitations of Annex A

- **Cost.** Three reproductions × one large model (Claude Opus, GPT-4o) × per evaluation can run to a few dollars per evaluation. Not significant in absolute terms but should be tracked in `evaluator.llm_cost_incurred` frontmatter (patch-pending).
- **Reproducibility.** API model versions are sometimes silently revised by the provider. A "GPT-4o" response in March is not strictly the same model as a "GPT-4o" response in November. Where this matters, the provider's model snapshot ID should be preserved (`gpt-4o-2024-08-06` rather than `gpt-4o`).
- **Recommender prompt secrecy.** Many AI recommenders do not publish their prompts. In such cases, A.2 reproducibility cannot be performed by the evaluator, and the evaluation must either flag this as a structural limitation or wait for the recommender to disclose.

---

**End of Annex A.**
         