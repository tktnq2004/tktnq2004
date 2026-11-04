---
name: Nhật Quang portfolio
description: A quiet personal index for a fresher full-stack developer, with a fixed sidebar, a CV home, a shop of skills with product pages, a blog of project stories, a shortlist cart and a mail-out checkout, on warm paper with moss ink and a burnt-orange hand for interaction.
colors:
  paper: "#f6f3ec"
  surface: "#fbf9f4"
  sunk: "#efebe1"
  ink: "#1f3d2b"
  ink-2: "#3f5446"
  ink-3: "#5f6f63"
  line: "#ddd7c9"
  line-2: "#cbc4b3"
  accent: "#c4622d"
  accent-ink: "#a64e1f"
  accent-fill: "#b0521d"
  on-accent: "#ffffff"
  ok: "#2f7d4e"
  bad: "#b8432f"
  on-status: "#ffffff"
  dot: "rgba(31, 61, 43, .22)"
  paper-dark: "#121a15"
  surface-dark: "#18221c"
  sunk-dark: "#1d2822"
  ink-dark: "#ebe6d9"
  ink-2-dark: "#c6c3b6"
  ink-3-dark: "#9da79f"
  line-dark: "#2b382f"
  line-2-dark: "#3a4a3f"
  accent-dark: "#e2834f"
  accent-ink-dark: "#f09a68"
  accent-fill-dark: "#e2834f"
  on-accent-dark: "#1a120c"
  ok-dark: "#8fbf96"
  bad-dark: "#e0927a"
  on-status-dark: "#121a15"
  dot-dark: "rgba(160, 200, 172, .16)"
typography:
  display:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.9rem, 1.4rem + 1.6vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  product-title:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.3rem + 1.4vw, 2.3rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  stat:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  drawer-title:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  field:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  body-sm:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.55
  section-head:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, Menlo, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    letterSpacing: "0"
  nav:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
  button:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 500
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  code: "4px"
  chip: "6px"
  button: "7px"
  control: "8px"
  field: "9px"
  card: "10px"
  card-lg: "12px"
  pill: "999px"
spacing:
  sidebar: "232px"
  column: "620px"
  column-post: "720px"
  column-wide: "1040px"
  gutter: "24px"
  gutter-phone: "16px"
  section: "104px"
  section-phone: "72px"
  head-gap: "26px"
  row: "15px"
  card-pad: "16px"
  grid-gap: "12px"
  product-gap: "18px"
  categories: "190px"
  shop-gap: "32px"
  pdp-gap: "40px"
  contact-gap: "48px"
  drawer: "400px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 .85rem"
    height: "34px"
  button-ink-hover:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
  button-ink-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    height: "42px"
    width: "100%"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 .85rem"
    height: "34px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    size: "34px"
  icon-button-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  shortlist-count:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 5px"
    height: "18px"
  shortlist-count-zero:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.ink-3}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  tag-hot:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  badge-over:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "4px 10px"
  mono-tile:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    size: "30px"
  skill-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-lg}"
    padding: "18px"
    width: "300px"
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.card-lg}"
    padding: "16px"
  category-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "5px 11px"
  category-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  sort-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "5px 10px"
  page-tabs:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.button}"
    padding: "12px 0"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  empty-state:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.card-lg}"
    padding: "20px"
  mailbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "8px 8px 8px 14px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.control}"
    padding: "9px 11px"
  drawer-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "22px 22px 20px"
    width: "400px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.field}"
    padding: "9px 14px"
  sidebar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.nav}"
    padding: "30px 24px 26px"
    width: "232px"
  theme-switch-active:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "28px"
---

# Design System: Nhật Quang portfolio

## Overview

**Creative North Star: "The Moss Index"**

A personal index kept on warm paper. A fixed sidebar names the person and lists the pages; the home page is the CV, one narrow column of numbered sections in a monospaced voice, and the work reads like an entry in a well-kept notebook rather than a product launch. The structure follows a pinned reference (a sidebar-plus-column personal index) retuned for a fresher, with a shop metaphor laid over it: skills are the products, project write-ups are the blog, the shortlist is the cart, and the contact page is the checkout.

