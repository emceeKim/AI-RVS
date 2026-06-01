---
title: AIRVS v1.1 (MINOR) — continuous-strategy outcome mode, Annex A-F, per-type result sheets
methodology_version: v1.1.0
type: standard-minor-additions
base: v1.0.0/core.md
status: draft
license: CC BY 4.0
maintainer: Mincheol Kim, MC AI Labs
created: 2026-06-01
semver_class: MINOR
peer_review_required: false
retroactive: false
note: "Backward-compatible additions only. v1.0.0 evaluations are NOT re-scored (see §1). The existing single-recommendation flow is unchanged; v1.1 ADDS handling for AI-managed funds and two type-specific result sheets. Triggered by stress findings from verification #1 (AIEQ)."
---

# AIRVS v1.1 — additions (MINOR, backward-compatible)

> Adds to `v1.0.0/core.md` without changing any existing rule. Two real gaps surfaced by the first L1 verification (AIEQ): (a) the D+30/60/90/180 outcome model assumes a single dated call, but AIEQ is a continuously managed fund; (b) Annex A assumes a queryable LLM response, but an AI-managed fund publishes no prompt/per-pick rationale. v1.1 closes both as **additive** modes and introduces **two type-specific result sheets**.

## §1. Versioning & re-scoring policy (restated for clarity — no change from v1.0.0)
**Q: when the standard upgrades, are prior evaluations re-scored against the latest version?**
**A: No — by design.** AIRVS uses version-lock, not auto re-score:
- Every evaluation locks `methodology_version` permanently (core §11-2). v1.0.0 evaluations **stay v1.0.0**.
- A Confirmed verdict **cannot change** (core §6-4).
- **MINOR (this v1.1): not retroactive.** New items apply to **new** evaluations only. (core §13-1)
- A **re-evaluation addendum** under a newer version *may optionally* be appended to a prior evaluation, but the **original is always preserved** (core §13-4 `re-evaluated` state). Never a silent overwrite.
- MAJOR (v2.0.0+) additionally requires external peer review (core §11-1) before shipping.

So: AIEQ (scored under v1.0.0 + decision-rule v1.0.0) remains a v1.0.0 record. If re-done under v1.1's Template F, that is published as a dated **addendum**, original kept.

## §2. Continuous-strategy outcome mode (additive to core §5)
For a recommendation object that is a **continuously managed strategy** (an AI-run fund/index, not a single dated call), the standard 4-point outcome (D+30/60/90/180) does not map. v1.1 adds an **alternative outcome mode** the evaluator declares in frontmatter (`outcome_mode: continuous`):

| Field | Measurement |
|---|---|
| Anchor | inception (or a declared evaluation-start) date |
| Realized return | annualized total return since anchor |
| Benchmark excess | annualized α vs declared benchmark (same window, same source/date) |
| MDD | max drawdown since anchor |
| Tracking | correlation + active share vs benchmark (how "active" the AI really is) |
| Cost drag | expense ratio vs benchmark expense ratio |
| Confirmed when | ≥ 1 full year of live track record (vs D+90 for single calls) |

The single-recommendation 4-point mode (core §5) is unchanged and remains default. Only objects declared `continuous` use this mode. Decision-rule v1.0.0 reads `exc` (annualized excess) and `stop`(n/a → false) the same way, so verdict derivation is unchanged.

## §3. Annex A-F — AI-managed-fund variant (additive to Annex A)
Annex A (core §7 / annex-a-ai.md) presumes a **queryable LLM response** with a prompt. An AI-managed fund has no prompt and no per-pick rationale. v1.1 maps each Annex A item for the fund case:

| Annex A item | Fund (A-F) treatment |
|---|---|
| A.1 Model identification | **Adapted**: disclose the AI engine/vendor (e.g., EquBot/IBM Watson), methodology page, rebalance cadence. Partial-pass if engine named but internals proprietary. |
| A.2 Prompt reproducibility | **N/A — structural** (no prompt). Not a Fail. |
| A.3 Stability score | **N/A — structural** (no re-runnable response). |
| A.4 RAG/search | **N/A** (not applicable to a fund). |
| A.5 Training cutoff | **N/A**. |
| A.6 Non-existent citation | **APPLIES**: every holding/ticker must be real & currently tradeable. Fund-equivalent of citation check. |
| A.7 Tense/year | **N/A**. |
| A.8 Correlation-vs-causation | **N/A** (no published rationale to test). |
| A.9 Self-contradiction | **N/A**. |
| A.10 Recursive-AI | applies only if the evaluator uses a second AI. |
| A.11 Inter-rater (above threshold) | **APPLIES** (a public fund is above threshold) — pending external pool (core §12). |
| **A-F.NEW Holdings transparency** | **APPLIES**: are holdings disclosed (frequency)? full or top-N only? |
| **A-F.NEW Methodology disclosure** | **APPLIES**: is the selection methodology documented (even if model internals are secret)? |
| **A-F.NEW Cost transparency** | **APPLIES**: expense ratio disclosed and compared to benchmark? |

