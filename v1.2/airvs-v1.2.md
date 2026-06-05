---
title: AIRVS v1.2 (MINOR) — §9 rebuttal procedure simplified (pre-publication notice removed)
methodology_version: v1.2.0
type: standard-minor-amendment
base: v1.0.0/core.md + v1.1/airvs-v1.1.md
status: stable
license: CC BY 4.0
maintainer: Mincheol Kim, MC AI Labs
created: 2026-06-06
semver_class: MINOR
peer_review_required: false
retroactive: false
note: "Relaxes one procedural obligation (§9-1 D-7 pre-publication notice — removed). No change to axes, Pass model, coherence, outcome, verdict vocabulary, or decision-rule requirements. Decision-rule v1.0.0 continues to apply unchanged."
---

# AIRVS v1.2 — amendment (MINOR, backward-compatible)

> Amends **§9 (Rebuttal procedure)** of `v1.0.0/core.md`. Everything else in v1.0.0 and v1.1 is unchanged.

## §1. What changes

**§9-1 (D-7 pre-publication notice) is removed.** Under v1.2.0, an evaluation of an external recommender may be published without prior notice to the recommender. Rationale: the notice requirement created a 7-day publication latency with no enforcement mechanism for a single-operator implementation, and the recommender's interests remain protected by the post-publication rebuttal right, which is strengthened below.

**§9 is restructured as follows (v1.2.0 text, binding):**

- **§9-R1 Post-publication rebuttal right (was §9-4, now primary).** The recommender may submit a rebuttal at any time after publication. One substantive rebuttal is guaranteed publication: it is appended to the evaluation page as a dated addendum, unedited (limited to supporting evidence for the original recommendation or factual corrections of the evaluation). Ad-hominem or off-topic rebuttals are also published unedited, marked as such.
- **§9-R2 Correction duty.** If a rebuttal demonstrates a factual error in the evaluation, the evaluator must publish a correction addendum within 7 days. The original record is preserved (append-only); verdict re-derivation, if any, follows core §13-4 (re-evaluation addendum, original kept).
- **§9-R3 Contact path.** Every published evaluation must display a public contact channel for rebuttals (e-mail or issue tracker).
- **§9-R4 Anti-defamation principles (was §9-5, unchanged).** Fact-based, public interest, fair commentary, sources cited, immediate correction. Disclaimer: journalism standard, not legal advice; defamation law varies by jurisdiction.

Procedural failure against §9-R1–R3 invalidates the publication (same enforcement class as the former §9).

## §2. What does NOT change

- Six axes, Pass model, evidence gate, Annex A / A-F — unchanged.
- Coherence, outcome modes (4-point and continuous) — unchanged.
- Verdict vocabulary (§6-1), decision-rule requirements (§6-2), verdict lock (§6-4) — unchanged. **Decision-rule v1.0.0 remains valid and frozen.**
- CoI disclosure (§8) — unchanged.

## §3. Versioning & retroactivity

- SemVer class: **MINOR** (an obligation is relaxed; no prior evaluation becomes invalid; no scoring semantics change). PATCH would be wrong — this is a substantive procedural amendment, not wording.
- **Not retroactive.** Evaluations published under v1.0.0/v1.1.0 keep their version lock (core §11-2). Evaluations published under v1.2.0 are governed by §9-R1–R4 above.
- Evaluations scored under v1.1 templates but **not yet published** may be published under v1.2.0 (the template content is identical; only the frontmatter `methodology_version` declares v1.2.0).

## §4. Changelog

| Version | Date | Class | Change |
|---|---|---|---|
| v1.0.0 | 2026-05 | — | Initial standard (frozen) |
| v1.1.0 | 2026-06-01 | MINOR | Continuous outcome mode, Annex A-F, Templates L/F |
| v1.2.0 | 2026-06-06 | MINOR | §9-1 pre-publication notice removed; rebuttal restructured to post-publication (§9-R1–R4) |
