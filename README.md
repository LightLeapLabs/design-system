# LightLeap Design System packages

The `@lightleaplabs/ui` and `@lightleaplabs/tokens` packages ship built output only; their source code is not public. This public repository is the issue tracker and home for runnable integration examples—it does not contain the package source.

LightLeap provides framework-agnostic web components, generated React wrappers,
and the design tokens that style them. See the
[documentation](https://www.lightleaplabs.com/) for the complete component API.

## Install

```bash
bun add @lightleaplabs/ui @lightleaplabs/tokens lit
```

Import the token styles once, then import only the components you use:

```css
@import "@lightleaplabs/tokens/public";
@import "@lightleaplabs/tokens/theme";
```

```js
import "@lightleaplabs/ui/button";
```

```html
<lll-button appearance="outline">Get started</lll-button>
```

React consumers can use the generated wrappers:

```tsx
import { Button } from "@lightleaplabs/ui/react";

export function Cta() {
  return <Button appearance="outline">Get started</Button>;
}
```

## Override the theme

The tokens package ships a template containing every supported application
override. Copy it into your project, then uncomment only the values you want to
change:

```bash
cp node_modules/@lightleaplabs/tokens/dist/tokens.overrides.template.css \
  ./src/brand-overrides.css
```

`brand-overrides.css` is the recommended consumer filename, not a generated
package artifact. You can choose another project-local name.

Load the override file after the public tokens and theme so its declarations win
the cascade:

```css
@import "@lightleaplabs/tokens/public";
@import "@lightleaplabs/tokens/theme";
@import "./brand-overrides.css";
```

Define both light and dark variants when a token supports surfaces:

```css
:root {
  --brand-on-light: oklch(55% 0.22 290);
  --brand-on-dark: oklch(75% 0.16 290);
  --radius-button-on-light: 0.4rem;
  --radius-button-on-dark: 0.4rem;
}
```

See [`vanilla-theming`](examples/vanilla-theming) for a runnable example. The
public custom properties inherit into LightLeap component shadow roots; do not
edit the package's generated `tokens.public.css` file.

## Examples

The examples intentionally install released packages from the public npm
registry. They never link to a LightLeap source workspace.

| Example                                       | What it demonstrates                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| [`vanilla-theming`](examples/vanilla-theming) | Custom elements and application-level token overrides |
| [`react`](examples/react)                     | Generated React wrappers in a client application      |
| [`nextjs`](examples/nextjs)                   | App Router SSR and an explicit client boundary         |
| [`astro-ssr`](examples/astro-ssr)             | Node SSR, inert server markup, and client hydration   |

Run all examples with Bun:

```bash
bun install
bun run build
```

Each release dependency is pinned in the example manifest. CI installs from the
public npm registry, verifies the installed package versions, and builds every
example.

## Issues and security

Search [existing issues](https://github.com/lightleaplabs/design-system/issues)
before opening a report. Bug reports must include a minimal reproduction; the
bug template explains the required details.

Do not report vulnerabilities in a public issue. Follow the private disclosure
process in [SECURITY.md](SECURITY.md).

## License

The files in this repository are available under the [MIT License](LICENSE).
The installed packages include their own license and third-party notices.
