import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../src";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-bg px-6 py-12 transition-colors">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight">
                Aomi design system
              </h1>
              <p className="mt-1 text-ink-muted">
                One prompt away from action — token + component playground.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? "Light" : "Dark"} mode
            </Button>
          </header>

          <Section title="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="glass">I'm a human</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Signing…</Button>
              <Button disabled>Disabled</Button>
              <Button shape="rounded" variant="accent">
                Rounded
              </Button>
            </div>
          </Section>

          <Section title="Inputs">
            <div className="flex max-w-md flex-col gap-3">
              <Input placeholder="Ask Aomi anything…" />
              <Input shape="rounded" placeholder="Rounded variant" />
              <Input invalid defaultValue="0x-invalid" />
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

          <Section title="Chat surface (monochrome)">
            <Card padding="none" className="overflow-hidden">
              <div className="flex flex-col gap-3 bg-[var(--aomi-chat-bg)] p-5">
                <div className="self-end max-w-[80%] rounded-xl bg-[var(--aomi-chat-bubble-user)] px-4 py-2 text-[var(--aomi-chat-bubble-user-text)]">
                  Rebalance my portfolio to 10% USDC yield.
                </div>
                <div className="self-start max-w-[80%] rounded-xl bg-[var(--aomi-chat-bubble-agent)] px-4 py-2 text-[var(--aomi-chat-bubble-agent-text)]">
                  Here's the plan — 3 swaps, simulated. Review and sign.
                </div>
                <div className="mt-1 flex gap-2">
                  <Input size="sm" placeholder="Message Aomi…" />
                  <Button size="sm" variant="primary">
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="Color ramps">
            <div className="flex flex-col gap-3">
              {(["pink", "purple"] as const).map((ramp) => (
                <div key={ramp} className="flex gap-1">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                    (step) => (
                      <div
                        key={step}
                        className="h-10 flex-1 rounded-md"
                        style={{ background: `var(--aomi-${ramp}-${step})` }}
                        title={`${ramp}-${step}`}
                      />
                    ),
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
