import Image from "next/image";
import {
  ShieldCheck,
  Search,
  PenLine,
  CreditCard,
  FileDown,
  MapPin,
  Star,
  ArrowRight,
  XCircle,
} from "lucide-react";

const quickSteps = [
  { icon: Search, label: "Browse properties" },
  { icon: PenLine, label: "Sign documents digitally" },
  { icon: CreditCard, label: "Pay securely" },
  { icon: FileDown, label: "Download instantly" },
  { icon: MapPin, label: "Drive to your plot" },
];

const noList = [
  "No “allocation coming soon.”",
  "No hidden charges.",
  "No location surprises.",
  "No endless documentation.",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Secure · Transparent · Instant
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Own Titled, Fenced, Secured & Instantly Allocated Estate Land in{" "}
            <span className="relative whitespace-nowrap text-primary">
              5 Minutes
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C50 3 150 3 198 9"
                  stroke="#FFA800"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Jazã & Sakeenah: Easy and reliable tech access to owning landed
            property across Africa.
          </p>

          {/* No-list */}
          <ul className="mt-6 grid max-w-lg grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {noList.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <XCircle className="h-4 w-4 shrink-0 text-secondary-dark" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              Browse Available Land
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://app.jaza.ng"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-secondary-light"
            >
              Get Started
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["A", "C", "F", "T"].map((l, i) => (
                <span
                  key={l}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-xs font-bold text-primary"
                  style={{ zIndex: 10 - i }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                Trusted by landowners accross the globe{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div
          className="relative animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
            <Image
              src="/land.png"
              alt="Verified, surveyed land parcel ready for allocation"
              width={1200}
              height={1400}
              priority
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
          </div>

          {/* Floating verified card */}
          <div className="absolute -left-3 top-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-xl ring-1 ring-black/5 sm:-left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Title Verified
              </p>
              <p className="text-[11px] text-muted">
                C of O · Survey · Gazette
              </p>
            </div>
          </div>

          {/* Floating allocation card */}
          <div className="absolute -bottom-5 right-2 w-56 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:right-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">
                Allocation issued
              </p>
              <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                INSTANT
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <FileDown className="h-4 w-4 text-secondary-dark" />
              <span className="text-[11px] text-muted">
                4 documents ready to download
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-primary-light" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick steps strip */}
      <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brdr bg-white p-2 shadow-sm">
          <ol className="grid grid-cols-1 divide-y divide-brdr sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {quickSteps.map((step, i) => (
              <li
                key={step.label}
                className="flex items-center gap-3 px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-secondary-dark">
                    Step {i + 1}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {step.label}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
