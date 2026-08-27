---
paths:
  - "**/*.tex"
  - "**/*.md"
  - "**.md"
---

# Writing Rules

<!-- register-exempt: PROCESS-ID METADISCOURSE EXTERNAL-OBJECT-REF TRANSITIVE-CARRY TRANSITIVE-HOLD OWNERSHIP-METAPHOR ECONOMIC-METAPHOR EXISTS-TO LAYER-NOUN IS-WHAT-CLEFT WORTH-HEDGE SIGNPOST ANTHROPOMORPHISM ADMITS-DRIFT DRAMATIC-OUTCOME TASK-BOARD CHRONOLOGY SWE-JARGON FILLER-WORD COPULA-DODGE CONTRACTION COMBATIVE UNDEFINED-ACRONYM EM-DASH-DENSITY -->
<!-- This file is the catalog. It quotes every banned form as a specimen, so every rule
     that matches a specimen matches this file. The rules still govern the prose here;
     they are read by a human rather than reported by the checker. -->

This is the general writing rule that governs how you write documents in this project: `paper/**`, `docs/`, `.specs/`, `.chores/`, `.history/`, `.claude/`, and any README.

A code map at the end of this file links each checker finding back to the rule that governs it, for anyone reading a `check_prose.py` report.

---

## 1. General writing

Applies to every document: `paper/**` and every other document in this repository.

**Layout**

- Write each paragraph and each list item on one physical line. Do not hard-wrap prose at a column width.
- Keep a heading, a list item, a table row, and a code block each on its own line.

**Direct statement**

- State a claim directly. Do not lead with a negation of the claim first ("This is not X. It is Y", "Not X, but Y"). Remove the negation and check that the sentence still carries the same meaning. Two exceptions: correcting a named misconception with evidence, and marking a short scope boundary ("This document does not cover Y").
- State the predicate of a sentence directly. Do not route it through "is/are/was/were what." Write "the model is complex," not "what the model is is complex."
- State the point once, directly. Do not announce it first with a "worth noting" cleft ("One thing worth noting is X"). Write the claim, or address the reader directly: "Consider X."
- State a document's own conclusion once and let it end. Do not signal the end with "in conclusion," and do not close a problem with the fixed "despite these challenges, [upbeat conclusion]" formula.

**Word choice**

- Try using simple words to express ideas, whether simple or complex. Trade conciseness for comprehensibility.
- Use a plain word for a plain idea. Avoid inflated vocabulary in place of a plain synonym: quietly, deeply, fundamentally, remarkably, arguably, delve, certainly, utilize, leverage (as a verb), robust, streamline, harness, tapestry, landscape, paradigm, synergy, ecosystem (as filler), testament, realm, intricate, vibrant, nestled, groundbreaking, seamlessly, boasts, pompous, load-bearing.
- Use "is" or "are" for a plain statement of fact. Do not substitute "serves as," "stands as," "marks," or "represents." Exception: "represents a" in a standard mathematical description.
- Name the actual relation instead of a generic ownership or transport verb. Do not use "own," "owns," "carry," "carries," "hold," or "holds" plus a determiner, as a verb for an abstraction (a module, a rule, a constraint). Use the specific action: constructs, records, defines, decides, contains, states, satisfies, encodes, incurs.
- Give a model or a formulation no wallet and no intent. Do not use "pays," "paid," "buys," "bought," "earns," or "wants" for a model object. State the number the metaphor stood for instead.
- State a constraint's action directly. Do not write that it "exists to" do something.
- Reserve "admits" for its mathematical sense (a problem admits a solution). Name the actual relation for every other sense.
- Name the specific unit instead of a generic "X layer." Use stage, submodel, constraint family, or block.
- Name the author of a claim, or state the value plainly. Do not give a document, a table, or a framework an agent's verb ("the paper claims," "the framework assumes," "Table 3 admits").
- Attribute a claim to a named source. Do not attribute it to an unnamed authority ("experts argue," "observers have noted").
- Describe research work in research terms. Avoid software-delivery jargon: ships, lands, wires, deploys, refactors, rolls out, spins up, bakes in, punts, greenlights, unblocks, hooks up, plumbs. Two exceptions: "ship" in its literal maritime sense, and "landed on main" for an actual git merge.
- Write the full word form. Do not use a contraction.
- Use the retired terms' replacements. Do not write `ledger` or `provenance`. The record of every run is the result file, and the record of where a number came from is a source.
- Name the check instead of calling it a gate. Do not write `gate` or `gates` for a threshold, a condition, a check, a rule, or a stop point. The word replicates across a document until every decision point shares one label, and the label states nothing. Write the specific noun: threshold, condition, check, rule, requirement, stop condition, or eligibility rule. Two uses stay. A physical gate is a physical gate, so `gate status`, `gate tag` and `gated compound` are correct. A cited work's or a skill's own standing term for a named object survives under the one-term-per-concept override below.

