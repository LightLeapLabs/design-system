# Vanilla theming and motion

This Vite app registers DS-GN custom elements directly and overrides the
public theme tokens in `src/brand-overrides.css`. It also demonstrates the
published `@ds-gn/motion` package with a replayable entrance sequence.

## Start from the supported override template

After installing dependencies from the repository root, copy the complete
template shipped by `@ds-gn/tokens`:

```bash
cp examples/vanilla-theming/node_modules/@ds-gn/tokens/dist/tokens.overrides.template.css \
  examples/vanilla-theming/src/brand-overrides.css
```

The template lists every supported override as a comment. Uncomment the light
and dark variants you need and replace their values. This example checks in a
shortened copy with brand, button, and radius overrides already enabled. The
destination filename is consumer-owned; `brand-overrides.css` is the recommended
convention rather than a file produced by the package.

`src/main.js` imports styles in this order:

1. `@ds-gn/tokens/public` defines the public custom properties.
2. `@ds-gn/tokens/theme` maps them onto the DS-GN theme.
3. `@ds-gn/tokens/properties` registers typed custom properties.
4. `brand-overrides.css` replaces the application-level values.

Keep the override import after the three package styles. The custom properties
then inherit into component shadow roots without modifying package CSS.

Card uses named slots: the heading occupies `heading`, and the text and button
stack occupies `footer`. Unslotted children would not render. Components use a
light surface by default; set `surface="dark"` on the card and its slotted
components to use the dark token variants.

## Motion sequence

`src/main.js` imports `sequence` from `@ds-gn/motion` and animates the heading,
text, and button after the custom elements are registered. Each host has a
`data-motion-item` attribute so the example can animate slotted content without
reaching into component shadow roots. Click **Replay motion** to run it again.

```js
import { sequence } from "@ds-gn/motion";

const playback = sequence(document.querySelectorAll("[data-motion-item]"), {
  preset: "slideUp",
  duration: "moderate",
  easing: "emphasized",
  stagger: 80,
  reducedMotion: "jump",
});
```

The duration and easing names resolve to `--duration-moderate` and
`--ease-emphasized` from the loaded tokens. Override those properties in
`brand-overrides.css` to change the theme's motion. Motion itself has no token
package dependency and provides fallbacks when these properties are absent.

With `prefers-reduced-motion: reduce`, this example jumps to the final state
without movement or stagger. Content is visible in its base styles. The app
cancels the previous playback before replaying, cancels on `pagehide` and Vite
hot disposal, and replays when restored from the back/forward cache.

See the [motion API documentation](https://ds-gn.com/docs/motion/overview/).
For Lit components, `@ds-gn/motion/lit` provides a `MotionController` that manages
cleanup when the host disconnects. This vanilla example uses the framework-free
core directly.

## Run the example

```bash
bun install --frozen-lockfile
bun --cwd examples/vanilla-theming dev
```

Run a production build from the repository root:

```bash
bun run check:published
bun --cwd examples/vanilla-theming build
```

To check accessibility, enable reduced motion in your OS or browser emulation,
reload, and activate **Replay motion** with the keyboard. All content should
remain visible and the button should stay usable without spatial animation.
