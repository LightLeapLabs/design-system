# DS-GN Design System packages

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo-full-dark.svg">
  <img src="assets/logo-full.svg" alt="DS-GN" width="240">
</picture>

[![Examples](https://github.com/LightLeapLabs/design-system/actions/workflows/examples.yml/badge.svg)](https://github.com/LightLeapLabs/design-system/actions/workflows/examples.yml)
[![UI on npm](https://img.shields.io/npm/v/@ds-gn/ui?label=%40ds-gn%2Fui)](https://www.npmjs.com/package/@ds-gn/ui)
[![Tokens on npm](https://img.shields.io/npm/v/@ds-gn/tokens?label=%40ds-gn%2Ftokens)](https://www.npmjs.com/package/@ds-gn/tokens)

> [!NOTE]
> The `@ds-gn/ui` and `@ds-gn/tokens` packages ship built output only; their source code is not public. This public repository is the issue tracker and home for runnable integration examples—it does not contain the package source.

DS-GN provides framework-agnostic web components, generated React wrappers,
and the design tokens that style them. See the
[documentation](https://docs.ds-gn.com/) for the complete component API.
Visit [ds-gn.com](https://ds-gn.com/) for the product overview.

## Migrating from LightLeap

Existing LightLeap consumers should follow the
[migration guide](https://docs.ds-gn.com/getting-started/migrate-from-lightleap/).
Update package imports and branded APIs together: `lll-*` elements and custom
events become `dsgn-*`, `onLll*` React handlers become `onDsgn*`, and branded
`--lll-*` CSS variables become `--dsgn-*`. Native DOM events and generic public
token names keep their names. DS-GN does not register legacy aliases.

## Install

```bash
bun add @ds-gn/ui @ds-gn/tokens lit
```

Import the token styles once, then import only the components you use:

```css
@import "@ds-gn/tokens/public";
@import "@ds-gn/tokens/theme";
@import "@ds-gn/tokens/properties";
```

```js
import "@ds-gn/ui/button";
```

```html
<dsgn-button appearance="outline">Get started</dsgn-button>
```

React consumers can use the generated wrappers:

```tsx
import { Button } from "@ds-gn/ui/react";

export function Cta() {
  return <Button appearance="outline">Get started</Button>;
}
```

## Override the theme

The tokens package ships a template containing every supported application
override. Copy it into your project, then uncomment only the values you want to
change:

```bash
cp node_modules/@ds-gn/tokens/dist/tokens.overrides.template.css \
  ./src/brand-overrides.css
```

`brand-overrides.css` is the recommended consumer filename, not a generated
package artifact. You can choose another project-local name.

Load the override file after the public tokens and theme so its declarations win
the cascade:

```css
@import "@ds-gn/tokens/public";
@import "@ds-gn/tokens/theme";
@import "@ds-gn/tokens/properties";
@import "./brand-overrides.css";
```

Define both light and dark variants when a token supports surfaces:

```css
:root {
  --brand-on-light: oklch(55% 0.22 290);
  --brand-on-dark: oklch(75% 0.16 290);
  --radius-button: 0.4rem;
}
```

Radius tokens such as `--radius-button` have a single value for both surfaces;
use the exact names listed in the published override template.

See [`vanilla-theming`](examples/vanilla-theming) for a runnable example. The
public custom properties inherit into DS-GN component shadow roots; do not
edit the package's generated `tokens.public.css` file.

## Examples

The examples intentionally install released packages from the public npm
registry. They never link to a DS-GN source workspace.

| Example                                       | What it demonstrates                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| [`vanilla-theming`](examples/vanilla-theming) | Custom elements and application-level token overrides |
| [`react`](examples/react)                     | Generated React wrappers in a client application      |
| [`nextjs`](examples/nextjs)                   | App Router SSR and an explicit client boundary         |
| [`astro-ssr`](examples/astro-ssr)             | Node SSR, inert server markup, and client hydration   |

Run all examples with Bun:

```bash
bun install --frozen-lockfile
bun run check:published
bun run build
```

Each release dependency is pinned in the example manifest. CI installs from the
public npm registry using the committed lockfile, verifies the installed package
versions, and builds every example on pushes to main, pull requests, and manual
runs. Scheduled testing against npm `latest` and automated updates to these pins
are tracked separately in LL-144.

## Contributing and support

Contributions to the integration examples and public documentation are welcome.
Install dependencies from the repository root and run the checks above before
opening a pull request. Keep examples on published npm packages; do not substitute
workspace, file, or linked copies of the UI or tokens packages.
Component source and package-development work live outside this repository.

For installation, theming, and API guidance, start with the
[DS-GN documentation](https://docs.ds-gn.com/). Report reproducible package
problems and feature requests through this repository's issue templates.
LightLeap Labs LLC remains the legal company behind DS-GN.

## Issues and security

Search [existing issues](https://github.com/lightleaplabs/design-system/issues)
before opening a report. Bug reports must include a minimal reproduction; the
bug template explains the required details.

Do not report vulnerabilities in a public issue. Follow the private disclosure
process in [SECURITY.md](SECURITY.md).

## License

The files in this repository are available under the [MIT License](LICENSE).
The installed packages include their own license and third-party notices.
