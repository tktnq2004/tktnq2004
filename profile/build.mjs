// Builds the GitHub profile README: one animated SVG of a browser window that
// plays a short demo on a loop (home → open Shop in a new tab → close →
// open Contact → close), plus three real buttons under it.
// Run from the repo root:  node profile/build.mjs
// Writes README.md and profile/assets/*.svg. Do not edit those by hand.
//
// GitHub strips scripts and styles from READMEs, so nothing inside an image can
// react to clicks. The SVG animates itself with CSS keyframes instead; viewers
// it plays even when the viewer has reduced motion turned on.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const ASSETS = join(HERE, 'assets');

// ---------------------------------------------------------------- content

const USER = 'tktnq2004';
const PROFILE = `https://github.com/${USER}`;
const LIVE = `https://${USER}.github.io/${USER}/`;
const EMAIL = 'tktnq2004@gmail.com';
const CV = `${PROFILE}/${USER}/blob/main/assets/Tran-Khuong-Trung-Nhat-Quang-CV.pdf`;

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
  { mono: 'TO', name: 'Trạm OTA', badge: 'team of 2', meta: 'Next.js · Spring Boot', line: 'Hotel booking with map search, 360° room tours and QR payments.' },
  { mono: 'HB', name: 'Hotel Booking', meta: 'MERN stack', line: 'REST API with JWT refresh-token rotation and Jest tests.' },
  { mono: 'MO', name: 'Mini OTA v1', meta: 'ASP.NET MVC', line: 'Booking site with maps, 360° tours and VNPay payments.' },
];

const CONTACT = [
  { tag: 'email', value: EMAIL, sub: 'the fastest way to reach me' },
  { tag: 'cv', value: 'Download CV', sub: 'PDF' },
  { tag: 'portfolio', value: 'Full portfolio', sub: `${USER}.github.io` },
];

// Real links under the window.
const BUTTONS = [
  { id: 'email', label: 'Email me', icon: 'mail', href: `mailto:${EMAIL}` },
  { id: 'cv', label: 'Download CV', icon: 'file', href: CV },
  { id: 'portfolio', label: 'Portfolio', icon: 'globe', href: LIVE },
];

// ---------------------------------------------------------------- theme

const SANS = `'Inter','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif`;
const MONO = `'JetBrains Mono','Cascadia Code',ui-monospace,Consolas,Menlo,monospace`;

const LIGHT = {
  strip: '#e3e8ee', bar: '#f6f8fa', field: '#e8ecf0', win: '#ffffff', chip: '#f6f8fa',
  ink: '#1f2328', ink2: '#59636e', ink3: '#6e7781', acc: '#4f46e5', ok: '#1a7f37', white: '#ffffff',
  frame: '#c3ccd5', line: '#d8dee4', g1: '#4f46e5', g2: '#0891b2', cursor: '#1f2328', cursorEdge: '#ffffff',
};
const DARK = {
  strip: '#010409', bar: '#1c2128', field: '#0d1117', win: '#151b23', chip: '#212830',
  ink: '#f0f6fc', ink2: '#9198a1', ink3: '#848d97', acc: '#a5b4fc', ok: '#3fb950', white: '#ffffff',
  frame: '#3d444d', line: '#30363d', g1: '#6366f1', g2: '#06b6d4', cursor: '#ffffff', cursorEdge: '#0d1117',
};
const FILLS = ['strip', 'bar', 'field', 'win', 'chip', 'ink', 'ink2', 'ink3', 'acc', 'ok', 'white', 'cursor'];
const STROKES = ['frame', 'line', 'acc', 'ink', 'ink2', 'ink3', 'cursorEdge'];
const palette = (c) =>
  FILLS.map((k) => `.f-${k}{fill:${c[k]}}`).join('') +
  STROKES.map((k) => `.s-${k}{stroke:${c[k]}}`).join('') +
  `.g1{stop-color:${c.g1}}.g2{stop-color:${c.g2}}`;
