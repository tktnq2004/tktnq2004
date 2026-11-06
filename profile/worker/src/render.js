// Draws the profile browser as SVG. The Worker uses this to draw each piece for
// the current state, and profile/build.mjs uses it for the README markup and
// the static buttons.
//
// The browser is cut into tiles that sit side by side in the README. Every tile
// of a row draws the whole row and shows only its own slice (through viewBox),
// so shapes that cross tile edges still line up. Each tile is its own link, so
// the tabs and the menu items can be clicked.

export const USER = 'tktnq2004';
export const PROFILE = `https://github.com/${USER}`;
export const LIVE = `https://${USER}.github.io/${USER}/`;
export const EMAIL = 'tktnq2004@gmail.com';
export const CV = `${PROFILE}/${USER}/blob/main/assets/Tran-Khuong-Trung-Nhat-Quang-CV.pdf`;

export const ORDER = ['about', 'stack', 'contact'];
const PAGES = {
  about: { tab: 'About', menu: 'about', path: '/about' },
  stack: { tab: 'Tech stack', menu: 'tech stack', path: '/tech-stack' },
  contact: { tab: 'Contact', menu: 'contact', path: '/contact' },
};

const ABOUT = {
  hello: "hello, world — I'm",
  name: 'Trần Khương Trung Nhật Quang',
  role: 'Full-stack Developer · Ho Chi Minh City',
  bio: 'I build web apps end to end, from the database schema to the last button.',
  status: 'Open to intern / fresher roles',
};

// [group, [[name, brand color or null for the text color]]]
const STACK = [
  ['frontend', [['Next.js', null], ['React', '#61dafb'], ['JavaScript', '#F7DF1E'], ['TypeScript', '#3178c6'],]],
  ['backend', [['Spring Boot', '#6db33f'], ['Node.js', '#5fa04e']]],
  ['database', [['MySQL', '#4479a1'], ['SQL Server', '#cc2927'], ['MongoDB', '#47a248'], ['Redis', '#ff4438']]],
  ['tools', [['Docker', '#2496ed'], ['Git', '#f05032'], ['Claude code', '#D97757']]],
];

const CONTACT = [
  { tag: 'email', value: EMAIL, sub: 'the fastest way to reach me' },
  { tag: 'portfolio', value: 'Full portfolio', sub: `${USER}.github.io/${USER}` },
];

// ---------------------------------------------------------------- theme

const SANS = `'Inter','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif`;
const MONO = `'JetBrains Mono','Cascadia Code',ui-monospace,Consolas,Menlo,monospace`;

const LIGHT = {
  strip: '#e3e8ee', bar: '#f6f8fa', field: '#e8ecf0', win: '#ffffff', chip: '#f6f8fa', code: '#f6f8fa',
  ink: '#1f2328', ink2: '#59636e', ink3: '#6e7781', acc: '#4f46e5', ok: '#1a7f37', white: '#ffffff',
  kw: '#cf222e', str: '#0a3069', num: '#0550ae', fn: '#8250df',
  frame: '#c3ccd5', line: '#d8dee4', g1: '#4f46e5', g2: '#0891b2',
};
const DARK = {
  strip: '#010409', bar: '#1c2128', field: '#0d1117', win: '#151b23', chip: '#212830', code: '#0d1117',
  ink: '#f0f6fc', ink2: '#9198a1', ink3: '#848d97', acc: '#a5b4fc', ok: '#3fb950', white: '#ffffff',
  kw: '#ff7b72', str: '#a5d6ff', num: '#79c0ff', fn: '#d2a8ff',
  frame: '#3d444d', line: '#30363d', g1: '#6366f1', g2: '#06b6d4',
};
const FILLS = ['strip', 'bar', 'field', 'win', 'chip', 'code', 'ink', 'ink2', 'ink3', 'acc', 'ok', 'white', 'kw', 'str', 'num', 'fn'];
const STROKES = ['frame', 'line', 'acc', 'ink2', 'ink3'];
const palette = (c) =>
  FILLS.map((k) => `.f-${k}{fill:${c[k]}}`).join('') +
  STROKES.map((k) => `.s-${k}{stroke:${c[k]}}`).join('') +
  `.g1{stop-color:${c.g1}}.g2{stop-color:${c.g2}}`;

