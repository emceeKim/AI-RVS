---
title: Internal Adversarial Pre-Review — 3 Personas × 3 Rounds
methodology_version: v1.0.0
review_type: internal (self-conducted by author)
status: published for transparency, not a substitute for external peer review
license: CC BY 4.0
created: 2026-05-26
reviewer: Mincheol Kim (operator), simulated as three personas
---

# Internal Adversarial Pre-Review of v1.0.0

> Three personas, three rounds, full transcript. The author conducted this review on themselves before publishing v1.0.0 in English. It is published here for transparency, not as a substitute for external peer review. Real external reviewers are invited to attack the same sheet — see [`../CONTRIBUTING.md`](../CONTRIBUTING.md). The author expects external reviews to surface defects this self-review missed.

> **Editorial note on naming and scope.** During internal development this methodology carried the working label `v2.0.0-rc1` (because it was the second internal iteration, held as a release candidate pending peer review). For the first public release the version was renumbered to a clean `v1.0.0` — there is no public v0.x history, and the rc gate is replaced by the more standard SemVer rule that any breaking change goes to `v2.0.0+` after external peer review. The debate transcript below was conducted under the internal working label; references to "rc1", "rc2", or "rc → final promotion" reflect that working context. Read them as: "the version that is now publicly released as v1.0.0".
>
> **Editorial note on the decision rule.** At the time of this debate, the decision rule (the algorithm mapping measurements to a Verdict label) was part of the standard itself. After this debate, the maintainer decided to separate the decision rule from the standard — the AIRVS standard now defines only the label vocabulary and the disclosure rules in `v1.0.0/core.md` §6, while each evaluator publishes their own decision rule. The maintainer's own decision rule lives in a separate sibling repository: `mc-ai-labs-airvs-implementation/v1.0.0/decision-rule.md`. References below to "§6-2 decision rule" or "the decision rule" reflect the pre-separation structure; read them as "the maintainer's decision rule, which is now in the separate implementation repository".

---

## Why this is published

Three reasons.

1. **Honesty about the source of the design.** v1.0.0 was not produced by a committee; it was produced by one person running adversarial roles against themselves. Readers should know exactly what kind of review it has and has not received before publication.

2. **A starting point for external reviewers.** The defects this self-review found are already catalogued in `CHANGELOG.md` as `v1.0.1` patch candidates. External reviewers can focus their attention on what this review missed, rather than re-deriving what it caught.

3. **A worked example of the methodology applied to itself.** The sheet asks recommenders to publish counter-scenarios with primary sources and to disclose self-criticism (`core.md` §14). The author owes the same to the sheet itself. The full debate below is the author's attempt to meet that standard.

---

## The three personas

**Consultant — assessment-sheet design specialist.** Treats the sheet as a methodology artifact. Pushes on framework structure, label design, dimension count, internal consistency.

**Practitioner — evaluator and data manager.** Treats the sheet as a tool to operate. Pushes on time cost, data quality, automation, frontmatter fields, page-count management.

**Executive — final decision-maker (the operator).** Treats the sheet as a business decision. Pushes on legal exposure, capital cost, brand consistency, target selection for the first L1 evaluation.

The three roles do not always agree. Where they did not agree, the disagreement is preserved below, not resolved.

---

## Round 1 — initial structural critique

**Consultant.** "The methodology, by external-evaluation standards, is in the top tier of design quality. In particular, Axis ⑥ (causal chain verification) is the single most accurate diagnosis of what LLM-era evaluation needs. That said: the four-dimensional presentation (6 axes + 3-tier coherence + 4-point time-series + 5-tier Verdict) is theoretically clean but operationally heavy. Earlier internal drafts had three dimensions and were already described as a lot to read; adding a Verdict label nominally for *actionability* in fact added complexity. Cutting the Verdict to three tiers (green / yellow / red) and standardizing the English label names into the target reader's language would help adoption more than the current 5-tier palette. Also: Annex A at 11+ items has separated *out* of Axis ⑤ in name but in fact doubled the sheet's bulk. Items A.7 through A.10 could be reabsorbed into Axes ⑤ and ⑥ cleanly."

**Practitioner.** "I want to start with time cost per evaluation. Six axes with evidence per axis, plus three reproductions for Stability Score, plus per-scenario primary source verification, plus the stop-loss σ calculation — conservatively, **4 to 6 hours per evaluation**. Add D+30/60/90/180 addendum review at ~30 minutes per point and you get another 2 hours per evaluation. At one evaluation per week, that's **roughly 312 to 416 hours per year**, or six to eight hours per week of fixed overhead before any actual content is produced. Whether this is operable from a one-person operation needs to be answered before the rules themselves.

