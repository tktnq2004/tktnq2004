// Cloudflare Worker for the GitHub profile README.
// Deploy from this folder:  npx wrangler@4 deploy
//
// One Durable Object holds the state, so every image and every click sees the
// same tabs no matter which Cloudflare location serves the request.

import { DurableObject } from 'cloudflare:workers';
import { handle } from './app.js';
import { apply, current } from './render.js';

export class ProfileState extends DurableObject {
  async read() {
    return current(await this.ctx.storage.get('state'), Date.now());
  }

  async act(action) {
    const next = apply(await this.ctx.storage.get('state'), action, Date.now());
    await this.ctx.storage.put('state', next);
    return next;
  }
}

export default {
  async fetch(request, env) {
    const stub = env.STATE.get(env.STATE.idFromName('profile'));
    return handle(request, { read: () => stub.read(), act: (a) => stub.act(a) }, env);
  },
};
