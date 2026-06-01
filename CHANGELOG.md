# Changelog

All notable changes to the AI Recommendation Verification Standard are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) loosely, adapted for a methodology rather than software.
Versioning follows SemVer (MAJOR.MINOR.PATCH). Breaking changes go through future MAJOR versions (v2.0.0+) only after external peer review, per the methodology's own self-rules (`v1.0.0/core.md` §11).

---

## [v1.0.0] — 2026-05-26

**First stable public release.** The methodology is offered as a complete, citable, falsifiable standard for third-party AI recommendation review. Prior drafts existed only in the author's private wiki and are not republished here; the published methodology supersedes all of them.

### Methodology highlights

The v1.0.0 methodology rests on four independent evaluation dimensions, combined into a single reader-facing label by a mechanical decision rule. None of the four dimensions are summed into a composite score; the decision rule does not allow the evaluator to choose the label by hand. This is the design's central commitment to falsifiability.

- **Six Process axes with mandatory evidence** (`core.md` §3). Data Source, Reasoning Logic, Counter-Scenarios, Timing, Hallucination, and Causal Chain. Every Pass judgment requires a populated `Evidence` field — one direct quotation plus one source location. Missing evidence is automatic Fail. Converts every checklist item from a yes/no test into a yes-with-evidence-or-no test, which is much harder to game.
- **Macro / Micro Coherence in three tiers** (`core.md` §4). Sufficient / Partial / Missing, with standard indicator maps per asset class. The macro map uses US assets as the primary named example and provides substitutable framework rows for other major developed markets and for emerging markets, so the sheet generalizes across markets without privileging any single one beyond USD-denominated pricing's natural global reach.
- **Outcome time-series at four time points** (`core.md` §5). D+30, D+60, D+90, D+180. Plus MDD trajectory between points, macro deltas, and micro event lists at each point. Catches trend-reversal artifacts that 30/90-only measurement misses.
- **Verdict Label, five-tier vocabulary, implementer-defined decision rule** (`core.md` §6). 🟢 Trustworthy, 🔵 Acceptable, 🟡 Questionable, 🟠 Unreliable, 🔴 Hallucinated. The label vocabulary is part of the AIRVS standard. The algorithm mapping measurements to a label is *not* part of the standard — each evaluator publishes their own decision rule, version-locks it, and links to it from every evaluation. Provisional at D+0, Confirmed at D+90, then locked. The maintainer's reference implementation is published separately at `mc-ai-labs-airvs-implementation/`.

### Operating commitments built into the methodology

- **L1 / L2 scope split** (`core.md` §2). This sheet applies only to external recommendation review (L1). Self-grading by the publisher of the recommendation is explicitly forbidden — a separate L2 self-assessment methodology is in development for that purpose.
- **Conflict-of-interest disclosure** (`core.md` §8). Every evaluation page carries a structured frontmatter block disclosing position, past recommendations, relationship to publisher, payments received, and AI assistance in scoring. Disclosed conflict triggers an automatic one-tier Verdict downgrade.
- **Rebuttal procedure** (`core.md` §9). Seven-day pre-publication notice. Seven-day rebuttal window. Simultaneous publication of the evaluation and any rebuttal. Append-only post-publication rebuttal. Borrowed from journalism standards.
- **Verdict lock** (`core.md` §6-4). Confirmed Verdict cannot be changed after D+90. If D+180 data contradicts the Verdict, an addendum is appended; the original is preserved. Prevents post-hoc rationalization.
- **Decision-rule disclosure and lock** (`core.md` §6-2). Each evaluator's decision rule must be publicly documented before any evaluation, be mechanically deterministic, version-locked, and linked from every evaluation page. The standard's protection against per-evaluation cherry-picking comes from these disclosure rules, not from mandating a single algorithm.
- **Operating protocol** (`core.md` §13). Append-only addendum template, Track 1 vs Track 2 page-count management, frontmatter status fields (`verdict_status`, `verdict_value`, `verdict_confirmed_at`, `methodology_version`), and the recommended human-in-the-loop automation pattern.

### Specific design choices worth flagging

