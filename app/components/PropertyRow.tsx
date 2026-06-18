import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Maximize,
  ShieldCheck,
  ArrowUpRight,
  Zap,
  Fence,
  Ruler,
  Layers,
  FileText,
  CreditCard,
  User,
} from "lucide-react";
import { formatPrice, statusStyles } from "../lib/data";
import {
  getPropertyCardImage,
  type ListingProperty,
} from "../lib/property-types";
import PropertySoldProgress, { SoldOutBadge } from "./PropertySoldProgress";

export default function PropertyRow({ property }: { property: ListingProperty }) {
  const cardImage = getPropertyCardImage(property);

  return (
    <article className="group overflow-hidden rounded-2xl border border-brdr bg-white shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col lg:flex-row">
        <div className="relative h-56 w-full shrink-0 overflow-hidden lg:h-auto lg:w-[340px] xl:w-[400px]">
          <Image
            src={cardImage}
            alt={`${property.title} in ${property.location}`}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

          {property.isSoldOut ? (
            <SoldOutBadge className="absolute left-4 top-4" />
          ) : property.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground shadow-sm">
              {property.badge}
            </span>
          ) : null}

          {!property.isSoldOut && (
            <span
              className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[property.status]}`}
            >
              {property.status}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {property.title}
              </h2>
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
            </div>

            <div className="text-right">
              {property.oldPrice && (
                <p className="text-sm font-medium text-muted line-through">
                  {formatPrice(property.oldPrice)}
                </p>
              )}
              <p className="font-display text-2xl font-extrabold text-primary">
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-7 text-muted sm:line-clamp-3">
            {property.description}
          </p>

          <PropertySoldProgress property={property} className="mt-4 max-w-md" />

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Param icon={Maximize} label="Plot size" value={property.size} />
            <Param icon={ShieldCheck} label="Title" value={property.titleDoc} />
            {property.plotsAvailable !== undefined && (
              <Param
                icon={Layers}
                label="Availability"
                value={`${property.plotsAvailable} plots`}
              />
            )}
            {property.paymentPlan && (
              <Param icon={CreditCard} label="Payment" value={property.paymentPlan} />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {property.instantAllocation && (
              <Tag icon={Zap} label="Instant allocation" />
            )}
            {property.fenced && <Tag icon={Fence} label="Fenced" />}
            {property.surveyed && <Tag icon={Ruler} label="Surveyed" />}
            {property.preDeveloped && <Tag icon={Layers} label="Pre-developed" />}
          </div>

          <ul className="mt-4 hidden gap-x-6 gap-y-1 sm:flex sm:flex-wrap">
            {property.features.slice(0, 3).map((f) => (
              <li
                key={f}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/80"
              >
                <FileText className="h-3.5 w-3.5 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              {property.documents.length} documents issued instantly after purchase
            </p>
            <Link
              href={`/properties/${property.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark group-hover:shadow-md"
            >
              View full details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Param({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-surface/80 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <p className="mt-0.5 text-sm font-semibold text-foreground line-clamp-2">{value}</p>
    </div>
  );
}

function Tag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
