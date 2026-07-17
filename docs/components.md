# Component reference

Three foundational components ship today. Each is a typed React component built on the tokens, using `class-variance-authority` for variants and the `cn()` helper for class merging. All forward refs and spread native props.

## Button

The signature Aomi control — a fully-rounded pill, near-black "ink" primary by default.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary \| accent \| glass \| outline \| ghost \| connect \| danger` | `primary` | Visual style / action hierarchy |
| `size` | `sm \| md \| lg \| icon` | `md` | Control height and padding |
| `shape` | `pill \| rounded` | `pill` | Fully-round vs. soft-corner |
| `loading` | `boolean` | `false` | Shows a spinner, sets `aria-busy`, disables interaction |
| `disabled` | `boolean` | `false` | Non-interactive, reduced opacity |
| …native | `button` attributes | — | `onClick`, `type`, etc. |

### Variants

| Variant | Use when |
|---------|----------|
| `primary` | The main action on a surface (near-black ink fill, flat) |
| `accent` | A secondary but still prominent action (sky accent fill, on-brand text) |
| `glass` | Hero / landing surfaces — the translucent frosted treatment |
| `outline` | Lower-emphasis actions that still need an edge |
| `ghost` | Tertiary actions, toolbar buttons |
| `connect` | Wallet-connect affordance — dashed-border pill |
| `danger` | Destructive actions |

### States

Default, hover (color shift + lift on glass), active (`translate-y-px`), focus-visible (2px brand ring with offset), disabled (50% opacity, no pointer events), and loading (spinner).

### Accessibility

Native `<button>` semantics. Focus ring is keyboard-only (`focus-visible`). Loading sets `aria-busy`. For icon-only buttons (`size="icon"`), pass an `aria-label`.

```tsx
<Button variant="glass" size="lg">I'm a human</Button>
<Button variant="primary" loading>Signing…</Button>
<Button size="icon" aria-label="Refresh"><RefreshIcon /></Button>
```

## Input

A pill text field that matches the Button line.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `sm \| md \| lg` | `md` | Height and padding |
| `shape` | `pill \| rounded` | `pill` | Fully-round vs. soft-corner |
| `invalid` | `boolean` | `false` | Danger border + sets `aria-invalid` |
| …native | `input` attributes | — | `value`, `placeholder`, `onChange`, etc. |

### Accessibility

Sets `aria-invalid` when `invalid`. Pair with a `<label htmlFor>` and, for errors, an `aria-describedby` pointing at the message.

```tsx
<Input placeholder="Ask Aomi anything…" />
<Input invalid aria-describedby="amt-err" />
```

## Card

A container surface plus composable sub-parts. Flat by default — depth comes from fill and radius, not shadow.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `solid \| glass \| outline \| flat \| tinted \| tinted-pink` | `solid` | Surface treatment (`flat` = cool/white hairline, `tinted` = sky fill, `tinted-pink` = decorative pink-100 fill for marketing tiles) |
| `padding` | `none \| sm \| md \| lg` | `md` | Inner padding |
| `radius` | `lg \| xl \| 2xl` | `xl` | Corner radius (`2xl` = 32px landing cards) |

### Sub-components

`CardHeader`, `CardTitle` (PT Serif), `CardDescription`, `CardContent`, `CardFooter` — all optional, compose as needed.

```tsx
<Card variant="glass">
  <CardHeader>
    <CardTitle>Rebalance my portfolio</CardTitle>
    <CardDescription>One prompt away from action.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="primary">Authorize</Button>
  </CardFooter>
</Card>
```

## Roadmap

Natural next additions to keep the system coherent with the Aomi product: `Badge`/`Tag`, `Avatar`, `Dialog`/`Modal`, `Toast`, and a dedicated `Chat` family (message bubble, composer, streaming indicator) built on the monochrome chat tokens.