- **Tier rulebook** (`tier-rulebook.md`). Tier 1 / 2 / 3 source classification with worked edge cases and parallel examples across jurisdictions (US, EU, UK, Japan, Korea, Germany, Canada, Australia, multilaterals). Replaces informal tier mentions with a binding rulebook.
- **Decision rule is not part of the standard** (`core.md` §6-3). A reference implementation by the maintainer is published in a separate sibling repository (`mc-ai-labs-airvs-implementation/`); it is offered as a worked example for evaluators starting from scratch, not as a binding part of AIRVS. This split keeps the standardization work distinct from any one evaluator's specific application.
- **Annex A — AI-specific items, 11 total** (`annex-a-ai.md`). Model identification, prompt reproducibility, Stability Score across three reproductions, RAG / web-search disclosure, training-cutoff handling, non-existent-citation verification, tense-and-year accuracy, correlation-vs-causation confabulation, self-contradiction check, recursive-AI evaluation ban, and inter-rater participation above a public-influence threshold. Any single Annex A failure triggers automatic Axis ⑤ Fail.
- **Time-window standardization** (`core.md` §3, Axis ④). Recommendations must declare a primary window from a fixed four-point set (1m / 3m / 6m / 1y), with zero to two secondary windows. Self-serving windows ("long-term", "6 months to 3 years") fail the axis.
- **Stop-loss sanity check** (`core.md` §3, Axis ③). Stop-loss values must lie within ±2σ of the asset's historical volatility over the relevant window.
- **Self-critique built into the methodology** (`core.md` §14). Five points where the consensus designer view might still be wrong, deliberately catalogued for adversarial peer review.

### Known limitations (v1.0.x patch candidates)

These were surfaced by the author's internal 3-persona adversarial pre-review (see `PEER-REVIEWS/internal-3-persona-review.md`) and are openly catalogued. They are PATCH-level (no behavior-changing rule modification) and will ship in `v1.0.1`:

1. **External inter-rater pool** — required by Annex A.11 above the public-influence threshold; pool not yet constituted.
2. **Standardized notification channel** for the §9 rebuttal procedure (email / DM / formal notarization) — pending legal review.
3. **§4-3 framework completeness**: the macro indicator table now uses framework rows (developed markets, emerging markets) with FX-vs-USD required across non-US rows, replacing an earlier country-specific row.
4. **Annex A.6 sampling rule**: exhaustive verification of cited sources is required for ≤ 10 citations; stratified random sampling, with method documented, is permitted for > 10. Original required exhaustive in all cases, which was impractical for citation-heavy recommendations.
5. **Verdict "Hallucinated" label phrasing**: the English term is operationally precise but legally pointed. A softer alternative ("Citations unverified, multiple") is under consideration to reduce defamation exposure while preserving meaning. (The label vocabulary is part of the standard, so this is a binding-side change.)
6. **Annex A external vs internal split**: full Annex A in the internal evaluation record, 4-line summary block in the public-facing page. Reduces public-page bulk without losing internal rigor.
7. **Stability Score LLM cost disclosure**: new frontmatter field `evaluator.llm_cost_incurred` to track the cost of running three reproductions per AI evaluation.
8. **D+90 human-in-the-loop**: currently recommended; `v1.0.1` will make it mandatory at D+90 specifically (to prevent automated misclassification of the Confirmed Verdict transition).
9. **Long-horizon DCA recommendations**: the axis on stop-losses assumes all recommendations have one. Dollar-cost-averaging into an index has no meaningful stop-loss in the same sense. A sub-rule for DCA recommendations is needed; not yet present.
10. **Worked decision-rule template** for evaluators starting their own implementation from scratch (the maintainer's reference implementation provides one finished example, but a *template* would help others write their own).

Note that decision-rule edge cases (e.g., the previously discussed Process 6/6 + Macro Partial case) are **not** AIRVS standard concerns; they belong to each implementer's own decision rule. The maintainer's reference implementation handles such cases in its own change log.

Behavior-changing modifications — axis count, Pass criterion model, verdict-label vocabulary structure, outcome timepoints, scope split, decision-rule disclosure requirements in §6-2 — are reserved for future MAJOR versions (`v2.0.0`+) after external peer review.

### Why v1.0.0 (not v0.x.x)

The methodology is offered as a complete and citable artifact at first public release, not as work-in-progress. The known limitations above are PATCH-level — they refine wording and edge cases without changing the underlying rules. A `v0.x` numbering would have implied API instability that does not match the methodology's actual readiness state. v1.0.0 is the honest version label.

---

## How to read this changelog

Each entry above corresponds to a section or subsection of `v1.0.0/core.md` (or its sibling files). For full context on any item, the section reference in `core.md` is authoritative. For author-side rationale on why the methodology was designed this way, see `WHY.md`. For the internal adversarial debate that surfaced the patch-level fixes, see `PEER-REVIEWS/internal-3-persona-review.md`.

For future versions, this file will record:
- PATCH releases (`v1.0.1`, …) — wording, edge cases, examples, indicator additions
- MINOR releases (`v1.1.0`, …) — additions that do not break prior evaluations
- MAJOR releases (`v2.0.0`, …) — behavior changes that require external peer review and migration notes

---

[v1.0.0]: ./v1.0.0/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
## v1.1.0 (2026-06-01, MINOR - backward-compatible, not retroactive)
- ADD continuous-strategy outcome mode (outcome_mode: continuous).
- ADD Annex A-F (AI-managed-fund variant of Annex A).
- ADD two type-specific result sheets: Template L (LLM) and Template F (AI-managed fund).
- CLARIFY version-lock and re-evaluation-addendum policy. No peer review required (MINOR).