// Entrances: a new tab rises into the strip, page content fades up.
const MOTION =
  '@keyframes pop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
  '.pop{animation:pop .35s ease-out both}' +
  '@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
  '.in{animation:in .45s ease-out both}' +
  [1, 2, 3, 4, 5].map((i) => `.d${i}{animation-delay:${(i * 0.07).toFixed(2)}s}`).join('');

const CSS = `text{font-family:${SANS}}.mono{font-family:${MONO}}${palette(LIGHT)}@media (prefers-color-scheme:dark){${palette(DARK)}}${MOTION}`;

// ---------------------------------------------------------------- svg helpers

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rough text width so boxes fit system fonts (READMEs cannot load web fonts).
export function tw(str, size, { mono = false, bold = false } = {}) {
  if (mono) return [...str].length * 0.6 * size;
  let w = 0;
  for (const ch of str) {
    if (' .,:;\'|!()[]ijlI1tf/'.includes(ch)) w += 0.3;
    else if ('mwMW@'.includes(ch)) w += 0.86;
    else if (/[A-ZĐ0-9]/.test(ch.normalize('NFD')[0])) w += 0.64;
    else if ('—–·'.includes(ch)) w += 0.6;
    else w += 0.54;
  }
  return w * size * (bold ? 1.05 : 1);
}

function wrap(str, size, max) {
  const lines = [];
  let cur = '';
  for (const word of str.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && tw(next, size) > max) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function text(x, y, str, { size = 15, cls = 'f-ink', bold = false, mono = false, anchor } = {}) {
  const a = [`x="${x}"`, `y="${y}"`, `font-size="${size}"`, `class="${cls}${mono ? ' mono' : ''}"`];
  if (bold) a.push('font-weight="600"');
  if (anchor) a.push(`text-anchor="${anchor}"`);
  return `<text ${a.join(' ')}>${esc(str)}</text>`;
}

const gradient = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="g1"/><stop offset="1" class="g2"/></linearGradient>`;

// The Wengg mark: a cat peeking over the edge of a screen, white on a sea-blue
// tile. Same colours in light and dark. Masters live in profile/logo/.
export const SEA = '#3a9fdc';
// The small-size cut (16-unit grid): head, ears, eye holes, desk with two paws.
const CAT_SMALL =
  'M4 11V7.5A4 4 0 0 1 12 7.5V11ZM4 8V2.6Q4.2 1.5 5.1 2.2L7.6 5ZM12 8L8.4 5L10.9 2.2Q11.8 1.5 12 2.6Z' +
  'M6 7V9H7V7ZM9 7V9H10V7Z' +
  'M0 12Q0 11 0.8 11A1.2 1.2 0 0 1 3.2 11H12.8A1.2 1.2 0 0 1 15.2 11Q16 11 16 12V14Q16 15 15 15H1Q0 15 0 14Z';
export function mark(x, y, s) {
  const k = s / 256;
  const t = `translate(${+(x + 48.64 * k).toFixed(3)} ${+(y + 44.04 * k).toFixed(3)}) scale(${+(9.92 * k).toFixed(4)})`;
  return (
    `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${+(s * 0.225).toFixed(2)}" fill="${SEA}"/>` +
    `<path transform="${t}" fill="#fff" d="${CAT_SMALL}"/>`
  );
}

// x0 shifts the viewBox, so a tile shows its own slice of a wider drawing.
export function svgDoc(w, h, body, x0 = 0) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x0} 0 ${w} ${h}"><style>${CSS}</style><defs>${gradient}</defs>${body}</svg>\n`;
}

// ---------------------------------------------------------------- layout

export const W = 1000;
const STRIP = 44; // tab strip
const BAR = 48; // toolbar with the address field
const TOP_H = STRIP + BAR;
const HEAD_H = 64; // the site's own header and menu
const PAGE_H = 290;
const R = 12;

