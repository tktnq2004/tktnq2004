// Builds the GitHub profile README as a browser window made of SVG tiles.
// Run from the repo root:  node profile/build.mjs
// Writes README.md, profile/*.md and profile/assets/*.svg.
//
// GitHub strips scripts and styles from READMEs, so every clickable area is its
// own <img> inside a link. Tiles sit on one line per row with align="top" (no
// baseline gap) and percentage widths that add up to 100%.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const ASSETS = join(HERE, 'assets');

// ---------------------------------------------------------------- links

const USER = 'tktnq2004';
const REPO = `https://github.com/${USER}/${USER}`;
const PROFILE = `https://github.com/${USER}`;
const LIVE = `https://${USER}.github.io/${USER}/`;
const LIVE_HOST = `${USER}.github.io`;
const EMAIL = 'tktnq2004@gmail.com';
const PHONE = '0947 535 906';
const CV = `${REPO}/blob/main/assets/Tran-Khuong-Trung-Nhat-Quang-CV.pdf`;
const BACKEND_REPO = `https://github.com/${USER}/Mini-OTA-Upgrade`;
const REPOS = `${PROFILE}?tab=repositories`;
const pageUrl = (id) => (id === 'home' ? PROFILE : `${REPO}/blob/main/profile/${id}.md`);

// ---------------------------------------------------------------- theme

const SANS = `'Be Vietnam Pro','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif`;
const MONO = `'JetBrains Mono','Cascadia Code',ui-monospace,Consolas,Menlo,monospace`;

const LIGHT = {
  chrome: '#e4dfd2', bar: '#fbf9f4', field: '#ece7dc', paper: '#f6f3ec', surface: '#fbf9f4', sunk: '#efebe1',
  ink: '#1f3d2b', ink2: '#3f5446', ink3: '#5f6f63', acc: '#c4622d', accink: '#a64e1f', ok: '#2f7d4e',
  dot: 'rgba(31,61,43,.22)', onink: '#f6f3ec', frame: '#c9c1ae', line: '#ddd7c9', line2: '#cbc4b3',
};
const DARK = {
  chrome: '#0c120e', bar: '#1b261f', field: '#121a15', paper: '#121a15', surface: '#18221c', sunk: '#1d2822',
  ink: '#ebe6d9', ink2: '#c6c3b6', ink3: '#9da79f', acc: '#e2834f', accink: '#f09a68', ok: '#8fbf96',
  dot: 'rgba(160,200,172,.16)', onink: '#121a15', frame: '#3a4a3f', line: '#2b382f', line2: '#3a4a3f',
};
const FILLS = ['chrome', 'bar', 'field', 'paper', 'surface', 'sunk', 'ink', 'ink2', 'ink3', 'acc', 'accink', 'ok', 'dot', 'onink'];
const STROKES = ['frame', 'line', 'line2', 'acc', 'ink', 'ink2', 'ink3', 'ok'];
const palette = (c) =>
  FILLS.map((k) => `.f-${k}{fill:${c[k]}}`).join('') + STROKES.map((k) => `.s-${k}{stroke:${c[k]}}`).join('');

const CSS = `text{font-family:${SANS}}.mono{font-family:${MONO}}${palette(LIGHT)}
@media (prefers-color-scheme:dark){${palette(DARK)}}
.prog{opacity:0}
@media (prefers-reduced-motion:no-preference){
.type{transform-box:fill-box;transform-origin:left center;animation:type .9s steps(28,end) .15s both}
.prog{transform-box:fill-box;transform-origin:left center;animation:prog 1.4s ease-out .1s both}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.2s ease-out infinite}
@keyframes type{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes prog{0%{transform:scaleX(0);opacity:1}75%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes pulse{0%{transform:scale(1);opacity:.55}100%{transform:scale(3);opacity:0}}}`;

// ---------------------------------------------------------------- svg helpers

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rough text width so boxes and wraps fit system fonts (the README cannot load web fonts).
function tw(str, size, { mono = false, bold = false } = {}) {
  if (mono) return [...str].length * 0.6 * size;
  let w = 0;
  for (const ch of str) {
    if (' .,:;\'|!()[]ijlI1tf/'.includes(ch)) w += 0.3;
    else if ('mwMW@'.includes(ch)) w += 0.86;
    else if (/[A-ZĐ0-9]/.test(ch.normalize('NFD')[0])) w += 0.64;
    else if ('—–'.includes(ch)) w += 0.8;
    else w += 0.54;
  }
  return w * size * (bold ? 1.05 : 1);
}

