# Why I Wrote This

> The motivation document for the AI Recommendation Verification Standard. This is a personal statement from the author, not part of the normative methodology. If you want the rules, read `v1.0.0/core.md`. This file explains the problem the rules are trying to solve and why I felt it was worth doing.

**Author**: Mincheol Kim, MC AI Labs
**Date**: 2026-05-26
**Status**: Personal narrative. Read it once, then judge the actual methodology on its own terms.

---

## The starting observation

I run a one-person operation that publishes AI-assisted investment analysis. In the course of building that operation, I read a great deal of AI-generated recommendation content from other publishers — newsletters, X threads, YouTube clips, public chatbot outputs, paid Discord groups. The longer I read, the more uncomfortable I became with a pattern that, once seen, is impossible to unsee: **almost none of these recommendations are falsifiable.**

A typical AI recommendation in the wild looks like this:

> "Given the current macro environment and the recent earnings cycle, XYZ stock looks attractive at this level. Consider accumulating on dips."

There is no source. No time window. No price target. No stop-loss. No counter-scenario. No data cutoff disclosure. No model identification. No prompt history. If XYZ doubles next month, the recommender is a genius. If XYZ falls 40%, the recommender simply stops mentioning it, and the post drifts down the timeline until no one remembers it existed. The reader has no way to construct a record. The recommender has no incentive to provide one.

This is not a problem unique to AI. Human pundits have been doing this forever. But AI scales the problem in three ways that human pundits do not:

1. **Volume.** One AI can produce more recommendations per day than a thousand human pundits.
2. **Plausibility.** AI prose is uniformly polished, so the surface-level cue that used to separate sloppy from careful work — bad grammar, vague structure, obvious bias — no longer fires.
3. **Hallucination.** Humans rarely invent fake ticker symbols or fake research papers. AIs do this routinely, and the citation looks real until you actually click the link.

So the problem I wanted to address was specifically: *how do you let a reader tell a careful AI recommendation from a hallucinated one, when the surface of both looks identical?*

---

## What I tried first, and why it failed

My first attempt was the obvious one: build a scoring rubric and grade my own recommendations against it. I would publish a recommendation, score myself on transparency, source quality, counter-scenario coverage, and so on, and post the score next to the recommendation.

This failed for a reason I should have anticipated. **The publisher and the grader cannot be the same party.** When I am both the recommender and the evaluator, every rule I write into the rubric is a rule I know how to satisfy, and every recommendation I make is one I know how to grade well. The score is mathematically meaningless. A reader could see that I was scoring myself and rationally discount the entire exercise to zero.

I considered hiring an outside grader, but a one-person operation cannot afford a permanent second salary, and a one-off grader has no continuity. I considered crowdsourcing the grading, but crowds optimize for entertainment, not methodology.

The realization that fixed the problem was this: **the sheet does not need to grade me. It needs to be applicable to anyone, by anyone.** If I publish a sheet that is rigorous enough that any qualified third party could pick it up and apply it to any recommendation — including mine, including a competitor's, including a major newsletter's, including an anonymous chatbot's — then the sheet has value independent of who is using it on whom. My job is not to grade myself; my job is to define the rules well enough that the grading is reproducible.

The sheet you are reading is the result.

---

## The five problems the sheet is trying to solve

Stated as plainly as I can:

**Problem 1: Recommendations vanish before they can be verified.** Solution: every evaluation is published as a permanent, dated, frontmatter-versioned document with four scheduled outcome measurements (30, 60, 90, 180 days). The original recommendation may disappear from the recommender's feed; the evaluation does not.

**Problem 2: "Trust scores" are graded by the same party that publishes the recommendations.** Solution: the sheet explicitly forbids its own use for self-grading (`core.md` §2). A separate self-assessment methodology is being developed for that purpose, and the two are kept structurally distinct.

**Problem 3: Grading rubrics can be gamed by checking boxes.** Solution: every "Pass" judgment in this sheet requires not only that the criterion be met, but that the evaluator cite specific evidence (a quoted line, a source URL, a screenshot location). Missing evidence is an automatic Fail. This converts every checklist item from a yes/no question into a yes-with-evidence-or-no question, which is much harder to game.

**Problem 4: Stop-losses and time windows are written in self-serving language ("long-term hold", "buy the dips", "exit if it falls a lot").** Solution: time windows must come from a standardized four-point set (1m / 3m / 6m / 1y), and stop-losses must be sanity-checked against the asset's historical volatility (±2σ over the relevant window). Unrealistic stop-losses fail the sheet by construction.

