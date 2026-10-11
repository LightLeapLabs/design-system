# Vanilla theming

This Vite app registers DS-GN custom elements directly and overrides the
public theme tokens in `src/brand-overrides.css`.

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

## Run the example

```bash
bun install
bun --cwd examples/vanilla-theming dev
```