Also: §4-3 has a more structural problem than a missing indicator. The table names US assets as one row and then a single specific non-US country row, which signals to a global reader that the methodology is implicitly two-market. For a sheet that claims general applicability, the non-US side should be a *framework* — developed markets, emerging markets — not one named country. Separately, DXY (or FX-vs-USD more generally) is missing from any non-US row, even though virtually every non-USD equity market is sensitive to dollar strength via foreign capital flows. Both need patching.

Next: §6-2 decision rule has a gap. The case **Process = 6/6 + Macro = Partial + Micro = Sufficient** falls through every elif and lands at the default Questionable. A 6/6 Process recommendation should not auto-default to Questionable just because macro coherence was Partial. This is a sign the decision rule itself was not validated against its own input space.

Finally: cron automation in §13-5 is recommended, but common free data feeds (yfinance and similar) handle non-US markets unevenly — Asia-Pacific tickers, emerging market currencies, and any market with non-trivial split / dividend adjustment logic show data quality gaps. §13-5 should make human-in-the-loop **mandatory at D+90** rather than merely recommended, because the Confirmed Verdict transition is the moment when bad data produces public errors."

**Executive.** "Both of you focused on methodology and operation. I want to start with business survival. First: §9 rebuttal procedure meets journalism-standard ethics but §14-3 explicitly concedes that *in stricter defamation regimes even truthful factual claims may be actionable when reputation-damaging — publication itself is a risk*. The author's home jurisdiction is among the stricter regimes, which compounds the exposure. §14-3 backlogs legal review and standardized notification channels but does not specify the variables that matter: lawyer retainer budget, cost ceiling per case, publication-pause trigger. A one-person operation hit with a single defamation case can spend tens of thousands of dollars in legal fees. The first L1 evaluation could be the trigger that ends the operation.

Second: the '🔴 Hallucinated' label, applied to a named external recommender, is essentially a public confabulation accusation. In any jurisdiction with strict reputation protections — and there are several globally — this is close to a declaration of war.

Third: §14-4 admits the *we grade others but never expose ourselves* contradiction. Excluding L2 (self-assessment) is structurally honest, but from outside it reads as hypocrisy. The brand differentiator for the operator's analysis line is *publish results even when wrong*, but if that publication is not validated by the same L1 sheet's authority, the two lines run in parallel and the brand fractures.

My position: this methodology is **not yet ready to publish**."

---

## Round 2 — cross-challenge and drill-down

**Consultant → Executive.** "You said it's not ready. But the counter-position is that *a perfect sheet only reveals its defects after publication*. The methodology already inherits a peer-review-gated MAJOR change rule, and the first public release being explicitly v1.0.0 (not v0.x and not 'final-final') is itself a public declaration that the work is open to revision. The defamation risk is real but mitigable: the first L1 target should be **not** a major recommender but an anonymous chatbot output (e.g., an unattributed 'AI recommendation' bot on social media). Subject identification is hard, defamation standing is unclear, risk drops. The '🔴 Hallucinated' label is too sharp — soften to '🔴 Citations unverified, multiple' as an immediate PATCH. And the Process 6/6 + Macro Partial gap the Practitioner identified is a real decision-rule defect; I agree completely and we should diagram the entire tree to enumerate every leaf."

**Practitioner → Consultant.** "Your annualized estimate of 312-416 hours is technically correct, but in a one-person operation **content production (4 hours) + evaluation (6 hours) = 10 hours per publication unit**, which is essentially two working days per published evaluation. The sheet's bulk also makes it unreadable — external readers will scroll past anything past page two. I agree with your 3-tier Verdict suggestion in principle, but more fundamentally we should split Annex A into *internal record* vs *public-facing summary*: full 11 items in the internal record, a 4-line summary block on the public evaluation page. That preserves external readability without losing internal rigor.

Also on Stability Score: who pays for the three LLM calls? The evaluator is asking to *re-run the recommender's prompt three times*. If the recommender did not disclose their API key (most won't), the cost falls on the evaluator. At GPT-4o ~$0.05 per call or Claude Opus ~$0.50 per call, three calls × 52 evaluations × average $0.20 = roughly $50 per year in LLM cost. Small but should be tracked in frontmatter (`evaluator.llm_cost_incurred`)."

**Executive → both.** "Consultant, your 'anonymous bot' first-target suggestion has a side effect: if the target has no authority, the *evaluation* has no authority either. 'Famous recommender = meaningful evaluation, but famous recommender = lawsuit risk' is a dilemma that target selection alone cannot resolve.

Practitioner, $50 per year in LLM costs is small in isolation but the full cost picture is: 350 hours per year × an hourly opportunity cost in the $40-50 range + $50 LLM = **roughly $15,000-17,000 per year of operating cost on the evaluation sheet alone**. This needs to be recovered through paid subscribers, professional commissions, or commercial reports. The funnel from *free public release → external authority → paid conversion* takes **at minimum 6-12 months**. So the real decision variable is: how much capital can the operation absorb in 6-12 months of operating loss on this sheet?

