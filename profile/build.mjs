// Builds the GitHub profile README as a small browser window made of SVG tiles.
// Run from the repo root:  node profile/build.mjs
// Writes README.md (home), profile/shop.md, profile/contact.md and
// profile/assets/*.svg. Do not edit those by hand.
//
// GitHub strips scripts and styles from READMEs, so every clickable area is its
// own <img> inside a link. Tiles sit on one line per row with align="top" (no
// baseline gap) and percentage widths that add up to 100%.
// Opening shop or contact loads a new page whose tab strip shows a new tab
// sliding in next to Home; its × goes back to the profile.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const ASSETS = join(HERE, 'assets');

// ---------------------------------------------------------------- content

const USER = 'tktnq2004';
const REPO = `https://github.com/${USER}/${USER}`;
const PROFILE = `https://github.com/${USER}`;
const REPOS = `${PROFILE}?tab=repositories`;
const LIVE = `https://${USER}.github.io/${USER}/`;
const EMAIL = 'tktnq2004@gmail.com';
const CV = `${REPO}/blob/main/assets/Tran-Khuong-Trung-Nhat-Quang-CV.pdf`;
const pageUrl = (id) => (id === 'home' ? PROFILE : `${REPO}/blob/main/profile/${id}.md`);

const ABOUT = {
  hello: "hello, world — I'm",
  name: 'Trần Khương Trung Nhật Quang',
  role: 'Full-stack Developer · Ho Chi Minh City',
  bio: "Software Engineering graduate (HUTECH '26, GPA 3.6/4). I build web apps end to end, mostly with Next.js and Spring Boot.",
  status: 'Open to intern / fresher roles',
};

// [name, brand color or null for the text color]
const STACK = [
  ['Next.js', null], ['React', '#61dafb'], ['TypeScript', '#3178c6'], ['Tailwind CSS', '#38bdf8'],
  ['Spring Boot', '#6db33f'], ['Node.js', '#5fa04e'], ['MySQL', '#4479a1'], ['SQL Server', '#cc2927'],
  ['MongoDB', '#47a248'], ['Redis', '#ff4438'], ['Docker', '#2496ed'], ['Git', '#f05032'],
];

const PROJECTS = [
  { mono: 'TO', name: 'Trạm OTA', badge: 'team of 2', meta: 'Next.js · Spring Boot', line: 'Hotel booking with map search, 360° room tours and QR payments.', cta: 'read the case study ↗', href: `${LIVE}shop-tram-ota.html` },
  { mono: 'HB', name: 'Hotel Booking', meta: 'MERN stack', line: 'REST API with JWT refresh-token rotation and Jest tests.', cta: 'see repositories ↗', href: REPOS },
  { mono: 'MO', name: 'Mini OTA v1', meta: 'ASP.NET MVC', line: 'Booking site with maps, 360° tours and VNPay payments.', cta: 'see repositories ↗', href: REPOS },
];

const CONTACT = [
  { tag: 'email', value: EMAIL, sub: 'the fastest way to reach me', href: `mailto:${EMAIL}` },
  { tag: 'cv', value: 'Download CV', sub: 'PDF', href: CV },
  { tag: 'portfolio', value: 'Full portfolio', sub: `${USER}.github.io`, href: LIVE },
];

const PAGES = [
  { id: 'home', title: 'Nhật Quang', path: '' },
  { id: 'shop', title: 'Shop', path: '/shop' },
  { id: 'contact', title: 'Contact', path: '/contact' },
];

// ---------------------------------------------------------------- theme

const SANS = `'Inter','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif`;
const MONO = `'JetBrains Mono','Cascadia Code',ui-monospace,Consolas,Menlo,monospace`;

const LIGHT = {
  strip: '#e3e8ee', bar: '#f6f8fa', field: '#e8ecf0', win: '#ffffff', chip: '#f6f8fa',
  ink: '#1f2328', ink2: '#59636e', ink3: '#6e7781', acc: '#4f46e5', ok: '#1a7f37', white: '#ffffff',
  frame: '#c3ccd5', line: '#d8dee4', g1: '#4f46e5', g2: '#0891b2',
};
const DARK = {
  strip: '#010409', bar: '#1c2128', field: '#0d1117', win: '#151b23', chip: '#212830',
  ink: '#f0f6fc', ink2: '#9198a1', ink3: '#848d97', acc: '#a5b4fc', ok: '#3fb950', white: '#ffffff',
  frame: '#3d444d', line: '#30363d', g1: '#6366f1', g2: '#06b6d4',
};
const FILLS = ['strip', 'bar', 'field', 'win', 'chip', 'ink', 'ink2', 'ink3', 'acc', 'ok', 'white'];
const STROKES = ['frame', 'line', 'acc', 'ink2', 'ink3'];
const palette = (c) =>
  FILLS.map((k) => `.f-${k}{fill:${c[k]}}`).join('') +
  STROKES.map((k) => `.s-${k}{stroke:${c[k]}}`).join('') +
  `.g1{stop-color:${c.g1}}.g2{stop-color:${c.g2}}`;