The world is flat, hairline-ruled and quiet. Moss-green ink sits on warm paper; a single burnt-orange hand appears only where something can be pressed, on the one highlighted badge (Most used), on a non-empty shortlist count, at focus, on selected text, and as the progress fill inside one lifecycle diagram. The one ornament is a halftone dot field in moss that fades out at its edges, echoed as the screen over the avatar portrait and on every skill cover. Depth exists in exactly one place at rest: the fanned deck of featured skills on the home page. The dark theme is the same world at night, a deep moss-black ground with ivory ink and a warmer orange.

The shop borrows a store's grammar without leaving the world. The Shop page is a catalogue of 34 skills: a sticky category list with counts beside a count-and-sort line and a grid of product cards, each an authored 960:504 cover carrying the skill name, a true-fact corner badge, the name, a one-line pitch, and a foot with the number of projects where a price would sit, a shortlist toggle and an ink "View" button. Each skill has a product page: a single cover beside a buy box (title, badge, lead, ruled facts, a full-width "Add to shortlist" button and "Read the story"), then "what i built with it" as dated rows, then "more in" the same category. Blog posts are the project stories in a 720px reading column. The shortlist lives in a right-hand drawer on every page and is stored only in the visitor's browser; checkout turns it into an email.

**Key Characteristics:**
- Fixed 232px sidebar; a 620px column for the CV, blog index and certifications, a 720px column for posts, a 1040px wide column for the shop, skill pages and contact; numbered mono section heads ("01 — blog").
- Be Vietnam Pro for names, titles and prose; JetBrains Mono for numbers, dates, labels, navigation, chips, buttons and the toast.
- Hairline rules (1px line) divide rows, grids and sections; small radii from 4px to 12px.
- Orange is a hand, not a paint: interaction, the Most used badge, the shortlist count, focus, selection and one diagram's progress fill only.
- Halftone dots are the single ornament (page corner, avatar, skill covers); the fanned skill deck is the single elevated object at rest.
- Shop grammar states only true facts: no prices, ratings, reviews or stock; nothing is sent from the page.
- Full light and dark themes, user-switchable (system / light / dark), every token paired.

## Colors

Warm paper and moss ink in a tight tonal ladder, with one burnt-orange accent split into three jobs.

### Primary
- **Burnt Orange** (accent): the line color of interaction. Focus outlines (2px, 3px offset; 1px offset on checkout fields), the hover border of a dashed "more" chip and of skill chips on a post.
- **Burnt Orange Ink** (accent-ink): orange as text. Current sidebar page, hover color for every text link (links row, sec-more, crumb, footer, mail, product-card titles, row titles, post titles, shortlist rows, page tabs, skill chips), and the "verify" link on certification cards. Darkened to hold text contrast on paper.
- **Burnt Orange Fill** (accent-fill): orange as a surface under on-accent text. The ink button's hover, the Most used badge (in place or as a corner badge on a cover), the shortlist count when it is above zero, `::selection`, and the `.acc` progress fill in the booking lifecycle diagram.
- **On Accent** (on-accent): text on accent-fill; white in light, near-black in dark.

### Neutral
- **Warm Paper** (paper): page ground, sidebar ground, the shortlist drawer panel, the sticky page-tab bar and the ground of plain corner badges over covers; also the knockout text and halftone dot color on ink surfaces (ink buttons, the toast, the active category, pressed shortlist icon buttons, skill covers).
- **Raised Paper** (surface): cards, product cards, the product-page cover frame, post covers and thumbnails, the sort select, checkout fields, chips, mailbox, figures, post-nav cards, GitHub panel.
- **Sunk Paper** (sunk): the recessed tone. Avatar frame ground, the empty shortlist count, active theme segment, inline `code`, product-card media ground, diagram tracks.
- **Moss Ink** (ink): headings, strong text, ink buttons, the toast, the active category, pressed shortlist icon buttons, mono tiles, skill cover fields, key diagram nodes.
- **Moss Ink 2** (ink-2): body copy, nav links at rest, tag text, category labels at rest.
- **Moss Ink 3** (ink-3): metadata, dates, labels, form labels, placeholders, section-head numerals, sidebar icons.
- **Hairline** (line): every divider rule and card border, the drawer's left edge.
- **Strong Hairline** (line-2): interactive borders (line button, icon buttons, category buttons, fields, chips, tags, mailbox, diagram nodes), the dashed empty state, and the scrollbar thumb.
- **Moss Dot** (dot): the halftone field color, translucent moss in light, translucent sage in dark.

