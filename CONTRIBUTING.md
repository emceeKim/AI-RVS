# Contributing

Thank you for considering a contribution. This repository's most valuable contribution is **adversarial peer review** of the methodology, not code patches. The instructions below are organized by what you might want to do.

---

## Most valuable: external peer review

The single thing this repository needs most is external peer reviewers who will read `v1.0.0/core.md` (and ideally its sibling files) and write a critical response. v1.0.0 is the first stable public release; peer reviews shape both the patch trajectory (`v1.0.x`) and the eventual justified case for a MAJOR release (`v2.0.0+`), which the methodology's own self-rules gate on external peer review.

### What a useful peer review looks like

A useful peer review is not a checklist of what is good and bad. It is a focused attack on a specific aspect of the methodology, written from a specific professional vantage point. Examples of useful reviews:

- An **academic methodologist** picking apart whether the four-dimensional structure is logically coherent
- A **practicing financial analyst** explaining where the macro / micro indicator maps in §4-3 / §4-4 are wrong for asset classes the author has limited experience with
- A **defamation lawyer** evaluating whether the §9 rebuttal procedure provides actual legal protection in any jurisdiction
- A **machine learning researcher** evaluating whether Annex A captures the real failure modes of current LLM systems
- A **journalist** evaluating whether the verdict labels can be applied without making the publication itself a defamation target
- A **statistician** evaluating whether the Stability Score across three reproductions is statistically meaningful, and whether the stop-loss ±2σ sanity check is calibrated correctly
- A **practicing investor** picking apart whether real recommendation publishers would game the sheet, and how

A useful peer review of any of these kinds can be one page or twenty pages. Length is not a virtue. Specificity is.

### What to submit

1. **A Markdown file** with your review. Title it `external-peer-review-{your-handle-or-domain}-{YYYY-MM-DD}.md`.
2. **A signed identification block** at the top:
   ```
   Reviewer: {name or pseudonym + responsible party}
   Affiliation: {optional}
   Background: {one or two sentences on why your perspective matters for this review}
   Date: YYYY-MM-DD
   Conflicts of interest: {none, or named}
   ```
3. **The review body itself**, organized as you see fit. The structure does not matter. Specificity does.
4. **An explicit "ship-it / hold for rc2 / hold for v3 / abandon" recommendation** at the end. This forces you to commit to an action, which sharpens the review.

### How to submit

- **Preferred**: open a GitHub Pull Request against the `PEER-REVIEWS/` directory adding your file. The PR description should summarize your recommendation.
- **Alternative**: open a GitHub Issue tagged `peer-review` with your review pasted or attached.
- **Anonymous submission**: open an Issue tagged `peer-review-anonymous`; the maintainer will commit the review under a date-only filename without attribution.

### How submissions are handled

- All accepted peer reviews are committed to `PEER-REVIEWS/`. Acceptance is editorial, not evaluative: the maintainer accepts substantive reviews and rejects only spam, harassment, or duplicate submissions.
- The maintainer's response to each review is committed alongside it as `external-peer-review-{handle}-{YYYY-MM-DD}-response.md`. Disagreement is welcome and preserved in writing.
- Items from peer reviews that result in methodology changes are credited in the relevant `CHANGELOG.md` entry.
- No submission is silently ignored. Either it is accepted and committed, or the reason for rejection is posted as an Issue comment.

---

## Defect reports

If you find a specific factual error or internal inconsistency in the methodology (e.g., "table X says Y but section Z contradicts it"), this is a **defect report**, lighter-weight than a peer review.

- Open a GitHub Issue tagged `defect`
- Include: the file, the line or section, what the defect is, and what the correct version should be
- The author commits to acknowledging defect reports within seven days

Known defects that the author has already catalogued are listed in `CHANGELOG.md` under "Open issues" — please check there first.

---

## Clarification requests

If something in the methodology is unclear to you (not necessarily wrong, just hard to parse), this is a **clarification request**.

- Open a GitHub Issue tagged `clarification`
- Quote the passage and describe what is unclear
- Most clarifications result in a PATCH improving the language; some result in the author realizing the passage was wrong in addition to unclear, which converts the request into a defect report

---

## Rebuttals (if you have been evaluated)

If you are a recommender who has been evaluated under this sheet and you wish to file the formal rebuttal allowed under `core.md` §9:

1. The evaluation should have reached you via the D-7 pre-publication notice. If it did not, that itself is a procedural failure and should be reported as a `defect`.
2. Reply to the notice within 7 days. Your rebuttal is published verbatim alongside the evaluation, unedited.
3. If you wish to file a post-publication rebuttal (allowed indefinitely), open a GitHub Issue tagged `rebuttal` with the evaluation URL and your response. The rebuttal will be appended to the evaluation page.

The author commits to following this procedure on every L1 evaluation. Procedural failure is a defect; please report it.

---

## What not to submit

- **General "this is bad" comments**. These do not help the methodology improve. Specific critiques do.
- **Personal attacks** on the author or on named recommenders. The methodology is fair game; the people are not.
- **Recommendations for new sheets you have written yourself**, unless they explicitly engage with this sheet's design choices. Linking to your own work is welcome; replacing the discussion with it is not.
- **Code contributions to evaluation tooling** unless they are tied to a specific evaluation that needs the tool. The repository's primary artifact is the methodology document, not software.

---

## On disagreement

The author expects external peer reviews to disagree with the methodology — sometimes sharply. Disagreement is the point of peer review. If your review says the entire framework is wrong, the right response is for that review to be published in `PEER-REVIEWS/` and for the author to respond in writing, not for either side to back down. Methodology evolves through preserved disagreement, not through quiet capitulation.

If you find yourself drafting a review that says "this is fine", consider not submitting it. Reviews that find nothing wrong are uninformative.

---

## Author contact

- **Author**: Mincheol Kim, MC AI Labs
- **Email**: mckim890@gmail.com
- **GitHub Issues**: preferred for any structured contribution
- **Direct email**: appropriate for time-sensitive matters (e.g., rebuttal procedure problems, defamation concerns)

---

## License of contributions

By submitting a peer review or any other content to this repository, you agree to license your submission under the same terms as the repository itself: [CC BY 4.0](./LICENSE). This means your review can be quoted, redistributed, and adapted with attribution. If this is not acce