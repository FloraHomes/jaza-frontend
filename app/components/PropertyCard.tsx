import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, ShieldCheck, ArrowUpRight, User } from "lucide-react";
import { formatPrice, statusStyles } from "../lib/data";
import {
  getPropertyCardImage,
  type ListingProperty,
} from "../lib/property-types";
import PropertySoldProgress, { SoldOutBadge } from "./PropertySoldProgress";

export default function PropertyCard({ property }: { property: ListingProperty }) {
  const cardImage = getPropertyCardImage(property);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brdr bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <Link
        href={`/properties/${property.id}`}
        className="relative block h-52 w-full overflow-hidden"
      >
        <Image
          src={cardImage}
          alt={`${property.title} in ${property.location}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {property.isSoldOut ? (
          <SoldOutBadge className="absolute left-3 top-3" />
        ) : property.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground shadow-sm">
            {property.badge}
          </span>
        ) : null}

        {!property.isSoldOut && (
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[property.status]}`}
          >
            {property.status}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-display text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {property.title}
          </h3>
        </Link>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          {property.location}, {property.state}
        </p>

        {property.listedBy && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <User className="h-3.5 w-3.5 text-primary" />
            Listed by {property.listedBy}
          </p>
        )}

        <PropertySoldProgress property={property} className="mt-3" />

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-foreground">
            <Maximize className="h-3.5 w-3.5 text-primary" />
            {property.size}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {property.titleDoc}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            {property.oldPrice ? (
              <p className="text-xs font-medium text-muted line-through">
                {formatPrice(property.oldPrice)}
              </p>
            ) : null}
            <p className="font-display text-xl font-extrabold text-primary">
              {formatPrice(property.price)}
            </p>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            aria-label={`View ${property.title}`}
          >
            View
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
