/* =====================================================================
   ui-design system runtime

   Eight modules, no shared globals beyond one namespace:
     1. theme        system default, manual override, persisted
     2. toc          collapsible left rail built from the headings
     3. progress     reading hairline under the header
     4. charts       renderChart(target, spec) -> inline SVG
     5. toast        transient status message, announced to screen readers
     6. clipboard    copy link and copy code
     7. interactions segmented controls, footnotes, back to top, drawer
     8. icons        Lucide, if the page loaded it

   Public surface: window.UI
     UI.renderChart(target, spec)
     UI.showToast(message)
     UI.setTheme('light' | 'dark' | 'system')
     UI.getTheme()  -> resolved 'light' | 'dark'
     UI.buildToc()
   A 'themechange' CustomEvent fires on document after every switch.
   ===================================================================== */

(function () {
  'use strict';

  var UI = (window.UI = window.UI || {});
  var STORAGE_KEY = 'ui-design-theme';

  /* ---------------------------------------------------------------- */
  /* small helpers                                                     */
  /* ---------------------------------------------------------------- */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function el(tag, attrs, children) {
    var node = document.createElementNS(
      tag === 'svg' || SVG_TAGS[tag] ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml',
      tag
    );
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      node.appendChild(c);
    });
    return node;
  }
  var SVG_TAGS = {
    g: 1, rect: 1, circle: 1, line: 1, path: 1, text: 1, polyline: 1, polygon: 1, defs: 1,
    linearGradient: 1, stop: 1, tspan: 1, clipPath: 1
  };

  function token(name) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v ? 'rgb(' + v + ')' : '#888';
  }
  function slug(s) {
    return s
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
  }

  /* ---------------------------------------------------------------- */
  /* 1. theme                                                          */
  /* ---------------------------------------------------------------- */

  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function resolved() {
    // The attribute wins. The head snippet sets it from storage, and a page
    // may also ship with data-theme hardcoded.
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* private mode */
    }
    if (stored === 'light' || stored === 'dark') return stored;
    return media.matches ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === 'system') {
      root.removeAttribute('data-theme');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    } else {
      root.setAttribute('data-theme', mode);
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (e) {}
    }
    var now = resolved();
    swapHighlightTheme(now);
    updateToggleLabel(now);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: now } }));
  }

  function swapHighlightTheme(mode) {
    var light = document.getElementById('hljs-light');
    var dark = document.getElementById('hljs-dark');
    if (light) light.disabled = mode === 'dark';
    if (dark) dark.disabled = mode !== 'dark';
  }

  function updateToggleLabel(mode) {
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', String(mode === 'dark'));
      var sun = $('[data-icon-sun]', btn);
      var moon = $('[data-icon-moon]', btn);
      if (sun) sun.style.display = mode === 'dark' ? '' : 'none';
      if (moon) moon.style.display = mode === 'dark' ? 'none' : '';
    });
  }

  UI.setTheme = applyTheme;
  UI.getTheme = resolved;

  function initTheme() {
    updateToggleLabel(resolved());
    swapHighlightTheme(resolved());
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(resolved() === 'dark' ? 'light' : 'dark');
      });
    });
    media.addEventListener('change', function () {
      if (!document.documentElement.hasAttribute('data-theme')) applyTheme('system');
    });
  }

  /* ---------------------------------------------------------------- */
  /* 2. table of contents                                              */
  /* ---------------------------------------------------------------- */

  function caretIcon() {
    var svg = el('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true'
    });
    svg.appendChild(el('path', { d: 'M6 9l6 6 6-6' }));
    return svg;
  }

  function buildToc() {
    var rail = $('[data-toc]');
    var root = $('[data-toc-root]') || $('.doc');
    if (!rail || !root) return;

    var headings = $$('h2, h3', root).filter(function (h) {
      return !h.hasAttribute('data-toc-skip');
    });
    if (!headings.length) {
      rail.style.display = 'none';
      return;
    }

    headings.forEach(function (h, i) {
      if (!h.id) h.id = slug(h.textContent) || 'section-' + i;
      if (!$('.heading-anchor', h)) {
        var a = el('a', { class: 'heading-anchor', href: '#' + h.id, 'aria-label': 'Link to this section', text: '#' });
        h.appendChild(a);
      }
    });

    var list = el('ul', { class: 'toc__list' });
    var currentSub = null;

    headings.forEach(function (h) {
      var text = h.textContent.replace(/#$/, '').trim();
      var link = el('a', { class: 'toc__link', href: '#' + h.id, text: text });
      link.dataset.tocFor = h.id;

      if (h.tagName === 'H2') {
        var li = el('li');
        var row = el('div', { class: 'toc__row' });
        var caret = el('button', {
          class: 'toc__caret toc__caret--placeholder',
          type: 'button',
          'aria-expanded': 'true'
        });
        caret.appendChild(caretIcon());
        row.appendChild(caret);
        row.appendChild(link);
        li.appendChild(row);
        list.appendChild(li);
        currentSub = { li: li, caret: caret, ul: null };
      } else if (currentSub) {
        if (!currentSub.ul) {
          currentSub.ul = el('ul', { class: 'toc__list' });
          currentSub.li.appendChild(currentSub.ul);
          currentSub.caret.classList.remove('toc__caret--placeholder');
          (function (state) {
            state.caret.addEventListener('click', function () {
              var open = state.caret.getAttribute('aria-expanded') === 'true';
              state.caret.setAttribute('aria-expanded', String(!open));
              state.ul.hidden = open;
            });
          })(currentSub);
        }
        var subLi = el('li');
        subLi.appendChild(link);
        currentSub.ul.appendChild(subLi);
      }
    });

    var body = $('[data-toc-body]', rail) || rail;
    body.appendChild(list);

    // Mark the section nearest the top of the viewport.
    var links = {};
    $$('.toc__link', rail).forEach(function (l) {
      links[l.dataset.tocFor] = l;
    });
    var visible = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          visible[e.target.id] = e.isIntersecting;
        });
        var active = headings.filter(function (h) {
          return visible[h.id];
        })[0];
        if (!active) return;
        $$('.toc__link', rail).forEach(function (l) {
          l.removeAttribute('aria-current');
        });
        if (links[active.id]) links[active.id].setAttribute('aria-current', 'true');
      },
      { rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 52) + 'px 0px -70% 0px' }
    );
    headings.forEach(function (h) {
      observer.observe(h);
    });
  }

  UI.buildToc = buildToc;

  function initTocDrawer() {
    var rail = $('[data-toc]');
    var toggle = $('[data-toc-toggle]');
    if (!rail || !toggle) return;
    var scrim = el('div', { class: 'toc-scrim' });
    document.body.appendChild(scrim);

    function open() {
      rail.classList.add('toc--drawer', 'is-open');
      scrim.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      rail.classList.remove('is-open');
      scrim.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        if (!rail.classList.contains('is-open')) rail.classList.remove('toc--drawer');
      }, 300);
    }
    toggle.addEventListener('click', function () {
      if (rail.classList.contains('is-open')) close();
      else open();
    });
    scrim.addEventListener('click', close);
    rail.addEventListener('click', function (e) {
      if (e.target.classList.contains('toc__link')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------------------------------------------------------- */
  /* 3. reading progress                                               */
  /* ---------------------------------------------------------------- */

  function initProgress() {
    var bar = $('[data-progress]');
    if (!bar) return;
    function update() {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (height > 0 ? (top / height) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* 4. charts                                                         */
  /* ---------------------------------------------------------------- */

  var registry = [];
  var tooltip = null;

  function getTooltip() {
    if (!tooltip) {
      tooltip = el('div', { class: 'chart__tooltip', role: 'presentation' });
      document.body.appendChild(tooltip);
    }
    return tooltip;
  }

  function bindTip(node, label) {
    node.addEventListener('mouseenter', function (e) {
      var t = getTooltip();
      t.textContent = label;
      t.classList.add('is-visible');
      moveTip(e);
    });
    node.addEventListener('mousemove', moveTip);
    node.addEventListener('mouseleave', function () {
      getTooltip().classList.remove('is-visible');
    });
  }
  function moveTip(e) {
    var t = getTooltip();
    t.style.left = e.clientX + 14 + 'px';
    t.style.top = e.clientY - 34 + 'px';
  }

  var NICE = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

  function niceMax(value) {
    if (value <= 0) return 1;
    var base = Math.pow(10, Math.floor(Math.log10(value)));
    var frac = value / base;
    for (var i = 0; i < NICE.length; i++) {
      if (frac <= NICE[i]) return NICE[i] * base;
    }
    return 10 * base;
  }

  function niceFloor(value) {
    if (value <= 0) return 0;
    var base = Math.pow(10, Math.floor(Math.log10(value)));
    var frac = value / base;
    var step = NICE[0];
    for (var i = 0; i < NICE.length; i++) {
      if (NICE[i] <= frac) step = NICE[i];
    }
    return step * base;
  }

  function fmt(v, unit) {
    var s = Math.abs(v) >= 1000 ? v.toLocaleString() : String(Math.round(v * 100) / 100);
    return unit ? s + unit : s;
  }

  function seriesColor(i, spec) {
    if (spec.colors && spec.colors[i]) return spec.colors[i];
    return token('--data-' + ((i % 6) + 1));
  }

  /**
   * renderChart(target, spec)
   *   target  CSS selector or element
   *   spec    { type, categories, series, unit, title, subtitle, height,
   *             horizontal, yMax, valueLabels, smooth, colors }
   *   type    'bar' | 'groupedBar' | 'stackedBar' | 'line' | 'scatter'
   *   series  [{ name, values: [] }]  (scatter: { name, points: [[x,y]] })
   */
  function renderChart(target, spec) {
    var host = typeof target === 'string' ? $(target) : target;
    if (!host) return;
    if (!registry.some(function (r) { return r.host === host; })) {
      registry.push({ host: host, spec: spec });
    }
    host.innerHTML = '';
    host.classList.add('chart');

    if (spec.title) host.appendChild(el('div', { class: 'chart__title', text: spec.title }));
    if (spec.subtitle) host.appendChild(el('div', { class: 'chart__subtitle', text: spec.subtitle }));

    var series = spec.series || [];
    if (series.length > 1 || spec.legend) {
      var legend = el('div', { class: 'chart__legend' });
      series.forEach(function (s, i) {
        var item = el('span');
        var sw = el('i', { class: 'chart__swatch' });
        sw.style.backgroundColor = seriesColor(i, spec);
        item.appendChild(sw);
        item.appendChild(document.createTextNode(s.name || 'Series ' + (i + 1)));
        legend.appendChild(item);
      });
      host.appendChild(legend);
    }

    var W = 720;
    var H = spec.height || 300;
    var pad = spec.horizontal
      ? { t: 8, r: 44, b: 28, l: 118 }
      : { t: 14, r: 12, b: 40, l: 46 };
    var svg = el('svg', {
      class: 'chart__svg',
      viewBox: '0 0 ' + W + ' ' + H,
      preserveAspectRatio: 'xMidYMid meet',
      role: 'img',
      'aria-label': spec.title || 'chart'
    });

    var plotW = W - pad.l - pad.r;
    var plotH = H - pad.t - pad.b;
    var cats = spec.categories || [];
    var muted = token('--text-muted');
    var gridColor = token('--border-subtle');

    // ---- scale ------------------------------------------------------
    var maxValue = 0;
    if (spec.type === 'stackedBar') {
      cats.forEach(function (_, ci) {
        var sum = series.reduce(function (a, s) { return a + (s.values[ci] || 0); }, 0);
        maxValue = Math.max(maxValue, sum);
      });
    } else if (spec.type === 'scatter') {
      series.forEach(function (s) {
        (s.points || []).forEach(function (p) { maxValue = Math.max(maxValue, p[1]); });
      });
    } else {
      series.forEach(function (s) {
        (s.values || []).forEach(function (v) { maxValue = Math.max(maxValue, v); });
      });
    }
    // A bar always starts at zero. A line or a scatter may lift its floor,
    // because a flat band drawn against zero hides the shape of the data.
    var minValue = Infinity;
    if (spec.type === 'line') {
      series.forEach(function (s) {
        (s.values || []).forEach(function (v) { minValue = Math.min(minValue, v); });
      });
    } else if (spec.type === 'scatter') {
      series.forEach(function (s) {
        (s.points || []).forEach(function (p) { minValue = Math.min(minValue, p[1]); });
      });
    }
    if (!isFinite(minValue)) minValue = 0;

    var yMin = spec.yMin;
    if (yMin === undefined) {
      yMin =
        (spec.type === 'line' || spec.type === 'scatter') &&
        minValue > 0 &&
        minValue > 0.35 * maxValue
          ? niceFloor(minValue - (maxValue - minValue) * 0.25)
          : 0;
    }
    var yMax = spec.yMax || (yMin > 0 ? yMin + niceMax((maxValue - yMin) * 1.1) : niceMax(maxValue * 1.08));
    var span = yMax - yMin || 1;
    var frac = function (v) {
      return (v - yMin) / span;
    };
    var ticks = 4;

    // ---- grid and axis ----------------------------------------------
    var grid = el('g', { class: 'chart__grid' });
    var axis = el('g', { class: 'chart__axis' });

    if (spec.horizontal) {
      for (var i = 0; i <= ticks; i++) {
        var x = pad.l + (plotW / ticks) * i;
        grid.appendChild(el('line', { x1: x, y1: pad.t, x2: x, y2: pad.t + plotH, stroke: gridColor }));
        axis.appendChild(
          el('text', {
            x: x, y: pad.t + plotH + 18, 'text-anchor': 'middle', fill: muted,
            text: fmt(yMin + (span / ticks) * i, spec.unit)
          })
        );
      }
    } else {
      for (var j = 0; j <= ticks; j++) {
        var y = pad.t + plotH - (plotH / ticks) * j;
        grid.appendChild(el('line', { x1: pad.l, y1: y, x2: pad.l + plotW, y2: y, stroke: gridColor }));
        axis.appendChild(
          el('text', {
            x: pad.l - 10, y: y + 4, 'text-anchor': 'end', fill: muted,
            text: fmt(yMin + (span / ticks) * j, spec.unit)
          })
        );
      }
    }
    svg.appendChild(grid);

    // ---- marks -------------------------------------------------------
    var marks = el('g');

    if (spec.type === 'bar' || spec.type === 'groupedBar' || spec.type === 'stackedBar') {
      var n = cats.length || 1;
      var band = (spec.horizontal ? plotH : plotW) / n;
      var groupPad = band * 0.28;
      var inner = band - groupPad;
      var perBar =
        spec.type === 'groupedBar' ? inner / Math.max(series.length, 1) : inner;
      var isStacked = spec.type === 'stackedBar';
      // A stack is one rounded silhouette, not one rounded rect per segment:
      // each category's segments draw with square corners into a <g> clipped
      // to a single rounded rect the size of the whole stack.
      var stackDefs = isStacked ? el('defs') : null;
      var clipPrefix = 'chart-clip-' + Math.random().toString(36).slice(2, 8);

      cats.forEach(function (cat, ci) {
        var start = (spec.horizontal ? pad.t : pad.l) + band * ci + groupPad / 2;
        var stackOffset = 0;
        var group = marks;

        if (isStacked) {
          var total = series.reduce(function (a, s) { return a + ((s.values || [])[ci] || 0); }, 0);
          var totalLength = frac(total) * (spec.horizontal ? plotW : plotH);
          var clipId = clipPrefix + '-' + ci;
          var clipRect = spec.horizontal
            ? { x: pad.l, y: start, width: Math.max(totalLength, 1), height: perBar, rx: 3 }
            : { x: start, y: pad.t + plotH - totalLength, width: perBar, height: Math.max(totalLength, 1), rx: 3 };
          stackDefs.appendChild(el('clipPath', { id: clipId }, [el('rect', clipRect)]));
          group = el('g', { 'clip-path': 'url(#' + clipId + ')' });
          marks.appendChild(group);
        }

        series.forEach(function (s, si) {
          var value = (s.values || [])[ci] || 0;
          var length = frac(value) * (spec.horizontal ? plotW : plotH);
          var color = seriesColor(si, spec);
          var rect;

          if (spec.horizontal) {
            var yPos = spec.type === 'groupedBar' ? start + perBar * si : start;
            var xPos = pad.l + (isStacked ? stackOffset : 0);
            rect = el('rect', {
              class: 'chart__bar', x: xPos, y: yPos, width: Math.max(length, 1),
              height: Math.max(perBar - (spec.type === 'groupedBar' ? 3 : 0), 2),
              rx: isStacked ? 0 : 3, fill: color
            });
            if (spec.valueLabels !== false && !isStacked) {
              marks.appendChild(
                el('text', {
                  class: 'chart__value', x: xPos + length + 6, y: yPos + perBar / 2 + 3,
                  fill: muted, text: fmt(value, spec.unit)
                })
              );
            }
            stackOffset += length;
          } else {
            var xp = spec.type === 'groupedBar' ? start + perBar * si : start;
            var yp = isStacked
              ? pad.t + plotH - stackOffset - length
              : pad.t + plotH - length;
            rect = el('rect', {
              class: 'chart__bar', x: xp, y: yp,
              width: Math.max(perBar - (spec.type === 'groupedBar' ? 3 : 0), 2),
              height: Math.max(length, 1), rx: isStacked ? 0 : 3, fill: color
            });
            if (spec.valueLabels !== false && !isStacked) {
              marks.appendChild(
                el('text', {
                  class: 'chart__value', x: xp + perBar / 2, y: yp - 5,
                  'text-anchor': 'middle', fill: muted, text: fmt(value, spec.unit)
                })
              );
            }
            stackOffset += length;
          }

          bindTip(rect, (s.name ? s.name + ' · ' : '') + cat + ': ' + fmt(value, spec.unit));
          group.appendChild(rect);
        });

        // category label
        if (spec.horizontal) {
          axis.appendChild(
            el('text', {
              x: pad.l - 12, y: start + inner / 2 + 4, 'text-anchor': 'end', fill: muted, text: cat
            })
          );
        } else {
          axis.appendChild(
            el('text', {
              x: pad.l + band * ci + band / 2, y: pad.t + plotH + 20,
              'text-anchor': 'middle', fill: muted, text: cat
            })
          );
        }
      });

      if (stackDefs) svg.appendChild(stackDefs);
    }

    if (spec.type === 'line') {
      var stepX = cats.length > 1 ? plotW / (cats.length - 1) : plotW;
      series.forEach(function (s, si) {
        var color = seriesColor(si, spec);
        var pts = (s.values || []).map(function (v, i) {
          return [pad.l + stepX * i, pad.t + plotH - frac(v) * plotH];
        });
        var d = pts
          .map(function (p, i) {
            if (i === 0) return 'M ' + p[0] + ' ' + p[1];
            if (!spec.smooth) return 'L ' + p[0] + ' ' + p[1];
            var prev = pts[i - 1];
            var cx = (prev[0] + p[0]) / 2;
            return 'C ' + cx + ' ' + prev[1] + ', ' + cx + ' ' + p[1] + ', ' + p[0] + ' ' + p[1];
          })
          .join(' ');
        marks.appendChild(
          el('path', { d: d, fill: 'none', stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
        );
        pts.forEach(function (p, i) {
          var c = el('circle', {
            class: 'chart__point', cx: p[0], cy: p[1], r: 4,
            fill: token('--bg'), stroke: color, 'stroke-width': 2.5
          });
          bindTip(c, (s.name ? s.name + ' · ' : '') + (cats[i] || i) + ': ' + fmt(s.values[i], spec.unit));
          marks.appendChild(c);
        });
      });
      cats.forEach(function (cat, i) {
        axis.appendChild(
          el('text', {
            x: pad.l + stepX * i, y: pad.t + plotH + 20, 'text-anchor': 'middle', fill: muted, text: cat
          })
        );
      });
    }

    if (spec.type === 'scatter') {
      var xMax = spec.xMax || 0;
      series.forEach(function (s) {
        (s.points || []).forEach(function (p) { xMax = Math.max(xMax, p[0]); });
      });
      xMax = niceMax(xMax * 1.08);
      series.forEach(function (s, si) {
        var color = seriesColor(si, spec);
        (s.points || []).forEach(function (p) {
          var c = el('circle', {
            class: 'chart__point',
            cx: pad.l + (p[0] / xMax) * plotW,
            cy: pad.t + plotH - frac(p[1]) * plotH,
            r: 5, fill: color, 'fill-opacity': 0.85
          });
          bindTip(c, (s.name ? s.name + ' · ' : '') + p[0] + ', ' + fmt(p[1], spec.unit));
          marks.appendChild(c);
        });
      });
      for (var k = 0; k <= ticks; k++) {
        axis.appendChild(
          el('text', {
            x: pad.l + (plotW / ticks) * k, y: pad.t + plotH + 20,
            'text-anchor': 'middle', fill: muted, text: fmt((xMax / ticks) * k, '')
          })
        );
      }
    }

    // baseline
    marks.appendChild(
      el('line', {
        x1: pad.l, y1: pad.t + plotH, x2: pad.l + plotW, y2: pad.t + plotH,
        stroke: token('--border'), 'stroke-width': 1
      })
    );

    svg.appendChild(marks);
    svg.appendChild(axis);
    host.appendChild(svg);

    if (spec.xLabel || spec.yLabel) {
      var note = el('div', { class: 'chart__subtitle' });
      note.textContent = [spec.yLabel ? 'y: ' + spec.yLabel : '', spec.xLabel ? 'x: ' + spec.xLabel : '']
        .filter(Boolean)
        .join('   ');
      host.appendChild(note);
    }
  }

  UI.renderChart = renderChart;

  function redrawCharts() {
    registry.forEach(function (r) {
      renderChart(r.host, r.spec);
    });
  }

  /* ---------------------------------------------------------------- */
  /* 5. toast                                                          */
  /* ---------------------------------------------------------------- */

  var toastTimer = null;

  function showToast(message) {
    var node = $('[data-toast]');
    if (!node) {
      node = el('div', { class: 'toast', 'data-toast': '', role: 'status', 'aria-live': 'polite' });
      node.appendChild(el('span', { 'data-toast-text': '' }));
      document.body.appendChild(node);
    }
    var text = $('[data-toast-text]', node) || node;
    text.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      node.classList.remove('is-visible');
    }, 3000);
  }

  UI.showToast = showToast;

  /* ---------------------------------------------------------------- */
  /* 6. clipboard                                                      */
  /* ---------------------------------------------------------------- */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // file:// and plain http fall back to the older path.
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(area);
    });
  }

  function initClipboard() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (!btn) return;
      var what = btn.getAttribute('data-copy');
      var text;
      if (what === 'link') text = window.location.href;
      else if (what === 'code') {
        var block = btn.closest('.code-block');
        var code = block && $('code', block);
        text = code ? code.textContent : '';
      } else {
        var src = document.querySelector(what);
        text = src ? src.textContent : what;
      }
      copyText(text).then(
        function () {
          showToast(btn.getAttribute('data-copy-message') || 'Copied to clipboard');
        },
        function () {
          showToast('Copy failed');
        }
      );
    });
  }

  /* ---------------------------------------------------------------- */
  /* 7. interactions                                                   */
  /* ---------------------------------------------------------------- */

  function initSegmented() {
    $$('[data-segmented]').forEach(function (group) {
      var buttons = $$('button', group);
      buttons.forEach(function (btn) {
        btn.setAttribute('role', 'tab');
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) {
            b.setAttribute('aria-selected', String(b === btn));
          });
          var panelSel = btn.getAttribute('data-panel');
          if (panelSel) {
            var scope = group.getAttribute('data-segmented');
            $$('[data-panel-group="' + scope + '"]').forEach(function (p) {
              p.hidden = true;
            });
            var panel = $(panelSel);
            if (panel) panel.hidden = false;
          }
          group.dispatchEvent(
            new CustomEvent('segmentchange', {
              bubbles: true,
              detail: { value: btn.getAttribute('data-value') || btn.textContent.trim() }
            })
          );
        });
      });
      group.setAttribute('role', 'tablist');
    });
  }

  function initFootnotes() {
    function flash() {
      if (!location.hash || location.hash.indexOf('#fn') !== 0) return;
      var target = document.getElementById(location.hash.slice(1));
      if (!target) return;
      target.classList.add('footnote-target');
      setTimeout(function () {
        target.classList.remove('footnote-target');
      }, 2000);
    }
    window.addEventListener('hashchange', flash);
    flash();
  }

  function initBackToTop() {
    var btn = $('[data-to-top]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener(
      'scroll',
      function () {
        btn.classList.toggle('is-visible', window.scrollY > 800);
      },
      { passive: true }
    );
  }

  function initSearch() {
    var toggle = $('[data-search-toggle]');
    var panel = $('[data-search-panel]');
    if (!toggle || !panel) return;
    var input = $('input', panel);
    toggle.addEventListener('click', function () {
      var open = !panel.hidden;
      panel.hidden = open;
      toggle.setAttribute('aria-expanded', String(!open));
      if (!open && input) input.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* 8. icons                                                          */
  /* ---------------------------------------------------------------- */

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---------------------------------------------------------------- */
  /* boot                                                              */
  /* ---------------------------------------------------------------- */

  function boot() {
    initTheme();
    buildToc();
    initTocDrawer();
    initProgress();
    initClipboard();
    initSegmented();
    initFootnotes();
    initBackToTop();
    initSearch();
    initIcons();

    if (window.hljs) {
      $$('pre code').forEach(function (block) {
        window.hljs.highlightElement(block);
      });
    }

    document.addEventListener('themechange', function () {
      redrawCharts();
      initIcons();
    });

    var pending = window.__uiCharts || [];
    pending.forEach(function (c) {
      renderChart(c[0], c[1]);
    });
    window.__uiCharts = { push: function (c) { renderChart(c[0], c[1]); } };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