function wrap(str, size, max, opts) {
  const lines = [];
  let cur = '';
  for (const word of str.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && tw(next, size, opts) > max) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function text(x, y, str, { size = 15, cls = 'f-ink', bold = false, mono = false, anchor, ls } = {}) {
  const a = [`x="${x}"`, `y="${y}"`, `font-size="${size}"`, `class="${cls}${mono ? ' mono' : ''}"`];
  if (bold) a.push('font-weight="600"');
  if (anchor) a.push(`text-anchor="${anchor}"`);
  if (ls) a.push(`letter-spacing="${ls}"`);
  return `<text ${a.join(' ')}>${esc(str)}</text>`;
}

// Wrapped paragraph; returns svg and the y below the last line.
function para(x, y, str, { size = 15, max, lh = 1.55, cls = 'f-ink2', bold = false, mono = false } = {}) {
  const lines = wrap(str, size, max, { mono, bold });
  const step = Math.round(size * lh);
  const svg = lines.map((l, i) => text(x, y + i * step, l, { size, cls, bold, mono })).join('');
  return { svg, bottom: y + (lines.length - 1) * step };
}

// Bulleted list; returns svg and the y below the last line.
function bullets(x, y, items, { size = 14.5, max, gap = 12, cls = 'f-ink2' } = {}) {
  let svg = '';
  let cy = y;
  for (const item of items) {
    svg += `<circle cx="${x + 3}" cy="${cy - size * 0.33}" r="2.6" class="f-acc"/>`;
    const p = para(x + 16, cy, item, { size, max: max - 16, cls });
    svg += p.svg;
    cy = p.bottom + Math.round(size * 1.55) + gap;
  }
  return { svg, bottom: cy - Math.round(size * 1.55) - gap };
}

const CHIP_H = 28;
function chip(x, y, label, { size = 12.5 } = {}) {
  const w = Math.round(tw(label, size, { mono: true }) + 24);
  return {
    w,
    svg:
      `<rect x="${x}" y="${y}" width="${w}" height="${CHIP_H}" rx="${CHIP_H / 2}" class="f-sunk s-line" stroke-width="1"/>` +
      text(x + w / 2, y + 18.5, label, { size, cls: 'f-ink2', mono: true, anchor: 'middle' }),
  };
}

// Chips that wrap inside max width; returns svg and bottom y.
function chips(x, y, labels, max, { gap = 8, rowGap = 10 } = {}) {
  let svg = '';
  let cx = x;
  let cy = y;
  for (const l of labels) {
    const c = chip(0, 0, l);
    if (cx > x && cx + c.w > x + max) {
      cx = x;
      cy += CHIP_H + rowGap;
    }
    svg += chip(cx, cy, l).svg;
    cx += c.w + gap;
  }
  return { svg, bottom: cy + CHIP_H };
}

function pill(x, y, label, { size = 12.5, cls = 'f-accink', stroke = 's-acc' } = {}) {
  const w = Math.round(tw(label, size, { mono: true }) + 24);
  return {
    w,
    svg:
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w}" height="26" rx="13" fill="none" class="${stroke}" stroke-width="1"/>` +
      text(x + w / 2 + 0.5, y + 18, label, { size, cls, mono: true, anchor: 'middle' }),
  };
}

const card = (x, y, w, h) =>
  `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="14" class="f-surface s-line" stroke-width="1"/>`;

const dotsPattern = `<defs><pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.5" class="f-dot"/></pattern></defs>`;

const R = 12; // window corner radius
const FW = 1.5; // window frame stroke

