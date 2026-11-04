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
