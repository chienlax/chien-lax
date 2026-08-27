# Data visualization

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- An API reference: JSON, SVG, CSS, DOM, and the option names are standard
     terms. -->

Charts, tables, stat tiles, and code blocks. The chart renderer draws inline
SVG and needs no charting library.

## renderChart

```js
UI.renderChart('#target', {
  type: 'bar',
  title: 'Solve time to a 2 percent gap',
  subtitle: 'Lower is better.',
  categories: ['Small', 'Medium', 'Large'],
  unit: 's',
  series: [{ name: 'Baseline', values: [11, 24, 38] }]
});
```

In markdown, use a ` ```chart ` fence with the same object as JSON. The
converter assigns the id and emits the call.

### Options

| Key | Type | Meaning |
|---|---|---|
| `type` | string | `bar`, `groupedBar`, `stackedBar`, `line`, `scatter` |
| `categories` | string[] | the x labels |
| `series` | object[] | `{name, values}`, or `{name, points}` for scatter |
| `unit` | string | appended to every value, `"s"` or `" km"` |
| `title`, `subtitle` | string | drawn above the plot |
| `height` | number | the SVG height, default 300 |
| `horizontal` | boolean | horizontal bars, `bar` only |
| `smooth` | boolean | Bézier curve instead of straight segments |
| `valueLabels` | boolean | value text on each bar, default true |
| `yMin`, `yMax` | number | override the scale |
| `colors` | string[] | override the series colours |
| `legend` | boolean | force the legend for a single series |
| `caption` | string | figure caption, ` ```chart ` fences only |

### Scale rules

- A bar always starts at zero. Truncating a bar axis misstates the ratio the
  bar is drawn to show.
- A line or a scatter lifts its floor when the data occupies a narrow band.
  When the minimum exceeds 35 percent of the maximum, the axis starts at a
  round number below it. A flat band drawn against zero hides the shape.
- The upper bound rounds to 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, or 10 times a power
  of ten. Four ticks, always.
- Set `yMin: 0` to force the floor back to zero.

### Colours and the theme

Series colours come from `--data-1` through `--data-6`, read at draw time. On
`themechange` every chart redraws, so a switch recolours the whole page. Never
hardcode a chart colour unless the colour states something itself, such as red
for a failure.

Beyond six series, colour separates nothing. Use small multiples.

### Accessibility

The renderer sets `role="img"` and an `aria-label` from the title. For a chart
that states a finding, repeat the number in the caption. A tooltip is not
readable by assistive technology.

## Tables

The converter wraps every markdown table. By hand:

```html
<div class="table-wrap breakout">
  <table>
    <thead><tr><th>Instance</th><th align="right">Students</th></tr></thead>
    <tbody>
      <tr><td>2025_09_HCM</td><td align="right" class="num">4,180</td></tr>
    </tbody>
  </table>
</div>
```

- A tinted header row, hairline row rules, zebra striping, and a row hover.
- `class="num"` sets the mono face on a numeric cell. Numbers already use
  tabular figures, so columns align without it.
- The wrapper scrolls horizontally, so a wide table never widens the page.
- `.table-wrap--rules` drops the card for a paper-style table: a heavy rule
  under the header, hairlines between rows, nothing else.

## Stat tiles

```html
<div class="stat-grid breakout">
  <div class="stat">
    <p class="stat__value">4.2×</p>
    <p class="stat__label">Solve time increase</p>
    <p class="stat__delta stat__delta--up">+11% vs baseline</p>
  </div>
</div>
```

The grid fits as many 160px tiles as the width allows. Keep a row to three or
four tiles. A tile states one number, and the label says what it measures.

## Comparison bars

For a share or a percentage, where a full chart would be too much.

```html
<div class="meter"><div class="meter__fill" style="width:92%"></div></div>
```

## Code blocks

```html
<div class="code-block breakout">
  <div class="code-block__head">
    <span>python</span>
    <button class="copy-btn" data-copy="code">Copy</button>
  </div>
  <pre><code class="language-python">…</code></pre>
</div>
```

highlight.js colours the block, and the theme toggle swaps between the github
and github-dark stylesheets. The kit forces the highlight background to
transparent so the token surface shows through.

An inline chip needs no class: `` `code` `` inside `.doc` is already styled.

## Which form fits the question

| The question | The form |
|---|---|
| How do a few named things compare? | horizontal bar |
| How does one measure move over an ordered axis? | line |
| What are the parts of each total? | stacked bar |
| Two measures against each other? | scatter |
| One number that matters on its own? | stat tile |
| Exact values a reader will quote? | table |
| How do the pieces connect? | a diagram, see DIAGRAMS.md |

A chart that shows three numbers is a sentence. Write the sentence instead.
