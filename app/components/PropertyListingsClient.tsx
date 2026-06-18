"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { propertyTabs, PropertyCategory } from "../lib/data";
import type { ListingProperty } from "../lib/property-types";
import PropertyCard from "./PropertyCard";

const tabBlurb: Record<PropertyCategory, string> = {
  ours: "Verified land listed directly by Jazã & Sakeenah — instant allocation, full documentation.",
  "customer-listing":
    "Land parcels listed by verified customers on our platform — browse and purchase securely.",
};

interface PropertyListingsClientProps {
  ours: ListingProperty[];
  customerListing: ListingProperty[];
}

export default function PropertyListingsClient({
  ours,
  customerListing,
}: PropertyListingsClientProps) {
  const [active, setActive] = useState<PropertyCategory>("ours");

  const byCategory = useMemo(
    () => ({
      ours,
      "customer-listing": customerListing,
    }),
    [ours, customerListing],
  );

  const filtered = byCategory[active];

  return (
    <section id="properties" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
            Available Properties
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Get Titled Land, Signed Documents & Instant Allocation Today, Not
            Tomorrow.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Every parcel is documented, fenced and pre-developed before it is
            listed. Pick a category and start in minutes.
          </p>
        </div>

        <div className="mt-8 -mx-4 overflow-x-auto px-4 no-scrollbar">
          <div
            role="tablist"
            aria-label="Property categories"
            className="flex w-max gap-2 rounded-full border border-brdr bg-white p-1.5 shadow-sm"
          >
            {propertyTabs.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.key)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/70 hover:bg-primary-50 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-muted">
          {tabBlurb[active]}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted">
            No properties available in this category right now. Please check
            back soon.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/properties"
            className="rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View all properties
          </Link>
        </div>
      </div>
    </section>
  );
}