Rule: for a fund, **N/A-structural items do NOT trigger Axis ⑤ Fail** (annex "recommender prompt secrecy" clause). Only the APPLIES items (A.6, A-F holdings/methodology/cost, A.11) are scored.

## §4. Per-type result sheets (two templates)
v1.1 splits the single core §10 block into **two type-specific result sheets**. Declare type in frontmatter (`subject_type: llm-recommendation | ai-managed-fund`).

### Template L — LLM single recommendation (full Annex A)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━ AIRVS Result Sheet · Template L (LLM recommendation)
target_publisher: ____   subject_type: llm-recommendation
recommender: AI — model ____ (snapshot id ____), call date ____
asset: ____   recommendation date: ____   eval date: ____
methodology_version: v1.1.0   decision_rule_version: v1.0.0   outcome_mode: 4-point
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERDICT: 🟢/🔵/🟡/🟠/🔴  (D+0 Provisional → D+90 Confirmed)
[Process] N/6 — ①Data ②Logic ③Counter ④Timing ⑤Halluc ⑥Causal  (each ✅/❌ + "quote" + source loc)
[Coherence] Macro: S/P/M | Micro: S/P/M → C=__
[Annex A — full] A.1 model id | A.2 prompt(3×) | A.3 stability 3·3/2·3/1·3/0·3 | A.4 RAG(tier dist) |
                 A.5 cutoff | A.6 non-existent 0/N | A.7 tense | A.8 corr-vs-cause | A.9 self-contradiction |
                 A.10 2nd-AI | A.11 inter-rater
[Outcome 4-point] D+30 α/stop/counter/valid/MDD · D+60 · D+90 ←Confirmed · D+180
[CoI] position/past-rec/relationship/AI-assist (any → −1 tier)
[Rebuttal] D-7 notice ____ | received ____
[Decision rule v1.0.0] Step0 H → Step1 B(P,C) → Step2 outcome → Step3 CoI → FINAL
sources(tier): …
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Template F — AI-managed fund (Annex A-F + continuous outcome)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━ AIRVS Result Sheet · Template F (AI-managed fund)
target_publisher: ____ (fund + AI engine)   subject_type: ai-managed-fund
recommender: AI engine ____ (vendor ____)   asset/ticker: ____
anchor (inception/eval-start): ____   eval date: ____
methodology_version: v1.1.0   decision_rule_version: v1.0.0   outcome_mode: continuous
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERDICT: 🟢/🔵/🟡/🟠/🔴  (Confirmed after ≥1y live record)
[Process] N/6 — ⑤ via holdings reality; ①②③④⑥ usually Fail if rationale undisclosed (+ "quote"/source)
[Coherence] Macro/Micro (fund-level thesis if any) → C=__
[Annex A-F — fund variant]
  A.1 engine/vendor/methodology/rebalance: __   A.6 holdings real & tradeable: ✅/❌ (N/total)
  A-F holdings transparency: full/top-N/none, freq __   A-F methodology disclosed: ✅/❌
  A-F cost transparency: expense __% vs benchmark __%   A.11 inter-rater: pending/__
  (A.2/A.3/A.4/A.5/A.7/A.8/A.9 = N/A structural — not Fail)
[Outcome — continuous] anchor ____ | annualized return __% | benchmark __ | annualized excess __pp |
  MDD __% | correlation __ | active share __ | cost drag __pp
[CoI] … (any → −1 tier)
[Rebuttal] D-7 notice to fund/vendor ____ | received ____
[Decision rule v1.0.0] Step0 → Step1 B(P,C) → Step2 (exc<-3pp floor) → Step3 → FINAL
[FAIRNESS NOTE — mandatory] "Verdict measures disclosure/verifiability + benchmark outcome, NOT that the fund is bad. A quant model may legitimately keep picks proprietary."
sources(tier): …
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> Worked Template F example: verification #1 (AIEQ) — see `wiki/airvs/verifications/2026-06-01-aieq-equbot-watson.md` §9.

## §5. Changelog (v1.0.0 → v1.1.0, MINOR)
- ADD §2 continuous-strategy outcome mode (`outcome_mode: continuous`). Existing 4-point default unchanged.
- ADD §3 Annex A-F fund variant (maps Annex A items; adds holdings/methodology/cost-transparency checks).
- ADD §4 two type-specific result sheets (Template L, Template F) with `subject_type`.
- CLARIFY §1 version-lock & re-evaluation-addendum policy (no behavior change).
- No change to: 6 axes, coherence tiers, verdict vocabulary, decision-rule requirements, single-call 4-point outcome. Not retroactive. No peer review required (MINOR).
