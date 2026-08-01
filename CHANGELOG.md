# Changelog

Release notes are mirrored from the packages' Changesets-generated changelogs.

## @lightleaplabs/ui

## 0.3.1

### Patch Changes

- ea4c35a: Document and verify the fixed 24-component Public Beta surface and 0.x support contract.

## 0.3.0

### Minor Changes

- 1f234fb: Add `<lll-modal>`: an accessible dialog built on the native `<dialog>` element and
  `showModal()`, so the top layer, background inertness, and focus containment come
  from the platform rather than a hand-rolled focus trap. Supports a centered modal
  and sheets anchored to any viewport edge, with an animation origin that can be set
  independently of the placement, animated entry/exit and backdrop driven entirely by
  CSS (the exit waits on the animations' own `finished` promises, never a timer), and
  a fade-only fallback under `prefers-reduced-motion`.

  Every modal renders a close control in its header by default, so there is always a
  visible way out. It is the `close` slot's fallback content, so slotting your own
  control replaces it with no flag to unset; `no-close-control` drops it for flows
  that supply their own dismissal. Its accessible name comes from `close-label`,
  authored like any other copy — the `'Close'` default is a development fallback.

  Dismissal by Escape, backdrop click, or a control in the `close` slot routes through
  one cancelable `lll-modal-request-close` event, so a single listener can guard every
  path; `close()` bypasses it as the imperative "already decided" path. Focus moves to
  an `[autofocus]` target on open and returns to the invoking element on close, and the
  page behind the modal is pinned while it is open.

  `Base.emit()` gained an optional `{ cancelable }` argument to support that event.

### Patch Changes

- 1f234fb: Style `<lll-modal>`'s dialog with Tailwind utilities instead of a raw-CSS/utility
  hybrid, and move its keyframes into the shared animation tokens.

  The hybrid was justified by a comment claiming `::backdrop`, `@keyframes` and the
  `[data-state]`/`[data-motion]` selectors had no utility equivalent. That is not
  true in Tailwind v4: `backdrop:`, `data-[…]:`, `open:` and `motion-reduce:`
  variants cover all of it, and arbitrary properties cover the custom properties.
  The second reason — a raw `dialog {}` rule silently outranking utilities on the
  same element — only existed because of the hybrid, and disappears with it.

  `hostStyles` is now just `:host { display: contents }`, the one rule with no
  class form. Everything else is a static utility list; the dialog's own
  `data-*` attributes select which rules apply, so nothing is composed at runtime.

  The 12 modal keyframes move to `animations.css` as shared surface motion
  primitives (`scale-in`, `slide-in-left`, …) with `--animate-*` entries built from
  the duration and easing tokens. Because they are now consumed through `animate-*`
  utilities, Tailwind emits them only into the components that use them.

- 1f234fb: Add a motion token scale, and stop shipping unused keyframes to every component.

  `animations.json` introduces `duration.quick` (180ms), `duration.moderate` (240ms),
  and `ease.emphasized`, which flow through the same public/mirror/`@theme` pipeline
  as every other semantic token — so they are consumer-overridable and carry a
  baked-in default, rather than being hand-maintained CSS in `animations.css`.
  `<lll-modal>` now reads them instead of hardcoding its own durations and easing.

  The `@keyframes` in `animations.css` also move inside its `@theme` block.
  `animations.css` is appended to `theme.tailwind.css`, which is the input to every
  component's Tailwind build, so a top-level keyframe was copied verbatim into all
  ~25 component stylesheets whether or not the component animated. Nested in
  `@theme`, Tailwind emits each one only where its `animate-*` utility is used —
  `fade-in-a`/`fade-in-b` now ship only with `<lll-heading>`, and most components
  carry no keyframes at all.

- 1f234fb: Fix non-color design tokens never crossing a shadow boundary, and add a shared
  `--radius-surface` token for elevated surfaces.

  The `@theme` block generated for each component declared its suffixed non-color
  tokens as `--radius-card-on-light: var(--radius-card-on-light, 1rem)` — a custom
  property referencing itself. That is a cycle, so the declaration is invalid at
  computed-value time and the property resolves to nothing on the element it is
  declared on, which is `:host`. Inside a shadow root nothing else declared these
  tokens, so every `radius-*` and `shadow-*` token was empty there and the inline
  fallback could not rescue it (a fallback covers a missing var, not a poisoned
  declaration). Colors were unaffected because their alias name
  (`--color-text-primary-on-light`) differs from the token they reference
  (`--text-primary-on-light`), so no cycle formed.

  Non-color tokens now get an internal mirror in `tokens.public.css`
  (`--lll-src-<name>-on-*`), and their `@theme` entry reads that instead of itself.
  This is the second name colors already have — their `@theme` name (`--color-x`)
  differs from their override target (`--x`), which is why colors were never
  affected. Non-colors now follow the same pattern: a baked-in default that a
  consumer override replaces. A bare literal would have fixed the cycle but broken
  overrides, because a value specified on the host beats one inherited from `:root`
  whatever cascade layer either sits in — layers only order declarations competing
  on the same element.

  The same fix is applied to the token generators the CLI scaffolds into new
  projects (`packages/templates/adapters/language/{typescript,javascript}`), which
  carried their own copy of the bug — hence the `@lightleap/templates` bump, without
  which the fix would never reach a newly scaffolded project.

  In practice this means `<lll-modal>` renders its corner radius and shadow at all
  (both were silently dropped), and `<lll-nav>`'s `--radius-input-on-dark` resolves.

  Also adds `radius.surface` — one radius shared by elevated surfaces — and points
  `<lll-modal>` at it, so the modal no longer borrows the card's `--radius-card`.

- Updated dependencies [1f234fb]
- Updated dependencies [1f234fb]
- Updated dependencies [1f234fb]
  - @lightleaplabs/tokens@0.3.0

## 0.2.1

### Patch Changes

- 515c552: Fix two form-participation defects on `<lll-input>`: reflect `name` to the
  content attribute so a name set as a property (e.g. via the React wrapper) still
  contributes its value to `FormData`, and keep the `<fieldset>`-inherited disabled
  state in a private `_formDisabled` field instead of writing it back into the
  authored `disabled` property, so re-enabling a fieldset no longer sticks the input
  disabled.

## 0.2.0

### Minor Changes

- e4a7cda: `lll-button`: add `icon-name`, mirroring the registry-backed API `lll-icon` already exposes. The existing `icon` property takes a Lit template, so it can only be set from JS — an icon could not be expressed in markup, in CMS-authored content, or in the docs playground. `icon-name` resolves through the `<lll-icon>` the button already renders; `icon` still wins when both are set, and remains the tree-shakeable, registry-free path.
- e4a7cda: `lll-button`: add app/form surface area — `disabled`, `loading`, `size` (`sm`/`md`/`lg`), and form association so `type="submit"`/`type="reset"` reach an enclosing `<form>` with `name`/`value` participation. `size="md"` reproduces the previous metrics, so existing markup renders unchanged.

### Patch Changes

- e4a7cda: Fix built components dropping the sibling elements they render. A component that renders another (e.g. `<lll-button>` rendering `<lll-icon>` for its icon and loading spinner) imports it for its registration side effect, but the package's `sideEffects` field only lists `dist/**` — so the bundler treated the source files as side-effect-free and tree-shook every one of those imports away. Consumers got elements that never upgraded: an invisible icon inside a button, and `<lll-nav>` missing its container, icon, and nav links. Sibling components now stay as cross-file imports in `dist`, preserving registration without duplicating the dependency into every bundle.

## 0.1.0

### Minor Changes

- 5ad9c64: Add dropdown navigation to the nav components.
  - New `lll-nav-dropdown-column` element for grouping links inside a dropdown.
  - `lll-nav-link` gains `dropdown-columns`, `subheading`, `expanded`, and
    `submenu-label`: up to three slotted columns on desktop, collapsing to a
    stacked disclosure below `sm`. Hover-to-open is desktop-only; mobile uses the
    disclosure button. Fires `lll-nav-link-toggle`.
  - `lll-nav` gains a mobile menu with `menu-open-label` / `menu-close-label`, and
    groups the links and actions slots to the right of the logo.

## 0.0.2

### Patch Changes

- 00a23b2: Prevent source maps and source files from being included in the package tarballs, and replace the MIT metadata with the LightLeap free commercial-use license.
- Updated dependencies [00a23b2]
  - @lightleaplabs/tokens@0.0.2

## @lightleaplabs/tokens

## 0.3.0

### Minor Changes

- 1f234fb: Style `<lll-modal>`'s dialog with Tailwind utilities instead of a raw-CSS/utility
  hybrid, and move its keyframes into the shared animation tokens.

  The hybrid was justified by a comment claiming `::backdrop`, `@keyframes` and the
  `[data-state]`/`[data-motion]` selectors had no utility equivalent. That is not
  true in Tailwind v4: `backdrop:`, `data-[…]:`, `open:` and `motion-reduce:`
  variants cover all of it, and arbitrary properties cover the custom properties.
  The second reason — a raw `dialog {}` rule silently outranking utilities on the
  same element — only existed because of the hybrid, and disappears with it.

  `hostStyles` is now just `:host { display: contents }`, the one rule with no
  class form. Everything else is a static utility list; the dialog's own
  `data-*` attributes select which rules apply, so nothing is composed at runtime.

  The 12 modal keyframes move to `animations.css` as shared surface motion
  primitives (`scale-in`, `slide-in-left`, …) with `--animate-*` entries built from
  the duration and easing tokens. Because they are now consumed through `animate-*`
  utilities, Tailwind emits them only into the components that use them.

- 1f234fb: Add a motion token scale, and stop shipping unused keyframes to every component.

  `animations.json` introduces `duration.quick` (180ms), `duration.moderate` (240ms),
  and `ease.emphasized`, which flow through the same public/mirror/`@theme` pipeline
  as every other semantic token — so they are consumer-overridable and carry a
  baked-in default, rather than being hand-maintained CSS in `animations.css`.
  `<lll-modal>` now reads them instead of hardcoding its own durations and easing.

  The `@keyframes` in `animations.css` also move inside its `@theme` block.
  `animations.css` is appended to `theme.tailwind.css`, which is the input to every
  component's Tailwind build, so a top-level keyframe was copied verbatim into all
  ~25 component stylesheets whether or not the component animated. Nested in
  `@theme`, Tailwind emits each one only where its `animate-*` utility is used —
  `fade-in-a`/`fade-in-b` now ship only with `<lll-heading>`, and most components
  carry no keyframes at all.

- 1f234fb: Fix non-color design tokens never crossing a shadow boundary, and add a shared
  `--radius-surface` token for elevated surfaces.

  The `@theme` block generated for each component declared its suffixed non-color
  tokens as `--radius-card-on-light: var(--radius-card-on-light, 1rem)` — a custom
  property referencing itself. That is a cycle, so the declaration is invalid at
  computed-value time and the property resolves to nothing on the element it is
  declared on, which is `:host`. Inside a shadow root nothing else declared these
  tokens, so every `radius-*` and `shadow-*` token was empty there and the inline
  fallback could not rescue it (a fallback covers a missing var, not a poisoned
  declaration). Colors were unaffected because their alias name
  (`--color-text-primary-on-light`) differs from the token they reference
  (`--text-primary-on-light`), so no cycle formed.

  Non-color tokens now get an internal mirror in `tokens.public.css`
  (`--lll-src-<name>-on-*`), and their `@theme` entry reads that instead of itself.
  This is the second name colors already have — their `@theme` name (`--color-x`)
  differs from their override target (`--x`), which is why colors were never
  affected. Non-colors now follow the same pattern: a baked-in default that a
  consumer override replaces. A bare literal would have fixed the cycle but broken
  overrides, because a value specified on the host beats one inherited from `:root`
  whatever cascade layer either sits in — layers only order declarations competing
  on the same element.

  The same fix is applied to the token generators the CLI scaffolds into new
  projects (`packages/templates/adapters/language/{typescript,javascript}`), which
  carried their own copy of the bug — hence the `@lightleap/templates` bump, without
  which the fix would never reach a newly scaffolded project.

  In practice this means `<lll-modal>` renders its corner radius and shadow at all
  (both were silently dropped), and `<lll-nav>`'s `--radius-input-on-dark` resolves.

  Also adds `radius.surface` — one radius shared by elevated surfaces — and points
  `<lll-modal>` at it, so the modal no longer borrows the card's `--radius-card`.

## 0.0.2

### Patch Changes

- 00a23b2: Prevent source maps and source files from being included in the package tarballs, and replace the MIT metadata with the LightLeap free commercial-use license.
