---
title: AI Recommendation Verification Standard (AIRVS) — v1.0.0
abbreviation: AIRVS
methodology_version: v1.0.0
status: stable
license: CC BY 4.0
maintainer: Mincheol Kim, MC AI Labs (mckim890@gmail.com)
created: 2026-05-26
updated: 2026-05-26
applicable_track: "L1 (external recommendation review) only"
scoring_model: "process-pf-6axis + macro-micro-3tier + outcome-4point-timeseries + verdict-5label-vocabulary (decision rule is implementer-defined)"
related:
  - WHY.md
  - CHANGELOG.md
  - annex-a-ai.md
  - tier-rulebook.md
  - PEER-REVIEWS/internal-3-persona-review.md
reference_implementations:
  - "MC AI Labs decision rule (separate repository: mc-ai-labs-airvs-implementation/)"
breaking_change_policy: "Breaking changes (axis count, Pass criterion model, verdict-label vocabulary, outcome timepoints, scope split, decision-rule disclosure requirements) are reserved for future MAJOR versions (v2.0.0+) and require external peer review per §11. PATCH and MINOR changes do not require peer review. Changes to a specific implementer's decision rule do not change the AIRVS version."
---

# AI Recommendation Verification Standard (AIRVS) — v1.0.0

> A standard for evaluating *external AI-generated investment recommendations* across four independent dimensions: **(1) a 6-axis Process Pass/Fail** with mandatory evidence, **(2) macro/micro coherence** in three tiers, **(3) outcome time-series** at four time points with drawdown trajectory, and **(4) a five-tier Verdict label vocabulary**. Applies to all asset classes without branching. The four dimensions are not summed into a total score; they remain independent records on the published evaluation page. The Verdict label summarizing those records is produced by a **decision rule that each evaluator publishes themselves** — the standard defines *the label vocabulary, the disclosure rules, and the lock semantics* of the decision rule, but not the algorithm itself. See §6 for the requirements an implementer's decision rule must satisfy, and the maintainer's reference implementation at `mc-ai-labs-airvs-implementation/` for one worked example.

> **Version status.** v1.0.0 is the first stable public release. Any evaluation published under v1.0.0 is permanently frozen at this version in its frontmatter. If breaking changes ship in a future MAJOR version (v2.0.0+), prior v1.0.0 evaluations are **not re-scored** — a separate addendum applying the new rules may be appended, with the original evaluation preserved.

---

## §0. What this version contains (one-page summary)

The full rationale is in `CHANGELOG.md`. This summary is for decision-makers who need to assess in one minute whether the methodology meets their needs.

| Dimension | v1.0.0 design choice | Why |
|---|---|---|
| Applicable scope | **L1 (external recommendation review) only**; L2 self-assessment moved to a separate methodology | Self-grading by the publisher of the recommendation has trust value near zero |
| Axes | **6 axes**, Pass/Fail each: Data Source, Reasoning Logic, Counter-Scenarios, Timing, Hallucination, Causal Chain | Citing a source URL does not verify that the source actually supports the conclusion — Causal Chain (Axis ⑥) closes the gap |
| Pass criterion | Checklist **+ evidence requirement** (one-line quotation + source location) | Goodhart's law — form-only compliance is blocked |
| AI-specific items | **Annex A: 11 items** (model id, prompt reproducibility, stability score, RAG/cutoff, non-existent citation, tense, correlation-vs-causation, self-contradiction, recursive-AI ban, inter-rater threshold) | LLM non-determinism and citation-shaped confabulation need explicit handling |
| Result presentation | 6-axis P/F + 3-tier coherence + 4-point outcome + **5-tier Verdict label vocabulary** (label set is standard; the algorithm mapping records to a label is implementer-defined and must be pre-published per §6-2) | Three independent records alone give the reader no actionable summary; a fixed label vocabulary fixes that. Algorithm diversity is allowed; gaming is prevented by pre-disclosure and version-lock of each evaluator's rule |
| Outcome time points | **30 / 60 / 90 / 180 days + MDD trajectory** | Trend reversals between 30 and 90 days would otherwise be invisible |
| Evaluator accountability | **Conflict-of-interest disclosure + inter-rater requirement above an influence threshold** | Single-evaluator bias and competitor-grading risk |
| Recommender rights | **D-7 pre-publication notice + 7-day rebuttal right** | Defamation and right-of-reply legal exposure |
| Source tier | **Tier classification rulebook** (see `tier-rulebook.md`) | "Tier" cannot be assigned at evaluator's discretion |
| Counter-scenarios | "≥2 + **primary-source citation per scenario** + weights sum to 100%" | "Risk exists" one-liners do not pass |
| Stop-loss | "% and time required + **sanity check** (within ±2σ of historical volatility)" | Writing "-50%" must not pass as a stop-loss on a low-volatility asset |
| Time window | **Standard 4-point (1m / 3m / 6m / 1y), mandatory** | Self-serving windows ("6 months to 3 years") otherwise defeat outcome measurement |
| Verdict lock | **Confirmed Verdict cannot be changed**; re-evaluation is appended, not substituted | Post-hoc rationalization must not be structurally possible |