const SLOT_X = 80; // first tab
const SLOT_W = 190; // one tab: a 150 wide body (focus) and a 40 wide close button
const LABEL_W = 150;
const SLOTS = 3;

// Clickable slices. Widths are in units of W, so width / 10 is the percentage.
export const TOP_COLS = [
  { id: 'lead', x: 0, w: SLOT_X },
  ...Array.from({ length: SLOTS }, (_, i) => [
    { id: `t${i}`, x: SLOT_X + SLOT_W * i, w: LABEL_W, action: `focus?slot=${i}`, alt: `Tab ${i + 1}` },
    { id: `x${i}`, x: SLOT_X + SLOT_W * i + LABEL_W, w: SLOT_W - LABEL_W, action: `close?slot=${i}`, alt: `Close tab ${i + 1}` },
  ]).flat(),
  { id: 'tail', x: SLOT_X + SLOT_W * SLOTS, w: W - SLOT_X - SLOT_W * SLOTS },
];
const MENU_X = { about: 690, stack: 810, contact: 940 };
export const HEAD_COLS = [
  { id: 'brand', x: 0, w: 640, action: 'open?tab=about', alt: 'WENGG' },
  { id: 'about', x: 640, w: 100, action: 'open?tab=about', alt: 'about' },
  { id: 'stack', x: 740, w: 140, action: 'open?tab=stack', alt: 'tech stack' },
  { id: 'contact', x: 880, w: 120, action: 'open?tab=contact', alt: 'contact' },
];

// ---------------------------------------------------------------- tab strip + toolbar

const favicon = (x, y) => mark(x, y, 16);

function tab(i, id, active, pop) {
  const x0 = SLOT_X + SLOT_W * i + 4;
  const x1 = SLOT_X + SLOT_W * (i + 1) - 4;
  const cy = STRIP / 2 + 1;
  // Active tab: rounded top, little curved feet where it meets the toolbar.
  const shape = active
    ? `<path d="M${x0 - 8} ${STRIP}a8 8 0 0 0 8-8V16a10 10 0 0 1 10-10H${x1 - 10}a10 10 0 0 1 10 10V${STRIP - 8}a8 8 0 0 0 8 8Z" class="f-bar"/>`
    : '';
  const close = `<path d="M${x1 - 22} ${cy - 4}l8 8M${x1 - 14} ${cy - 4}l-8 8" class="s-ink3" stroke-width="1.5" stroke-linecap="round"/>`;
  const body = shape + favicon(x0 + 12, cy - 8) + text(x0 + 36, cy + 4.5, PAGES[id].tab, { size: 13, cls: active ? 'f-ink' : 'f-ink2' }) + close;
  return pop ? `<g class="pop">${body}</g>` : body;
}

