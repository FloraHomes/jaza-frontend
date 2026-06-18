import {
  Zap,
  Eye,
  MapPinned,
  FileCheck2,
  Globe2,
  Download,
  Wallet,
  UserRoundCheck,
} from "lucide-react";
import Reveal from "./Reveal";

const reasons = [
  {
    icon: Zap,
    title: "Instant Allocation",
    body: "No waiting periods. No future promises. Your allocation is issued immediately after payment.",
  },
  {
    icon: Eye,
    title: "100% Transparent Process",
    body: "Every agreement is shown before payment. No hidden terms. No surprise charges.",
  },
  {
    icon: MapPinned,
    title: "Verified Land Locations",
    body: "View real Google Earth locations before buying so you know exactly where your land is located.",
  },
  {
    icon: FileCheck2,
    title: "Fully Titled & Surveyed",
    body: "Every property is verified, documented, fenced and pre-developed before sale.",
  },
  {
    icon: Globe2,
    title: "Buy From Anywhere",
    body: "Purchase land remotely from any part of Nigeria or anywhere in the world.",
  },
  {
    icon: Download,
    title: "Documents Immediately",
    body: "No stressful follow-ups. Your documents are generated instantly after purchase.",
  },
  {
    icon: Wallet,
    title: "Flexible Ownership Options",
    body: "Land options available for payment flexibility to suit your plan.",
  },
  {
    icon: UserRoundCheck,
    title: "Dedicated Property Advisors",
    body: "Receive personalized guidance throughout your purchase journey.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
            Why Buyers Choose Us
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Why buyers choose Jazã &amp; Sakeenah
          </h2>
          <p className="mt-3 text-lg text-muted">
            Built on transparency, speed, security, trust and accessibility.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={(i % 4) * 80}
              className="group h-full rounded-2xl border border-brdr bg-surface/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{reason.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
