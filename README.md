# AI Recommendation Verification Standard (AIRVS)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20391984.svg)](https://doi.org/10.5281/zenodo.20391984)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

> An open, version-controlled, peer-reviewable standard for evaluating AI-generated investment recommendations. The standard defines (1) six process axes with mandatory evidence, (2) macro/micro coherence in three tiers, (3) outcome time-series at four time points, and (4) a five-tier verdict label vocabulary. The standard defines *how to measure* and *what the labels mean*; the algorithm that maps measurements to a label is **implementer-defined** (each evaluator publishes their own decision rule). A reference implementation by the maintainer is available as a separate repository (`mc-ai-labs-airvs-implementation/`).

**Current version**: `v1.0.0` — first public release
**DOI**: [10.5281/zenodo.20391984](https://doi.org/10.5281/zenodo.20391984)
**License**: [CC BY 4.0](./LICENSE)
**Maintainer**: MC AI Labs — Mincheol Kim (`mckim890@gmail.com`)
**Repository purpose**: Public, citable, falsifiable standard for third-party AI recommendation review. Distinct from any specific evaluator's implementation.

---

## TL;DR

If you read one paragraph, read this. Most AI investment recommendations published today carry no falsifiable record of how they were produced, what they assumed, what data they cited, or how they performed. Readers cannot tell a careful recommendation from a hallucinated one — and the recommender has no incentive to disclose either. This repository defines an evaluation sheet a third party can apply to any AI (or human) recommendation, producing a record that is (1) procedurally reproducible, (2) outcome-measured at four time points, and (3) summarized as a single colored verdict label so a non-expert reader can act on it. It is versioned with SemVer; v1.0.0 is the first stable public release. Subsequent breaking changes will go through future MAJOR versions (v2.0.0+) and external peer review, per the methodology's own self-rules.

## Global by design

The methodology is intended to be applied to recommendations about any asset class in any market. The macro indicator framework in `core.md` §4-3 uses US assets as the primary named example (because USD-denominated pricing dominates global cross-asset linkages) and provides substitutable framework rows for other major developed markets and for emerging markets. The Tier 1 source rulebook in `tier-rulebook.md` lists regulators, central banks, and exchanges from multiple jurisdictions as parallel examples. Defamation and right-of-reply procedures in `core.md` §9 are written generically, with the explicit note that any evaluator adopting this sheet should seek local legal advice for their own publishing jurisdiction. The author is based in one specific jurisdiction and discloses that openly (see Contact), but the methodology is not specialized for it.

---

## Why this exists

The full statement of motivation is in [WHY.md](./WHY.md). In short:

1. **AI recommendations are non-falsifiable in their default form.** They cite no sources, name no time window, declare no stop-loss, list no counter-scenario, and disappear from the feed within hours. There is no record to verify against later.
2. **"Trust score" sites are graded by their own publishers**, which means the highest-scored recommendation and the harshest grading rubric come from the same party. The information value is near zero.
3. **A standard that anyone can apply** — to anyone else's recommendation — fixes the incentive structure. The recommender does not get to grade themselves; the grader does not get to invent the rules after the fact; the reader gets a label they can act on.

This is the first public release of that standard.

---

## Status

`v1.0.0` is the **first stable public release**. The methodology is stable as published — it is safe to cite, apply, and build tooling against. Bug-fix patches (`v1.0.1`, `v1.0.2`, …) may revise wording and edge cases without changing the underlying rules. Breaking changes — axis count, Pass criterion model, verdict-tier structure, decision-rule branches, outcome timepoints, scope split — will be released as future MAJOR versions (`v2.0.0`, …) only after external peer review, per the methodology's own self-rules in `core.md` §11.

Content evaluated under `v1.0.0` is permanently frozen at this version in its frontmatter. If the rules later change in `v2.0.0`, prior evaluations are **not re-scored** — instead, a new addendum may be appended showing what the new rules would have produced, with the original evaluation preserved.

The author's internal pre-publication self-review is committed in `PEER-REVIEWS/internal-3-persona-review.md` for transparency; external peer review is actively invited via [CONTRIBUTING.md](./CONTRIBUTING.md).

See [CHANGELOG.md](./CHANGELOG.md) for the v1.0.0 release log and known limitations.

---

## What this sheet evaluates

The sheet is applied **only to external recommendations** — recommendations the evaluator did not write. (The companion problem of self-grading is explicitly excluded; see [Scope](#scope-l1-only) below.) For each evaluated recommendation, the sheet produces four independent records:

| Dimension | When | What it measures | Form |
|---|---|---|---|
| **Process Score** | At publication | Whether six methodological axes are satisfied with evidence | Pass / Fail per axis (6 axes) |
| **Macro / Micro Coherence** | At publication | Whether the recommendation accounts for the macro and micro environment | Sufficient / Partial / Missing |
| **Outcome (time-series)** | 30 / 60 / 90 / 180 days after publication | Market result, drawdown trajectory, counter-scenario realization | Quantitative time-series |
| **Verdict Label** | Provisional at D+0, Confirmed at D+90 | Single label from a fixed 5-tier vocabulary, produced by the evaluator's own pre-published decision rule | One of 5 colored labels |

The four dimensions are never summed into a single score. Single scores invite gaming. The **five-tier verdict label vocabulary is standard**, but the **algorithm that maps measurements to a label is implementer-defined** — each evaluator publishes their own decision rule before any evaluation, and version-locks it. This prevents per-evaluation cherry-picking while allowing reasonable algorithm diversity. A reference implementation by the maintainer is available in a separate repository (`mc-ai-labs-airvs-implementation/`).

The five verdict labels are: **🟢 Trustworthy**, **🔵 Acceptable**, **🟡 Questionable**, **🟠 Unreliable**, **🔴 Hallucinated**.

---

## Repository layout

```
airvs/                              ← this repository (the AIRVS standard itself)
├── README.md                       ← this file
├── WHY.md                          ← author's motivation in full
├── CHANGELOG.md                    ← v1.0.0 release log + known limitations
├── CONTRIBUTING.md                 ← how to submit a peer review
├── LICENSE                         ← CC BY 4.0
│
├── v1.0.0/                         ← current standard version
│   ├── core.md                     ← main standard text (§0–§15)
│   ├── annex-a-ai.md               ← AI-specific assessment items (11 items)
│   └── tier-rulebook.md            ← source tier classification rulebook
│
└── PEER-REVIEWS/
    └── internal-3-persona-review.md  ← author's own adversarial pre-review
                                       (3 personas × 3 rounds, full transcript)

(separate sibling repository, not part of the AIRVS standard)
mc-ai-labs-airvs-implementation/    ← the maintainer's reference implementation
├── README.md
├── LICENSE
└── v1.0.0/
    └── decision-rule.md            ← MC AI Labs' specific decision rule
                                      satisfying AIRVS §6-2
```

The decision rule (the algorithm that maps Process / Coherence / Outcome records into a 5-tier label) is **not** part of the AIRVS standard. Each evaluator publishes their own decision rule, version-locks it, and links to it from every evaluation's frontmatter. The maintainer's own decision rule is published in the sibling repository above as a worked reference; other evaluators may fork it, adopt it as-is, or write their own.

When a future MAJOR version of the AIRVS standard ships, it will live in a parallel directory (`v2.0.0/`) without modifying `v1.0.0/`. This is per the SemVer directory convention in `core.md` §11-3. Implementer decision rules are versioned independently.

---

## Quick start (for evaluators)

Read in this order:

1. **`WHY.md`** — understand what problem this standard is solving and what it deliberately is not solving.
2. **`v1.0.0/core.md`** — the standard itself, §0 through §15.
3. **`v1.0.0/annex-a-ai.md`** — required additional checks when the recommender is an AI (LLM response).
4. **`v1.0.0/tier-rulebook.md`** — how to classify a source as Tier 1 / 2 / 3 without it becoming a judgment call.
5. **Your own (or an existing) decision rule** — the algorithm satisfying `core.md` §6-2 that you will publish and version-lock before issuing any evaluation. If you want a starting point, see the maintainer's reference implementation at `mc-ai-labs-airvs-implementation/v1.0.0/decision-rule.md`.
6. **`PEER-REVIEWS/internal-3-persona-review.md`** — the adversarial pre-review the author ran against this very document, including the unresolved disagreements.

If you only want to evaluate one recommendation as a trial run: read `core.md` §1, §3, §5, §6, §10 in that order — those five sections are sufficient to produce one full evaluation (you will also need a decision rule per step 5 above).

---

## Quick start (for recommenders being evaluated)

If your recommendation is about to be evaluated under this standard, you are entitled to a **seven-day pre-publication notice** (`core.md` §9) and one round of rebuttal. The rebuttal is published alongside the evaluation, unedited. Read `core.md` §9 for the full procedure. The maintainer is committed to following this procedure on every evaluation issued under their own decision rule, and any deviation should be reported as a bug. Other evaluators adopting AIRVS are bound by the same procedure.

---

## Quick start (for peer reviewers)

See [CONTRIBUTING.md](./CONTRIBUTING.md). In short: open an issue tagged `peer-review` with your review attached. Reviews of any length are welcome; even one-page critiques pointing at a single defect are useful. All accepted peer reviews are committed to `PEER-REVIEWS/` with attribution, unless the reviewer requests anonymity, in which case only the date and the substance are committed.

---

## Scope: L1 only

This standard is for **L1 evaluations** — third-party review of someone else's recommendation. It is deliberately not applied by an evaluator to their own recommendations (a separate "L2 self-assessment" methodology is in development and will be released in its own repository; using this standard to grade one's own recommendations defeats the entire purpose of the design). See `core.md` §2 for the full L1 / L2 split and its rationale.

---

## Known limitations (v1.0.x patch candidates)

These are catalogued openly because a stable release should disclose its known gaps:

1. **External evaluator pool** — `core.md` §A.11 requires inter-rater participation above a public-influence threshold, but the actual evaluator pool is not yet constituted.
2. **Notification channel for the seven-day rebuttal procedure** — email / DM / formal notarization standards are pending legal advice.
3. **Annex A.6 sampling rule** for evaluations citing > 10 sources — already patched in `annex-a-ai.md` for the next PATCH release.
4. **Verdict "Hallucinated" label phrasing** — the English term is operationally precise but legally pointed; a softer alternative is under consideration for `v1.0.1`.
5. **Worked decision-rule template** — for evaluators starting their own implementation from scratch.

See `core.md` §12 for the full backlog and `PEER-REVIEWS/internal-3-persona-review.md` for the patch-level fixes surfaced by the author's own pre-review.

---

## Citation

If you use this standard in academic work, public commentary, or in evaluating others' content, please cite as:

> Kim, Mincheol (2026). *AI Recommendation Verification Standard (AIRVS), v1.0.0*. MC AI Labs. **DOI: [10.5281/zenodo.20391984](https://doi.org/10.5281/zenodo.20391984)**. Repository: https://github.com/emceeKim/AI-RVS. CC BY 4.0.

The DOI is the most stable citation target — it persists even if the repository moves. For commit-level precision, append the current commit hash. Frontmatter inside each file additionally pins the `methodology_version`.

A machine-readable citation is available in [`CITATION.cff`](./CITATION.cff) — GitHub renders a "Cite this repository" button in the right sidebar that exports BibTeX and APA formats with one click.

### Permanent identifiers

| Identifier | Value |
|---|---|
| **DOI** (this version) | [`10.5281/zenodo.20391984`](https://doi.org/10.5281/zenodo.20391984) |
| **Zenodo record** | https://zenodo.org/records/20391984 |
| **GitHub release** | https://github.com/emceeKim/AI-RVS/releases/tag/v1.0.0 |
| **Repository** | https://github.com/emceeKim/AI-RVS |

---

## Contact

- **Author**: Mincheol Kim — `mckim890@gmail.com`
- **Brand**: MC AI Labs
- **Author's publishing jurisdiction**: Republic of Korea. The methodology itself is jurisdiction-neutral; this disclosure is provided so readers can assess the author's specific legal exposure context (see `core.md` §9 and `WHY.md`).
- **Issues**: please use GitHub Issues with the appropriate label (`peer-review`, `defect`, `clarification`, `rebuttal`)

---

## A note on what this is not

This standard does not certify recommendations as profitable. It does not predict markets. It does not replace due diligence. It is a record of methodology and outcome that allows a reader to decide whether a given recommender is worth following. A 🟢 Trustworthy label means the methodology was sound and the 90-day outcome was non-negative; it does not mean the next recommendation from the same source will also work out. Conversely, a 🔴 Hallucinated label is a statement about a specific recommendation having cited non-existent material — it is not a general indictment of the recommender. Please read the verdicts as what they are: per-recommendation records, not reputation scores.