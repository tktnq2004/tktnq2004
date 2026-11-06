// Request handling, shared by the Worker (src/index.js) and the local test
// server (dev.mjs). `store` keeps the browser state:
//   store.read()        -> state
//   store.act(action)   -> new state

import { PROFILE, renderTile, renderPage } from './render.js';

// GitHub fetches README images through its own proxy (camo). These headers keep
// the proxy and the viewer's browser from reusing an old picture.
const NO_CACHE = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

const svg = (body) => new Response(body, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', ...NO_CACHE } });

export async function handle(request, store, env = {}) {
  const url = new URL(request.url);
  const path = url.pathname;
  const back = env.PROFILE_URL || PROFILE;

  // Clicks: change the state, then send the visitor straight back to the profile.
  const action =
    path === '/open' ? { type: 'open', tab: url.searchParams.get('tab') }
    : path === '/focus' ? { type: 'focus', slot: Number(url.searchParams.get('slot')) }
    : path === '/close' ? { type: 'close', slot: Number(url.searchParams.get('slot')) }
    : null;
  if (action) {
    await store.act(action);
    return new Response(null, { status: 302, headers: { Location: back, ...NO_CACHE } });
  }

  const now = Date.now();
  const tile = path.match(/^\/(top|head)\/(\w+)\.svg$/);
  if (tile) {
    const body = renderTile(tile[1], tile[2], await store.read(), now);
    if (body) return svg(body);
  }
  if (path === '/page.svg') return svg(renderPage(await store.read()));

  if (path === '/') return new Response(`Images and links for ${back}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  return new Response('Not found\n', { status: 404 });
}