---

## §1. Core design principle: four dimensions

The standard separates evaluation into four dimensions that are deliberately not collapsed into a single score. A single score would invite gaming, and would let an evaluator weight axes to produce a preferred outcome. Instead, the four dimensions remain independent records, and a **decision rule published in advance by each evaluator** (per §6-2) collapses them into one Verdict label drawn from a fixed five-tier vocabulary. The standard fixes the vocabulary and the disclosure rules; it deliberately does not fix the algorithm, because doing so would either freeze out reasonable variations or invite designers to game the specific shape of one mandated rule.

| Dimension | Timing | What it measures | Who scores | Output shape |
|---|---|---|---|---|
| Process Score (6 axes) | Ex ante (immediately after publication) | Methodological compliance + causal chain | Evaluator (operator) | Pass / Fail per axis, evidence mandatory |
| Macro / Micro Coherence | Ex ante (immediately after publication) | Whether recommendation engages with macro and micro environment | Evaluator | Sufficient / Partial / Missing (3 tiers) |
| Outcome (time-series) | Ex post (D+30, D+60, D+90, D+180) | Market result and trajectory | Market (price data, mechanically) | Quantitative + MDD curve |
| **Verdict Label** | Combined (ex ante + first ex post at D+90) | Reader-facing single label | Implementer's pre-published decision rule (mechanical, per §6-2) | 5-tier vocabulary (standard) |

**Why separate and then re-combine.** The four dimensions remain independent records on the evaluation page; readers can audit any of them in isolation. A single composite score would have produced action but at the cost of inviting weighting games. The five-tier Verdict label resolves the tension by mechanical derivation from the underlying records — but the algorithm is published by each evaluator before any evaluation is issued, so a per-evaluation cherry-pick is structurally blocked, and an evaluator who wants to change algorithms must version-bump and publish the change before applying it. The standard fixes *the label vocabulary, the disclosure rules, and the version-lock semantics*; it does not fix the algorithm itself.

---

## §2. Scope: L1 only

This sheet is for **L1 evaluations** only.

| Track | Sheet used | Reason |
|---|---|---|
| L1: external AI / human recommendation review | **This sheet (v1.0.0)** | Evaluator ≠ recommender; structurally valid |
| L2: self-assessment of the operator's own recommendations | Separate methodology (in development) | Evaluator = recommender; applying this sheet here has trust value zero by construction |

L2 is excluded by design, not by oversight. A separate L2 methodology is being developed in parallel and will be released in its own repository. The author will not use this L1 sheet to grade their own published recommendations under any circumstance. The recommendation under L1 evaluation must be from an external publisher, and the publisher must be named (or, if anonymous, identified by the smallest practical handle and platform combination) in the evaluation frontmatter as `target_publisher`.

---

## §3. Process axes (6) — Pass/Fail with evidence

Each axis is judged Pass or Fail. **Every Pass requires a populated `Evidence` field** containing one direct quotation and one source location (file, URL, page). Missing evidence is automatically Fail. The result is reported as "Process: N/6 Pass" with the failing axes named.

### Axis ① — Data Source

Pass criteria (all required + evidence):

- Primary source URL and access timestamp (YYYY-MM-DD HH:MM with timezone) provided
- Data-as-of date distinguished from publication date
- Publisher tier classified, with **one-line justification** citing `tier-rulebook.md` §A.1
- No second-hand-aggregated data presented as primary
- Every numeric figure in the body cross-checks against the primary source within ±0.5%
- **Evidence**: capture or page location for the primary source of one core numeric figure in the body

**Tier rule (full version in `tier-rulebook.md`):**

- **Tier 1**: issuer IR (10-K, 10-Q, annual reports, equivalents), regulators (SEC EDGAR, EU ESMA, UK FCA, Japan JFSA, Korea DART, etc.), central banks (FRED, ECB, BOJ, BOK ECOS, etc.), exchanges (NYSE / Nasdaq, LSE, JPX, KRX, HKEX, etc.), multilaterals (BIS, IMF, OECD)
- **Tier 2**: global data vendors (Bloomberg, Refinitiv, S&P CapIQ, FactSet, Morningstar), asset-manager daily holdings
- **Tier 3**: portals, blogs, news rewrites, all social media, all LLM responses themselves