### Status (diagrams only)
- **Moss Green OK** (ok) and **Brick Red Bad** (bad), with **On Status** text: used only inside authored `.dg` SVG diagrams for success and failure paths. Never on page chrome.

### Dark theme
Every token has a `-dark` pair in the frontmatter, applied under `prefers-color-scheme: dark` unless `data-theme="light"`, and forced by `data-theme="dark"`. In dark, accent and accent-fill are the same warmer orange, accent-ink is lighter still for text, and on-accent flips to near-black.

### Named Rules
**The Orange Hand Rule.** Orange appears only for interaction (focus, hover, current page), the Most used badge, a non-empty shortlist count, text selection and the lifecycle progress fill. It never colors a heading, a background panel, a resting button, an icon or a decoration.

**The Three Oranges Rule.** Use accent for strokes and outlines, accent-ink for orange text on paper, accent-fill behind on-accent text. Never swap them; each is tuned for its own contrast job.

**The Paired Theme Rule.** No color is introduced without its dark pair. Hard-coded values are limited to the avatar halftone screen and the two overlays: the mobile-menu and shortlist scrims and the shortlist panel's edge shadow.

## Typography

**Display Font:** Be Vietnam Pro (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Be Vietnam Pro
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Cascadia Code, Menlo, Consolas, monospace)

**Character:** A soft, Vietnamese-complete humanist sans for the person's voice, paired with a monospace for everything index-like: numbers, dates, labels, links and controls. Weights stay low (400 to 600); hierarchy comes from size, tracking and the sans/mono switch, not from heavy weight. Loaded from Google Fonts at 400, 500 and 600.

### Hierarchy
- **Display** (500, clamp(1.9rem, 1.4rem + 1.6vw, 2.5rem), 1.12, -0.025em): the person's name in the hero and the page title on Shop, Blog, Certifications and Contact. One per page.
- **Product Title** (500, clamp(1.7rem, 1.3rem + 1.4vw, 2.3rem), 1.15, -0.025em): the skill name in a product page's buy box and the post title on a blog post; a step under Display because both share their space with a cover.
- **Headline** (500, 1.6rem, -0.02em): the get-in-touch heading at the foot of the CV.
- **Stat** (500, 1.45rem, 1.2, -0.02em): stat-row figures, with a 0.62em ink-3 denominator.
- **Drawer Title** (500, 1.3rem, -0.015em): the "Shortlist" heading in the drawer.
- **Title** (500, 1.05rem, -0.01em): skill names on product cards and fanned skill cards (0.95rem on phone product cards).
- **Title Small** (600, 1rem): sub-heads inside post content, split cards and story cards. Post-row titles use the same 1rem at 500.
- **Body** (400, 15px, 1.7): all prose; hero, lead and lede copy in ink-2. The post lede (`.big`) runs 1.12rem/1.6 in ink. Page-head intros are capped at 54ch, the hello note at 46ch.
- **Field** (400, 14px): text typed into checkout fields; case-fact values also sit at 14px.
- **Body Small** (400, 13.5px, 1.55): product-card pitches, post-row summaries, row details, drawer note, empty shortlist note, split and story text.
- **Section Head** (mono 400, 13.5px, ink-3): section titles, lowercase, numbered by a CSS counter or plain.
- **Nav** (mono 400, 13px): sidebar links and the sidebar Shortlist button; links row, mail and hello links at 12.5px.
- **Button** (mono 500, 12px): buttons, category buttons, the sort select, page tabs, row dates, the post byline, the toast. The product-card project count (the price slot) is 12px mono 600 in ink; full-width large buttons run 13px.
- **Label** (mono 400, 11px, 0.06-0.08em, uppercase): stat captions, badge sub-lines, case-fact terms, form labels, the categories heading, the count line, shortlist row kinds, post-nav direction, story terms, architecture labels, certification issuers, GitHub caption, tags and corner badges; the shortlist count at 600. Figure, shot and post-meta text sit at 11-11.5px mono without case change.

### Named Rules
**The Mono Index Rule.** Anything that indexes (a number, date, label, nav item, tag, chip, button, count) is set in JetBrains Mono. Anything that speaks (name, title, prose, typed input) is set in Be Vietnam Pro.

**The 11px Floor Rule.** No text is set below 11px. Mono labels sit exactly on the floor; diagram text grows to 12.5px on phones.

