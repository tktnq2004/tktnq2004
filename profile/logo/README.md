# Wengg logo

A cat peeking over the edge of a screen, paws on the edge: curious, playful, at home behind a monitor.

| File | Use |
|---|---|
| `wengg-icon.svg` | Default: white cat on a sea-blue tile. Favicons, avatars, the profile tab and header. |
| `wengg-sea.svg` | The mark alone in sea blue, on white or light backgrounds. |
| `wengg-white.svg` | The mark alone in white, on dark or sea-blue backgrounds. |
| `wengg-black.svg` | One-colour master (print, stamps, embossing). |
| `wengg-small-black.svg` | Simplified drawing for 24 px and below (bigger eyes, tighter crop). `wengg-icon.svg` already uses it. |

## Colours

| Name | Hex | Use |
|---|---|---|
| Sea | `#3a9fdc` | The mark, the icon tile |
| White | `#ffffff` | The cat on the tile, the eyes |

## Rules

- Below 24 px, use the small drawing (`wengg-icon.svg` or `wengg-small-black.svg`), never the full one.
- Keep clear space around the mark equal to the height of one ear.
- The eyes are holes, not white paint: the mark works on any background colour.
- Do not stretch, rotate, outline, add shadows or recolour the cat on the tile.

The profile browser draws the icon in code (`mark()` in `profile/worker/src/render.js`). Change both together.