function top(state, now) {
  const { tabs, active } = state;
  const fresh = state.fresh && now - state.freshAt < FRESH_MS ? state.fresh : null;
  const lights = [20, 38, 56].map((cx, i) => `<circle cx="${cx}" cy="${STRIP / 2 + 1}" r="6" fill="${['#ff5f57', '#febc2e', '#28c840'][i]}"/>`).join('');
  // Thin separators between two inactive neighbours, like a real browser.
  let seps = '';
  for (let i = 0; i < tabs.length - 1; i++) {
    if (tabs[i] !== active && tabs[i + 1] !== active) {
      const x = SLOT_X + SLOT_W * (i + 1);
      seps += `<path d="M${x} 15V31" class="s-line" stroke-width="1.2"/>`;
    }
  }
  const px = SLOT_X + SLOT_W * Math.min(tabs.length, SLOTS) + 22;
  const plus = `<path d="M${px} ${STRIP / 2 - 5}v12M${px - 6} ${STRIP / 2 + 1}h12" class="s-ink3" stroke-width="1.6" stroke-linecap="round"/>`;
  const page = PAGES[active];
  const urlX = 150;
  const y = STRIP;
  return (
    `<path d="M.75 ${STRIP}V${R}A${R - 0.75} ${R - 0.75} 0 0 1 ${R} .75H${W - R}A${R - 0.75} ${R - 0.75} 0 0 1 ${W - 0.75} ${R}V${STRIP}Z" class="f-strip"/>` +
    `<rect x=".75" y="${STRIP}" width="${W - 1.5}" height="${BAR}" class="f-bar"/>` +
    lights +
    seps +
    tabs.map((id, i) => tab(i, id, id === active, id === fresh)).join('') +
    plus +
    text(W - 22, STRIP / 2 + 5, 'tabs and menu are clickable', { size: 11, cls: 'f-ink3', mono: true, anchor: 'end' }) +
    // toolbar
    `<path d="M38 ${y + 24}H24M30 ${y + 18}l-6 6 6 6" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M60 ${y + 24}h14M68 ${y + 18}l6 6-6 6" class="s-ink3" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>` +
    `<path d="M117 ${y + 24}a7 7 0 1 1-2.05-4.95" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    `<path d="M116.5 ${y + 15.5}v4.2h-4.2" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<rect x="${urlX + 4}" y="${y + 7}" width="${W - urlX - 26}" height="34" rx="17" class="f-field"/>` +
    `<rect x="${urlX + 21}" y="${y + 21}" width="11" height="8.5" rx="2" class="f-ink3"/>` +
    `<path d="M${urlX + 23.5} ${y + 21}v-2.2a3 3 0 0 1 6 0V${y + 21}" class="s-ink3" stroke-width="1.5" fill="none"/>` +
    `<text x="${urlX + 44}" y="${y + 29}" font-size="14"><tspan class="f-ink2">github.com/${USER}</tspan><tspan class="f-ink">${esc(page.path)}</tspan></text>` +
    `<path d="M0 ${TOP_H - 0.5}H${W}" class="s-line" stroke-width="1"/>` +
    `<path d="M.75 ${TOP_H}V${R}A${R - 0.75} ${R - 0.75} 0 0 1 ${R} .75H${W - R}A${R - 0.75} ${R - 0.75} 0 0 1 ${W - 0.75} ${R}V${TOP_H}" fill="none" class="s-frame" stroke-width="1.5"/>`
  );
}

// ---------------------------------------------------------------- site header

function head(active) {
  const menu = ORDER.map((id) => {
    const label = PAGES[id].menu;
    const x = MENU_X[id];
    const on = id === active;
    const lw = tw(label, 14.5);
    return (
      text(x, 36, label, { size: 14.5, cls: on ? 'f-ink' : 'f-ink2', anchor: 'middle' }) +
      (on ? `<rect x="${x - lw / 2}" y="45" width="${lw}" height="2.5" rx="1.25" fill="${SEA}"/>` : '')
    );
  }).join('');
  return (
    `<rect x=".75" y="0" width="${W - 1.5}" height="${HEAD_H}" class="f-win"/>` +
    mark(40, 16, 32) +
    text(82, 29, 'Nhật Quang', { size: 15.5, bold: true }) +
    text(82, 46, `@${USER}`, { size: 11.5, cls: 'f-ink3', mono: true }) +
    menu +
    `<path d="M40 ${HEAD_H - 0.5}H${W - 40}" class="s-line" stroke-width="1"/>` +
    `<path d="M.75 0V${HEAD_H}M${W - 0.75} 0V${HEAD_H}" class="s-frame" stroke-width="1.5"/>`
  );
}

// ---------------------------------------------------------------- pages

const chip = (x, y, name, color) => {
  const w = Math.round(tw(name, 13.5) + 40);
  return {
    w,
    svg:
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w}" height="28" rx="14" class="f-chip s-line" stroke-width="1"/>` +
      `<circle cx="${x + 15}" cy="${y + 14.5}" r="4.5" ${color ? `fill="${color}"` : 'class="f-ink"'}/>` +
      text(x + 27, y + 19, name, { size: 13.5 }),
  };
};

const step = (d, body) => `<g class="in d${d}">${body}</g>`;