## Layout

A fixed left sidebar (232px, narrowing to 200px under 1100px) with a hairline right border, and a main area whose column is centred in the remaining space with 24px gutters. Three column widths exist and nothing else: 620px for the CV, the blog index and certifications; 720px for blog posts; 1040px (`.col.wide`) for the shop, skill pages and contact. The column opens with 88px of top padding; numbered sections are separated by 104px; section heads sit 26px above their content. Grids inside the column are hairline tables rather than gapped tiles: badge and stat rows are three columns divided by vertical rules, list and post rows are separated by horizontal rules, case facts are a two-column ruled grid.

Sections are numbered by a CSS counter on the sections wrapper, so hiding a section (certifications while empty) renumbers the rest automatically. Heads outside a counted run (skill-page sections, "more in", "skills in this project", contact columns) use the plain, unnumbered variant. The hero is a two-column grid (236px avatar, text) with a 36px gap. Row grammar: CV rows use a 92px date column, title and right-aligned organisation; the skill page's project rows use a 150px date-range column.

**Shop.** Below the page head (36px), a two-column grid: a 190px category list, sticky at 28px, and the catalogue, 32px apart. The catalogue opens with the count line and sort select, then the product grid (columns of at least 230px, 18px gap).

**Skill page.** A two-column product block (cover 1.15fr, buy box .85fr, 40px gap, top-aligned; the buy box is not sticky), then "what i built with it" 104px below, then "more in <category>" 96px below as a three-column product grid.

**Blog.** The index is a ruled list of post rows with 150px thumbnails, 36px below the page head, and a closing note. A post opens with crumb, head and actions, a cover 28px below, ruled case facts, a sticky page-tab bar 56px below, the numbered sections, the skill chips 72px below, and newer/older cards 64px below.

**Contact.** Two equal columns 48px apart, 40px below the page head: "say hello" (mailbox and ruled facts) and "checkout" (shortlist rows and the form).

**Responsive.** At 1040px and below the product block stacks (cover first, 28px gap). At 900px and below the sidebar becomes a drawer (min(300px, 86vw)) behind a 56px sticky top bar with the name, a shortlist icon button and a menu button; column padding drops to 40px/16px; the hero stacks with the avatar at min(260px, 70%); sections separate by 72px; the page-tab bar sticks at 56px and anchors scroll with 112px of padding; the shop goes to one column, the categories heading hides and the categories become one horizontally scrolling row of pills; contact stacks with a 36px gap; the "more in" grid fills columns of at least 230px. At 600px and below every multi-column grid collapses to one column (badge row, CV rows, project rows, certifications, case facts, split, shots, post rows, post nav), except the stat row, which keeps three columns, and the shop grid, which becomes two compact columns (10px gap, 10px card padding, pitch hidden, the foot stacked with the shortlist toggle and a stretched View button); the category row bleeds to the screen edges; the architecture strip drops to two columns; post meta reads "date · read time" on one line; the footer stacks.

**The Three Columns Rule.** The CV, blog index and certifications never widen beyond 620px; posts stop at 720px; the shop, skill pages and contact stop at 1040px. Wide things (the GitHub chart) scroll inside their panel instead of breaking the column.

## Elevation & Depth

Flat by default. Surfaces separate by tone (paper, surface, sunk) and by hairline borders, never by shadow. The one exception at rest is the fanned skill deck on the home page, whose cards carry a soft two-layer shadow so the fan reads as physical paper. Product cards are flat at rest and borrow the same shadow only on hover, with a 2px lift, as a pressable response. Overlays are not elevation: the mobile menu uses a full-viewport scrim drawn as a spread shadow, and the shortlist drawer sits over a moss scrim with a soft shadow on its left edge.

### Shadow Vocabulary
- **Card shadow** (`box-shadow: 0 1px 2px rgba(31, 41, 30, .06), 0 18px 40px -22px rgba(31, 41, 30, .35)`; dark: `0 1px 2px rgba(0, 0, 0, .3), 0 18px 40px -22px rgba(0, 0, 0, .8)`): fanned skill cards at rest; product cards on hover only (with `translateY(-2px)`, .2s).
- **Menu scrim** (`box-shadow: 0 0 0 100vmax rgba(10, 20, 14, .35)`): open mobile sidebar only.
- **Shortlist scrim** (`background: rgba(10, 20, 14, .38)`) and **drawer edge** (`box-shadow: -20px 0 50px -30px rgba(0, 0, 0, .5)`): open shortlist drawer only.