const CSS = `text{font-family:${SANS}}.mono{font-family:${MONO}}${palette(LIGHT)}
@media (prefers-color-scheme:dark){${palette(DARK)}}
.prog{opacity:0}
@media (prefers-reduced-motion:no-preference){
.in{animation:in .6s cubic-bezier(.2,.7,.2,1) both}
.newtab{animation:newtab .45s cubic-bezier(.2,.8,.2,1) both}
.type{transform-box:fill-box;transform-origin:left center;animation:type .8s steps(24,end) .35s both}
.prog{transform-box:fill-box;transform-origin:left center;animation:prog 1.3s ease-out .3s both}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.2s ease-out infinite}
.spin{transform-box:fill-box;transform-origin:center;animation:spin 18s linear infinite}
@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes newtab{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes type{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes prog{0%{transform:scaleX(0);opacity:1}75%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(3);opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}}`;

// ---------------------------------------------------------------- svg helpers

const W = 1000;
const R = 12;
const FW = 1.5;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rough text width so boxes fit system fonts (READMEs cannot load web fonts).
function tw(str, size, { mono = false, bold = false } = {}) {
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

function text(x, y, str, { size = 15, cls = 'f-ink', bold = false, mono = false, anchor } = {}) {
  const a = [`x="${x}"`, `y="${y}"`, `font-size="${size}"`, `class="${cls}${mono ? ' mono' : ''}"`];
  if (bold) a.push('font-weight="600"');
  if (anchor) a.push(`text-anchor="${anchor}"`);
  return `<text ${a.join(' ')}>${esc(str)}</text>`;
}

const enter = (i, body, cls = 'in') => `<g class="${cls}" style="animation-delay:${(0.15 + i * 0.08).toFixed(2)}s">${body}</g>`;

const defs = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="g1"/><stop offset="1" class="g2"/></linearGradient></defs>`;

const svgDoc = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><style>${CSS}</style>${defs}${body}</svg>\n`;

// Background with the window frame on whichever edges this tile touches.
function frameTile(w, h, { left, right, top, bottom, fill = 'f-win' }) {
  const o = FW / 2;
  const L = left ? o : -5;
  const Rx = right ? w - o : w + 5;
  const T = top ? o : -5;
  const B = bottom ? h - o : h + 5;
  const r = (on) => (on ? R : 0);
  const [tl, tr, br, bl] = [r(left && top), r(right && top), r(right && bottom), r(left && bottom)];
  const arc = (rr, x, y) => (rr ? `A${rr} ${rr} 0 0 1 ${x} ${y}` : '');
  const d =
    `M${L} ${T + tl}${arc(tl, L + tl, T)}H${Rx - tr}${arc(tr, Rx, T + tr)}` +
    `V${B - br}${arc(br, Rx - br, B)}H${L + bl}${arc(bl, L, B - bl)}Z`;
  return `<path d="${d}" class="${fill} s-frame" stroke-width="${FW}"/>`;
}

const written = new Set();
function tile(file, w, h, body, edges, extra = {}) {
  if (!written.has(file)) {
    writeFileSync(join(ASSETS, file), svgDoc(w, h, frameTile(w, h, edges) + body));
    written.add(file);
  }
  return { file, w, ...extra };
}

// A row of cards split into one tile per card; tile edges fall in the middle
// of the gaps so every card sits whole inside its own image.
function cardRow(name, h, cards, draw, { pad = 40, gap = 16 } = {}) {
  const cw = (W - pad * 2 - gap * (cards.length - 1)) / cards.length;
  return cards.map((c, i) => {
    const x = pad + i * (cw + gap);
    const t0 = i === 0 ? 0 : Math.round(x - gap / 2);
    const t1 = i === cards.length - 1 ? W : Math.round(x + cw + gap / 2);
    const lx = x - t0;
    const body = enter(i, `<rect x="${lx + 0.5}" y="0.5" width="${cw - 1}" height="${h - 17}" rx="12" class="f-chip s-line" stroke-width="1"/>` + draw(c, lx, cw));
    return tile(`${name}-${i + 1}.svg`, t1 - t0, h, body, { left: i === 0, right: i === cards.length - 1 }, { href: c.href, alt: c.alt });
  });
}

// ---------------------------------------------------------------- browser chrome

const STRIP_H = 46;
const HOME_TAB = [84, 282]; // x range of the Home tab
const NEW_TAB = [290, 486]; // x range of an opened tab
const CLOSE_AT = 452; // where the opened tab's × tile starts

function tabShape(x0, x1, active, h = STRIP_H) {
  if (!active) {
    return `<rect x="${x0 + 0.5}" y="8.5" width="${x1 - x0 - 1}" height="${h - 17}" rx="8" class="f-bar" opacity=".55"/>`;
  }
  return `<path d="M${x0} ${h + 1}V18a10 10 0 0 1 10-10H${x1 - 10}a10 10 0 0 1 10 10V${h + 1}Z" class="f-bar"/>`;
}

function favicon(x, y, letter) {
  return `<rect x="${x}" y="${y}" width="16" height="16" rx="4.5" fill="url(#g)"/>` + text(x + 8, y + 12, letter, { size: 10.5, cls: 'f-white', bold: true, anchor: 'middle' });
}

const closeX = (x, cls = 's-ink3') => `<path d="M${x - 4} ${STRIP_H / 2 - 3}l8 8M${x + 4} ${STRIP_H / 2 - 3}l-8 8" class="${cls}" stroke-width="1.5" stroke-linecap="round"/>`;
const plus = (x) => `<path d="M${x} ${STRIP_H / 2 - 5}v12M${x - 6} ${STRIP_H / 2 + 1}h12" class="s-ink3" stroke-width="1.6" stroke-linecap="round"/>`;
const lights = [22, 42, 62].map((cx, i) => `<circle cx="${cx}" cy="${STRIP_H / 2 + 1}" r="6" fill="${['#ff5f57', '#febc2e', '#28c840'][i]}"/>`).join('');

function tabStrip(page) {
  const homeActive = page.id === 'home';
  const edges = { top: true, fill: 'f-strip' };
  const [h0, h1] = HOME_TAB;
  const homeTab =
    lights +
    tabShape(h0, h1, homeActive) +
    favicon(h0 + 14, 16, 'Q') +
    text(h0 + 40, 29, 'Nhật Quang', { size: 13, cls: homeActive ? 'f-ink' : 'f-ink2' }) +
    (homeActive ? closeX(h1 - 18) : '');
  const first = tile(`strip-home-${homeActive ? 'on' : 'off'}.svg`, NEW_TAB[0] - 4, STRIP_H, homeTab, { ...edges, left: true }, {
    href: PROFILE,
    alt: homeActive ? 'Tab: Nhật Quang (open)' : 'Tab: Nhật Quang. Back to home',
  });
  if (homeActive) {
    const rest = tile('strip-rest-home.svg', W - first.w, STRIP_H, plus(18), { ...edges, right: true }, { href: PROFILE, alt: 'New tab' });
    return [first, rest];
  }
  // The opened tab spans two tiles: its body (link to itself) and its × (back home).
  const t0 = first.w;
  const [n0, n1] = NEW_TAB;
  const bodyW = CLOSE_AT - t0;
  const shape = (offset) => `<g transform="translate(${-offset} 0)">${tabShape(n0, n1, true)}</g>`;
  const tabBody = tile(
    `strip-${page.id}-tab.svg`,
    bodyW,
    STRIP_H,
    `<g class="newtab">${shape(t0)}${favicon(n0 - t0 + 14, 16, page.title[0])}${text(n0 - t0 + 40, 29, page.title, { size: 13, cls: 'f-ink' })}</g>`,
    edges,
    { href: pageUrl(page.id), alt: `Tab: ${page.title} (open)` },
  );
  const closeW = n1 + 4 - CLOSE_AT;
  const tabClose = tile(
    `strip-${page.id}-close.svg`,
    closeW,
    STRIP_H,
    `<g class="newtab">${shape(CLOSE_AT)}${closeX(n1 - 18 - CLOSE_AT)}</g>`,
    edges,
    { href: PROFILE, alt: `Close the ${page.title} tab` },
  );
  const rest = tile(
    `strip-rest-open.svg`,
    W - first.w - bodyW - closeW,
    STRIP_H,
    `<g class="newtab" style="animation-delay:.1s">${plus(18)}</g>`,
    { ...edges, right: true },
    { href: PROFILE, alt: 'New tab' },
  );
  return [first, tabBody, tabClose, rest];
}

function toolbar(page) {
  const h = 50;
  const navW = 150;
  const back = page.id === 'home' ? 's-ink3" opacity=".45' : 's-ink2';
  const nav =
    `<path d="M38 25H24M30 19l-6 6 6 6" class="${back}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M60 25h14M68 19l6 6-6 6" class="s-ink3" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>` +
    `<path d="M117 25a7 7 0 1 1-2.05-4.95" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    `<path d="M116.5 16.5v4.2h-4.2" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M0 ${h - 0.5}H${navW}" class="s-line" stroke-width="1"/>`;
  const urlW = W - navW;
  const host = `github.com/${USER}`;
  const urlEnd = 44 + tw(host + page.path, 14) + 12;
  const url =
    `<rect x="4" y="8" width="${urlW - 22}" height="34" rx="17" class="f-field"/>` +
    `<rect x="21" y="22" width="11" height="8.5" rx="2" class="f-ink3"/>` +
    `<path d="M23.5 22v-2.2a3 3 0 0 1 6 0V22" class="s-ink3" stroke-width="1.5" fill="none"/>` +
    `<clipPath id="u"><rect class="type" x="40" y="11" width="${Math.round(urlEnd - 40)}" height="28"/></clipPath>` +
    `<text x="44" y="30" font-size="14" clip-path="url(#u)"><tspan class="f-ink2">${esc(host)}</tspan><tspan class="f-ink">${esc(page.path)}</tspan></text>` +
    text(urlW - 36, 29.5, 'full portfolio ↗', { size: 12.5, cls: 'f-acc', anchor: 'end' }) +
    `<rect class="prog f-acc" x="20" y="39" width="${urlW - 54}" height="2" rx="1"/>` +
    `<path d="M0 ${h - 0.5}H${urlW}" class="s-line" stroke-width="1"/>`;
  return [
    tile(`toolbar-nav-${page.id === 'home' ? 'home' : 'page'}.svg`, navW, h, nav, { left: true, fill: 'f-bar' }, { href: PROFILE, alt: 'Back to home' }),
    tile(`toolbar-url-${page.id}.svg`, urlW, h, url, { right: true, fill: 'f-bar' }, { href: LIVE, alt: 'Address bar. Opens my full portfolio' }),
  ];
}

// The site's own menu. Shop and contact open in a "new tab" (their own page).
function siteNav(page) {
  const h = 62;
  const logoW = 640;
  const logo =
    `<circle cx="56" cy="31" r="15" fill="url(#g)"/>` +
    text(56, 36, 'NQ', { size: 11.5, cls: 'f-white', bold: true, anchor: 'middle' }) +
    text(82, 29, 'Nhật Quang', { size: 15.5, bold: true }) +
    text(82, 46, `@${USER}`, { size: 11.5, cls: 'f-ink3', mono: true }) +
    `<path d="M40 ${h - 0.5}H${logoW}" class="s-line" stroke-width="1"/>`;
  const row = [tile('nav-logo.svg', logoW, h, logo, { left: true }, { href: PROFILE, alt: 'Nhật Quang, home' })];
  PAGES.forEach((p, i) => {
    const on = p.id === page.id;
    const last = i === PAGES.length - 1;
    const w = 120;
    const cx = last ? w / 2 - 20 : w / 2;
    const name = p.id;
    const lw = tw(name, 14.5, { bold: on });
    const body =
      text(cx, 36, name, { size: 14.5, cls: on ? 'f-ink' : 'f-ink2', bold: on, anchor: 'middle' }) +
      (on ? `<rect x="${cx - lw / 2}" y="45" width="${lw}" height="2.5" rx="1.25" fill="url(#g)"/>` : '') +
      (!on && p.id !== 'home' ? `<path d="M${cx + lw / 2 + 5} 25.5h5v5M${cx + lw / 2 + 10} 25.5l-5.5 5.5" class="s-ink3" stroke-width="1.3" fill="none" stroke-linecap="round"/>` : '') +
      `<path d="M0 ${h - 0.5}H${last ? w - 40 : w}" class="s-line" stroke-width="1"/>`;
    row.push(tile(`nav-${p.id}-${on ? 'on' : 'off'}.svg`, w, h, body, { right: last }, {
      href: pageUrl(p.id),
      alt: on ? `${name} (this page)` : `Open ${name} in a new tab`,
    }));
  });
  return row;
}

function statusBar(page) {
  const h = 52;
  const body =
    `<path d="M40 8.5H960" class="s-line" stroke-width="1"/>` +
    text(40, 34, page.id === 'home' ? 'tip: shop and contact open in a new tab' : 'tip: close this tab with ×', { size: 12, cls: 'f-ink3', mono: true }) +
    text(960, 34, 'Ho Chi Minh City · 2026', { size: 12, cls: 'f-ink3', mono: true, anchor: 'end' });
  return [tile(`status-${page.id === 'home' ? 'home' : 'page'}.svg`, W, h, body, { left: true, right: true, bottom: true }, { href: PROFILE, alt: '' })];
}

// ---------------------------------------------------------------- pages

function homeHero() {
  const cx = 104;
  const cy = 100;
  const x = 200;
  const bio = wrap(ABOUT.bio, 15.5, W - x - 48);
  const bioY = 150;
  const statusY = bioY + (bio.length - 1) * 24 + 22;
  const sw = Math.round(tw(ABOUT.status, 13) + 44);
  const h = statusY + 44;
  const body =
    enter(0,
      `<circle cx="${cx}" cy="${cy}" r="64" fill="none" class="spin s-acc" stroke-width="1.5" stroke-dasharray="3 9" opacity=".7"/>` +
      `<circle cx="${cx}" cy="${cy}" r="54" fill="url(#g)"/>` +
      text(cx, cy + 11, 'NQ', { size: 30, cls: 'f-white', bold: true, anchor: 'middle' })) +
    enter(1, text(x, 52, ABOUT.hello, { size: 13, cls: 'f-acc', mono: true }) + text(x, 88, ABOUT.name, { size: 30, bold: true })) +
    enter(2, text(x, 118, ABOUT.role, { size: 16, cls: 'f-ink2' }) + bio.map((l, i) => text(x, bioY + i * 24, l, { size: 15.5, cls: 'f-ink2' })).join('')) +
    enter(3,
      `<rect x="${x + 0.5}" y="${statusY + 0.5}" width="${sw}" height="28" rx="14" class="f-chip s-line" stroke-width="1"/>` +
      `<circle class="pulse f-ok" cx="${x + 18}" cy="${statusY + 14.5}" r="4"/><circle cx="${x + 18}" cy="${statusY + 14.5}" r="4" class="f-ok"/>` +
      text(x + 32, statusY + 19, ABOUT.status, { size: 13, cls: 'f-ink2' }));
  return [tile('home-hero.svg', W, h, body, { left: true, right: true }, { href: LIVE, alt: `${ABOUT.name}. ${ABOUT.role}. ${ABOUT.bio} ${ABOUT.status}.` })];
}

function homeStack() {
  const x0 = 40;
  const max = W - 80;
  let svg = text(x0, 26, 'stack', { size: 12, cls: 'f-ink3', mono: true });
  let cx = x0;
  let cy = 40;
  STACK.forEach(([name, color], i) => {
    const w = Math.round(tw(name, 13.5) + 40);
    if (cx > x0 && cx + w > x0 + max) {
      cx = x0;
      cy += 38;
    }
    svg += enter(4 + i * 0.5,
      `<rect x="${cx + 0.5}" y="${cy + 0.5}" width="${w}" height="28" rx="14" class="f-chip s-line" stroke-width="1"/>` +
      `<circle cx="${cx + 15}" cy="${cy + 14.5}" r="4.5" ${color ? `fill="${color}"` : 'class="f-ink"'}/>` +
      text(cx + 27, cy + 19, name, { size: 13.5 }));
    cx += w + 8;
  });
  const h = cy + 28 + 20;
  return [tile('home-stack.svg', W, h, svg, { left: true, right: true }, { href: `${LIVE}blog.html`, alt: `Stack: ${STACK.map((s) => s[0]).join(', ')}` })];
}

function pageHead(id, title, sub, href) {
  const h = 112;
  const body =
    enter(0, text(40, 58, title, { size: 28, bold: true })) +
    enter(1, text(40, 88, sub, { size: 15, cls: 'f-ink2' }));
  return [tile(`head-${id}.svg`, W, h, body, { left: true, right: true }, { href, alt: `${title}. ${sub}` })];
}

function shopCards() {
  return cardRow(
    'shop',
    196,
    PROJECTS.map((p) => ({ ...p, alt: `${p.name} (${p.meta}): ${p.line}` })),
    (p, x, w) => {
      let s =
        `<rect x="${x + 18}" y="18" width="36" height="36" rx="9" fill="url(#g)"/>` +
        text(x + 36, 41, p.mono, { size: 13, cls: 'f-white', bold: true, anchor: 'middle' }) +
        text(x + 66, 34, p.name, { size: 16.5, bold: true }) +
        text(x + 66, 52, p.meta, { size: 11.5, cls: 'f-ink3', mono: true });
      if (p.badge) {
        const bw = Math.round(tw(p.badge, 11, { mono: true }) + 16);
        s += `<rect x="${x + w - 16 - bw + 0.5}" y="18.5" width="${bw}" height="20" rx="10" fill="none" class="s-acc" stroke-width="1"/>` +
          text(x + w - 16 - bw / 2, 32, p.badge, { size: 11, cls: 'f-acc', mono: true, anchor: 'middle' });
      }
      s += wrap(p.line, 13.5, w - 36).map((l, i) => text(x + 18, 86 + i * 21, l, { size: 13.5, cls: 'f-ink2' })).join('');
      s += text(x + 18, 160, p.cta, { size: 13, cls: 'f-acc' });
      return s;
    },
  );
}

function contactCards() {
  return cardRow('contact', 112, CONTACT.map((c) => ({ ...c, alt: `${c.value} (${c.sub})` })), (c, x, w) =>
    text(x + 18, 28, c.tag, { size: 12, cls: 'f-ink3', mono: true }) +
    text(x + w - 16, 30, '↗', { size: 16, cls: 'f-acc', anchor: 'end' }) +
    text(x + 18, 56, c.value, { size: 16, bold: true }) +
    text(x + 18, 78, c.sub, { size: 12.5, cls: 'f-ink2' }),
  );
}

const CONTENT = {
  home: () => [homeHero(), homeStack()],
  shop: () => [pageHead('shop', 'Shop', "Things I've built. The full write-ups live on my portfolio.", `${LIVE}shop.html`), shopCards()],
  contact: () => [pageHead('contact', 'Contact', 'Hiring an intern or fresher developer? Email reaches me fastest.', `${LIVE}contact.html`), contactCards()],
};

// ---------------------------------------------------------------- write

rmSync(ASSETS, { recursive: true, force: true });
mkdirSync(ASSETS, { recursive: true });
for (const old of ['blog', 'partners']) rmSync(join(HERE, `${old}.md`), { force: true });

// Percent widths; the last tile takes the remainder so each row is exactly 100%.
function rowHtml(row, base) {
  let used = 0;
  return (
    row
      .map((t, i) => {
        const p = i === row.length - 1 ? +(100 - used).toFixed(4) : +((t.w / W) * 100).toFixed(4);
        used += p;
        return `<a href="${esc(t.href)}"><img align="top" width="${p}%" src="${base}${t.file}" alt="${esc(t.alt ?? '')}"></a>`;
      })
      .join('') + '<br>'
  );
}

for (const page of PAGES) {
  const rows = [tabStrip(page), toolbar(page), siteNav(page), ...CONTENT[page.id](), statusBar(page)];
  for (const r of rows) {
    const sum = r.reduce((s, t) => s + t.w, 0);
    if (sum !== W) throw new Error(`${page.id}: row ${r.map((t) => t.file).join(', ')} is ${sum}px wide, not ${W}`);
  }
  const base = page.id === 'home' ? 'profile/assets/' : 'assets/';
  const md = `<!-- Generated by profile/build.mjs. Edit the script, then run: node profile/build.mjs -->
<div>${rows.map((r) => rowHtml(r, base)).join('')}</div>
`;
  writeFileSync(page.id === 'home' ? join(ROOT, 'README.md') : join(HERE, `${page.id}.md`), md);
}

console.log(`wrote ${PAGES.length} pages and ${written.size} svg tiles`);
