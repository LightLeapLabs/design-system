# Astro Node SSR

This Astro app imports the generated React wrapper during Node server rendering.
The server emits an inert `<dsgn-button>` tag; `client:load` upgrades and hydrates
it in the browser. Declarative Shadow DOM is not emitted, so a brief unstyled
frame is possible before the custom element upgrades.

```bash
bun install
bun --cwd examples/astro-ssr build
bun --cwd examples/astro-ssr start
```

Cloudflare `workerd` is a different constraint: load DS-GN wrappers behind a
client-only boundary there because the custom element cannot currently be
evaluated in the worker runtime.