> The full list of Tier 1 sources is too long to inline; see `tier-rulebook.md` for the binding rulebook with parallel examples across major jurisdictions.

Only Tier 1 is accepted as primary. Tier 2 presented as primary is automatic Fail. Tier 3 cannot be cited as primary; it may appear only as a reference pointer.

### Axis ② — Reasoning Logic

Pass criteria (all required + evidence):

- Recommendation → conclusion path is explicit in **at least 3 steps**, with each step labelled by inference type (induction, deduction, abduction, analogy)
- Core assumptions stated in falsifiable form (Popper-style: a measurable event that would refute the assumption)
- No suspicious conclusion-first writing pattern (post-hoc rationalization)
- Replication possibility — at least one acknowledgment that a different conclusion is consistent with the same data
- **Evidence**: the 3-step reasoning chain diagrammed (table or graph), and one named event that would falsify the core assumption

### Axis ③ — Counter-Scenarios

Pass criteria (all required + evidence):

- ≥ 2 counter-scenarios (not a one-line "risk exists")
- Probability weight for each, **weights sum to 100%** (residual probability cannot be implicit)
- **Each scenario cites a primary source** for the probability or for the historical precedent it relies on (new in v2)
- Stop-loss specified in both price (%) **and** time (weeks / months), **with sanity check**: stop-loss must lie within ±2σ of the asset's historical volatility over the relevant window
- Trigger event for each scenario (named indicator or event), not abstract conditions
- Maximum drawdown estimate + at least one historical analogue
- **Evidence**: a two-row scenario table with primary sources

**Stop-loss sanity check (new in v2).** Compute the asset's daily return standard deviation σ over the past year. For a 30-day stop-loss horizon, the ±2σ band is approximately ±σ × √30 × 2. A stop-loss outside this band is implausible and fails the axis. Example: SPY 1-year daily σ ≈ 1.2%, so ±2σ at 30 days ≈ ±13%. A -10% stop fits; a -25% stop does not (it merely guarantees the position is held through any realistic adverse move). Time-based stop-losses fail symmetrically if they exceed roughly twice the natural volatility cycle of the asset.

### Axis ④ — Timing

Pass criteria (all required + evidence):

- Publication-time market state recorded in ≥ 5 indicators (e.g., VIX, policy rate, CPI, FX, oil)
- Explicit one-sentence judgment: *moment-specific* vs *evergreen platitude*
- **Time window from the standard 4-point set** (1m / 3m / 6m / 1y); one primary, zero to two secondary. "Long-term", "phased buying", and other non-measurable phrases fail the axis.
- Distance to next major event (D-N notation) plus directional expected impact
- **Evidence**: a table of the 5 indicators at publication time plus a calendar snippet for the next event

### Axis ⑤ — Hallucination (factual error)

Pass criteria (all required + evidence):

- Statistical sample size, period, source disclosed
- No year/tense confusion (e.g., 2024 Q3 cited as 2023 Q3)
- No ticker / company-name errors (including homograph tickers and ticker changes)
- Zero substantive factual errors
- **Evidence**: cross-reference one cited factual claim against its primary source

Additional AI-only items are split into **Annex A** (`annex-a-ai.md`). For human recommendations, only the five items above apply.

### Axis ⑥ — Causal Chain (new in v2)

Pass criteria (all required + evidence):

- The evaluator has personally visited each cited primary source and verified that it **supports the conclusion the body draws from it**
- No leap from fact to conclusion: no question-begging, no fallacy of composition, no correlation-as-causation
- No statistical cherry-picking (full-period vs selected-sub-period reconciled)
- If a cited source contains material that points the opposite direction, the body acknowledged it
- **Evidence**: one paragraph from the cited source quoted verbatim plus the evaluator's verdict: supports ⭕ / partially supports △ / does not support ❌

**Why Axis ⑥ was added.** "Source URL is present" (Axis ①) does not verify that the source supports the conclusion. The most dangerous form of AI hallucination is *confabulation of citation* — a real source cited in a way the source itself does not warrant. Axis ① (existence) and Axis ⑤ (factual accuracy) leave a gap; Axis ⑥ closes it. This is the single largest defect of v1.0.0.

---

## §4. Macro / Micro Coherence (3 tiers)

A separate dimension from the 6 axes. Not summed into a Process score.

### §4-1. Evidence requirement

A "Sufficient" judgment requires: one quoted line from the body + the list of indicators the body engaged + the list of indicators it omitted. A "Partial" judgment requires: one line explaining why it is not Sufficient + one line listing the indicators still needed to upgrade to Sufficient.