function svgDoc(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><style>${CSS}</style>${body}</svg>\n`;
}

// Page background with the window frame on whichever edges this tile touches.
function frameTile(w, h, { left, right, top, bottom, fill = 'f-paper' }) {
  const o = FW / 2;
  const L = left ? o : -5;
  const Rx = right ? w - o : w + 5;
  const T = top ? o : -5;
  const B = bottom ? h - o : h + 5;
  const rTL = left && top ? R : 0;
  const rTR = right && top ? R : 0;
  const rBR = right && bottom ? R : 0;
  const rBL = left && bottom ? R : 0;
  const d =
    `M${L} ${T + rTL}` +
    (rTL ? `A${rTL} ${rTL} 0 0 1 ${L + rTL} ${T}` : '') +
    `H${Rx - rTR}` +
    (rTR ? `A${rTR} ${rTR} 0 0 1 ${Rx} ${T + rTR}` : '') +
    `V${B - rBR}` +
    (rBR ? `A${rBR} ${rBR} 0 0 1 ${Rx - rBR} ${B}` : '') +
    `H${L + rBL}` +
    (rBL ? `A${rBL} ${rBL} 0 0 1 ${L} ${B - rBL}` : '') +
    'Z';
  return `<path d="${d}" class="${fill} s-frame" stroke-width="${FW}"/>`;
}

// ---------------------------------------------------------------- tiles

const W = 1000;
const written = new Set();
function tile(file, w, h, body, edges) {
  if (!written.has(file)) {
    writeFileSync(join(ASSETS, file), svgDoc(w, h, frameTile(w, h, edges) + body));
    written.add(file);
  }
  return { file, w };
}

// A row of cards with 16px gaps, split into one tile per card. Tile edges fall
// in the middle of each gap so every card sits whole inside its own image.
function cardRow(name, h, cards, { pad = 40, gap = 16, top = 0 } = {}) {
  const inner = W - pad * 2 - gap * (cards.length - 1);
  const total = cards.reduce((s, c) => s + (c.span ?? 1), 0);
  let x = pad;
  const placed = cards.map((c) => {
    const cw = Math.round((inner * (c.span ?? 1)) / total);
    const p = { ...c, x, cw };
    x += cw + gap;
    return p;
  });
  placed[placed.length - 1].cw = W - pad - placed[placed.length - 1].x;
  return placed.map((c, i) => {
    const t0 = i === 0 ? 0 : c.x - gap / 2;
    const t1 = i === placed.length - 1 ? W : placed[i + 1].x - gap / 2;
    const lx = c.x - t0;
    const body = (c.above ? c.above(lx) : '') + card(lx, top, c.cw, h - top - 16) + c.draw(lx, top, c.cw, h - top - 16);
    return {
      ...tile(`${name}-${i + 1}.svg`, t1 - t0, h, body, { left: i === 0, right: i === placed.length - 1 }),
      href: c.href,
      alt: c.alt,
    };
  });
}

const arrow = (x, y, glyph = '→') => text(x, y, glyph, { size: 18, cls: 'f-accink', anchor: 'end' });
const label = (x, y, str) => text(x, y, str, { size: 12, cls: 'f-ink3', mono: true, ls: 0.4 });
const sectionLabel = (x, y, num, str) =>
  text(x, y, `${num} — ${str}`, { size: 13, cls: 'f-ink3', mono: true, ls: 0.4 });

// ---- browser chrome

function tabStrip(page) {
  const h = 50;
  const tabX = 92;
  const tabW = 330;
  const title = page.tab;
  const body =
    [26, 46, 66]
      .map((cx, i) => `<circle cx="${cx}" cy="25" r="6" fill="${['#ee6a5f', '#f5be4f', '#62c554'][i]}"/>`)
      .join('') +
    `<path d="M${tabX} ${h + 1}V18a10 10 0 0 1 10-10H${tabX + tabW - 10}a10 10 0 0 1 10 10V${h + 1}Z" class="f-bar"/>` +
    `<rect x="${tabX + 16}" y="20" width="16" height="16" rx="4.5" class="f-acc"/>` +
    text(tabX + 24, 32.5, 'Q', { size: 11, cls: 'f-onink', bold: true, anchor: 'middle' }) +
    text(tabX + 42, 33, title, { size: 13, cls: 'f-ink' }) +
    `<path d="M${tabX + tabW - 26} 24l8 8M${tabX + tabW - 18} 24l-8 8" class="s-ink3" stroke-width="1.5" stroke-linecap="round"/>` +
    `<path d="M${tabX + tabW + 22} 22v12M${tabX + tabW + 16} 28h12" class="s-ink3" stroke-width="1.6" stroke-linecap="round"/>`;
  return tile(`tab-${page.id}.svg`, W, h, body, { left: true, right: true, top: true, fill: 'f-chrome' });
}

function toolbar(page) {
  const h = 52;
  const navW = 150;
  const nav =
    `<path d="M38 26H24M30 20l-6 6 6 6" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M60 26h14M68 20l6 6-6 6" class="s-ink3" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>` +
    `<path d="M117 26a7 7 0 1 1-2.05-4.95" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    `<path d="M116.5 17.5v4.2h-4.2" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M0 ${h - 0.5}H${navW}" class="s-line" stroke-width="1"/>`;
  const urlW = W - navW;
  const host = LIVE_HOST;
  const path = page.path;
  const urlEnd = 44 + tw(host + path, 14) + 12;
  const url =
    `<rect x="4" y="9" width="${urlW - 26}" height="34" rx="17" class="f-field"/>` +
    `<rect x="21" y="23" width="11" height="8.5" rx="2" class="f-ink3"/>` +
    `<path d="M23.5 23v-2.2a3 3 0 0 1 6 0V23" class="s-ink3" stroke-width="1.5" fill="none"/>` +
    `<clipPath id="u"><rect class="type" x="40" y="12" width="${Math.round(urlEnd - 40)}" height="28"/></clipPath>` +
    `<text x="44" y="31" font-size="14" clip-path="url(#u)"><tspan class="f-ink">${esc(host)}</tspan><tspan class="f-ink3">${esc(path)}</tspan></text>` +
    text(urlW - 40, 30.5, 'open live site ↗', { size: 12.5, cls: 'f-accink', anchor: 'end' }) +
    `<rect class="prog f-acc" x="20" y="40" width="${urlW - 58}" height="2" rx="1"/>` +
    `<path d="M0 ${h - 0.5}H${urlW}" class="s-line" stroke-width="1"/>`;
  return [
    { ...tile('toolbar-nav.svg', navW, h, nav, { left: true, fill: 'f-bar' }), href: PROFILE, alt: 'Back to the profile home' },
    {
      ...tile(`toolbar-url-${page.id}.svg`, urlW, h, url, { right: true, fill: 'f-bar' }),
      href: page.live,
      alt: `Address bar: ${host}${path} (opens the live site)`,
    },
  ];
}

