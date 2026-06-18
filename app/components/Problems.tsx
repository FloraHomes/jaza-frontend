import { X, Check, ShieldCheck, Gauge, Lock, HeartHandshake, Smartphone } from "lucide-react";
import Reveal from "./Reveal";

const problems = [
  "Paying fully without receiving land",
  "Fake or disputed land titles",
  "Hidden charges after payment",
  "Wrong or misleading locations",
  "Endless allocation delays",
  "Unclear agreements",
  "Overpriced land with poor value",
  "Stressful documentation process",
];

const pillars = [
  { icon: ShieldCheck, label: "Transparency" },
  { icon: Gauge, label: "Speed" },
  { icon: Lock, label: "Security" },
  { icon: HeartHandshake, label: "Trust" },
  { icon: Smartphone, label: "Accessibility" },
];

const capabilities = [
  "Select land remotely",
  "Verify locations online",
  "Sign agreements digitally",
  "Make payment securely",
  "Receive instant allocation",
  "Download documents immediately",
];

export default function Problems() {
  return (
    <section id="problems" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
            The Problems We Solved
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Nigerian real estate has been risky. We fixed that.
          </h2>
          <p className="mt-3 text-lg text-muted">
            The market has become frustrating for many buyers. Here is what we
            replaced with a technology-driven platform.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Problems */}
          <Reveal className="rounded-3xl border border-red-100 bg-white p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-foreground">
              Common issues buyers face
            </h3>
            <ul className="mt-5 space-y-3">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-foreground/80">{problem}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Solutions */}
          <Reveal
            delay={120}
            className="rounded-3xl bg-primary p-7 text-white shadow-xl shadow-primary/20 sm:p-8"
          >
            <h3 className="font-display text-lg font-bold">
              Why Jazã &amp; Sakeenah changes everything
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Our system lets you do all of this — all within minutes:
            </p>
            <ul className="mt-5 space-y-3">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-secondary-light">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-white/95">{cap}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/15 pt-6">
              {pillars.map((pillar) => (
                <span
                  key={pillar.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <pillar.icon className="h-3.5 w-3.5 text-secondary-light" />
                  {pillar.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