function aboutPage() {
  const x = 48;
  const bio = wrap(ABOUT.bio, 15.5, 535);
  const bioY = 170;
  const statusY = bioY + (bio.length - 1) * 24 + 22;
  const sw = Math.round(tw(ABOUT.status, 13) + 44);

  // A small code card with the facts.
  const cx = 604;
  const cw = W - 48 - cx;
  const lines = [
    [0, ['kw', 'const '], ['fn', 'tktnq2004'], ['ink2', ' = {']],
    [2, ['ink', 'role'], ['ink2', ': '], ['str', "'full-stack developer'"], ['ink2', ',']],
    [2, ['ink', 'address'], ['ink2', ': '], ['str', `"Long Binh, 9 district"`], ['ink2', ',']],
    [2, ['ink', 'stack'], ['ink2', ': ['], ['str', "'Next.js'"], ['ink2', ', '], ['str', "'Spring Boot'"], ['ink2', '],']],
    [2, ['ink', 'openTo'], ['ink2', ': '], ['str', "'intern / fresher'"], ['ink2', ',']],
    [0, ['ink2', '};']],
  ];
  const code = lines
    .map(([indent, ...parts], i) => {
      const spans = parts.map(([c, s]) => `<tspan class="f-${c}">${esc(s).replace(/ /g, '&#160;')}</tspan>`).join('');
      return `<text x="${cx + 22 + indent * 7.8}" y="${110 + i * 22}" font-size="13" class="mono">${spans}</text>`;
    })
    .join('');

  return (
    step(1, text(x, 58, ABOUT.hello, { size: 13, cls: 'f-acc', mono: true })) +
    step(1, text(x, 98, ABOUT.name, { size: 30, bold: true })) +
    step(2, text(x, 130, ABOUT.role, { size: 16.5, cls: 'f-ink2' })) +
    step(2, bio.map((l, i) => text(x, bioY + i * 24, l, { size: 15.5, cls: 'f-ink2' })).join('')) +
    step(
      3,
      `<rect x="${x + 0.5}" y="${statusY + 0.5}" width="${sw}" height="28" rx="14" class="f-chip s-line" stroke-width="1"/>` +
      `<circle cx="${x + 18}" cy="${statusY + 14.5}" r="4" class="f-ok"/>` +
      text(x + 32, statusY + 19, ABOUT.status, { size: 13, cls: 'f-ink2' }),
    ) +
    step(
      3,
      `<rect x="${cx + 0.5}" y="40.5" width="${cw}" height="212" rx="12" class="f-code s-line" stroke-width="1"/>` +
      text(cx + 22, 66, 'whoami.ts', { size: 11.5, cls: 'f-ink3', mono: true }) +
      `<path d="M${cx + 1} 80.5H${cx + cw}" class="s-line" stroke-width="1"/>` +
      code,
    )
  );
}

const title = (t, sub) => step(1, text(48, 58, t, { size: 26, bold: true })) + step(1, text(48, 86, sub, { size: 15, cls: 'f-ink2' }));

function stackPage() {
  const rows = STACK.map(([group, items], r) => {
    const y = 112 + r * 40;
    let x = 160;
    let s = text(48, y + 19, group, { size: 12, cls: 'f-ink3', mono: true });
    for (const [name, color] of items) {
      const c = chip(x, y, name, color);
      s += c.svg;
      x += c.w + 8;
    }
    return step(r + 2, s);
  }).join('');
  return title('Tech stack', 'What I use to build web apps, front to back.') + rows;
}

function contactPage() {
  const pad = 48;
  const gap = 16;
  const cw = (W - pad * 2 - gap * (CONTACT.length - 1)) / CONTACT.length;
  const y = 116;
  const cards = CONTACT.map((c, i) => {
    const x = pad + i * (cw + gap);
    return step(
      i + 2,
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cw - 1}" height="100" rx="12" class="f-chip s-line" stroke-width="1"/>` +
      text(x + 20, y + 30, c.tag, { size: 12, cls: 'f-ink3', mono: true }) +
      text(x + 20, y + 60, c.value, { size: 16.5, bold: true }) +
      text(x + 20, y + 82, c.sub, { size: 12.5, cls: 'f-ink2' }),
    );
  }).join('');
  return (
    title('Contact', 'Hiring an intern or fresher developer? Email reaches me fastest.') +
    cards  );
}

