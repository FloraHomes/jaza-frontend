import { ArrowRight, ShieldCheck } from "lucide-react";
import { siteContact } from "../lib/data";

export default function CTA() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center shadow-2xl shadow-primary/25 sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-secondary-light" />
              Secure · Transparent · Instant
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Own verified land across Africa today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Browse, sign, pay and download your documents in minutes. Then
              drive straight to your exact allocated plot.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/properties"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-base font-bold text-foreground shadow-lg transition-all hover:bg-secondary-light"
              >
                Browse Available Land
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${siteContact.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to an advisor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
