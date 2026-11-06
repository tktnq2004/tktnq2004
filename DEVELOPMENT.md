# Portfolio · Trần Khương Trung Nhật Quang

Static site, no build step. The structure follows a personal index with a small-shop metaphor:

| Page | What it is |
|---|---|
| `index.html` | The CV: intro, blog (stack), partners (internship), shop (projects), about the maker (education), certifications, activity (GitHub), contact |
| `shop.html` + `shop-tram-ota.html` | Projects. Trạm OTA is the one on sale; two slots say "Coming soon" |
| `blog.html` | The tech stack, one line per area (backend, frontend, databases, languages, integrations, tools) |
| `certifications.html` | Certifications from `data/certifications.js` |
| `contact.html` | Contact details and a form that opens the visitor's email app (nothing is sent from the site) |

All pages share `styles.css` and `script.js`.

## Preview locally

```bash
python -m http.server 5500
# http://localhost:5500
```

## Things you can add later

| What | How |
|---|---|
| Portrait | Save it as `assets/avatar.jpg` (about 4:5). It replaces the dotted frame on the home page. |
| Certifications | Add entries to `data/certifications.js`. The home section appears and the page lists them. |
| Trạm OTA screenshots | Drop 1440×900 WebP files into `assets/shots/`: `hotels.webp`, `map.webp`, `checkout.webp`, `admin.webp`, `editor.webp`. Missing files hide their slot on the Trạm OTA page. |
| LinkedIn and repo links | Search the HTML for `TODO`. |

The pages were generated from one script, so the sidebar is repeated in every file. If you change the sidebar by hand, change it in all 6 pages.

To add a project to the shop later, copy `shop-tram-ota.html`, then replace one of the two "Coming soon" cards in `shop.html` and in the shop fan on `index.html`.

## Deploy

Push this folder to a GitHub repo and turn on GitHub Pages (branch `main`, root), or import it in Vercel as a static site. `.impeccable/` holds design working files and is in `.gitignore`.

## GitHub profile README

`README.md` is the GitHub profile. It shows a browser window with working tabs and a working menu (about, tech stack, contact). Three link buttons sit under it.

GitHub strips scripts from READMEs, so a small Cloudflare Worker does the work (`profile/worker/`):

- **Tiles.** The browser is cut into image tiles. Each tab and each menu item is its own tile, wrapped in a link to the Worker (`/open?tab=`, `/focus?slot=`, `/close?slot=`).
- **Clicks.** The Worker records the click in a Durable Object, then redirects back to the profile.
- **Images.** The profile reloads, and GitHub fetches every tile from the Worker again. The Worker sends no-cache headers and draws the tiles for the current tabs.
- **State is shared.** All visitors see the same tabs. After 2 minutes without clicks it falls back to a single About tab.

Content and drawing live in `profile/worker/src/render.js`. Do not edit `README.md` or `profile/assets/` by hand.

```bash
# test locally: open http://localhost:8787/preview
node profile/worker/dev.mjs

# deploy the Worker (needs a free Cloudflare account; the first run opens a login page)
cd profile/worker && npx wrangler@4 deploy

# regenerate README.md with the Worker address (saved for later runs)
node profile/build.mjs https://tktnq2004-profile.<subdomain>.workers.dev
```

After changing `render.js`, deploy the Worker again. Rerun `build.mjs` only when the tile layout or the buttons change.
