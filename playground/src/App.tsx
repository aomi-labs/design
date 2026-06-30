import {
  Badge,
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

/** A borderless ghost control pill (network / model / app), as in the portal. */
function CtrlPill({ icon, label }: { icon: string[]; label: string }) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-cool-500">
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

// Pink → blue hero gradient — the signature landing backdrop.
const HERO_GRADIENT =
  "linear-gradient(135deg, var(--aomi-pink-100) 0%, var(--aomi-cool-100) 45%, var(--aomi-sky-500) 100%)";

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

      {/* Always-light mirror, fixed cool-* colors. */}
      <div className="flex flex-col gap-6 rounded-2xl bg-cool-0 p-6">
        {/* Hero panel: frosted composer over the pink → blue backdrop. */}
        <div className="rounded-2xl p-8" style={{ background: HERO_GRADIENT }}>
          <div className="mx-auto max-w-2xl rounded-2xl bg-cool-0 p-4 shadow-lg">
            {/* The composer */}
            <div className="flex flex-col gap-3 rounded-composer border border-[var(--aomi-composer-border)] bg-[var(--aomi-composer-bg)] p-3 backdrop-blur-glass">
              {/* 2×2 suggestion grid */}
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-cool-200 bg-cool-50 px-4 py-3"
                  >
                    <div className="text-[13px] font-medium text-cool-950">
                      {s.title}
                    </div>
                    <div className="text-[12px] text-cool-500">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Input line (static placeholder) */}
              <div className="px-2 pt-1 text-[15px] text-cool-500">
                Send a message…
              </div>

              {/* Toolbar: selects + circular dark send */}
              <div className="flex items-center gap-2 px-1">
                {["ETH · Solana Mainnet", "Auto", "All Apps"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-pill border border-cool-200 px-3 py-1 text-[13px] text-cool-950"
                  >
                    {label}
                    <span className="text-cool-500">⌄</span>
                  </span>
                ))}
                <span
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-pill bg-cool-950 text-cool-0"
                  aria-hidden="true"
                >
                  <SendArrow />
                </span>
              </div>
            </div>

            {/* Dashed connect affordances */}
            <div className="mt-4 flex gap-2">
              <span className="rounded-pill border border-dashed border-cool-200 bg-cool-50 px-5 py-2 text-[13px] font-medium text-cool-500">
                EVM Connect
              </span>
              <span className="rounded-pill border border-dashed border-cool-200 bg-cool-50 px-5 py-2 text-[13px] font-medium text-cool-500">
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
            className="border-cool-200 text-cool-500"
          >
            Apps
          </Badge>
          <h2 className="mt-3 font-display text-4xl font-normal tracking-tight text-cool-950">
            Explore an ecosystem of{" "}
            <span className="italic">Agentic Applications</span>
          </h2>
          <p className="mt-1 text-cool-500">
            Transact on the Aomi Apps built by our team and community
          </p>
        </div>

        {/* App cards: flat / pink-tinted alternating, 32px radius */}
        <div className="grid gap-4 sm:grid-cols-3">
          {APPS.map((app, i) => (
            <Card
              key={app.name}
              variant={i % 2 === 1 ? "tinted" : "flat"}
              className={i % 2 === 1 ? "bg-pink-200" : undefined}
              radius="2xl"
              padding="lg"
            >
              <div className="flex gap-2">
                <Badge variant="solid">{app.tag}</Badge>
                <Badge variant="success">Open access</Badge>
              </div>
              <h3 className="mt-4 font-display text-2xl font-normal tracking-tight text-cool-950">
                {app.name}
              </h3>
              <p className="mt-2 text-sm text-cool-500">{app.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function App() {
  return (
    <main className="min-h-screen bg-bg px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header>
          <h1 className="font-display text-4xl font-normal tracking-tight">
            Aomi design system
          </h1>
          <p className="mt-1 text-ink-muted">
            One prompt away from action — token + component playground.
          </p>
        </header>

        <LandingReference />

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button
              variant="accent"
              className="bg-sky-500 text-cool-0 hover:bg-sky-300"
            >
              Accent
            </Button>
            <Button variant="glass">I'm a human</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="connect">EVM Connect</Button>
            <Button variant="danger" className="bg-pink-600 text-cool-0">
              Danger
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Signing…</Button>
            <Button disabled>Disabled</Button>
            <Button
              shape="rounded"
              variant="accent"
              className="bg-sky-500 text-cool-0 hover:bg-sky-300"
            >
              Rounded
            </Button>
          </div>
        </Section>

        <Section title="Inputs">
          <div className="flex max-w-md flex-col gap-3">
            <Input placeholder="Ask Aomi anything…" />
            <Input shape="rounded" placeholder="Rounded variant" />
            <Input
              invalid
              defaultValue="0x-invalid"
              className="border-sky-500 focus-visible:border-sky-500 focus-visible:ring-[var(--aomi-sky-500)]/30"
            />
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Solid surface</CardTitle>
                <CardDescription>Default card on a raised surface.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-ink-muted">
                Built entirely from semantic tokens, so it re-themes in dark mode.
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">
                  Authorize
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Liquid glass</CardTitle>
                <CardDescription>The hero surface treatment.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-ink-muted">
                Translucent fill, inner highlight, soft lift — the Aomi signature.
              </CardContent>
              <CardFooter>
                <Button variant="glass" size="sm">
                  Open portal
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Section title="Chat surface">
          {/* Portal chat — empty/welcome state: centered greeting, icon
              suggestions, clean composer. Monochrome, mirrors apps/portal. */}
          <div className="mx-auto flex h-[540px] w-full flex-col overflow-hidden rounded-2xl border border-cool-200 bg-cool-0">
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <div className="w-full max-w-xl px-4">
                <div className="text-2xl font-medium text-cool-600">
                  Hello there!
                </div>
                <div className="text-2xl text-cool-400">
                  How can I help you today?
                </div>
              </div>
              <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-2 px-1 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <div
                    key={s.title}
                    className="group flex w-full flex-col items-start gap-0.5 rounded-2xl border border-cool-200 px-4 py-3 text-left transition-colors hover:bg-cool-100"
                  >
                    <span className="flex items-start gap-2 text-sm leading-tight text-cool-950">
                      <Ic
                        d={SUGGESTION_ICONS[i]}
                        className="mt-0.5 size-3.5 shrink-0 text-cool-400 transition-colors group-hover:text-cool-950"
                      />
                      <span>{s.title}</span>
                    </span>
                    <span className="ml-[22px] text-xs leading-tight text-cool-500">
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl px-3 pb-4">
              <div className="flex flex-col rounded-composer border border-cool-200 bg-cool-50 px-1 pt-2">
                <div className="ml-3 mt-1 px-3.5 pb-2 pt-1.5 text-sm text-cool-400">
                  Send a message…
                </div>
                <div className="mx-1 mb-3 mt-2 flex min-h-[38px] items-center gap-1">
                  <div className="ml-1 flex min-w-0 flex-1 items-center gap-1 md:ml-2 md:gap-1">
                    <CtrlPill icon={NET_ICON} label="Ethereum" />
                    <CtrlPill icon={AUTO_ICON} label="Auto" />
                    <CtrlPill icon={APP_ICON} label="All Apps" />
                  </div>
                  <span
                    className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-cool-950 text-cool-0"
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
                ["pink", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]],
                ["sky", [50, 100, 200, 300, 400, 500]],
                ["lilac", [50, 100, 200, 300, 400, 500]],
              ] as const
            ).map(([ramp, steps]) => (
              <div key={ramp} className="flex items-center gap-3">
                <span className="w-12 shrink-0 text-xs text-cool-500">
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