const BASE_CSS = `text{font-family:${SANS}}.mono{font-family:${MONO}}${palette(LIGHT)}@media (prefers-color-scheme:dark){${palette(DARK)}}`;

// ---------------------------------------------------------------- svg helpers

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

const gradient = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="g1"/><stop offset="1" class="g2"/></linearGradient>`;

// ---------------------------------------------------------------- timeline
//
// One loop of T seconds. Every animated element gets its own keyframes over the
// whole loop, so they all stay in step.

const T = 20;
const CLICK = { shop: 3.8, closeShop: 9.0, contact: 13.0, closeContact: 18.2 };
const NAV = 0.15; // delay between a click and the page reacting
const OPEN = { shop: CLICK.shop + NAV, contact: CLICK.contact + NAV };
const CLOSE = { shop: CLICK.closeShop + NAV, contact: CLICK.closeContact + NAV };
const LOAD = 0.45; // blank time while the new page "loads"

let keyframes = '';
let rules = '';
const pc = (t) => `${((Math.max(0, Math.min(T, t)) / T) * 100).toFixed(3)}%`;

function anim(name, frames, { timing = 'linear', origin } = {}) {
  const sorted = [...frames].sort((a, b) => a[0] - b[0]);
  keyframes += `@keyframes ${name}{${sorted.map(([t, d]) => `${pc(t)}{${d}}`).join('')}}`;
  rules += `.${name}{animation:${name} ${T}s ${timing} infinite${origin ? `;transform-box:fill-box;transform-origin:${origin}` : ''}}`;
  return name;
}

// Visible during each [from, to] window, fading in after `from` and out after `to`.
function show(name, windows, { fade = 0.3, rise = 0, delay = 0 } = {}) {
  const on = `opacity:1${rise ? ';transform:none' : ''}`;
  const off = `opacity:0${rise ? `;transform:translateY(${rise}px)` : ''}`;
  const visibleAt = (t) => windows.some(([a, b]) => t >= a + delay && t <= b);
  const frames = [[0, visibleAt(0) ? on : off], [T, visibleAt(T) ? on : off]];
  for (const [a, b] of windows) {
    if (a > 0) frames.push([a + delay, off], [a + delay + fade, on]);
    if (b < T) frames.push([b, on], [b + Math.min(fade, 0.25), off]);
  }
  return anim(name, frames, { timing: 'ease-out' });
}

const HOME = [[-1, OPEN.shop], [CLOSE.shop + 0.15, OPEN.contact], [CLOSE.contact + 0.15, T + 1]];
const SHOP = [[OPEN.shop + LOAD, CLOSE.shop]];
const CONT = [[OPEN.contact + LOAD, CLOSE.contact]];
const TAB_SHOP = [[OPEN.shop, CLOSE.shop]];
const TAB_CONT = [[OPEN.contact, CLOSE.contact]];

// ---------------------------------------------------------------- layout

const W = 1000;
const STRIP = 46;
const BAR = 50;
const NAVH = 62;
const CY = STRIP + BAR + NAVH; // top of the page content
const CONTENT_H = 350;
const STATUS = 52;
const H = CY + CONTENT_H + STATUS;
const R = 12;

const HOME_TAB = [84, 282];
const NEW_TAB = [290, 486];
const NAV_X = { home: 700, shop: 820, contact: 920 };
const NAV_Y = STRIP + BAR + 36;

// ---------------------------------------------------------------- window chrome

function chrome() {
  const lights = [22, 42, 62].map((cx, i) => `<circle cx="${cx}" cy="${STRIP / 2 + 1}" r="6" fill="${['#ff5f57', '#febc2e', '#28c840'][i]}"/>`).join('');
  const favicon = (x, letter) =>
    `<rect x="${x}" y="16" width="16" height="16" rx="4.5" fill="url(#g)"/>` + text(x + 8, 28, letter, { size: 10.5, cls: 'f-white', bold: true, anchor: 'middle' });
  const activeTab = (x0, x1) => `<path d="M${x0} ${STRIP + 1}V18a10 10 0 0 1 10-10H${x1 - 10}a10 10 0 0 1 10 10V${STRIP + 1}Z" class="f-bar"/>`;
  const closeX = (x) => `<path d="M${x - 4} ${STRIP / 2 - 3}l8 8M${x + 4} ${STRIP / 2 - 3}l-8 8" class="s-ink3" stroke-width="1.5" stroke-linecap="round"/>`;
  const [h0, h1] = HOME_TAB;
  const [n0, n1] = NEW_TAB;

  const homeActive = show('home-tab', HOME, { fade: 0.2 });
  const newTab = (id, title, windows) =>
    `<g class="${show(`tab-${id}`, windows, { fade: 0.35, rise: 14 })}" opacity="0">${activeTab(n0, n1)}${favicon(n0 + 14, title[0])}${text(n0 + 40, 29, title, { size: 13 })}${closeX(n1 - 18)}</g>`;
  const plusMove = anim(
    'plus',
    [
      [0, 'transform:none'],
      [OPEN.shop, 'transform:none'], [OPEN.shop + 0.35, `transform:translateX(${n1 - h1}px)`],
      [CLOSE.shop, `transform:translateX(${n1 - h1}px)`], [CLOSE.shop + 0.3, 'transform:none'],
      [OPEN.contact, 'transform:none'], [OPEN.contact + 0.35, `transform:translateX(${n1 - h1}px)`],
      [CLOSE.contact, `transform:translateX(${n1 - h1}px)`], [CLOSE.contact + 0.3, 'transform:none'],
      [T, 'transform:none'],
    ],
    { timing: 'ease-out' },
  );

  // Address bar: one full URL per page, swapped with a quick fade. (Placing the
  // path after the host by measured width is not reliable across fonts.)
  const urlX = 150;
  const host = `github.com/${USER}`;
  const url = (id, path, windows) =>
    `<text x="${urlX + 44}" y="${STRIP + 30}" font-size="14" class="${show(`url-${id}`, windows, { fade: 0.15 })}"${id === 'home' ? '' : ' opacity="0"'}>` +
    `<tspan class="f-ink2">${esc(host)}</tspan><tspan class="f-ink">${esc(path)}</tspan></text>`;
  const progFrames = [[0, 'transform:scaleX(0);opacity:0'], [T, 'transform:scaleX(0);opacity:0']];
  for (const s of [OPEN.shop, CLOSE.shop, OPEN.contact, CLOSE.contact]) {
    progFrames.push([s, 'transform:scaleX(0);opacity:1'], [s + 0.6, 'transform:scaleX(1);opacity:1'], [s + 0.85, 'transform:scaleX(1);opacity:0'], [s + 0.86, 'transform:scaleX(0);opacity:0']);
  }
  const prog = anim('prog', progFrames, { timing: 'ease-out', origin: 'left center' });

  // Site menu with a moving underline.
  const navItem = (id, windows) => {
    const lw = tw(id, 14.5);
    const cls = show(`nav-${id}`, windows, { fade: 0.2 });
    return (
      text(NAV_X[id], NAV_Y, id, { size: 14.5, cls: 'f-ink2', anchor: 'middle' }) +
      `<rect class="${cls}" ${id === 'home' ? '' : 'opacity="0" '}x="${NAV_X[id] - lw / 2}" y="${STRIP + BAR + 45}" width="${lw}" height="2.5" rx="1.25" fill="url(#g)"/>`
    );
  };

  return (
    // window body and frame
    `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="${R}" class="f-win"/>` +
    `<path d="M.75 ${STRIP}V${R}A${R - 0.75} ${R - 0.75} 0 0 1 ${R} .75H${W - R}A${R - 0.75} ${R - 0.75} 0 0 1 ${W - 0.75} ${R}V${STRIP}Z" class="f-strip"/>` +
    `<rect x=".75" y="${STRIP}" width="${W - 1.5}" height="${BAR}" class="f-bar"/>` +
    `<path d="M0 ${STRIP + BAR - 0.5}H${W}" class="s-line" stroke-width="1"/>` +
    // tabs
    lights +
    `<rect x="${h0 + 0.5}" y="8.5" width="${h1 - h0 - 1}" height="${STRIP - 17}" rx="8" class="f-bar" opacity=".55"/>` +
    `<g class="${homeActive}">${activeTab(h0, h1)}${closeX(h1 - 18)}</g>` +
    favicon(h0 + 14, 'Q') +
    text(h0 + 40, 29, 'Nhật Quang', { size: 13 }) +
    newTab('shop', 'Shop', TAB_SHOP) +
    newTab('contact', 'Contact', TAB_CONT) +
    `<path class="${plusMove} s-ink3" d="M${h1 + 20} ${STRIP / 2 - 5}v12M${h1 + 14} ${STRIP / 2 + 1}h12" stroke-width="1.6" stroke-linecap="round"/>` +
    // toolbar
    `<path d="M38 ${STRIP + 25}H24M30 ${STRIP + 19}l-6 6 6 6" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M60 ${STRIP + 25}h14M68 ${STRIP + 19}l6 6-6 6" class="s-ink3" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>` +
    `<path d="M117 ${STRIP + 25}a7 7 0 1 1-2.05-4.95" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
    `<path d="M116.5 ${STRIP + 16.5}v4.2h-4.2" class="s-ink2" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<rect x="${urlX + 4}" y="${STRIP + 8}" width="${W - urlX - 26}" height="34" rx="17" class="f-field"/>` +
    `<rect x="${urlX + 21}" y="${STRIP + 22}" width="11" height="8.5" rx="2" class="f-ink3"/>` +
    `<path d="M${urlX + 23.5} ${STRIP + 22}v-2.2a3 3 0 0 1 6 0V${STRIP + 22}" class="s-ink3" stroke-width="1.5" fill="none"/>` +
    url('home', '', HOME) +
    url('shop', '/shop', TAB_SHOP) +
    url('contact', '/contact', TAB_CONT) +
    `<rect class="${prog}" opacity="0" x="${urlX + 20}" y="${STRIP + 39}" width="${W - urlX - 58}" height="2" rx="1" fill="url(#g)"/>` +
    // site header
    `<circle cx="56" cy="${STRIP + BAR + 31}" r="15" fill="url(#g)"/>` +
    text(56, STRIP + BAR + 36, 'NQ', { size: 11.5, cls: 'f-white', bold: true, anchor: 'middle' }) +
    text(82, STRIP + BAR + 29, 'Nhật Quang', { size: 15.5, bold: true }) +
    text(82, STRIP + BAR + 46, `@${USER}`, { size: 11.5, cls: 'f-ink3', mono: true }) +
    navItem('home', HOME) +
    navItem('shop', TAB_SHOP) +
    navItem('contact', TAB_CONT) +
    `<path d="M40 ${CY - 0.5}H${W - 40}" class="s-line" stroke-width="1"/>` +
    // status bar
    `<path d="M40 ${H - STATUS + 8.5}H${W - 40}" class="s-line" stroke-width="1"/>` +
    text(40, H - STATUS + 34, 'auto demo · real links below ↓', { size: 12, cls: 'f-ink3', mono: true }) +
    text(W - 40, H - STATUS + 34, 'Ho Chi Minh City · 2026', { size: 12, cls: 'f-ink3', mono: true, anchor: 'end' }) +
    // frame on top of everything
    `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="${R}" fill="none" class="s-frame" stroke-width="1.5"/>`
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

function homePage() {
  const cx = 104;
  const cy = CY + 96;
  const x = 200;
  const bio = wrap(ABOUT.bio, 15.5, W - x - 48);
  const bioY = CY + 146;
  const statusY = bioY + (bio.length - 1) * 24 + 22;
  const sw = Math.round(tw(ABOUT.status, 13) + 44);
  let stack = text(40, statusY + 62, 'stack', { size: 12, cls: 'f-ink3', mono: true });
  let sx = 40;
  let sy = statusY + 74;
  for (const [name, color] of STACK) {
    const c = chip(0, 0, name, color);
    if (sx > 40 && sx + c.w > W - 40) {
      sx = 40;
      sy += 38;
    }
    stack += chip(sx, sy, name, color).svg;
    sx += c.w + 8;
  }
  const pulse = anim('pulse', [[0, 'transform:scale(1);opacity:.6'], [2.2, 'transform:scale(3);opacity:0'], [T, 'transform:scale(3);opacity:0']], { timing: 'ease-out', origin: 'center' });
  const spin = anim('spin', [[0, 'transform:rotate(0deg)'], [T, 'transform:rotate(360deg)']], { origin: 'center' });
  const body =
    `<circle cx="${cx}" cy="${cy}" r="64" fill="none" class="${spin} s-acc" stroke-width="1.5" stroke-dasharray="3 9" opacity=".7"/>` +
    `<circle cx="${cx}" cy="${cy}" r="54" fill="url(#g)"/>` +
    text(cx, cy + 11, 'NQ', { size: 30, cls: 'f-white', bold: true, anchor: 'middle' }) +
    text(x, CY + 48, ABOUT.hello, { size: 13, cls: 'f-acc', mono: true }) +
    text(x, CY + 84, ABOUT.name, { size: 30, bold: true }) +
    text(x, CY + 114, ABOUT.role, { size: 16, cls: 'f-ink2' }) +
    bio.map((l, i) => text(x, bioY + i * 24, l, { size: 15.5, cls: 'f-ink2' })).join('') +
    `<rect x="${x + 0.5}" y="${statusY + 0.5}" width="${sw}" height="28" rx="14" class="f-chip s-line" stroke-width="1"/>` +
    `<circle class="${pulse} f-ok" cx="${x + 18}" cy="${statusY + 14.5}" r="4"/><circle cx="${x + 18}" cy="${statusY + 14.5}" r="4" class="f-ok"/>` +
    text(x + 32, statusY + 19, ABOUT.status, { size: 13, cls: 'f-ink2' }) +
    stack;
  if (sy + 28 > CY + CONTENT_H) throw new Error(`home page is ${sy + 28 - CY}px tall, more than ${CONTENT_H}`);
  return `<g class="${show('page-home', HOME, { rise: 8 })}">${body}</g>`;
}

const head = (title, sub) => text(40, CY + 52, title, { size: 28, bold: true }) + text(40, CY + 82, sub, { size: 15, cls: 'f-ink2' });

// Cards appear one after another once the page has "loaded".
function cards(id, items, h, draw, windows) {
  const pad = 40;
  const gap = 16;
  const cw = (W - pad * 2 - gap * (items.length - 1)) / items.length;
  const y = CY + 106;
  return items
    .map((item, i) => {
      const x = pad + i * (cw + gap);
      const cls = show(`${id}-card-${i}`, windows, { rise: 10, delay: 0.12 * (i + 1) });
      return `<g class="${cls}" opacity="0"><rect x="${x + 0.5}" y="${y + 0.5}" width="${cw - 1}" height="${h}" rx="12" class="f-chip s-line" stroke-width="1"/>${draw(item, x, y, cw)}</g>`;
    })
    .join('');
}

function shopPage() {
  const draw = (p, x, y, w) => {
    let s =
      `<rect x="${x + 18}" y="${y + 18}" width="36" height="36" rx="9" fill="url(#g)"/>` +
      text(x + 36, y + 41, p.mono, { size: 13, cls: 'f-white', bold: true, anchor: 'middle' }) +
      text(x + 66, y + 34, p.name, { size: 16.5, bold: true }) +
      text(x + 66, y + 52, p.meta, { size: 11.5, cls: 'f-ink3', mono: true });
    if (p.badge) {
      const bw = Math.round(tw(p.badge, 11, { mono: true }) + 16);
      s += `<rect x="${x + w - 16 - bw + 0.5}" y="${y + 18.5}" width="${bw}" height="20" rx="10" fill="none" class="s-acc" stroke-width="1"/>` +
        text(x + w - 16 - bw / 2, y + 32, p.badge, { size: 11, cls: 'f-acc', mono: true, anchor: 'middle' });
    }
    s += wrap(p.line, 13.5, w - 36).map((l, i) => text(x + 18, y + 86 + i * 21, l, { size: 13.5, cls: 'f-ink2' })).join('');
    return s;
  };
  return (
    `<g class="${show('page-shop', SHOP, { rise: 8 })}" opacity="0">${head('Shop', "Things I've built. The full write-ups live on my portfolio.")}</g>` +
    cards('shop', PROJECTS, 140, draw, SHOP)
  );
}

function contactPage() {
  const draw = (c, x, y) =>
    text(x + 18, y + 28, c.tag, { size: 12, cls: 'f-ink3', mono: true }) +
    text(x + 18, y + 56, c.value, { size: 16, bold: true }) +
    text(x + 18, y + 78, c.sub, { size: 12.5, cls: 'f-ink2' });
  return (
    `<g class="${show('page-contact', CONT, { rise: 8 })}" opacity="0">${head('Contact', 'Hiring an intern or fresher developer? Email reaches me fastest.')}</g>` +
    cards('contact', CONTACT, 96, draw, CONT)
  );
}

// ---------------------------------------------------------------- cursor

function cursor() {
  const rest = [600, CY + 220];
  const shopAt = [NAV_X.shop + 2, NAV_Y - 4];
  const contactAt = [NAV_X.contact + 2, NAV_Y - 4];
  const closeAt = [NEW_TAB[1] - 18, STRIP / 2 + 1];
  const path = [
    [0, rest], [1.2, rest], [CLICK.shop - 0.4, shopAt], [CLICK.shop + 0.5, shopAt],
    [6.0, [700, CY + 200]], [7.2, [700, CY + 200]], [CLICK.closeShop - 0.4, closeAt], [CLICK.closeShop + 0.5, closeAt],
    [10.8, rest], [11.4, rest], [CLICK.contact - 0.4, contactAt], [CLICK.contact + 0.5, contactAt],
    [15.0, [640, CY + 170]], [16.4, [640, CY + 170]], [CLICK.closeContact - 0.4, closeAt], [CLICK.closeContact + 0.5, closeAt],
    [T, rest],
  ];
  const move = anim('cursor', path.map(([t, [x, y]]) => [t, `transform:translate(${x}px,${y}px);opacity:1`]), { timing: 'ease-in-out' });
  // A press: the pointer dips a little while a ring spreads from the tip.
  const press = anim('press', [[0, 'transform:none'], ...Object.values(CLICK).flatMap((c) => [[c - 0.08, 'transform:none'], [c, 'transform:scale(.85)'], [c + 0.12, 'transform:none']]), [T, 'transform:none']], { origin: '0 0' });
  const ripples = Object.entries(CLICK)
    .map(([k, c]) => {
      const at = k.startsWith('close') ? closeAt : k === 'shop' ? shopAt : contactAt;
      const cls = anim(`ripple-${k}`, [[0, 'transform:scale(.2);opacity:0'], [c - 0.01, 'transform:scale(.2);opacity:0'], [c, 'transform:scale(.2);opacity:.5'], [c + 0.45, 'transform:scale(2.2);opacity:0'], [T, 'transform:scale(2.2);opacity:0']], { timing: 'ease-out', origin: 'center' });
      return `<circle class="${cls}" opacity="0" cx="${at[0]}" cy="${at[1]}" r="10" fill="url(#g)"/>`;
    })
    .join('');
  const arrow = `<path d="M0 0V17.5l4.6-4.3 3 6.6 3.1-1.4-3-6.4h6.2Z" class="f-cursor s-cursorEdge" stroke-width="1.2" stroke-linejoin="round"/>`;
  return `${ripples}<g class="${move}" opacity="0"><g class="${press}">${arrow}</g></g>`;
}

// ---------------------------------------------------------------- buttons

const ICONS = {
  mail: '<rect x="1" y="3" width="16" height="12" rx="2.5" fill="none"/><path d="M2 5l7 5 7-5" fill="none"/>',
  file: '<path d="M4 1.5h6.5L14.5 5.5V16a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z" fill="none"/><path d="M10 1.5V6h4.5M6.5 10h5M6.5 13h5" fill="none"/>',
  globe: '<circle cx="9" cy="9" r="7.5" fill="none"/><path d="M1.5 9h15M9 1.5c2.2 2.1 3.3 4.6 3.3 7.5S11.2 14.4 9 16.5M9 1.5C6.8 3.6 5.7 6.1 5.7 9s1.1 5.4 3.3 7.5" fill="none"/>',
};

function button(b) {
  const h = 44;
  const w = Math.round(tw(b.label, 14.5, { bold: true }) + 70);
  const body =
    `<rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${h / 2}" class="f-chip s-line" stroke-width="1.5"/>` +
    `<g transform="translate(20 13)" class="s-acc" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[b.icon]}</g>` +
    text(48, 27.5, b.label, { size: 14.5, bold: true });
  return svgDoc(w, h, body, '');
}