const NAV = [
  ['home', 'home'],
  ['shop', 'shop'],
  ['blog', 'blog'],
  ['partners', 'partners'],
  ['contact', 'contact'],
];

function siteNav(page) {
  const h = 64;
  const logoW = 300;
  const logo =
    `<rect x="40" y="18" width="28" height="28" rx="8" class="f-ink"/>` +
    text(54, 37, 'Q', { size: 15, cls: 'f-onink', bold: true, anchor: 'middle' }) +
    text(80, 30, 'Nhật Quang', { size: 16.5, cls: 'f-ink', bold: true }) +
    text(80, 47, 'full-stack developer', { size: 11.5, cls: 'f-ink3', mono: true }) +
    `<path d="M40 ${h - 0.5}H${logoW}" class="s-line" stroke-width="1"/>`;
  const row = [{ ...tile('nav-logo.svg', logoW, h, logo, { left: true }), href: PROFILE, alt: 'Nhật Quang, full-stack developer: home' }];
  NAV.forEach(([id, name], i) => {
    const on = id === page.id;
    const last = i === NAV.length - 1;
    const w = 140;
    const lw = tw(name, 15, { bold: on });
    const right = last ? w - 40 : w;
    const body =
      text(w / 2 - (last ? 20 : 0), 37, name, { size: 15, cls: on ? 'f-ink' : 'f-ink3', bold: on, anchor: 'middle' }) +
      (on ? `<rect x="${w / 2 - (last ? 20 : 0) - lw / 2}" y="47" width="${lw}" height="2" rx="1" class="f-acc"/>` : '') +
      `<path d="M0 ${h - 0.5}H${right}" class="s-line" stroke-width="1"/>`;
    row.push({
      ...tile(`nav-${id}-${on ? 'on' : 'off'}.svg`, w, h, body, { right: last }),
      href: pageUrl(id),
      alt: on ? `${name} (this page)` : `Go to ${name}`,
    });
  });
  return row;
}

function footer(page) {
  const h = 84;
  const body =
    `<path d="M40 24.5H960" class="s-line" stroke-width="1"/>` +
    text(40, 56, 'Quang', { size: 14, cls: 'f-ink', bold: true }) +
    text(92, 56, '© 2026 · Ho Chi Minh City', { size: 13, cls: 'f-ink3' }) +
    text(960, 56, 'back to top ↑', { size: 13, cls: 'f-ink3', anchor: 'end' });
  return [{ ...tile('footer.svg', W, h, body, { left: true, right: true, bottom: true }), href: pageUrl(page.id), alt: 'Footer: © 2026 · Ho Chi Minh City. Back to top' }];
}

function pageHead(page, title, sub) {
  const h = 160;
  const p = para(40, 130, sub, { size: 16, max: 900 });
  const body =
    text(40, 58, `home / ${page.id}`, { size: 12.5, cls: 'f-ink3', mono: true }) +
    text(40, 100, title, { size: 34, cls: 'f-ink', bold: true }) +
    p.svg;
  return [{ ...tile(`head-${page.id}.svg`, W, h, body, { left: true, right: true }), href: page.live, alt: `${title}. ${sub}` }];
}

// ---------------------------------------------------------------- content

const STACK = [
  ['backend', ['Spring Boot', 'Spring Security', 'Express', 'Node.js', 'ASP.NET MVC', 'JWT auth']],
  ['frontend', ['Next.js', 'React', 'Tailwind CSS', 'Razor Pages', 'Thymeleaf']],
  ['databases', ['MySQL', 'SQL Server', 'MongoDB', 'Redis']],
  ['languages', ['TypeScript', 'JavaScript', 'Java', 'C#', 'SQL']],
  ['integrations', ['Stripe', 'SePay', 'VNPay', 'MapLibre GL', 'Three.js', 'Pannellum', 'Cloudflare R2']],
  ['tools', ['Git & GitHub', 'Docker', 'Vitest', 'Jest & Supertest', 'Vercel', 'Render', 'Postman']],
];

const TRAM = {
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Spring Boot 4', 'MySQL', 'Redis', 'Docker', 'Cloudflare R2', 'Stripe', 'SePay'],
  built: [
    'The booking flow from search to payment, in Vietnamese and English, light and dark.',
    'Map search, hotel and room pages, account and wishlist.',
    'The 360° tour editor and the admin and partner back offices.',
    'Backend: SePay payments, the partner module, admin vs owner/staff permissions, panorama uploads to Cloudflare R2, login by one-time code.',
  ],
  notes: [
    'Deleting a panorama that other rooms link to returns 409 with those hotspots, so a tour never ends up with broken links.',
    'One login sends each account to /admin or /partner from the hotel it belongs to.',
    'Tokens stay in httpOnly cookies behind Next.js route handlers; the browser never calls the API directly.',
    'Guest booking with a one-time code: frontend done, backend still in progress.',
  ],
};