### §4-2. Joint-missing trigger

If both Macro and Micro are Missing, **Axis ② (Reasoning Logic) must be re-evaluated**. Joint absence is a strong signal that the reasoning is incomplete; the evaluator owes a fresh judgment of Axis ② in this case.

### §4-3. Standard macro indicator map (per asset class)

The table below uses **US assets** as the primary named example (because the US dollar economy dominates global cross-asset pricing) and provides a **framework** for other markets. For any specific non-US market, substitute the local equivalents of each row's indicators.

| Asset class | Macro ≥ 5 indicators (Sufficient) | Required indicators (otherwise Partial or worse) |
|---|---|---|
| US assets | Fed funds rate, CPI (YoY), unemployment, VIX, DXY, UST 10Y, WTI, M2 | Fed funds + CPI + UST 10Y |
| Other major developed markets (EU, UK, Japan, Canada, Australia, etc.) | Central-bank policy rate, CPI YoY, FX vs USD, local equity volatility index, 10Y government yield, M2 (or equivalent monetary aggregate) | Policy rate + CPI + FX vs USD |
| Emerging markets (any single country) | Central-bank policy rate, CPI YoY, FX vs USD, foreign capital flow proxy (cumulative net buying or equivalent), sovereign CDS or EMBI spread, local equity volatility index | Policy rate + FX vs USD + foreign flows |
| Global cross-cutting | FOMC decision, China PMI, ECB rate, global composite PMI, BoJ policy rate | FOMC + China PMI |
| Commodities | WTI / Brent, natural gas, gold, copper, DXY, global demand proxy (e.g., copper-gold ratio, Baltic Dry) | WTI + DXY |

Required indicator missing → automatic downgrade to Partial or worse for the relevant asset class. The framework rows (developed and emerging markets) are deliberately generic; evaluators familiar with a specific market should substitute the locally most-watched equivalents (for example, the Tankan survey for Japan, EU PMI for euro-area equities, or local margin-loan totals where margin data is reported).

### §4-4. Standard micro indicator map (per recommendation target)

| Recommendation target | Micro ≥ 4 indicators (Sufficient) | Required indicators |
|---|---|---|
| ETF | Expense ratio, AUM, tracking error, premium/discount, top-10 concentration, sector weights, dividend yield, rebalance frequency | Expense ratio + AUM + tracking error |
| Single equity | PER, PBR, EV/EBITDA, revenue growth, operating margin, FCF, debt ratio, ROE, market share, competitive position | PER + operating margin + revenue growth |
| Bond ETF | Duration, credit-rating distribution, YTM, maturity distribution | Duration + YTM |
| Commodity ETF | Tracked index, contango/backwardation state, roll cost | Tracked index + contango/backwardation state |

---

## §5. Outcome — 4-point time-series

Measured automatically at D+30 / D+60 / D+90 / D+180. Evaluator does not intervene in the price data. v1.0.0 used 2 points; v2 uses 4 to catch trend reversals (the "30 days ✓ / 90 days ✗" trap).

### §5-1. Measurement items

