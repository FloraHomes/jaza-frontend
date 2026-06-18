import {
  Search,
  PenLine,
  CreditCard,
  FileDown,
  Navigation,
} from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: Search,
    title: "Select Your Property",
    body: "Browse available land parcels directly from your mobile device with verified details and Google Earth locations.",
  },
  {
    icon: PenLine,
    title: "Sign Agreement Digitally",
    body: "Review your purchase agreement upfront and sign securely with your fingertips before making payment.",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    body: "Complete your payment through our secure online process from anywhere in the world.",
  },
  {
    icon: FileDown,
    title: "Download Documents Instantly",
    body: "Immediately receive your Allocation Letter, Purchase Agreement, Payment Receipt and Supporting Documentation.",
    docs: [
      "Allocation Letter",
      "Purchase Agreement",
      "Payment Receipt",
      "Supporting Documentation",
    ],
  },
  {
    icon: Navigation,
    title: "Visit Your Exact Plot",
    body: "Drive to the estate and locate the exact plot number shown on your allocation documents.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
            How It Works
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            From browsing to your plot — in five simple steps
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-7 hidden h-px w-full bg-gradient-to-r from-primary/30 to-transparent lg:block"
                />
              )}
              <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <step.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground ring-2 ring-surface">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
               
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
