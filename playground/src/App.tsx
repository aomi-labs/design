import { useEffect, useState } from "react";
import {
  Badge,
  Brandmark,
  Logo,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "../../src";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-normal tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Up-arrow glyph for the composer send button. */
function SendArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

/** Minimal lucide-style line icon — renders one or more path `d` strings. */
function Ic({ d, className = "size-4" }: { d: string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

// Icon paths (lucide): wallet, swap, layers, link — one per suggestion.
const SUGGESTION_ICONS = [
  ["M20 12V8H6a2 2 0 0 1 0-4h12v4", "M4 6v12a2 2 0 0 0 2 2h14v-4", "M18 12a2 2 0 0 0 0 4h4v-4Z"],
  ["M8 3 4 7l4 4", "M4 7h16", "M16 21l4-4-4-4", "M20 17H4"],
  ["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z", "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65", "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"],
  ["M9 17H7A5 5 0 0 1 7 7h2", "M15 7h2a5 5 0 1 1 0 10h-2", "M8 12h8"],
];
// Control-bar icons: network (ETH diamond), model (auto sparkle), app (grid).
const NET_ICON = ["M12 2 6 12l6 4 6-4Z", "M12 16v6"];
const AUTO_ICON = ["M12 3v18", "M3 12h18", "m6 6 12 12", "m18 6-12 12"];
const APP_ICON = ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"];
const CHEVRON = ["m6 9 6 6 6-6"];
// Theme toggle glyphs (lucide): moon (→ go dark), sun (→ go light).
const MOON_ICON = ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"];
const SUN_ICON = [
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  "M12 2v2",
  "M12 20v2",
  "M4.9 4.9l1.4 1.4",
  "M17.7 17.7l1.4 1.4",
  "M2 12h2",
  "M20 12h2",
  "M4.9 19.1l1.4-1.4",
  "M17.7 6.3l1.4-1.4",
];

/** Fixed top-right dark-mode switch — toggles `.dark` on <html>. */
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="fixed right-4 top-4 z-50 inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-sm transition-colors hover:bg-bg-subtle"
    >
      <Ic d={dark ? SUN_ICON : MOON_ICON} className="size-4" />
    </button>
  );
}

/** A borderless ghost control pill (network / model / app), as in the portal. */
function CtrlPill({ icon, label }: { icon: string[]; label: string }) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-ink-muted">
      <Ic d={icon} className="size-3 opacity-60" />
      <span className="truncate">{label}</span>
      <Ic d={CHEVRON} className="size-3 opacity-50" />
    </span>
  );
}

const SUGGESTIONS = [
  { title: "Show my wallet balances", sub: "and positions" },
  { title: "Swap 1 ETH to USDC", sub: "with the best price" },
  { title: "Stake half of my ETH", sub: "in the highest yield pool" },
  { title: "Bridge 100 USDC", sub: "from Ethereum to Arbitrum" },
];

const APPS = [
  {
    name: "Across",
    tag: "Cross-chain",
    desc: "Cross-chain bridging and swap routing across ecosystems.",
  },
  {
    name: "CoW Protocol",
    tag: "DEX",
    desc: "MEV-aware swaps routed through batch auctions.",
  },
  {
    name: "DefiLlama",
    tag: "Analytics",
    desc: "Protocol analytics for TVL, yields, volumes, and stablecoins.",
  },
];

/**
 * Static, non-interactive recreation of the aomi.dev hero — the chat composer
 * and the agentic-app cards. The visual target the design system calibrates to.
 */
