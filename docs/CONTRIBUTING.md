# Contributing

## Principles

1. **Consistency over creativity.** The system exists so product teams don't reinvent controls. Reach for existing tokens and variants before adding new ones.
2. **Tokens first.** Never hardcode a hex, px radius, or font stack in a component — add or reference a token. If a value isn't in the system yet, add it to `tokens.css` (and `tokens.ts`) first.
3. **Document everything.** A component or token that isn't in `docs/` doesn't exist. Update the reference in the same PR.
4. **Version and migrate.** Breaking changes to a token name or component API need a changeset note and a migration path.

## Adding a token

1. Add the CSS custom property to `src/tokens/tokens.css` (both light `:root` and the `.dark` block if it's a semantic role).
2. Mirror it in `src/tokens/tokens.ts` if product code needs the raw value in JS.
3. Expose it through the Tailwind preset in `src/tailwind/preset.ts` if it should be a utility.
4. Document it in `docs/tokens.md`.

## Adding a component

1. Create `src/components/<name>.tsx`. Use `cva` for variants and `cn()` for class merging; forward the ref and spread native props.
2. Style with semantic role tokens (`var(--aomi-*)`) or Tailwind classes from the preset — no raw values.
3. Cover the standard states: default, hover, active, focus-visible, disabled, and (where relevant) loading / invalid.
4. Export it from `src/components/index.ts`.
5. Document props, variants, states, and accessibility in `docs/components.md`.

## Checks

```bash
pnpm typecheck
pnpm build
```

Both must pass before opening a PR.

## Naming

- Tokens: `--aomi-<category>-<name>` (e.g. `--aomi-primary-hover`).
- Tailwind roles: semantic names (`bg-primary`, `text-ink-muted`), not ramp steps, in product code.
- Components: PascalCase files map to PascalCase exports.