And a defect I want to add: §13-1's PATCH row says 'in-place edit allowed'. The Practitioner's DXY omission is PATCH-level. So before-publication patching is fine. But **after-publication PATCH**: does it affect prior-published evaluations or not? The current §13-1 is ambiguous. The PATCH row should be sharpened to 'in-place edit allowed + prior published evaluations are explicitly unaffected'."

---

## Round 3 — synthesis, concrete decisions, and remaining disagreement

**Consultant.** "Through Round 2 we converged on a set of immediate PATCH items and a set of conditions for future MAJOR-version promotion.

**v1.0.1 PATCH items (ship in the next patch release, no peer review required):**

1. §4-3 — replace the country-specific non-US row with framework rows (developed markets, emerging markets) and add FX-vs-USD across non-US rows
2. §6-2 — diagram the decision tree and patch the Process 6/6 + at-least-one-not-Missing branch
3. '🔴 Hallucinated' → '🔴 Citations unverified, multiple' (softer phrasing for jurisdictional safety)
4. Annex A external vs internal split (public summary: 4 lines; internal: full 11 items)
5. §13-5 — elevate human-in-the-loop from recommended to **mandatory at D+90**

**Conditions for a justified v2.0.0 MAJOR release:**

a. Annualized operating cost disclosed in evaluator frontmatter
b. Target-authority vs lawsuit-risk matrix written explicitly
c. L2 self-assessment methodology released *in parallel* (not backlogged) to defeat the *we grade others but not ourselves* criticism

My recommendation: **ship the patches into v1.0.1 + publish v1.0.0 as-is + proceed to the first L1 evaluation**."

**Practitioner.** "Agreed on the Consultant's five items, but I want to add three more at the PATCH level from the operating perspective.

6. Frontmatter field `evaluator.llm_cost_incurred` for Stability Score expenditure
7. §A.6 — for evaluations citing ≤ 10 sources, exhaustive verification; for > 10, stratified random sample with method documented (without this rule, evaluation of citation-heavy recommendations is impossible)
8. §3 Axis ④ — when the recommender omits a time window, default to '3 months primary' with explicit disclosure

My compromise on the Executive's publication question: **publish v1.0.0 with the first L1 evaluation in beta posture**, then 2-week retrospective producing `v1.0.1`, then evaluations 2-5 published under the patched version. First publication is explicitly labelled as the inaugural application. The Executive's capital concern is legitimate, but *not publishing means the sheet accumulates zero learning data*. Between publishing and not publishing, *cautious phased publishing* is the only resolvable option."

**Executive.** "I accept the Practitioner's phased-publication compromise. But I am adding **five business-survival locks**:

A. **One formal legal consultation** before first L1 publication, in the author's own home jurisdiction first. Estimated cost: a few hundred dollars for a 1-hour consult on whether the defamation-avoidance principles in §9-5, the frontmatter design, and the five-tier Verdict labels are safe locally. Subsequent evaluators adopting this sheet in other jurisdictions should do the same in theirs.

B. **First L1 target is an offshore anonymous AI-recommendation bot** with no clear corporate personhood — defamation standing is structurally weak.

C. **If material external pushback materializes within 14 days of publication**, immediate publication pause + v1.0.0 freeze.

D. **L2 self-assessment methodology is not backlogged indefinitely**. Same logic as the Practitioner's argument: if L2 has no methodology, L2 also accumulates zero learning data. **Three-month deadline**.

E. **Until annual revenue target is met, publication pace is capped at one evaluation per month max**. Four evaluations per month is a loss bet for current revenue.

**I authorize the first L1 publication only if all five business-survival locks are satisfied. If any one is unmet, v1.0.0 is published as a reference standard but the first evaluation does not yet happen.**"

---

## Agreement and disagreement matrix

| Item | Consultant | Practitioner | Executive | Decision |
|---|---|---|---|---|
| §4-3 framework rows + DXY across non-US → v1.0.1 | ✅ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| §6-2 decision tree diagram + branch patch | ✅ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| 🔴 'Hallucinated' → softer phrasing | ✅ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| Annex A external / internal split | ✅ | ✅ | ⭕ (neutral) | **Agreed — ship in v1.0.1** |
| §13-5 D+90 human-in-the-loop mandatory | ✅ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| Stability Score cost in frontmatter | ⭕ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| §A.6 stratified sampling for > 10 citations | ⭕ | ✅ | ✅ | **Agreed — ship in v1.0.1** |
| Time window default rule | ⭕ | ✅ | ⭕ | **Agreed — ship in v1.0.1** |
| Legal consultation before first L1 | ⭕ | ✅ | ✅ | **Agreed — required before first L1** |
| First L1 target = offshore anonymous AI bot | ✅ | ⭕ | ✅ | **Agreed — for first publication only** |
| L2 methodology released within 3 months | ⭕ | ⭕ | ✅ | **Agreed — locked, not backlogged** |
| Monthly publication cap until revenue target | ❌ | ⭕ | ✅ | *