### Named Rules
**The One Lifted Object Rule.** At rest, only the fanned skill cards cast a shadow. Product cards may lift on hover with the same card shadow; every other card, panel and field is flat with a hairline border in every state. Overlays (scrims and the drawer edge) exist only while open.

**The Halftone Ornament Rule.** The only decoration is the moss halftone dot field: an 11px grid of 1.2px dots in the top-right corner of every page, masked to fade out at its edges, its 9px cousin inside the avatar frame with a 4px multiply screen over the photo, and the skill covers, where a 12px grid of 1.6px paper dots at .22 opacity sits on an ink field, masked to fade out from the top-right corner. No other textures, gradients, glows or illustrations; the radial gradient inside a cover exists only as the dots' fade mask, never as visible color.

## Shapes

Small, consistent radii on a thin-border world: 4px for inline code, 6px for chips, 7px for buttons, the sort select and small mono tiles, 8px for controls (icon buttons, category buttons on desktop, checkout fields, post thumbnails, screenshots, diagram nodes), 9px for the mailbox and the toast, 10px for cards, panels, post-nav cards and the avatar frame, 12px for skill cards, product cards, the product-page cover frame, post covers, figures and the empty state. Pills (999px) are reserved for tags and corner badges, the shortlist count, the category row on narrow screens and the theme switch. Product media, the product-page cover, post thumbnails and post covers share one 960:504 frame (the ratio of the real Trạm OTA banner; skill covers are drawn at 480×252 to match). Borders are 1px everywhere, dashed only on the "more" chip and the empty state; the only heavier stroke is the 1.5px ink border marking a key node in the architecture strip. Icons are 16px line icons (1.6 stroke, round caps) drawn from one inline SVG sprite, sized down to 11-14px in mono contexts.

## Components

### Buttons
Mono, compact, and never wrapping.
- **Shape:** gently squared (7px), 34px minimum height, padding 0 .85rem, `white-space: nowrap`, optional 13px leading or trailing icon.
- **Ink:** ink ground, paper text, ink border. Hover turns it accent-fill with on-accent text. The primary action on a card ("View"), the add-to-shortlist action on a post, the copy button.
- **Ink large:** the ink button at full row width, 42px tall, 13px, centred. One per surface: "Add to shortlist" in a skill's buy box, "Checkout: contact me" in the drawer, "Send by email" on the checkout form.
- **Line:** transparent ground, ink text, line-2 border; hover darkens the border to ink. Secondary actions: "Read the story", repo links, "Clear", add-to-shortlist on fanned cards.
- **Icon button:** 34px square, 8px radius, line-2 border, transparent ground, 16px ink icon; hover darkens the border to ink. Shortlist opener in the top bar, drawer close, shortlist row remove, and the compact shortlist toggle on product cards.
- **Transitions:** color properties .15s, transform .2s.

### Shortlist toggle
Any button carrying `data-sl-add` adds or removes one item (skill or project). It shows a plus icon at rest and a check when added, `aria-pressed` reflects the state, a visible label reads "Add to shortlist" / "In your shortlist", and the accessible name says "Add X to shortlist" / "Remove X from shortlist". A pressed line button gains an ink border; the compact icon variant on product cards fills ink with a paper icon. Every toggle raises the toast. The list persists in localStorage only and syncs across open tabs.

### Shortlist count
An 18px pill of 11px mono 600: accent-fill with on-accent text when the shortlist holds anything, sunk with ink-3 text at zero. In the sidebar it sits at the right end of the Shortlist button; in the mobile top bar it rides the icon button's top-right corner (-7px).

### Shortlist drawer
A modal dialog on every page. A moss scrim covers the viewport; a paper panel of min(400px, 92vw) slides in from the right (.3s, `cubic-bezier(.16, 1, .3, 1)`, from 30px and transparent) with a hairline left edge and padding 22px 22px 20px. Inside, 14px apart: the Drawer Title with a close icon button, a Body Small note, the ruled list of items (each row an 11px uppercase kind label over the name as a 500 link, with a remove icon button), an empty note when the list is empty, and a hairline-topped foot pushed to the bottom with the large ink checkout button and a line "Clear". Focus moves to the close button on open, Tab is trapped inside, Escape or the scrim closes it, and focus returns to the opener.

