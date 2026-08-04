# Next.js App Router

This example keeps the page and root layout as Server Components while placing
the generated LightLeap React wrappers behind an explicit Client Component
boundary. Next.js still renders the client component to HTML on the server,
then hydrates it in the browser so its event handlers become interactive.

The root layout loads the public token styles once and imports
`brand-overrides.css` after them so application-owned overrides win the
cascade.

## Run the example

```bash
bun install
bun --cwd examples/nextjs dev
```

Create a production build with:

```bash
bun --cwd examples/nextjs build
bun --cwd examples/nextjs start
```
