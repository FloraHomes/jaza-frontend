"use client";

import { useMemo, useState } from "react";
import { propertyTabs, PropertyCategory } from "../lib/data";
import type { ListingProperty } from "../lib/property-types";
import PropertyRow from "./PropertyRow";

const tabBlurb: Record<PropertyCategory, string> = {
  ours: "Well titled, fenced and gated estate land listed directly by Jazã & Sakeenah — instant allocation, full documentation.",
  "customer-listing":
    "Titled, fenced and gated estate land listed by verified customers on our platform — browse and purchase securely.",
};

interface PropertiesCatalogProps {
  ours: ListingProperty[];
  customerListing: ListingProperty[];
}

export default function PropertiesCatalog({
  ours,
  customerListing,
}: PropertiesCatalogProps) {
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
    <>
      <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
        <div
          role="tablist"
          aria-label="Filter properties"
          className="flex w-max gap-2 rounded-full border border-brdr bg-white p-1.5 shadow-sm"
        >
          {propertyTabs.map((tab) => (
            <FilterTab
              key={tab.key}
              label={tab.label}
              active={active === tab.key}
              onClick={() => setActive(tab.key)}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-muted">
        {tabBlurb[active]} Showing{" "}
        <span className="font-bold text-foreground">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "property" : "properties"}.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {filtered.map((property) => (
          <PropertyRow key={property.id} property={property} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">
          No properties available in this category right now. Please check back
          soon.
        </p>
      )}
    </>
  );
}

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-primary text-white shadow-sm"
          : "text-foreground/70 hover:bg-primary-50 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