### Toast
A 12px mono note in paper on an ink ground (9px radius, 9px 14px), fixed 24px above the bottom edge and centred. It rises 16px and fades in (.2s opacity, .3s swing), stays 1.8s, and is a polite live region ("Added React to your shortlist", "Removed React", "Shortlist cleared").

### Tags and badges
- **Tags:** pill, line-2 border, 11px uppercase mono at 0.04em in ink-2. Category facts on fanned skill cards; the badge under a skill page's title.
- **Corner badges:** the same tags laid over a cover's top-right corner (10px inset, right-aligned) on a paper ground so they read over the ink field.
- **Most used:** the same pill filled accent-fill with on-accent text, for skills used in three or more projects. The only orange badge.
- **Newest** (skills used only in Trạm OTA, the newest project) and **On CV** (listed on the CV, not yet used in a project here) stay plain.

**The True Badge Rule.** The shop grammar carries no prices, ratings, reviews, stock or sale marks. Badges state only true facts (Most used, Newest, On CV), and the price slot holds the number of projects that used the skill. Post facts (period, team size, stack, read time) live in the byline, not in badges.

### Chips
- **Style:** 6px radius, line-2 border, surface ground, 12px mono ink, padding 4px 10px.
- **Skill chips** on a post link to the shop; hover goes accent-ink with an accent border.
- **More chip:** dashed border, transparent ground, ink-3 text; hover goes accent-ink with an accent border.

### Cards / Containers
- **Corner Style:** 10px (cert, split, story, post-nav, GitHub panel), 12px (figure, post cover, empty state).
- **Background:** surface, with a 1px hairline border.
- **Shadow Strategy:** none (see The One Lifted Object Rule).
- **Internal Padding:** 16px standard; 18px for story cards and diagram post covers; certification cards centre their content at 20px 14px 16px.
- **Certification cards** are generated from `data/certifications.js`: a mono tile of the issuer's first two letters, the name, an uppercase issuer/year label, and an optional "verify" link. On the CV the section and its link stay hidden while the list is empty.
- **Empty state:** a dashed line-2 box (12px radius, 20px) with a mono tile holding a line icon beside an ink-2 sentence that opens in bold ink and links onward. Certifications shows it while the list is empty.
- **Split cards** pair two columns of responsibility with a mono "who" line; **story cards** are a 6.5rem term column of uppercase labels (Problem / What I did / Status) beside ink-2 answers.

### Category list and sort
- **Categories:** an uppercase "Categories" label over a column of full-width buttons (8px radius, line-2 border, 12px mono ink-2) with the name on the left and the ink-3 count on the right. Hover darkens border and text to ink; the pressed category (`aria-pressed`) fills ink with paper text and its count at .7 opacity. One at a time; "All" is the default. At 900px and below the list becomes one scrolling row of pills and its label hides.
- **Count line:** 11px uppercase mono ink-3 ("Showing 34 skills"), announced politely when it changes.
- **Sort select:** native select, 7px radius, line-2 border, surface ground, 12px mono ink, beside a mono ink-3 "Sort" label; Most used, Recently used or A–Z.

### Inputs / Fields
- **Checkout fields:** each a grid of an 11px uppercase mono ink-3 label above its field, 4px apart, 12px between fields. Fields are 8px radius, line-2 border, surface ground, 9px 11px padding, 14px sans ink, ink-3 placeholder. Focus draws a 2px accent outline at 1px offset and drops the border. The submit is the large ink button; a 12.5px ink-3 note under it states that nothing is sent from the page (the button opens a prepared email).
- **Mailbox:** 9px radius, line-2 border, surface ground, the address in 13px mono with ellipsis overflow, and an ink "copy" button on the right that reads "copied" for 1.6s.