const EARLIER = [
  {
    name: 'Hotel Booking Management',
    meta: 'MERN · Mar 2025 – Apr 2026',
    points: ['27 REST endpoints, 5 models, 11 pages', 'JWT access and refresh tokens with a rotation queue', '6 Jest + Supertest tests'],
  },
  {
    name: 'Mini OTA v1',
    meta: 'ASP.NET MVC · Apr – Jun 2025',
    points: ['16-table database, 100+ hotels', 'MapLibre map, Pannellum 360° tours, VNPay', 'Unpaid bookings cancel after 20 minutes'],
  },
];

const TIHA = [
  "Built a management system that moved a lottery agency's ticket sales, agent debts and revenue reports off paper.",
  '8 management modules, 6 core workflows and 7 reports; React frontend, REST API in Express.',
  'Designed the 8-table SQL Server database; deployed to Vercel and Render.',
];

// ---- home

function homeHero() {
  const h = 312;
  const x = 240;
  const status = 'Open to intern / fresher roles · Ho Chi Minh City';
  const sw = Math.round(tw(status, 13) + 46);
  const bio = para(x, 196, "I'm a fresh Software Engineering graduate from HUTECH. I build web apps end to end, from the database schema to the last button.", { size: 16, max: 700 });
  const ch = chips(x, bio.bottom + 26, ['Next.js', 'React', 'Spring Boot', 'Node.js', 'MySQL', 'Docker'], 700);
  const body =
    dotsPattern +
    `<rect x="40.5" y="40.5" width="167" height="209" rx="14" fill="url(#dots)" class="s-line2" stroke-width="1" stroke-dasharray="5 5"/>` +
    text(124, 154, 'NQ', { size: 30, cls: 'f-ink3', mono: true, anchor: 'middle' }) +
    `<rect x="${x + 0.5}" y="40.5" width="${sw}" height="29" rx="14.5" class="f-surface s-line" stroke-width="1"/>` +
    `<circle class="pulse f-ok" cx="${x + 18}" cy="55" r="4"/><circle cx="${x + 18}" cy="55" r="4" class="f-ok"/>` +
    text(x + 32, 59.5, status, { size: 13, cls: 'f-ink2' }) +
    text(x, 124, 'Trần Khương Trung Nhật Quang', { size: 36, cls: 'f-ink', bold: true }) +
    text(x, 158, 'Full-stack Developer', { size: 18, cls: 'f-accink' }) +
    bio.svg +
    ch.svg;
  return [{ ...tile('home-hero.svg', W, h, body, { left: true, right: true }), href: LIVE, alt: `Trần Khương Trung Nhật Quang, Full-stack Developer. ${status}.` }];
}

function homeStats() {
  const stat = (tag, value, desc) => (x, y, w) =>
    label(x + 22, y + 34, tag) + arrow(x + w - 20, y + 36) + text(x + 22, y + 78, value, { size: 30, cls: 'f-ink', bold: true }) + text(x + 22, y + 104, desc, { size: 13.5, cls: 'f-ink2' });
  return cardRow('home-stats', 140, [
    { draw: stat('education', '3.6 / 4', 'GPA · HUTECH, class of 2026'), href: pageUrl('partners'), alt: 'Education: GPA 3.6 / 4 at HUTECH, class of 2026' },
    { draw: stat('experience', '3 months', 'Full-stack intern at TIHA'), href: pageUrl('partners'), alt: 'Experience: 3-month full-stack internship at TIHA' },
    { draw: stat('stack', '34 skills', 'Across 6 areas'), href: pageUrl('blog'), alt: 'Stack: 34 skills across 6 areas' },
  ]);
}

function homeShop() {
  const h = 268;
  const y = 64;
  const desc = para(212, y + 138, 'A hotel booking platform for Vietnam: map search, 360° room tours, card and bank-QR payments, and two back offices on one login.', { size: 15, max: 700 });
  const ch = desc.bottom + 22;
  const body =
    dotsPattern +
    sectionLabel(40, 40, '01', 'shop') +
    text(960, 40, 'ALL PROJECTS →', { size: 12.5, cls: 'f-accink', mono: true, anchor: 'end', ls: 0.6 }) +
    card(40, y, 920, ch - y + 4) +
    `<rect x="64" y="${y + 24}" width="124" height="${ch - y - 44}" rx="10" fill="url(#dots)" class="s-line" stroke-width="1"/>` +
    text(126, y + 24 + (ch - y - 44) / 2 + 10, 'TO', { size: 28, cls: 'f-ink3', mono: true, anchor: 'middle' }) +
    pill(212, y + 24, 'Team project').svg +
    arrow(936, y + 44) +
    text(212, y + 86, 'Trạm OTA', { size: 26, cls: 'f-ink', bold: true }) +
    text(212, y + 108, 'Next.js · Spring Boot · MySQL · Redis · Docker', { size: 13, cls: 'f-ink3', mono: true }) +
    desc.svg;
  return [{ ...tile('home-shop.svg', W, ch + 28, body, { left: true, right: true }), href: pageUrl('shop'), alt: 'Shop: Trạm OTA, a team-built hotel booking platform for Vietnam. Open all projects.' }];
}