**Problem 5: Verdicts get rewritten after the fact.** Solution: once a verdict label is confirmed at D+90, it cannot be changed. If later data contradicts the verdict, a separate addendum may be appended, but the original verdict is preserved with its original date and methodology version. This prevents the evaluator from quietly upgrading their past calls in the light of new outcomes.

These five problems are the bones of the design. Everything else in the sheet is implementation detail meant to make those five solutions actually work in practice.

---

## What I deliberately chose not to do

I want to be explicit about the things this sheet is **not** trying to do, because I have seen related projects fail by overreaching.

**It is not a prediction system.** It does not forecast which recommendations will succeed. It records, after the fact, whether they did, against an explicit time window the recommender themselves chose.

**It is not a reputation score.** Each evaluation labels a single recommendation. A recommender with one 🟢 and one 🔴 does not get an average reputation of 🟡 — they get two separate records, and the reader is trusted to draw their own conclusions about that pattern.

**It is not a censorship mechanism.** A 🔴 Hallucinated verdict is a factual record that a specific recommendation cited material that does not exist. It is not a takedown request, a public shaming, or a legal claim. The sheet's `§9` rebuttal procedure exists precisely to make sure the recommender's response is published alongside the verdict.

**It is not a self-promotion vehicle.** I am not going to publish evaluations of myself under this sheet, because the sheet does not allow it. I am also not going to selectively evaluate recommenders who happen to be competitors. The eligibility rules in `core.md` are designed to make selective targeting structurally difficult.

**It is not a closed system.** It is `v1.0.0` — stable enough to cite and apply, not stable enough to stop improving. There are patch-level fixes I already know are needed (documented in `CHANGELOG.md` and in `PEER-REVIEWS/internal-3-persona-review.md`), and there will be more once outside reviewers see it. Any behavior-changing improvement will be released as a future MAJOR version (`v2.0.0+`) only after external peer review, per the methodology's own self-rules.

---

## The honest part: what I am not sure about

A good methodology document discloses its own uncertainty. Here is mine.

**I am not sure the verdict label is the right shape.** Five tiers may be too many; readers may just look at the color. Three tiers (green / yellow / red) might communicate more, even if it loses information. I kept five because the consultant persona in my own pre-review argued the additional granularity was useful for serious readers, but the practitioner persona pointed out that casual readers ignore everything past the color. This is unresolved.

**I am not sure my procedural fix for the legal-risk problem is sufficient.** The seven-day pre-publication notice and the rebuttal procedure in `§9` are language-borrowed from journalism standards, but defamation law varies sharply by jurisdiction — some legal systems treat truthful factual statements as fully defensible, others permit liability when reputation is damaged regardless of truth. I am taking on real legal risk by publishing evaluations of named recommenders, and the magnitude of that risk depends on the jurisdiction I publish from and the jurisdictions my evaluation reaches. I have backlogged formal legal advice for my own home jurisdiction before the first L1 evaluation publishes, but the residual risk is not zero, and any evaluator adopting this sheet should do the same for theirs.

**I am not sure this can be operated at scale by one person.** My own pre-review estimated 4–6 hours of evaluator time per recommendation, plus another 2 hours of human-in-the-loop review of the four time-series measurements, for a total of roughly 6–8 hours per evaluated recommendation. At one evaluation per week, that is 8–10 hours per week of fixed overhead on top of my actual content production. If that overhead does not produce proportionate value — paid subscribers, professional commissions, reputation that translates into business — the sheet's cost will eventually break the operation that produced it.

**I am not sure my own market familiarity is broad enough.** I am a one-person operation; my market exposure has been concentrated and my evaluation experience is shallow. The methodology is intentionally written as globally applicable — the indicator framework in `§4-3` and `§4-4` is built around substitutable equivalents rather than US-only specifics, so an evaluator working on European bonds, Latin American equities, or Asia-Pacific commodities can apply the same axes without translating from a US template. But the test of whether that framework actually generalizes will only come from evaluators outside my own market experience applying it and reporting where it breaks. If you are working on a market segment I have not, your peer review on `§4` is among the most valuable contributions you could make.

---

## What I want from a reader

If you have read this far, you are exactly the audience I wrote this for. I want three things from you, in descending order of importance:

1. **Read the actual sheet** (`v1.0.0/core.md`) and tell me where it breaks. The pre-review I ran on myself surfaced abo