### Navigation
- **Sidebar:** the name in 14px mono 500, then three hairline-separated groups of 13px mono links: the pages (Shop, Blog, Certifications, Contact) with 14px ink-3 line icons; the CV anchors (Experience, Education, Featured skills, GitHub); then the Shortlist button with its count and Download CV. Rest ink-2; hover ink with a 2px rightward nudge; current page accent-ink. The foot holds the theme switch, a one-line reach note and the email.
- **Theme switch:** a pill segmented control of three 28×24 icon buttons (system, light, dark) inside a hairline pill; the pressed segment is sunk with an ink icon. Choice persists in localStorage and applies instantly.
- **Mobile:** a 56px sticky top bar (paper at 92% with an 8px backdrop blur, hairline bottom) with the name on the left and, 10px apart on the right, the shortlist icon button with its count and a 38px menu button. The sidebar slides in from the left (.3s, `cubic-bezier(.16, 1, .3, 1)`) over a moss scrim; the menu icon swaps to a close icon, and Escape, outside click or any link closes it.
- **Crumb:** 12px mono ink-3 back link with a reversed arrow, hover accent-ink ("home", "shop", "blog").
- **Section "more" link:** 11.5px uppercase mono at 0.08em, arrow nudges 2px on hover. On checkout the same style carries the non-link item count.
- **Page tabs:** on posts, a sticky bar (top 0; 56px under the mobile top bar) on paper with a hairline bottom, holding 12px mono ink-2 lowercase anchor links to each section, 20px apart, scrolling sideways with no visible scrollbar; hover accent-ink.
- **Post nav:** newer/older surface cards (10px radius, 16px) in two columns, an 11px uppercase direction over the 500 title; the older card aligns right in the second column. Hover darkens the border to ink.

### Numbered Section Heads
Mono 13.5px ink-3 titles in lowercase, prefixed by `counter(sec, decimal-leading-zero) " — "`, with an optional "more" link right-aligned on the same baseline. CV and post sections are numbered; heads outside a counted run use the plain variant with no numeral.

### Hero, Badge and Stats Rows
- **Avatar frame:** 4:5, 10px radius, hairline border, sunk ground with a 9px halftone. A photo, when present, is graded to moss (grayscale, contrast 1.15, sepia .35, hue-rotate 55deg) with a 4px multiply halftone screen on top; without one, the dot frame stands alone.
- **Links row:** 12.5px mono ink-2 links with an 11px external-arrow icon, hover accent-ink.
- **Badge row:** three ruled cells, each an ink mono tile of initials (30px, 7px radius, 11px mono 600) beside a mono name and an uppercase label.
- **Stats row:** three ruled cells, stat-size figure with a muted denominator over an uppercase label. Keeps three columns on phones.

### Fanned Skill Deck (signature)
Three featured skill cards stacked at the centre of a 330px stage on the CV. Position comes from `data-pos`: 0 is flat and in front; -1 and 1 sit 58% left and right, rotated 9deg, scaled .9, at .78 opacity, pivoting from the bottom centre. Hovering a side card eases its rotation to 7deg and full opacity; clicking it swings it to the front (transform .5s `cubic-bezier(.16, 1, .3, 1)`, opacity and filter .4s). Side cards are aria-hidden with links out of the tab order. Each card: tags (badge and category), a 40px mono tile, the name with a mono project-count sub-line, a 13.5px description, and an ink "View" with a line shortlist toggle. Below 900px the deck becomes a plain vertical stack, the front card ordered first, and the hint line hides.

### Product Card
The catalogue unit, reused in "more in <category>". A surface card (12px radius, hairline border, clipped) with a 960:504 media frame on sunk ground, hairline below, carrying the skill cover and corner badge; the frame links to the skill page but is out of the tab order. Below, 16px padding: the Title-size name as the link (hover accent-ink), a Body Small pitch, and a foot pushed to the bottom with "N projects" in 12px mono 600 ink on the left and, on the right, the compact shortlist toggle beside an ink "View". No eyebrow or category line above the name. Hover lifts the card 2px with the card shadow.

### Skill Cover
The stand-in for product imagery: a 480×252 SVG with an ink field, the cover halftone fading from the top-right, and the skill name in paper sans 600 at -1.5px tracking, sized by length in three steps (64, 50 or 40px). Only the product-page cover adds the category below the name in 14px mono at .75 opacity. Token-bound, so it follows the theme.

### Skill Product Page
- **Cover frame:** one surface panel (12px radius, hairline) at 960:504 holding the cover. On phones the frame drops its fixed ratio and the cover keeps 960:504 inside it.
- **Buy box:** the Product Title, then the badge 12px below it, an ink-2 lead, the ruled facts (Category, Projects, First used, Last used), then the actions (the large ink "Add to shortlist" on its own line, a line "Read the story" below). Not sticky.
- **What i built with it:** CV-style rows with a 150px date-range column, the project title linking to its story, and a short detail indented to match. A skill with no project shows a single flush note instead.
- **More in <category>:** three product cards, with a "shop" more link.