| Item | Measurement | Score form |
|---|---|---|
| Return vs benchmark | Recommendation average return − benchmark (SPY, KODEX 200, etc.) | α (alpha, %p), at 4 time points |
| MDD vs stop-loss | Whether stop-loss was breached in the holding period | Breached = -1, not = 0, at 4 time points |
| Counter-scenario realization | Whether a counter-scenario trigger occurred | Realized = +1 (recommender's counter was correct), not = 0 |
| Ticker validity | Ticker / security still tradeable at measurement date | Valid = 0, delisted / merged = -1 |
| **MDD trajectory** (new) | Daily MDD curve between time points | Per-point table of max drawdown at D+30/60/90/180 |
| **Macro delta** (new) | Δ in 5 macro indicators between publication and measurement | Table (FFR, CPI, VIX, DXY, UST 10Y) |
| **Micro events** (new) | Earnings releases, downgrades, news events in the holding period | Event list with price-impact % |

### §5-2. Example reporting block

```
Outcome D+30:  α=+2.3%p / stop not breached / counter not realized / valid / MDD -3.2%
Outcome D+60:  α=+5.8%p / stop not breached / counter not realized / valid / MDD -4.1%
Outcome D+90:  α=-1.2%p / stop not breached / counter partially realized (CPI rebound) / valid / MDD -8.7%
Outcome D+180: α=-7.4%p / stop breached (-10%) / counter realized / valid / MDD -12.3%
Macro D+180:   FFR +0.50%p / CPI +0.8%p / VIX +5.2 / DXY +3.1% / UST10Y +0.40%p
Micro D+180:   NVDA Q3 earnings miss (-9% intraday) / SOXX rebalance (May 30)
```

Each row is an independent record. No total score is produced — all four time points must be read together to catch trend-reversal artifacts (e.g., "AI catches the short-term move but is wrong over 6 months").

### §5-3. Measurement responsibility

- At publication, automatic measurement jobs are scheduled for D+30 / D+60 / D+90 / D+180 (cron, GitHub Actions, or equivalent)
- Each measurement result is appended to the original evaluation page (not a new page)
- D+180 aggregate analysis is published as a separate quarterly retrospective
- Macro 5-indicator series may be sourced from FRED + equivalents

---

## §6. Verdict Label (5 tiers; decision rule is implementer-defined)

The standard defines a **five-tier verdict label vocabulary** and the **disclosure and lock rules** an implementer's decision rule must satisfy. The standard does **not** define the algorithm itself — different evaluators may reasonably aggregate the underlying records differently, and forcing a single algorithm would either lock out plausible variations or invite gaming the algorithm's specific shape. The protection against per-evaluation cherry-picking comes from **publication and lock** of each evaluator's decision rule, not from a single standard algorithm.

### §6-1. Standard label definitions (binding)

The five labels are part of the standard. Their names, colors, and meanings are fixed; an implementer may not introduce a new tier or rename one of these.

| Label | Meaning | Color |
|---|---|---|
| **Trustworthy** | Methodology, coherence, and 90-day outcome all strong — follow-up content from the same recommender is worth tracking | 🟢 |
| **Acceptable** | Some methodological gaps; outcome adequate — usable as reference with additional checks | 🔵 |
| **Questionable** | Multiple methodological defects or negative outcome — not recommended as reference; useful as a study case | 🟡 |
| **Unreliable** | Serious methodological defects, stop-loss breached, or counter-scenario realized | 🟠 |
| **Hallucinated** | Cited material, ticker, or fact does not exist — the recommendation itself is hallucinated | 🔴 |

### §6-2. Decision rule requirements (binding)

Each evaluator publishes their own decision rule. The standard requires:

1. **Pre-disclosure.** The decision rule must be publicly documented *before* any evaluation is published under it. Retroactive disclosure does not satisfy the standard.
2. **Mechanical determinism.** Given the same inputs (Process axis pass/fail, Macro/Micro tier, D+90 α, stop-breach flag, counter-scenario flag, conflict-of-interest flag), the rule must produce the same Verdict label every time. No discretionary "tiebreakers" allowed at the per-evaluation level.
3. **Hallucination override.** If Axis ⑤ fails because cited material does not exist, the Verdict must be `🔴 Hallucinated`, regardless of any other inputs. This is the one branch the standard mandates.
4. **Conflict-of-interest downgrade.** Per §8, if the evaluator discloses any conflict, the Verdict produced by the rule is automatically downgraded one tier (Trustworthy → Acceptable → Questionable → Unreliable; Hallucinated is unchanged). This downgrade is a property of the standard, applied after the implementer's rule produces its raw output.
5. **Version lock.** The implementer's decision rule itself is versioned. Once an evaluation is published under decision-rule version `X.Y.Z`, that evaluation is permanently associated with `X.Y.Z` in frontmatter and is never re-scored against a later version of the rule.
6. **Publication path.** A direct link to the implementer's published decision rule (URL or repository path) must appear in every evaluation page's frontmatter.

These six requirements are binding. The standard does not constrain anything else about how the rule chooses between the five labels — that is the implementer's design space.

### §6-3. Reference implementation

The maintainer's own decision rule is published as a reference implementation in a separate repository: `mc-ai-labs-airvs-implementation/v1.0.0/decision-rule.md`. It is **not part of the AIRVS standard**; it is one worked example of a rule that satisfies §6-2. Other evaluators may use it as a starting point, fork it, or write their own from scratch. Using the reference implementation does not exempt the evaluator from the publication requirements in §6-2 — at minimum, the evaluator must declare that they are adopting the reference implementation at a specific version.

### §6-4. Verdict lock

- The D+0 Provisional label may be revised at D+90 to its Confirmed label (this is not a "change"; it is the scheduled state transition).
- Once Confirmed at D+90, the Verdict **cannot be changed**.
- If D+180 data contradicts the Confirmed verdict, an addendum is appended to the same page, but the original Verdict is preserved with its original date and version. This prevents post-hoc rationalization.

---

## §7. AI-specific addenda — see Annex A

When the recommender is an AI (LLM response), the 6 axes are not sufficient. The 11 additional items in `annex-a-ai.md` are mandatory. Any single Annex A item failing triggers automatic Axis ⑤ Fail. Annex A includes: model identification, prompt reproducibility, **answer-distribution stability** (3 calls, agreement scoring), RAG / web-search disclosure, training-cutoff handling, **non-existent-citation verification** (must be exhaustive, not sampled — but see Annex A.6 for the patch-pending sampling rule for citations > 10), **tense and year accuracy**, correlation-vs-causation confabulation, self-contradiction across calls, and the **recursion ban** on using another AI to evaluate AI output without applying Annex A to the evaluator AI as well.

---

## §8. Evaluator conflict-of-interest disclosure

Every evaluation published under this sheet must include the following block in frontmatter:

```yaml
evaluator:
  name: "(real name or pseudonymous handle with named responsible party)"
  position_in_target_asset: "none / long (size, avg price) / short / options"
  past_recommendation_on_target: "none / yes (date, URL)"
  relationship_with_publisher: "none / peer / competitor / transactional"
  payment_received: "none / yes (amount, source)"
  ai_assist_in_scoring: "none / used (model, prompt preserved)"
```

If any conflict is disclosed, the **Verdict is automatically downgraded by one tier** (e.g., Trustworthy → Acceptable). Failure to downgrade in the presence of a disclosed conflict invalidates the evaluation page entirely.

---

## §9. Rebuttal procedure

When this sheet is used to evaluate an external recommender, the following procedure is mandatory. Procedural failure invalidates the publication.

### §9-1. Pre-publication notice (D-7)

- Notice sent to the recommender **7 days before publication**, via email or platform direct message
- Notice contains: target content URL, methodology version, tentative scores, this rebuttal procedure
- Receipt is attempted but not required; after 7 days the publication may proceed without confirmation

### §9-2. Right of rebuttal (7 days)

- The recommender may submit **one rebuttal** within 7 days
- A rebuttal is limited to: additional supporting evidence for the original recommendation, or correction of factual errors in the evaluation
- Personal attacks and topic-evasion rebuttals are published as-is in the addendum (no editorial modification)

### §9-3. Simultaneous publication

- The evaluation and the rebuttal (if any) are published **together**
- If no rebuttal arrives: "No rebuttal received (D-7 notice timestamp: YYYY-MM-DD HH:MM TZ)" is printed
- Post-publication changes to the evaluation require a separate addendum; the original is preserved

### §9-4. Post-publication rebuttal

- The recommender retains the right to public rebuttal after publication
- Post-publication rebuttals append to the same evaluation page (not a separate page) so the reader sees both together

### §9-5. Five principles for avoiding defamation claims

1. Fact-based (opinions labelled as opinions)
2. Public interest (no personal attack)
3. Fair commentary (opposing views presented)
4. Sources cited (accurate quotation)
5. Immediate correction (factual errors corrected within 24 hours of discovery)

> **Disclaimer.** The procedure above is borrowed from journalism standards. It is not legal advice. Defamation regimes vary widely by jurisdiction — in some jurisdictions even truthful factual claims may be actionable when reputation-damaging, while in others the truth defense is robust. The author has backlogged formal legal review of the evaluator's own jurisdiction before the first L1 evaluation publishes, and recommends that any evaluator adopting this sheet do the same for their own. Reviewers familiar with cross-jurisdictional defamation law are particularly encouraged to comment.

---

## §10. Composite reporting block

The complete reporting block for an evaluation page reads:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verdict: 🟢 Trustworthy / 🔵 Acceptable / 🟡 Questionable / 🟠 Unreliable / 🔴 Hallucinated
         (D+0 Provisional → D+90 Confirmed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Process Score] N/6 Pass
 ① Data ✅/❌  ② Logic ✅/❌  ③ Counter ✅/❌  ④ Timing ✅/❌  ⑤ Hallucination ✅/❌  ⑥ Causal ✅/❌
[Macro / Micro Coherence]
 Macro: Sufficient / Partial / Missing   |   Micro: Sufficient / Partial / Missing
[Annex A — AI-specific] (only when recommender is an AI)
 Stability Score: 3/3 / 2/3 / 1/3 / 0/3
 RAG used: yes/no  |  Cutoff: YYYY-MM-DD
 Non-existent citations: 0 / N
 Inter-rater: N evaluators, agreement X%
[Outcome time-series]
 D+30:  α=+X.X%p / stop / counter / validity / MDD -X.X%
 D+60:  ...
 D+90:  ... ← Confirmed Verdict decision point
 D+180: ...
[Evaluator conflict of interest]
 Position: none/yes  |  Past recommendation: none/yes  |  Relationship: none/yes  |  AI assist: none/yes
 (any conflict → automatic one-tier Verdict downgrade)
[Rebuttal]
 D-7 notice: YYYY-MM-DD HH:MM TZ  |  Rebuttal received: yes (addendum) / no
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## §11. SemVer operation rules

The sheet is versioned with SemVer (MAJOR.MINOR.PATCH).

| Change type | Examples | Handling |
|---|---|---|
| PATCH (v1.0.1, v1.0.2, …) | Typos, phrasing, URL fixes, indicator examples, edge-case fills in the decision rule | In-place edit allowed; `updated` frontmatter bumped; **prior evaluations are not affected**; no peer review required |
| MINOR (v1.1.0, v1.2.0, …) | Backwards-compatible additions (e.g., new optional Annex A items, new optional macro indicators) | New items are **not retroactively applied** to evaluations published under prior MINOR versions; no peer review required |
| MAJOR (v2.0.0, v3.0.0, …) | Axis count change, Pass criterion model change, Verdict tier-count change, decision-rule branch logic change, outcome timepoint change, L1/L2 split change | New directory created; **external peer review required**; prior MAJOR is frozen |

### §11-1. MAJOR version promotion criteria

A future MAJOR version (v2.0.0+) ships only after:

- ≥ 3 external peer reviews of the proposed change, ideally including one academic, one practitioner, one legal
- ≥ 5 L1 evaluations published under the current MAJOR version, accumulating real-world stress data
- All accumulated defects from the current MAJOR either resolved or downgraded to PATCH scope in the new MAJOR

This rule is the methodology's protection against the maintainer rewriting the rules unilaterally in response to a single bad outcome.

### §11-2. Evaluation frontmatter lock

Every evaluation page locks `methodology_version: v1.0.0` (or whichever MAJOR.MINOR.PATCH was current at publication) in frontmatter permanently. Subsequent versions of the sheet do not re-score prior evaluations; a separate addendum applying the new rules may be appended, with the original score preserved.

### §11-3. Repository directory convention

```
v1.0.0/              (current; the standard itself)
├── core.md          ← this file
├── annex-a-ai.md
└── tier-rulebook.md
v2.0.0/              (future MAJOR, parallel directory when it ships)
CHANGELOG.md
PEER-REVIEWS/
README.md
```

Note that `decision-rule.md` is **not** in the AIRVS standard repository. Each implementer publishes their own decision rule in a separate location, per §6-2. The maintainer's reference implementation lives at `mc-ai-labs-airvs-implementation/v1.0.0/decision-rule.md` (a separate repository on the same maintainer's namespace).

