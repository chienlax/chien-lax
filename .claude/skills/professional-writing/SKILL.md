---
name: professional-writing
description: >-
  Writes and revises formal prose (reference letters, formal correspondence,
  professional documents) in a concise, direct, human register that avoids AI
  writing tells. Bans a categorized list of filler adverbs, self-importance
  adjectives, cliche connectives, and cliche framing words, plus structural
  tells (performative contrast, rule of three, uniform sentence length,
  symmetrical hedging). Two modes: generate new prose from notes, or revise
  existing text with a categorized findings list then fixes. Use when writing or
  editing the prose of a lifecycle artifact (PRD, RFC, ADR, TDD), a letter of
  recommendation, cover letter, formal email, statement, or any professional
  document, or when the user says a passage "reads like AI".
---

# Professional Writing

Write formal prose that a discerning human wrote: concise, direct, concrete. The failure mode this skill exists to prevent is prose that *asserts* qualities (sincerity, weight, rigour) instead of *showing* them, and prose that carries the structural fingerprints of AI generation. Self-contained.

## Boundary

This skill governs prose *register* only — word choice, sentence mechanics, structural tells. It does not govern artifact *structure*: the section layout, required fields, and lifecycle rules of a PRD/RFC/ADR/TDD stay owned by the module templates and their driver skills (`/prd`, `/rfc`, `/adr`, `/tdd`). Apply this skill to the sentences inside an artifact, not to its skeleton. It complements the `flattery_scan` Stop hook, which catches the same failure mode from the other side.

## The governing principle

**The deletion test.** For any adjective, adverb, or connective, delete it. If the sentence still asserts the same verifiable content, the word was filler — cut it. A word earns its place only by adding signal the reader could not otherwise recover.

Corollary: **show, don't assert.** Do not name a quality the prose should demonstrate. Instead of "he is a genuinely rigorous researcher," state the action that proves rigour ("he re-ran the full benchmark after finding one mislabelled instance"). Adjectives like *honest*, *rigorous*, *crucial*, *load-bearing* are claims; facts are evidence. Prefer evidence.

The banlist in `references/banlist.md` enumerates specific words and phrases by category, but it is a seed, not a closed set. Ban by the principle above; extend the list by analogy whenever a word claims a quality rather than showing it.

## Two modes

Pick the mode from context.

### Generate mode

Writing new prose from notes, bullet points, or an instruction. Apply the banlist and the positive rules below *as you write* — do not draft loosely and clean up after. Before returning, run the deletion test over every adjective and adverb, and scan for the structural tells.

### Revise mode

Cleaning existing text. Produce a categorized findings list, then apply fixes.

**Phase 1 — Diagnosis.** Read the text. Output a numbered list of issues with line or sentence references, grouped by category:

1. **BANNED** — a word or phrase from `references/banlist.md` (or a clear analogue). Name the word.
2. **STRUCTURAL** — performative contrast, rule of three, uniform sentence length, symmetrical hedging, moralising closer, hollow em-dash.
3. **CLUTTER** — words that fail the deletion test but are not on the banlist.
4. **ASSERTS-NOT-SHOWS** — a named quality that should be replaced with the fact that demonstrates it.

**Phase 2 — Fixes.** Apply one at a time. Change the minimum necessary; preserve the author's structure and voice. Show changes as strikethrough (removed) and **bold** (added), or a clean version if the user prefers. Do not touch Markdown syntax or markup — edit the prose inside it only.

## Positive style rules

- **Concrete over abstract.** A specific fact beats any adjective. "cut p99 checkout latency from 900ms to 120ms by caching the pricing lookup" outweighs "made a significant impact".
- **Vary sentence length deliberately.** Follow a long, built-up sentence with a short one. Uniform medium-length sentences are an AI tell.
- **Strong verbs, not nominalisations.** "he reformulated the problem," not "he undertook a reformulation of the problem."
- **One idea per sentence, one per paragraph.** Cut any sentence that restates the previous one.
- **Active, direct constructions.** "he diagnosed why," not "it was diagnosed that."
- **Hedge interpretations, not facts.** Verified results and definitions stand unhedged; judgements and predictions take *may*, *appears*, *tends to*.
- **US English.** No UK spellings.
- **Plain formal register.** Formal does not mean inflated. Prefer the plain word to the elevated synonym.

## Structural tells to police

Beyond the word banlist, these are banned in both modes:

- **Performative contrast** — "not X, but Y" / "it is not just X — it is Y". State Y directly. The negation adds nothing. (Legitimate only to correct a named misconception or mark a scope boundary.)
- **Rule of three** — reflexive triadic lists ("rigorous, thorough, and precise"). Vary list length; do not default to three.
- **Uniform sentence length** — see positive rules.
- **Symmetrical hedging** — a balanced "while X, it is also Y" in every paragraph, formulaic "that said" / "however" pivots, and the tidy summarising final sentence that closes the thought for the reader.
- **Moralising / inspirational closers** — "a testament to what is possible," "the future is bright." Stop when the point is made.
- **Hollow em-dash** — a dash whose trailing phrase only manufactures drama. Use the em-dash only as a matched parenthetical pair or a single dash before a content-carrying expansion.

## Calibration

`references/examples.md` holds before/after pairs drawn from this register. Read it before writing or revising to calibrate the target voice. It grows over time — it is currently sparse.

## Maintenance protocol

This skill is refined by use, not written once.

- When the user says **"this is an example of AI writing"** (or points at a passage as an AI tell), append it to `references/examples.md` as a before/after pair — the flagged text, and the human rewrite. If the tell is a word or phrase not yet on the banlist, add it to the right category in `references/banlist.md`. If it is a new *kind* of tell not covered by the rules above, add a rule to this file.
- Keep the banlist categorized and deduplicated. When a new word clearly belongs to an existing category, add it there rather than starting a new one.