function contactCards(name, { heading } = {}) {
  const c = (tag, value, action, glyph) => (x, y, w) =>
    label(x + 22, y + 34, tag) + arrow(x + w - 20, y + 36, glyph) + text(x + 22, y + 72, value, { size: 20, cls: 'f-ink', bold: true }) + text(x + 22, y + 98, action, { size: 13.5, cls: 'f-accink' });
  const top = heading ? 60 : 0;
  return cardRow(
    name,
    top + 140,
    [
      { span: 3, above: heading ? (x) => sectionLabel(x, 40, '02', heading) : null, draw: c('email · fastest reply', EMAIL, 'write to me', '→'), href: `mailto:${EMAIL}`, alt: `Email ${EMAIL}` },
      { span: 2, draw: c('cv · pdf', 'Download CV', 'open the PDF', '↗'), href: CV, alt: 'Download my CV (PDF)' },
    ],
    { top },
  );
}

// ---- shop

function tramCard(page) {
  const x = 40;
  const y = 0;
  const inX = x + 32;
  let svg = pill(inX, y + 30, 'Team project · 2 developers').svg + text(928, y + 50, 'Jun 2026 – now', { size: 12.5, cls: 'f-ink3', mono: true, anchor: 'end' });
  svg += text(inX, y + 104, 'Trạm OTA', { size: 32, cls: 'f-ink', bold: true });
  const tag = para(inX, y + 136, 'Hotel booking platform for Vietnam: map search, 360° room tours, card or bank-transfer QR payments.', { size: 16, max: 850 });
  svg += tag.svg;
  const st = chips(inX, tag.bottom + 22, TRAM.stack, 850);
  svg += st.svg;
  const divY = st.bottom + 30;
  svg += `<path d="M${inX} ${divY + 0.5}H928" class="s-line" stroke-width="1"/>`;
  const colY = divY + 44;
  const colW = 404;
  const rx = inX + colW + 40;
  svg += label(inX, colY, 'MY PART');
  svg += text(inX, colY + 34, '60 / 72', { size: 24, cls: 'f-ink', bold: true }) + text(inX + 100, colY + 34, 'frontend commits', { size: 13.5, cls: 'f-ink3' });
  svg += text(inX + 236, colY + 34, '27 / 101', { size: 24, cls: 'f-ink', bold: true }) + text(inX + 236 + 112, colY + 34, 'backend', { size: 13.5, cls: 'f-ink3' });
  const left = bullets(inX, colY + 72, TRAM.built, { max: colW, size: 14 });
  svg += left.svg;
  svg += label(rx, colY, 'PROBLEMS I WORKED THROUGH');
  const right = bullets(rx, colY + 34, TRAM.notes, { max: 928 - rx, size: 14 });
  svg += right.svg;
  const bottom = Math.max(left.bottom, right.bottom) + 34;
  const h = bottom + 16;
  const body = card(x, y, 920, bottom - y) + svg;
  return [
    {
      ...tile('shop-tram.svg', W, h, body, { left: true, right: true }),
      href: `${LIVE}shop-tram-ota.html`,
      alt: 'Trạm OTA, team project (2 developers), Jun 2026 to now. Next.js, Spring Boot, MySQL, Redis, Docker. I wrote 60 of 72 frontend commits and 27 of 101 backend commits.',
    },
  ];
}

function shopLinks() {
  const c = (tag, value, desc) => (x, y, w) =>
    label(x + 22, y + 32, tag) + arrow(x + w - 20, y + 34, '↗') + text(x + 22, y + 64, value, { size: 18, cls: 'f-ink', bold: true }) + text(x + 22, y + 88, desc, { size: 13, cls: 'f-ink3' });
  return cardRow('shop-links', 128, [
    { draw: c('source', 'Backend repo', 'github.com/tktnq2004/Mini-OTA-Upgrade'), href: BACKEND_REPO, alt: 'Trạm OTA backend repository on GitHub' },
    { draw: c('case study', 'Product page', 'architecture, my part, problems solved'), href: `${LIVE}shop-tram-ota.html`, alt: 'Trạm OTA product page on my site' },
  ]);
}