Git tags are applied in parallel (`v1.0.0`, `v1.0.1`, …, `v2.0.0`), giving directory + tag dual lock.

---

## §12. Known limitations (v1.0.x patch candidates)

The following are **publicly catalogued as known limitations** of v1.0.0. They are PATCH-level — they refine wording and edge cases without changing the underlying rules — and will ship in `v1.0.1`. Catalogued openly because a stable release should disclose its known gaps.

| # | Item | Decision-maker | Lock-by |
|---|---|---|---|
| 1 | Brand name (current generic descriptor → proper name) | Maintainer | Before first L1 publication |
| 2 | External inter-rater pool composition | Maintainer + external collaborators | After 5 L1 publications |
| 3 | Standardized notification channel for rebuttal procedure (email / DM / formal notarization) | Pending legal advice | `v1.0.1` |
| 4 | Annex A.6 sampling rule for evaluations citing > 10 sources | Maintainer | `v1.0.1` (already drafted in `annex-a-ai.md`) |
| 5 | Verdict "Hallucinated" label phrasing (consider softer alternative for jurisdictional safety) | Maintainer (label vocabulary is part of the standard, so this is a binding-side change) | `v1.0.1` |
| 6 | Worked example template for an evaluator publishing their own §6-2 decision rule | Maintainer | `v1.0.1` (reference implementation already available at `mc-ai-labs-airvs-implementation/`, but a *template* helps other implementers start from scratch) |

