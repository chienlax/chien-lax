# Before / After Examples

Calibration pairs for the target voice. This file grows: when the user flags a passage as AI writing, append the flagged text and its human rewrite here, and update `banlist.md` or `SKILL.md` as needed.

Each pair: the tell it illustrates, the before, the after, and one line on why the fix works.

---

## 1 — Assert-not-show (sincerity adjective)

**Tell:** "genuinely" asserts a quality the following clause should prove.

- **Before:** It is a genuinely hard problem, and the team handled it well.
- **After:** The write path and the cache invalidation share no ordering guarantee, so a stale read can outlive the update that should have expired it, and no off-the-shelf cache resolved this without a rewrite.
- **Why:** The rewrite deletes "genuinely" and "hard" and states the mechanism that makes the problem hard. The reader concludes it is hard from the evidence.

## 2 — Cliche framing verb + self-importance adjective

**Tell:** "delve into" and "significant impact" — machine cadence, no concrete content.

- **Before:** We delved into the existing schema and made a significant impact on query performance.
- **After:** We profiled the existing schema, found the missing composite index behind the slow joins, and added it.
- **Why:** "delved into" becomes "profiled"; "significant impact" becomes the two specific actions that constitute the impact.

## 3 — Performative contrast

**Tell:** "not just X — it is Y" stages the positive claim as a reveal.

- **Before:** The design is not just faster on paper — it is its operational simplicity that truly sets it apart.
- **After:** The design is faster on paper; what recommends it more is that it removes the nightly reconciliation job.
- **Why:** Drops the "not just… — it is" scaffolding and the intensifier "truly". States both halves plainly, joined by a semicolon.

## 4 — Moralising closer

**Tell:** the tidy inspirational final sentence that closes the thought for the reader.

- **Before:** In this migration, we see a testament to what a disciplined team can achieve, and the platform's future is brighter for it.
- **After:** Few migrations of this size land without a rollback.
- **Why:** Replaces the inspirational abstraction with a specific, checkable claim about rarity.

---

*Sparse by design at the start. Add pairs as they come up.*