function shopEarlier() {
  const c = (p) => (x, y, w) => {
    let s = text(x + 22, y + 40, p.name, { size: 18, cls: 'f-ink', bold: true }) + text(x + 22, y + 64, p.meta, { size: 12.5, cls: 'f-ink3', mono: true });
    s += bullets(x + 22, y + 100, p.points, { max: w - 44, size: 13.5, gap: 6 }).svg;
    return s;
  };
  return cardRow(
    'shop-earlier',
    258,
    EARLIER.map((p, i) => ({
      above: i === 0 ? (x) => sectionLabel(x, 42, '02', 'earlier builds, same domain') : null,
      draw: c(p),
      href: REPOS,
      alt: `${p.name}, ${p.meta}: ${p.points.join('; ')}`,
    })),
    { top: 66 },
  );
}

// ---- blog

function blogStack(page) {
  const x = 40;
  const inX = 72;
  const chipX = 230;
  let y = 36;
  let svg = '';
  STACK.forEach(([area, items], i) => {
    if (i) svg += `<path d="M${inX} ${y - 18.5}H928" class="s-line" stroke-width="1"/>`;
    svg += text(inX, y + 19, area, { size: 13, cls: 'f-accink', mono: true });
    const c = chips(chipX, y, items, 928 - chipX);
    svg += c.svg;
    y = c.bottom + 38;
  });
  const bottom = y - 8;
  return [
    {
      ...tile('blog-stack.svg', W, bottom + 16, card(x, 0, 920, bottom) + svg, { left: true, right: true }),
      href: `${LIVE}blog.html`,
      alt: STACK.map(([a, items]) => `${a}: ${items.join(', ')}`).join('. '),
    },
  ];
}

// ---- partners

function partnerCard(file, { when, sub, title, role, points, num, section, href, alt }) {
  const x = 40;
  const top = 66;
  const inX = 72;
  const colX = 250;
  let svg = sectionLabel(40, 42, num, section);
  svg += text(inX, top + 48, when, { size: 15, cls: 'f-ink', mono: true, bold: true }) + text(inX, top + 72, sub, { size: 12.5, cls: 'f-ink3', mono: true });
  svg += text(colX, top + 48, title, { size: 22, cls: 'f-ink', bold: true }) + text(colX, top + 76, role, { size: 15, cls: 'f-accink' });
  let bottom = top + 76;
  if (points) {
    const b = bullets(colX, top + 116, points, { max: 928 - colX, size: 14.5, gap: 8 });
    svg += b.svg;
    bottom = b.bottom;
  }
  bottom += 34;
  return [{ ...tile(file, W, bottom + 16, card(x, top, 920, bottom - top) + svg, { left: true, right: true }), href, alt }];
}

// ---- contact

function contactGrid() {
  const c = (tag, value, action, glyph) => (x, y, w) =>
    label(x + 22, y + 34, tag) + (glyph ? arrow(x + w - 20, y + 36, glyph) : '') + text(x + 22, y + 72, value, { size: 20, cls: 'f-ink', bold: true }) + text(x + 22, y + 98, action, { size: 13.5, cls: glyph ? 'f-accink' : 'f-ink3' });
  return [
    cardRow('contact-a', 140, [
      { draw: c('email · fastest reply', EMAIL, 'write to me', '→'), href: `mailto:${EMAIL}`, alt: `Email ${EMAIL}` },
      { draw: c('github', `@${USER}`, 'see my repositories', '↗'), href: REPOS, alt: `GitHub @${USER}: repositories` },
    ]),
    cardRow('contact-b', 140, [
      { draw: c('cv · pdf', 'Download CV', 'open the PDF', '↗'), href: CV, alt: 'Download my CV (PDF)' },
      { draw: c('phone', PHONE, 'call me', null), href: `${LIVE}contact.html`, alt: `Phone ${PHONE}` },
    ]),
  ];
}

// ---------------------------------------------------------------- pages