function LandingReference() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Badge variant="eyebrow" size="md">
          Reference
        </Badge>
        <span className="text-sm text-ink-muted">
          Static mirror of the portal chat — not interactive
        </span>
      </div>

      {/* Themed mirror — flips with the page via semantic tokens. */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6">
        {/* Hero panel: frosted composer over the pink → blue backdrop (dimmed in dark). */}
        <div className="rounded-2xl bg-[linear-gradient(135deg,var(--aomi-pink-100)_0%,var(--aomi-cool-100)_45%,var(--aomi-sky-500)_100%)] p-8 dark:bg-[linear-gradient(135deg,var(--aomi-pink-900)_0%,var(--aomi-cool-900)_45%,var(--aomi-sky-500)_100%)]">
          <div className="mx-auto max-w-2xl rounded-2xl bg-surface p-4 shadow-lg">
            {/* The composer */}
            <div className="flex flex-col gap-3 rounded-composer border border-[var(--aomi-composer-border)] bg-[var(--aomi-composer-bg)] p-3 backdrop-blur-glass">
              {/* 2×2 suggestion grid */}
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-border bg-bg-subtle px-4 py-3"
                  >
                    <div className="text-[13px] font-medium text-ink">
                      {s.title}
                    </div>
                    <div className="text-[12px] text-ink-muted">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Input line (static placeholder) */}
              <div className="px-2 pt-1 text-[15px] text-ink-muted">
                Send a message…
              </div>

              {/* Toolbar: selects + circular send */}
              <div className="flex items-center gap-2 px-1">
                {["ETH · Solana Mainnet", "Auto", "All Apps"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1 text-[13px] text-ink"
                  >
                    {label}
                    <span className="text-ink-muted">⌄</span>
                  </span>
                ))}
                <span
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-pill bg-primary text-[var(--aomi-text-on-brand)]"
                  aria-hidden="true"
                >
                  <SendArrow />
                </span>
              </div>
            </div>

            {/* Dashed connect affordances */}
            <div className="mt-4 flex gap-2">
              <span className="rounded-pill border border-dashed border-border bg-bg-subtle px-5 py-2 text-[13px] font-medium text-ink-muted">
                EVM Connect
              </span>
              <span className="rounded-pill border border-dashed border-border bg-bg-subtle px-5 py-2 text-[13px] font-medium text-ink-muted">
                SOL Connect
              </span>
            </div>
          </div>
        </div>

        {/* Section heading with the signature serif-italic accent */}
        <div className="pt-2">
          <Badge
            variant="eyebrow"
            size="md"
            className="border-border text-ink-muted"
          >
            Apps
          </Badge>
          <h2 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink">
            Explore an ecosystem of{" "}
            <span className="italic">Agentic Applications</span>
          </h2>
          <p className="mt-1 text-ink-muted">
            Transact on the Aomi Apps built by our team and community
          </p>
        </div>

        {/* App cards: flat / pink-tinted alternating, 32px radius */}
        <div className="grid gap-4 sm:grid-cols-3">
          {APPS.map((app, i) => (
            <Card
              key={app.name}
              variant={i % 2 === 1 ? "tinted-pink" : "flat"}
              className={i % 2 === 1 ? "dark:bg-pink-900" : "dark:bg-surface"}
              radius="2xl"
              padding="lg"
            >
              <div className="flex gap-2">
                <Badge variant="solid">{app.tag}</Badge>
                <Badge variant="success">Open access</Badge>
              </div>
              <h3 className="mt-4 font-display text-2xl font-normal tracking-tight text-ink">
                {app.name}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{app.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function App() {
  return (
    <main className="min-h-screen bg-bg px-6 py-12 text-[var(--aomi-text)]">
      <ThemeToggle />
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <Logo size={40} />
          <div>
            <h1 className="font-display text-4xl font-normal tracking-tight">
              Aomi design system
            </h1>
            <p className="mt-1 text-ink-muted">
              One prompt away from action — token + component playground.
            </p>
          </div>
        </header>

        <Section title="Brand">
          <div className="flex flex-col gap-6">
            {/* Logo lockup — Source Serif 4 SemiBold. Swatches stay fixed
                light/ink in both themes; each pins its own logo color. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-center rounded-2xl border border-cool-200 bg-cool-0 px-8 py-10 text-cool-950">
                <Logo size={44} />
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-cool-800 bg-cool-950 px-8 py-10 text-cool-0">
                <Logo size={44} />
              </div>
            </div>
            {/* Company signature — "aomi labs" lockup, light + ink */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-center rounded-2xl border border-cool-200 bg-cool-0 px-8 py-10 text-cool-950">
                <Logo size={44} text="aomi labs" />
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-cool-800 bg-cool-950 px-8 py-10 text-cool-0">
                <Logo size={44} text="aomi labs" />
              </div>
            </div>
            {/* Mark-only, size ramp — inherits the themed text color */}
            <div className="flex flex-wrap items-end gap-8">
              {[24, 32, 48, 72].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Brandmark size={s} title="Aomi" />
                  <span className="text-xs text-ink-muted">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <LandingReference />

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="connect">EVM Connect</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Section>

        <Section title="Selected states">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2.5 text-xs text-ink-muted">Selected nav bar</p>
              <div className="flex flex-col gap-0.5 rounded-xl border border-border bg-surface p-1.5">
                <div className="relative isolate overflow-hidden rounded-lg bg-sky-200 px-3 py-2 text-[13px] font-medium text-[var(--aomi-accent-selected-text)]">
                  <span
                    className="absolute inset-y-0 left-0 right-[5px] -z-10 rounded-lg bg-accent-selected"
                    aria-hidden="true"
                  />
                  Build
                </div>
                <div className="rounded-lg px-3 py-2 text-[13px] text-ink-secondary">
                  Deployments
                </div>
                <div className="rounded-lg bg-state-hover px-3 py-2 text-[13px] text-ink">
                  Settings <span className="text-xs text-ink-muted">(hover)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-2.5 text-xs text-ink-muted">Action pills (ink)</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">
                    Arb bot
                  </Button>
                  <Button variant="primary" size="sm">
                    OpenAPI agent
                  </Button>
                  <Button variant="primary" size="sm">
                    Plan from idea
                    <span className="text-cool-0/70">⇧Tab</span>
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2.5 text-xs text-ink-muted">Focused input</p>
                <Input
                  placeholder="Ask Aomi anything…"
                  className="border-[var(--aomi-accent-interactive)]"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Solid surface</CardTitle>
                <CardDescription>Default card, cool hairline border.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="primary" size="sm">
                  Authorize
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </CardFooter>
            </Card>

            <Card variant="tinted">
              <div className="flex gap-2">
                <Badge variant="solid">DEX</Badge>
                <Badge variant="success">Open access</Badge>
              </div>
              <CardHeader className="mt-3">
                <CardTitle>Tinted card (sky)</CardTitle>
                <CardDescription>
                  The card-tinted role — the old lilac fill, now sky-200.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="tinted-pink">
              <div className="flex gap-2">
                <Badge variant="pop">Beta</Badge>
              </div>
              <CardHeader className="mt-3">
                <CardTitle>Pink pop card</CardTitle>
                <CardDescription>
                  Decorative pink-100 fill — marketing tiles, never states.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" size="md">
              Ready
            </Badge>
            <Badge variant="pop" size="md">
              Beta
            </Badge>
            <Badge variant="eyebrow" size="md">
              Soon
            </Badge>
            <Badge variant="accent" size="md">
              Live
            </Badge>
            <Badge variant="solid" size="md">
              DEX
            </Badge>
          </div>
        </Section>

        <Section title="Chat surface">
          {/* Portal chat — empty/welcome state: centered greeting, icon
              suggestions, clean composer. Monochrome, mirrors apps/portal. */}
          <div className="mx-auto flex h-[540px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <div className="w-full max-w-xl px-4">
                <div className="text-2xl font-medium text-[var(--aomi-welcome-title)]">
                  Hello there!
                </div>
                <div className="text-2xl text-[var(--aomi-welcome-subtitle)]">
                  How can I help you today?
                </div>
              </div>
              <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-2 px-1 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <div
                    key={s.title}
                    className="group flex w-full flex-col items-start gap-0.5 rounded-2xl border border-border px-4 py-3 text-left transition-colors hover:bg-bg-subtle"
                  >
                    <span className="flex items-start gap-2 text-sm leading-tight text-ink">
                      <Ic
                        d={SUGGESTION_ICONS[i]}
                        className="mt-0.5 size-3.5 shrink-0 text-ink-subtle transition-colors group-hover:text-ink"
                      />
                      <span>{s.title}</span>
                    </span>
                    <span className="ml-[22px] text-xs leading-tight text-ink-muted">
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl px-3 pb-4">
              <div className="flex flex-col rounded-composer border border-border bg-[var(--aomi-chat-composer-bg)] px-1 pt-2">
                <div className="ml-3 mt-1 px-3.5 pb-2 pt-1.5 text-sm text-ink-subtle">
                  Send a message…
                </div>
                <div className="mx-1 mb-3 mt-2 flex min-h-[38px] items-center gap-1">
                  <div className="ml-1 flex min-w-0 flex-1 items-center gap-1 md:ml-2 md:gap-1">
                    <CtrlPill icon={NET_ICON} label="Ethereum" />
                    <CtrlPill icon={AUTO_ICON} label="Auto" />
                    <CtrlPill icon={APP_ICON} label="All Apps" />
                  </div>
                  <span
                    className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-primary text-[var(--aomi-text-on-brand)]"
                    aria-hidden="true"
                  >
                    <SendArrow />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Color ramps">
          <div className="flex flex-col gap-2">
            {(
              [
                ["sky", [50, 100, 200, 300, 400, 500]],
                ["pink", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]],
              ] as const
            ).map(([ramp, steps]) => (
              <div key={ramp} className="flex items-center gap-3">
                <span className="w-12 shrink-0 text-xs text-ink-muted">
                  {ramp}
                </span>
                <div className="flex flex-1 gap-1">
                  {steps.map((step) => (
                    <div
                      key={step}
                      className="h-10 flex-1 rounded-md"
                      style={{ background: `var(--aomi-${ramp}-${step})` }}
                      title={`${ramp}-${step}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