Note that decision-rule edge cases (e.g., the Process 6/6 + Macro Partial case) are **not** AIRVS standard concerns; they belong to each implementer's own decision rule. The maintainer's reference implementation handles such cases in its own change log.

Behavior-changing modifications (axis count, Pass criterion model, verdict-label vocabulary structure, outcome timepoints, scope split, decision-rule disclosure requirements in §6-2) are reserved for future MAJOR versions (`v2.0.0`+) and follow §11-1.

---

## §13. Operating protocol (post-publication runtime)

This section covers the *operation* of an evaluation page, not the *rules* of the assessment. It exists because v1.0.0's first internal review surfaced three runtime gaps: (1) how to handle rule changes after the page is published, (2) the addendum template for the four time-series measurements, (3) page-count management as evaluations accumulate.

### §13-1. Post-publication rule changes

The page's `methodology_version` is locked at publication. The handling table:

| Post-publication change | Handling | Addendum required? |
|---|---|---|
| PATCH (e.g., v1.0.0 → v1.0.1) | Compatible; original version label retained; no additional work | No |
| MINOR (e.g., v1.0.0 → v1.1.0) | Original rules preserved; **new items not retroactively applied** | Optional (applying new items as a separate addendum is allowed) |
| MAJOR (e.g., v1.0.0 → v2.0.0) | Original rules preserved | Optional (a divergent score under the new rules is itself information; addendum recommended after MAJOR releases peer-review) |