const PAGES = [
  {
    id: 'home',
    tab: 'Nhật Quang · Full-stack Developer',
    path: `/${USER}/`,
    live: LIVE,
    rows: () => [homeHero(), homeStats(), homeShop(), contactCards('home-contact', { heading: 'get in touch' })],
    text: `**Trần Khương Trung Nhật Quang** · Full-stack Developer · Ho Chi Minh City
Fresh Software Engineering graduate from HUTECH (2022–2026, GPA 3.6/4), open to intern / fresher roles.

- **Trạm OTA** (team of 2): hotel booking platform. Next.js, Spring Boot, MySQL, Redis, Docker. [More →](profile/shop.md)
- **TIHA · Bong Mai IT**: full-stack intern, Apr – Jun 2026. [More →](profile/partners.md)
- **Stack**: 34 skills across 6 areas. [More →](profile/blog.md)

📫 [${EMAIL}](mailto:${EMAIL}) · [CV (PDF)](${CV}) · [Live site](${LIVE})`,
  },
  {
    id: 'shop',
    tab: 'Shop · Nhật Quang',
    path: `/${USER}/shop.html`,
    live: `${LIVE}shop.html`,
    rows: (p) => [pageHead(p, 'Shop', 'Projects I have built. One in stock, two earlier builds of the same domain.'), tramCard(p), shopLinks(), shopEarlier()],
    text: `### Trạm OTA · team project (2 developers) · Jun 2026 – now
Hotel booking platform for Vietnam. ${TRAM.stack.join(', ')}.
My part: 60 of 72 frontend commits, 27 of 101 backend commits.
${TRAM.built.map((b) => `- ${b}`).join('\n')}

Problems I worked through:
${TRAM.notes.map((b) => `- ${b}`).join('\n')}

[Backend repo](${BACKEND_REPO}) · [Product page](${LIVE}shop-tram-ota.html)

### Earlier builds
${EARLIER.map((p) => `- **${p.name}** (${p.meta}): ${p.points.join('; ')}`).join('\n')}`,
  },
  {
    id: 'blog',
    tab: 'Blog · Nhật Quang',
    path: `/${USER}/blog.html`,
    live: `${LIVE}blog.html`,
    rows: (p) => [pageHead(p, 'Blog', 'My tech stack, by area.'), blogStack(p)],
    text: STACK.map(([a, items]) => `- **${a[0].toUpperCase() + a.slice(1)}:** ${items.join(', ')}`).join('\n'),
  },
  {
    id: 'partners',
    tab: 'Partners · Nhật Quang',
    path: `/${USER}/#partners`,
    live: `${LIVE}#partners`,
    rows: (p) => [
      pageHead(p, 'Partners', 'Where I have worked, and where I studied.'),
      partnerCard('partners-tiha.svg', { num: '01', section: 'internship', when: '2026', sub: 'Apr – Jun', title: 'TIHA · Bong Mai IT', role: 'Full-stack intern', points: TIHA, href: CV, alt: `TIHA · Bong Mai IT, full-stack intern, Apr – Jun 2026. ${TIHA.join(' ')}` }),
      partnerCard('partners-hutech.svg', { num: '02', section: 'about the maker', when: '2022 – 2026', sub: 'class of 2026', title: 'Bachelor of Software Engineering', role: 'HUTECH · GPA 3.6 / 4', href: CV, alt: 'Bachelor of Software Engineering, HUTECH, 2022 – 2026, GPA 3.6 / 4' }),
    ],
    text: `**TIHA · Bong Mai IT**: full-stack intern, Apr – Jun 2026
${TIHA.map((b) => `- ${b}`).join('\n')}

**HUTECH**: Bachelor of Software Engineering, 2022 – 2026, GPA 3.6 / 4`,
  },
  {
    id: 'contact',
    tab: 'Contact · Nhật Quang',
    path: `/${USER}/contact.html`,
    live: `${LIVE}contact.html`,
    rows: (p) => [pageHead(p, 'Contact', 'Hiring an intern or fresher developer? Email is the fastest way to reach me.'), ...contactGrid()],
    text: `- Email: [${EMAIL}](mailto:${EMAIL})
- Phone: ${PHONE}
- GitHub: [@${USER}](${PROFILE})
- CV: [PDF](${CV})`,
  },
];

// ---------------------------------------------------------------- write

rmSync(ASSETS, { recursive: true, force: true });
mkdirSync(ASSETS, { recursive: true });

const pct = (w) => `${+((w / W) * 100).toFixed(3)}%`;
const attr = (s) => esc(s);

for (const page of PAGES) {
  const rows = [[tabStrip(page)], toolbar(page), siteNav(page), ...page.rows(page), footer(page)];
  const base = page.id === 'home' ? 'profile/assets/' : 'assets/';
  for (const r of rows) {
    const sum = r.reduce((s, t) => s + t.w, 0);
    if (sum !== W) throw new Error(`${page.id}: row ${r.map((t) => t.file).join(', ')} is ${sum}px wide, not ${W}`);
  }
  const html = rows
    .map((r) =>
      r
        .map((t) => `<a href="${attr(t.href ?? page.live)}"><img align="top" width="${pct(t.w)}" src="${base}${t.file}" alt="${attr(t.alt ?? '')}"></a>`)
        .join('') + '<br>',
    )
    .join('');

  const others = NAV.filter(([id]) => id !== page.id)
    .map(([id, name]) => `[${name}](${id === 'home' ? PROFILE : page.id === 'home' ? `profile/${id}.md` : `${id}.md`})`)
    .join(' · ');
  const md = `<!-- Generated by profile/build.mjs. Edit the script, then run: node profile/build.mjs -->
<div>${html}</div>

<p align="center"><sub>The window is clickable: the menu changes pages, the address bar opens the live site, and every card is a link.</sub></p>

<details>
<summary>Text version</summary>

${page.text}

${others}
</details>
`;
  const out = page.id === 'home' ? join(ROOT, 'README.md') : join(HERE, `${page.id}.md`);
  writeFileSync(out, md);
}

console.log(`wrote ${PAGES.length} pages and ${written.size} svg tiles`);
