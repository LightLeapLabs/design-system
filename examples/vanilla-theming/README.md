# Vanilla theming

This Vite app registers LightLeap custom elements directly and overrides the
public theme tokens in `src/brand-overrides.css`.

## Start from the supported override template

After installing dependencies from the repository root, copy the complete
template shipped by `@lightleaplabs/tokens`:

```bash
cp node_modules/@lightleaplabs/tokens/dist/tokens.overrides.template.css \
  examples/vanilla-theming/src/brand-overrides.css
```

The template lists every supported override as a comment. Uncomment the light
and dark variants you need and replace their values. This example checks in a
shortened copy with brand, button, and radius overrides already enabled. The
destination filename is consumer-owned; `brand-overrides.css` is the recommended
convention rather than a file produced by the package.

`src/main.js` imports styles in this order:

1. `@lightleaplabs/tokens/public` defines the public custom properties.
2. `@lightleaplabs/tokens/theme` maps them onto the LightLeap theme.
3. `brand-overrides.css` replaces the application-level values.

Keep the override import after the two package styles. The custom properties
then inherit into component shadow roots without modifying package CSS.

## Run the example

```bash
bun install
bun --cwd examples/vanilla-theming dev
```