**Sentence and paragraph shape**

- Write plain declarative sentences at a steady rhythm. Avoid: a countdown of negations before the point ("Not X. Not Y. Just Z."), a self-posed question answered in the next clause, the same sentence opening repeated in quick succession, a rule-of-three pattern stacked more than once, a filler transition that adds no connection ("it is worth noting," "let us unpack this"), and a range with no real middle ("from X to Y").
- Write full sentences. Avoid a numbered list dressed as continuous prose ("The first... The second..."), and avoid a run of standalone sentence fragments used only for emphasis.
- Keep an analogy plain and specific. Avoid a patronizing analogy ("think of it as..."), a performative admission of vulnerability, and an unproved assertion that the point is obvious ("the truth is simple").
- Keep a claim's scope proportional to its evidence. Avoid inflated stakes ("this will reshape everything") and an invented compound label for a concept that is not an established term.
- Use em-dashes sparingly. Use one only for a matched pair around a parenthetical aside, or a single dash before a closing expansion. Prefer a comma or parentheses wherever either reads as cleanly.

**Composition**

- State a point once. Avoid a summary repeated at every level of a document (section, subsection, and whole document each restating the same summary), a single argument restated many times across a document, and a paragraph or section duplicated verbatim.
- Introduce a metaphor once, if at all. Do not repeat it five or more times across a document.
- Support a claim with one or two sources. Avoid a rapid stack of historical analogies used to build authority.
- State the object your argument reasons about. Do not replace it with a pointer to another document, as in "equations (15) to (17) of `docs/05-cp-model.md` state the rule". Write the equation, the table, the number, or the decision rule out under this document's own numbering, and keep the pointer as a source citation in a reference section or a footnote. Test the draft by deleting every pointer and reading what is left: where a claim then rests on nothing, the pointer was standing in for content.

**Report and outcome language**

- Report an outcome as a metric or a verdict. Do not dramatize it with "dead," "killed," "survives," or "breaks it."
- State what a document or a piece of code does. State what it does not do only when the absence is the actual finding.
- Keep task-board language (TODO, FIXME, "needs rewriting," "out of reach," "revisit later") inside an actual open-items list. Do not let it leak into narrative prose.
- Report a number to the precision the data supports. Do not add a decimal to a gap, a time, or a percentage the data does not support.

**Headings**

- Name a heading, a paragraph label, or a section-opening sentence for the object it covers, not for a claim about it. Do not open a heading with an interrogative (what, where, how, why, whether, when, who), do not join two clauses in a heading with "and," and do not follow a colon in a heading with a finite clause.
- Open a heading with the noun, not with an article. Write "Focusing questions," not "The focusing questions." A reader scanning a table of contents reads the noun and skips the article, so the article costs a word and returns nothing.
- Keep a count of the section's own items out of its heading. A heading that reads "Four focusing questions" above a list of five is a false statement about the document, and the list grows more often than the heading gets re-read. State the count in the first sentence of the section, where updating it is part of editing the list. A number fused into a compound adjective describes one thing rather than counting several, so "One-sentence argument" and "Two-column layout" are correct.
- Test a heading by stripping its article. What remains should be a plain noun phrase that names the object, in the words the section body already uses. Where the stripped heading reads thin or turns out to be a metaphor, the article was covering a naming problem: rename the object. "The restatement dressed as an example" strips to "Restatement dressed as an example," which still asks the reader to decode an image, and the object's real name is "Restatement in place of evidence."

**Override**

- One term per concept overrides every rule above. When a listed word is the standing term for a named thing (a cited paper's own term for its architecture, a quoted theorem's own word), keep that term. A substitute signals a different concept.

---

## 2. Academic writing (`paper/**`, `research/**`)

