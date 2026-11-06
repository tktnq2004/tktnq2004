// Local test server: runs the Worker's code with the state kept in memory and
// shows a page laid out like the GitHub profile.
//   node profile/worker/dev.mjs     then open http://localhost:8787/preview

import { createServer } from 'node:http';
import { handle } from './src/app.js';
import { apply, current, browserMarkup } from './src/render.js';

const PORT = Number(process.env.PORT || 8787);
const BASE = `http://localhost:${PORT}`;

let state;
const store = {
  read: async () => current(state, Date.now()),
  act: async (a) => (state = apply(state, a, Date.now())),
};

// Close enough to github-markdown-css for checking layout and gaps.
const preview = () => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<style>
:root{--bg:#fff;--fg:#1f2328}@media (prefers-color-scheme:dark){:root{--bg:#0d1117;--fg:#f0f6fc}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 -apple-system,'Segoe UI',sans-serif}
.markdown-body{max-width:830px;margin:24px auto;padding:0 16px}
.markdown-body p{margin:0 0 16px}
.markdown-body img{max-width:100%;box-sizing:content-box;background-color:var(--bg);border-style:none}
</style></head><body><article class="markdown-body">
<p>
${browserMarkup(BASE)}
</p></article></body></html>`;

createServer(async (req, res) => {
  const url = new URL(req.url, BASE);
  if (url.pathname === '/preview') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(preview());
  }
  if (url.pathname === '/state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(await store.read()));
  }
  const r = await handle(new Request(url), store, { PROFILE_URL: `${BASE}/preview` });
  res.writeHead(r.status, Object.fromEntries(r.headers));
  res.end(Buffer.from(await r.arrayBuffer()));
}).listen(PORT, () => console.log(`${BASE}/preview`));
