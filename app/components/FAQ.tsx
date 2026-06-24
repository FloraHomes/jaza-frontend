import { ChevronDown, FileCheck2, MapPinned, ShieldCheck } from "lucide-react";
import { faqGroups } from "../lib/faq";
import Reveal from "./Reveal";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Verified titles",
    body: "Every listing is presented with clear title information before payment.",
  },
  {
    icon: MapPinned,
    title: "Real locations",
    body: "Buyers can confirm the exact estate location before they commit.",
  },
  {
    icon: FileCheck2,
    title: "Instant allocation",
    body: "Documents and allocation are issued without the usual long wait.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary-50 via-primary-50/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
          <Reveal className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Clear answers for the questions buyers ask most
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              We organized the information from the Jaza FAQ into simple
              sections so buyers can quickly understand the process, the
              safeguards, and what ownership looks like after purchase.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 space-y-8">
          {faqGroups.map((group, groupIndex) => (
            <Reveal
              key={group.title}
              delay={groupIndex * 100}
              className="rounded-[2rem] border border-brdr bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,29,12,0.06)] sm:p-8"
            >
              <div className="flex flex-col gap-4 border-b border-brdr pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary-dark">
                    {group.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                    {group.description}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {group.items.length} topics
                </span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {group.items.map((item, itemIndex) => (
                  <details
                    key={item.question}
                    className="faq-item rounded-[1.6rem] border border-brdr bg-surface/70 p-5"
                    open={groupIndex === 0 && itemIndex === 0}
                  >
                    <summary className="faq-trigger flex cursor-pointer list-none items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-dark">
                          Question {itemIndex + 1}
                        </p>
                        <h4 className="faq-question mt-2 font-display text-lg font-bold text-foreground">
                          {item.question}
                        </h4>
                      </div>
                      <span className="faq-icon mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-black/5 transition-transform duration-300">
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </summary>

                    <div className="faq-answer mt-5 space-y-4 border-t border-brdr/80 pt-5 text-sm leading-7 text-muted">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {item.bulletGroups?.map((grouping) => (
                        <div key={grouping.title ?? grouping.items.join("-")}>
                          {grouping.title ? (
                            <p className="font-semibold text-foreground">
                              {grouping.title}
                            </p>
                          ) : null}
                          <ul className="mt-2 space-y-2">
                            {grouping.items.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-3"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
