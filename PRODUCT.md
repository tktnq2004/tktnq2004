# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, single page, no build step. Deployable as-is to GitHub Pages or Vercel.

## Users

**Primary: technical recruiters and engineering leads screening intern/fresher candidates** in Vietnam (Ho Chi Minh City), often foreign-owned or English-speaking teams. They arrive from a CV link or job application, skim for under a minute, and decide whether to read the CV, open a repo, or reach out.

Secondary: the interviewer who opens the page again before or during an interview to pick talking points.

## Product Purpose

Personal portfolio of Trần Khương Trung Nhật Quang, a Software Engineering graduate (HUTECH, 2022–2026, GPA 3.6/4) applying for **intern / fresher full-stack web developer** roles. Success = the visitor quickly sees real, shipped-feeling work with concrete technical depth, and contacts him or downloads the CV.

## Positioning

Not "I know React": a fresher who has built the same domain (hotel booking) three times across three stacks, each time going deeper — ASP.NET MVC → MERN → Next.js + Spring Boot with Docker, real payment gateways, 360° room tours and guest booking with OTP. Plus a real internship shipping a business system.

## Operating Context

- Linked from CV PDF and job applications; read on desktop mostly, sometimes on phone.
- English only.

## Capabilities and Constraints

- Pages: `index.html`, `shop.html`, `shop-tram-ota.html`, `blog.html`, `certifications.html`, `contact.html`.
- Dates follow the CV: Hotel Booking (Mar 2025 – Apr 2026) started before Mini OTA (Apr – Jun 2025), so never call them first/second build by date; Mini OTA is "the first version I finished".
- Guest booking with OTP: frontend done in wen-go, backend not finished. Never present it as fully shipped end to end.
- Known engineering stories (true, usable in case studies): 360° tour link rules enforced on server and UI, panorama delete returns 409 with blockers or cascades only those hotspots, R2 files deleted after commit in one batch; old guest flow exposed bookings by sequential id + email in URL (IDOR), redesigned to OTP → GUEST account with JWT and ownership checks (frontend done, backend pending); one login routes to /admin or /partner by the account's hotel; SePay amount was multiplied by nights twice, fixed by using the stored booking amount.
- **Trạm OTA is a team project (2 people).** Quang built most of the Next.js frontend (60 of 72 commits) and contributed backend features to the Spring Boot API (27 of 101 commits: SePay payment, partner module, room types per hotel, panorama/tour upload to Cloudflare R2, OTP login, admin vs owner/staff permissions, 400-hotel seed, guest booking API). Never claim sole authorship of the backend.
- Repo links: profile github.com/tktnq2004, Trạm OTA frontend repo unknown (TODO), backend fork github.com/tktnq2004/Mini-OTA-Upgrade. Other project links TODO until the user supplies them.
- No live demo URL yet.

## Brand Commitments

- Name shown: Trần Khương Trung Nhật Quang (full Vietnamese diacritics). Title: Full-stack Developer.
- Contact (user approved public): tktnq2004@gmail.com, phone 0947 535 906, GitHub, downloadable CV PDF.
- Standing preference (2026-10-29, replaces both the leerob.com text page and the cobalt product-showcase version): follow the structure of bryllim.com (fixed left sidebar, halftone portrait beside name and bio, badge and stats rows, numbered lower-case sections like "01 — projects" with "ALL … →" links, fanned project cards, experience rows, stack chips, certification cards, GitHub contribution graph, light/dark switch), adapted for an intern/fresher. Drop shop, blog, gear, resources, collabs, consulting, recommendations, affiliations, community, hackathons. Must not copy it 100%: own palette (moss green ink on warm paper, burnt-orange accent) and own type. Avatar is left empty for the user to add later (`assets/avatar.jpg`).
- Site map (user, 2026-10-30, replaces the 2026-10-29 version): bryllim structure + e-commerce metaphor. Home = CV with store-named sections in this order: blog (tech stack), partners (the TIHA internship), shop (projects), about the maker (education), certifications, activity (GitHub). **Shop = projects**: only Trạm OTA is on sale (`shop-tram-ota.html`); the other two slots say "Coming soon" and name nothing. Hotel Booking and Mini OTA have no pages for now (they still appear as text in the stack posts, since the CV lists them). **Blog = tech stack** on one page (2026-10-30, second revision): one line per area, "Backend: Spring Boot, …", "Frontend: Next.js, …", no sub-pages and no descriptions. The Trạm OTA product page is a single column with no cover/gallery and no tab bar. No Trạm OTA logo or banner anywhere. No shortlist/cart. Certifications page (hidden content until `data/certifications.js` has entries). Contact = direct details plus a form that opens a pre-filled email. No Resources page: the lesson notes in D:\docs were written by Claude and include unfixed security details, so they must not be published as his work. No prices, ratings or reviews.

## Evidence on Hand

- CV: `assets/Tran-Khuong-Trung-Nhat-Quang-CV.pdf` (copied from `D:\Full-stack Developer.pdf`).
- Trạm OTA: 166 TSX files, Vitest tests, Docker Compose (web + api + MySQL + Redis); OG image `D:\wen-go\src\app\opengraph-image.png`; sample room photos in `D:\wen-go\public\hotel`.
- Facts per CV: TIHA internship (Apr–Jun 2026, lottery agency management system: 8 management modules, 6 workflows, 7 reports, React + Express + SQL Server, Vercel + Render); Mini OTA v1 (ASP.NET MVC, 16-table DB, 100+ hotels, MapLibre, Pannellum, VNPay, auto-cancel after 20 min); Hotel Booking Management (MERN, 27 endpoints, 5 models, JWT access/refresh with rotation queue, 11 pages, 6 Jest/Supertest tests).
- No testimonials, no awards, no live user numbers. Do not invent any.

## Product Principles

1. Concrete over adjectives: numbers, mechanisms, and trade-offs, never "passionate team player".
2. Honest scope: say exactly what he built in team work.
3. Fast to scan: the decision-relevant facts are visible without scrolling far.
4. The page itself is evidence of care: fast, accessible, responsive, no broken links.