function page(active) {
  const bg = `M.75 0H${W - 0.75}V${PAGE_H - R}A${R - 0.75} ${R - 0.75} 0 0 1 ${W - R} ${PAGE_H - 0.75}H${R}A${R - 0.75} ${R - 0.75} 0 0 1 .75 ${PAGE_H - R}Z`;
  const frame = `M.75 0V${PAGE_H - R}A${R - 0.75} ${R - 0.75} 0 0 0 ${R} ${PAGE_H - 0.75}H${W - R}A${R - 0.75} ${R - 0.75} 0 0 0 ${W - 0.75} ${PAGE_H - R}V0`;
  const body = { about: aboutPage, stack: stackPage, contact: contactPage }[active]();
  return `<path d="${bg}" class="f-win"/>${body}<path d="${frame}" fill="none" class="s-frame" stroke-width="1.5"/>`;
}

// ---------------------------------------------------------------- state

export const IDLE_MS = 2 * 60 * 1000; // untouched this long: back to a single About tab
export const FRESH_MS = 10 * 1000; // a tab opened this recently plays its entrance

export const initial = () => ({ tabs: ['about'], active: 'about', at: 0, fresh: null, freshAt: 0 });

export const current = (s, now) => (!s || now - s.at > IDLE_MS ? initial() : s);

// action: { type: 'open', tab } | { type: 'focus', slot } | { type: 'close', slot }
export function apply(prev, action, now) {
  const s = JSON.parse(JSON.stringify(current(prev, now)));
  const open = (id) => {
    if (!s.tabs.includes(id)) {
      s.tabs.push(id);
      s.fresh = id;
      s.freshAt = now;
    }
    s.active = id;
  };
  if (action.type === 'open' && ORDER.includes(action.tab)) open(action.tab);
  else if (action.type === 'focus') {
    // A click past the last tab lands on the "+" button: open the next page.
    if (s.tabs[action.slot]) s.active = s.tabs[action.slot];
    else if (action.slot === s.tabs.length) {
      const next = ORDER.find((id) => !s.tabs.includes(id));
      if (next) open(next);
    }
  } else if (action.type === 'close' && action.slot < s.tabs.length) {
    const [gone] = s.tabs.splice(action.slot, 1);
    if (!s.tabs.length) return { ...initial(), at: now };
    if (gone === s.active) s.active = s.tabs[Math.min(action.slot, s.tabs.length - 1)];
  }
  s.at = now;
  return s;
}

// ---------------------------------------------------------------- pieces

export function renderTile(row, id, state, now) {
  const cols = row === 'top' ? TOP_COLS : row === 'head' ? HEAD_COLS : null;
  const col = cols && cols.find((c) => c.id === id);
  if (!col) return null;
  const body = row === 'top' ? top(state, now) : head(state.active);
  return svgDoc(col.w, row === 'top' ? TOP_H : HEAD_H, body, col.x);
}

export const renderPage = (state) => svgDoc(W, PAGE_H, page(state.active));

// The README markup for the browser. `base` is the Worker's address.
export function browserMarkup(base) {
  const pct = (w) => `${+((w / W) * 100).toFixed(2)}%`;
  const img = (src, w, alt) => `<img src="${base}/${src}" width="${pct(w)}" align="top" alt="${esc(alt)}">`;
  // <a name> keeps GitHub from wrapping a plain image in a link to itself.
  const cell = (row, c) =>
    c.action ? `<a href="${base}/${c.action}">${img(`${row}/${c.id}.svg`, c.w, c.alt)}</a>` : `<a name="${row}-${c.id}">${img(`${row}/${c.id}.svg`, c.w, '')}</a>`;
  return [
    TOP_COLS.map((c) => cell('top', c)).join(''),
    HEAD_COLS.map((c) => cell('head', c)).join(''),
    `<a name="page">${img('page.svg', W, `${ABOUT.name}, ${ABOUT.role}. Open the tabs above for the tech stack and contact details.`)}</a>`,
  ].join('<br>\n');
}
