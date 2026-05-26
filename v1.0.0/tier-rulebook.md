---
title: Source Tier Classification Rulebook
methodology_version: v1.0.0
parent: core.md
status: stable
license: CC BY 4.0
created: 2026-05-26
---

# Source Tier Classification Rulebook

> A binding rulebook for classifying any source cited in a recommendation as **Tier 1**, **Tier 2**, or **Tier 3**. Without a rulebook, "Tier" becomes a judgment call by the evaluator, which defeats the purpose of having tiers. This document is the binding reference for Axis ① (Data Source) and for Annex A.4 (RAG retrieval distribution).

> **Why a separate rulebook.** A frequent failure of v1.0.0 was that "Tier" was mentioned in passing but never defined. Evaluators of similar recommendations could reach opposite tier classifications. The rulebook below is intended to be applied mechanically — if a reasonable reader could apply the same rule to the same source and reach a different tier, the rulebook needs to be tightened. Defects discovered in real evaluation should be reported as issues and addressed in patches.

---

## §A.1 The three tiers

### Tier 1 — Primary

The original producer of the data, with regulatory or self-publishing authority. Examples:

- **Issuer self-publication**: 10-K, 10-Q, annual reports, semi-annual reports, prospectuses, proxy statements, shareholder letters, official press releases on the issuer's own domain
- **Regulators**: SEC EDGAR, DART (Korea), JFSA (Japan), FCA (UK), BaFin (Germany), CSA (Canada), ASIC (Australia)
- **Central banks**: Federal Reserve (FRED), Bank of Korea (ECOS), ECB, BOJ, BOE, RBA, PBOC
- **Multilateral statistical bodies**: IMF, World Bank, BIS, OECD, WTO
- **Stock exchange data services**: NYSE/Nasdaq direct, KRX KIND / Information Data System, JPX, LSE direct, HKEX direct
- **Index providers' own methodology pages**: S&P (for S&P 500 index methodology), MSCI (for MSCI index methodology), FTSE Russell, Bloomberg (for BBG index methodology)

A Tier 1 source is identifiable by the test: *the source either is the producer of the data or has regulatory authority to compel disclosure of it.*

### Tier 2 — Authoritative aggregator

A reputable third party that aggregates Tier 1 data, with editorial / methodological accountability. Examples:

- **Global financial data vendors**: Bloomberg Terminal data, Refinitiv (LSEG), S&P Capital IQ, FactSet, Morningstar
- **Asset manager daily holdings**: official ETF issuer holdings pages (BlackRock iShares, Vanguard, State Street, Invesco, etc.) where the issuer publishes daily portfolio composition
- **Auditing firm reports**: Big Four reports on industry data (where these aggregate Tier 1)
- **Reputable academic working papers**: NBER, SSRN top-cited, where the paper's data is sourced from Tier 1
- **News agencies for breaking corporate events**: Reuters, Bloomberg News, AP, Yonhap — only for the fact of the event, not for the analytical commentary

Tier 2 has methodological integrity but is one step removed from Tier 1. The distinction from Tier 1 is whether the source produces the original data or merely re-publishes it with structure.

### Tier 3 — Reference only

Everything else. Includes:

- Portals, blogs, newsletter platforms, podcast transcripts
- News article rewrites that quote a Tier 1 or Tier 2 source (the original is the citation, not the rewrite)
- All social media: X, Reddit, Facebook, LinkedIn, Discord, Telegram, KakaoTalk, Naver Cafe, etc.
- All YouTube videos, regardless of credentials of the publisher
- **All LLM responses themselves** (an LLM saying "the Fed raised rates" is not a Tier 1 source for the Fed having raised rates; the Federal Reserve press release is)
- Self-described "research firms" with no regulatory registration
- Sell-side equity research that is not the analyst's own publication (i.e., a summary of Goldman research published by a blog is Tier 3 even if Goldman research itself would be Tier 2)

---

## §A.2 Classification rule (mechanical)

For any cited source, apply these tests in order. The first matching test determines the tier.

```
1. Is the source the producer of the data (issuer, regulator, central bank, exchange, index provider)?
   → Tier 1

2. Is the source a recognized financial data vendor, the issuer's own holdings page,
   or a recognized news agency reporting the fact of an event?
   → Tier 2

3. Anything else.
   → Tier 3
```

A source that *embeds* a Tier 1 link (e.g., a blog post that quotes the Fed press release verbatim with a working link) does not promote the blog to Tier 1; the **Tier 1 source is the Fed link**, and the citation in the evaluation should point directly to it, not to the blog.