### Blog
- **Post rows:** ruled rows of title (1rem, 500, link hover accent-ink), a Body Small summary, and right-aligned meta of two stacked 11.5px mono ink-3 spans (date, read time). The blog index adds a 150px 960:504 thumbnail (8px radius, hairline, surface; a diagram thumbnail gets 6px padding) and 20px row padding; the CV uses rows without thumbnails. On phones rows go to one column and the meta reads "date · read time".
- **Post head:** crumb, the Product Title, an ink-2 lead, the byline under the lead in 12px mono ink-3 ("period · team · stack · read time"), then actions (ink shortlist toggle, line repo link).
- **Post cover:** a 12px surface panel holding the real image at its natural ratio, or a padded (18px) diagram capped at 340px tall.
- **Post body:** ruled case facts, sticky page tabs, numbered sections whose content may use the lede, sub-heads, bulleted lists, figures, the architecture strip, split cards, story cards and screenshot slots.
- **Skills in this project:** chips linking to each skill's page in the shop.

### Post Content Grammar
- **Case facts:** two-column ruled `dl`, uppercase mono terms over 14px values. Also used for skill facts and contact facts.
- **Figure:** surface panel, 12px radius, holding an authored diagram or the architecture strip with an 11px mono caption.
- **Architecture strip:** four columns of uppercase labels over paper nodes (8px radius, line-2 border); the key node gets a 1.5px ink border.
- **Shot slots:** a two-column grid of 16:10 screenshots (8px radius, hairline, top-anchored), with optional full-width spans; a slot removes itself when its file is missing.

### Diagram Grammar (`.dg`)
Authored inline SVGs share one vocabulary: 11px mono ink-3 text, 600 sans for emphasis, paper cards with line-2 stroke, 1.3px round ink-3 connector lines, ink, ok and bad fills with paper or on-status text, sunk tracks, and the accent-fill progress bar. Everything is token-bound, so diagrams follow the theme. They appear as figures, post covers and blog thumbnails.

### GitHub Chart
The contribution image sits in a surface panel, multiply-blended in light; in dark it is inverted, hue-rotated 180deg and dimmed to .9 so it reads on moss-black. It scrolls horizontally rather than shrinking below 540px.

### Footer
A hairline-topped row in 11.5px mono ink-3, with the name set in 600 sans as a signature; stacks on phones.

## Do's and Don'ts

### Do:
- **Do** set every number, date, label, nav item, chip, tag, count and button in JetBrains Mono, and every name, title, sentence and typed input in Be Vietnam Pro.
- **Do** separate content with 1px hairlines (line) and tonal steps (paper, surface, sunk) instead of shadows.
- **Do** use accent-ink for orange text, accent-fill behind on-accent text, and accent for focus outlines.
- **Do** number CV and post sections through the CSS counter, never by hand-typed numerals; use the plain head outside a counted run.
- **Do** give every new color a dark-theme pair and test both themes.
- **Do** keep buttons `nowrap` and at least 34px tall.
- **Do** keep labels at or above 11px.
- **Do** honour reduced motion: transitions collapse to near zero and smooth scrolling turns off.
- **Do** give product media, product-page covers and post thumbnails the 960:504 frame, and draw skill covers at 480×252.
- **Do** keep shop badges to true facts and put the project count in the price slot.
- **Do** make every shortlist toggle report its state (`aria-pressed`, plus/check icon, label) and confirm with the toast.

### Don't:
- **Don't** use orange for headings, panels, resting buttons, icons or decoration; it marks interaction, the Most used badge, a non-empty shortlist count, focus, selection and progress only.
- **Don't** add shadows except the fanned skill cards at rest, product cards on hover, and the overlays while open.
- **Don't** add ornaments beyond the halftone dot field: no gradients, glows, blobs or illustrations.
- **Don't** widen the CV, blog index or certifications past 620px, posts past 720px, or the shop, skill pages and contact past 1040px.
- **Don't** show prices, ratings, reviews, stock counts or sale marks in the shop grammar, and don't send anything from the page; checkout hands off to email.
- **Don't** use status green or red outside authored diagrams.
- **Don't** use weights above 600.
