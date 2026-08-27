# Reader highlighting

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A runtime-surface reference: JSON, DOM, localStorage, and the field and
     class names are standard terms. -->

A reader selects text inside the reading column and highlights it in one of four colours: yellow, green, blue, or pink. A colour click on an existing highlight recolours it instead of nesting a new mark. The reader attaches a short note to a highlight through the same toolbar, and the note shows on hover. A highlight survives a page reload, because the runtime persists it to the browser's local storage.

## Record shape

Each highlight is one record with five fields.

| Field | Meaning |
|---|---|
| `b` | Zero-based index of the block element inside `.doc` |
| `s` | Start character offset inside the block's plain text |
| `e` | End character offset inside the block's plain text |
| `c` | Colour name: `yellow`, `green`, `blue`, or `pink` |
| `n` | Note text, or an empty string |

## The anchoring rule

The block list is every `.doc p, .doc li, .doc td, .doc th, .doc h2, .doc h3, .doc blockquote` in document order, excluding a block inside `pre`, `code`, or `figure`. The offsets `s` and `e` count characters in the concatenated text of that block's own text nodes.

This anchoring has one limit. A rebuild that edits the source prose shifts the character positions, so a stored offset no longer lands on the same words. The runtime skips a record whose offsets exceed the rebuilt block's text length or whose block index no longer exists, so an edited page drops or misplaces the affected records instead of raising an error.

## Storage

Each page persists its highlights under the key `ui-highlights:` followed by `location.pathname`, so two pages never share one record set. Every read and write goes through a try/catch block, because a private window or a browser that blocks storage throws on access. The page renders correctly with no stored highlights in that case.

## Runtime surface

```js
UI.highlights.list()         // -> the array of records for this page
UI.highlights.clear()        // removes every highlight from the page and storage
UI.highlights.exportJSON()   // copies pretty-printed JSON to the clipboard, returns the JSON string
UI.highlights.importJSON(text) // parses text, replaces the stored set, re-renders; invalid JSON shows a toast and changes nothing
```

## Excluded elements

Highlighting does not apply inside `pre`, `code`, `figure`, `.chart`, `.mermaid`, or any element carrying `data-no-highlight`. A selection that starts or ends inside one of these elements does not raise the toolbar.