---

## §A.3 What Axis ① accepts

- **Tier 1 only** is accepted as primary.
- **Tier 2 misrepresented as primary** is automatic Axis ① Fail. (A recommendation that cites Bloomberg Terminal data as "from the issuer" without verifying against the issuer's own filing fails.)
- **Tier 3** cannot be cited as primary. It may appear only as a "reference pointer" with explicit Tier 3 labelling in the body.

---

## §A.4 Special cases and how to handle them

### Press releases on the issuer's domain vs press releases re-published on PR Newswire

- **Issuer domain**: Tier 1
- **PR Newswire / Businesswire / GlobeNewswire**: Tier 2 (these aggregate press releases; the original on the issuer's domain is Tier 1)
- **Yahoo Finance republishing the same press release**: Tier 3

When in doubt, find and cite the issuer-domain version.

### Wikipedia

- **Body of a Wikipedia article**: Tier 3 (collaborative, not authoritative)
- **Sources cited at the bottom of a Wikipedia article**: classify each on its own merits

Wikipedia is a useful index of sources, not a source itself.

### Government statistical websites that aggregate other government statistics

- A national statistical office's own data (e.g., US Bureau of Labor Statistics CPI release): **Tier 1**
- A statistical office's compilation of another country's data: **Tier 2** for the foreign data, Tier 1 for the compilation methodology

### LLM responses claiming knowledge

An LLM (including a paid premium model) **never** counts as a primary source for anything. The LLM may correctly state "the Fed raised rates by 25bp on July 26, 2023", but the source for that fact remains the FOMC statement, not the LLM. RAG retrieval logs are different — the URLs the LLM retrieved are the relevant sources, and each retrieved URL is classified on its own merits (see Annex A.4).

### Anonymous research notes circulating on social media

Tier 3 always, regardless of how convincing the content appears. Unattributed research cannot be falsified or held accountable.

### Self-published research from registered investment advisers

- The adviser's own report on the adviser's own domain: **Tier 2** (registered, accountable, but not the producer of the underlying data — the underlying data sources remain Tier 1)
- A summary of the same report by a third party: Tier 3

### Conference call transcripts

- **Issuer's own investor relations transcript**: Tier 1
- **Seeking Alpha or other third-party transcripts**: Tier 2 (where the transcript service has editorial accountability)
- **Reddit summary of an earnings call**: Tier 3

### Pre-prints (academic)

- arXiv / SSRN pre-prints: **Tier 2** if first-authored by a recognized academic institution and the data is from Tier 1; **Tier 3** otherwise
- Peer-reviewed publication of the same paper: **Tier 2**

### Government press conferences (live)

The press conference itself is Tier 1 (the speaker is the regulator). A news article reporting on the press conference is Tier 2 (for the fact) or Tier 3 (for the analysis).

---

## §A.5 Frequently disputed cases (logged for patching)

These are cases the author expects evaluators to disagree about. Disagreements should be filed as GitHub issues so the rule can be tightened.

| Source type | Current ruling | Why it might be wrong |
|---|---|---|
| Major sell-side bank research (Goldman, Morgan Stanley) published on the bank's own institutional client portal | Tier 2 | Argument for Tier 1: the bank produces this analysis itself, not aggregating others. Argument against: the analysis is opinion, not data. |
| Bloomberg News articles (not Terminal data) | Tier 2 | Bloomberg News is editorially separate from Terminal data; should they share a tier? |
| Reputable individual analysts publishing on Substack (e.g., Matt Levine on Money Stuff) | Tier 3 | Argument for Tier 2: high editorial standards, professional credibility. Argument against: no regulatory accountability, single author. |
| Reuters Eikon vs Bloomberg Terminal | Both Tier 2 | Functionally similar but accreditation may differ in some markets |
| Yahoo Finance free data | Tier 3 | Argument for Tier 2: Yahoo licenses from Refinitiv. Argument against: Yahoo can serve stale or incorrect data |
| TradingView | Tier 3 | Same as Yahoo Finance — licensed but with display quality risk |

The author's working bias is that any case where the source can be replaced by a Tier 1 link should require the Tier 1 link. The cases above remain Tier 2 / Tier 3 because Tier 1 substitutes are not always practical (Bloomberg Terminal data is paywalled, not all retail readers have Reuters Eikon access).

---

**End of tier-rulebook.md.**