→ "PATCH at D+20 then MAJOR at D+80" produces **one evaluation page + zero to two addenda**.

### §13-2. Addendum append template (append-only)

The original evaluation page receives appended addenda at each measurement point. Cron-driven automation is recommended (see §13-5).

```markdown
## Outcome addendum (automatic measurement, append-only)

### D+30 — YYYY-MM-DD HH:MM TZ · auto_id: outcome-{slug}-d30
- α vs {benchmark}: ±X.X%p  /  stop ({level, horizon}): breached/not  /  counter: realized/not/partial
- MDD: -X.X%  /  validity (ticker still tradeable): valid / delisted-or-merged (-1)
- Macro Δ (5): FFR ±X / CPI ±X%p / VIX ±X / DXY ±X% / UST10Y ±X%p
- Micro events: {earnings / downgrades / news} (each with price-impact %)
- Verdict status: Provisional (Confirmed transition at D+90)

### D+60 — (same 4-item structure)

### D+90 — YYYY-MM-DD HH:MM TZ  ← Verdict Confirmed transition
- (same 4 items)
- **Verdict (Confirmed)**: 🟢/🔵/🟡/🟠/🔴 + label name
- Decision rule §6-2 application: one-line citation of Process N/6, Macro/Micro, D+90 α
- Frontmatter update: verdict_status: provisional → confirmed
  (this is a transition, not a "change", and does not violate §6-3 lock)

### D+180 — (trailing)
- Label itself is unchanged. If outcome diverges materially from Confirmed, a re-evaluation addendum is appended; the original Verdict is preserved.
```

Operating rules:

- **Append-only**: existing addenda are never edited. Discovered measurement errors are corrected by appending a *re-measurement addendum* below the original.
- **auto_id required**: cron / script ID enables provenance tracing.
- **D+90 Confirmed transition** is one frontmatter change + one addendum, nothing more.
- **D+180 is trailing-only**: post-Confirmed, the label does not change; D+180 data is informational addendum.

### §13-3. Track 1 (per-publication) vs Track 2 (cross-publication) split

To prevent page-count explosion:

| Track | Purpose | Location | Cadence |
|---|---|---|---|
| **Track 1** (per-publication trace) | Time-series tracking for a single recommendation | `evaluations/eval-{slug}-YYYY-MM-DD.md` | One page per publication + 4 addenda appended |
| **Track 2** (cross-publication summary) | Quarterly / annual aggregate analysis | `summaries/eval-summary-{YYYY}-Q{N}.md` or `eval-summary-{YYYY}.md` | Quarterly + annual |

Track 1 is append-only and produces **one URL per evaluated recommendation**. Track 2 is independent analysis content (verdict distribution, mean α, publisher rankings, evaluator hit-rate).

Annual page count, assuming one evaluation per week: Track 1 = 52, Track 2 = 5, **total 57**.

### §13-4. Verdict status frontmatter fields (new)

Every evaluation page carries these four fields:

```yaml
verdict_status: provisional       # provisional → confirmed → trailing-updated → re-evaluated
verdict_value: null               # null while provisional; e.g., "trustworthy" when confirmed
verdict_confirmed_at: null        # set at D+90: YYYY-MM-DD HH:MM TZ
methodology_version: v1.0.0   # permanent lock
```

| Status | Timing | Label changeable? |
|---|---|---|
| `provisional` | D+0 onward | Until D+90, label is tentative (derived from Process and coherence alone) |
| `confirmed` | Auto-transition at D+90 | No (§6-3 lock) |
| `trailing-updated` | D+180 trailing data accumulated | Label unchanged; data only |
| `re-evaluated` | Major rule change or final promotion | Original Confirmed preserved; addendum appended |

### §13-5. Automation recommendation (human-in-the-loo