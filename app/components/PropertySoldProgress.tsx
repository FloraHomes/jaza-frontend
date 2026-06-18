import type { ListingProperty } from "../lib/property-types";

interface PropertySoldProgressProps {
  property: ListingProperty;
  className?: string;
}

export function SoldOutBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm ${className}`}
    >
      Sold out
    </span>
  );
}

export default function PropertySoldProgress({
  property,
  className = "",
}: PropertySoldProgressProps) {
  if (property.source !== "ours" || property.percentageSold === undefined) {
    return null;
  }

  const sold = property.percentageSold;
  const remaining = Math.max(0, 100 - sold);

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-muted">
          {property.isSoldOut ? "Fully sold out" : `${sold}% sold`}
        </span>
        {!property.isSoldOut && (
          <span className="font-semibold text-primary">{remaining}% available</span>
        )}
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface"
        role="progressbar"
        aria-valuenow={sold}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${sold}% of plots sold`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${sold}%` }}
        />
      </div>
    </div>
  );
}