- Write the sentence shapes the field writes. State a constraint's action verb-first, and name its number in the same sentence. Example: "Constraint (1) assigns each event to an available period and room."
- Narrate model construction in first-person plural, with plain verbs: we use, we propose, we introduce, let X be.
- Introduce an entity by its definition. Do not introduce it through a metaphor or a purpose clause.
- Hedge a judgment inline, in the same sentence that states the claim, and quantify the hedge in that sentence.
- Keep formality mid. An overly formal word choice reads as machine written just as easily as an overly casual one. Write "start," not "commence"; write "use," not "utilize."
- Name a heading for the object its section covers. Load `.claude/skills/write-academic/resources/SECTION-REGISTER.md` before writing or renaming any heading in the paper, for the full corpus vocabulary and the approved section skeleton.
- Cite a claim with one citation form. Do not mix an author-year citation and a corpus slug for the same claim.
- Use em-dashes conservatively. Prefer a comma or parentheses wherever either reads as cleanly.
- Keep task-board language and revision-history phrasing ("up from X," "previously stood at Y") out of the paper. State the final value, not the drafting history.
- Do not cite a repository path or a `kind-OWNER-NN` decision code as the subject of a sentence. A reviewer cannot resolve either.
- Match the style to the output type:
  - Math formulation: standard notation conventions only.
  - Method or algorithm section: academic-flat and precise.
  - Literature review: vocabulary standard only.
  - Results or computational study: let the numbers speak, at the precision the data supports.
  - Discussion: rhythm and specificity can show; a direct, specific claim is acceptable.
  - Abstract: vocabulary standard only.
- Load `.claude/skills/write-academic/resources/STYLE-RULES.md` and `.claude/skills/refine-academic-writing/resources/GRAMMAR-CHECKLIST.md` for the full vocabulary standard, verb list, density, and hedging rules. This file states the register only.

---

## 3. Technical writing (`.specs/**`, `.chores/**`, `.history/**`, `.claude/**`, `docs/**`, `README*`)

**Claim first, code second.** State the claim in plain words. Put the `kind-OWNER-NN` code or the file path in parentheses at the end of the sentence, as a source reference only. A sentence whose grammatical subject is a code, a path, or a filename is a defect: the reader must open a file before the sentence means anything.

- Defect: "`decision-S06-14` dropped the genetic algorithm."
- Correct: "The genetic algorithm was dropped as a reported method on 2026-08-12, before any tuning (`decision-S06-14`)."

The rule governs sentences. Four places stay exempt, because they are lookup structures rather than prose: a table cell, a checklist item, a list whose only purpose is cross-reference, and the heading of an entry in a `decisions.md` file.

- Expand a code the first time it appears in a document. Write the date and the substance once, then use the bare code for later mentions in the same document.
- Keep task-board language (TODO, "out of reach," "needs rewriting") inside an actual open-items list: `TODO.md`, or a spec's Open Questions section.

---

## Reference: checker code map

`refine-academic-writing/scripts/check_prose.py` and `refine-technical-writing/scripts/check_prose.py` report findings under fixed code names. This table traces a finding back to the rule above that governs it.

| Code | Rule |
|---|---|
| C1 | General — State the predicate directly |
| C2, C9, C10 | General — Name the actual relation, not a transport/ownership verb |
| C3 | General — A model has no wallet or intent |
| C4 | General — State a constraint's action, not "exists to" |
| C5 | General — Reserve "admits" for its mathematical sense |
| C6 | General — Name the specific unit, not "X layer" |
| C11 | General — State the point, not a "worth noting" cleft |
| ANTHROPOMORPHISM | General — Name the author, or state the value |
| COMBATIVE | General — State what a thing does, not what it lacks |
| CONTRACTION | General — Write the full word form |
| DRAMATIC-OUTCOME | General — Report the metric or verdict plainly |
| TASK-BOARD | General — Keep task-board language in an open-items list / Technical — same |
| CHRONOLOGY | Academic — keep revision-history phrasing out of the paper |
| SWE-JARGON | General — Describe research work in research terms |
| METADISCOURSE | Technical — a path citation is allowed / Academic — not allowed |
| PROCESS-ID | Both lanes — Claim first, code second: no code as the subject of a sentence |
| EXTERNAL-OBJECT-REF | General — Self-containment: state the object, do not point at it |
| MIXED-CITATION | Academic — cite with one citation form |
| HEADER-FRAGMENT | General — Headings |
| HEADING-REGISTER | General — Headings: no leading article, no count of the section's own items |
| EM-DASH-DENSITY | General — Sentence and paragraph shape / Academic tightens it further |
| FILLER-WORD | General — Word choice |
| COPULA-DODGE | General — Word choice |
| SIGNPOST | General — Sentence and paragraph shape |
| RHETORICAL-QA | General — Sentence and paragraph shape |
| RETIRED-TERM | General — Word choice: use the retired terms' replacements |