// ---------------------------------------------------------------- write

function svgDoc(w, h, body, extraCss) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><style>${BASE_CSS}${extraCss}</style><defs>${gradient}</defs>${body}</svg>\n`;
}

rmSync(ASSETS, { recursive: true, force: true });
mkdirSync(ASSETS, { recursive: true });
for (const old of ['shop', 'contact', 'blog', 'partners']) rmSync(join(HERE, `${old}.md`), { force: true });

const scene = chrome() + homePage() + shopPage() + contactPage() + cursor();
// Plays regardless of the reduced-motion setting: the demo is the whole point
// of the image, and with it off (common on Windows) visitors saw a still page.
const motion = `${rules}${keyframes}`;
writeFileSync(join(ASSETS, 'browser.svg'), svgDoc(W, H, scene, motion));
for (const b of BUTTONS) writeFileSync(join(ASSETS, `button-${b.id}.svg`), button(b));

const alt = [
  `${ABOUT.name}, ${ABOUT.role}.`,
  ABOUT.bio,
  `${ABOUT.status}.`,
  `Stack: ${STACK.map((s) => s[0]).join(', ')}.`,
  `Projects: ${PROJECTS.map((p) => `${p.name} (${p.meta})`).join('; ')}.`,
].join(' ');

const buttons = BUTTONS.map((b) => `<a href="${esc(b.href)}"><img height="44" src="profile/assets/button-${b.id}.svg" alt="${esc(b.label)}"></a>`).join('&nbsp;&nbsp;');

writeFileSync(
  join(ROOT, 'README.md'),
  `<!-- Generated by profile/build.mjs. Edit the script, then run: node profile/build.mjs -->
<a href="${LIVE}"><img width="100%" src="profile/assets/browser.svg" alt="${esc(alt)}"></a>

<p align="center">${buttons}</p>
`,
);

console.log(`wrote README.md, browser.svg and ${BUTTONS.length} buttons`);
