import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Zap,
  Fence,
  Ruler,
  Layers,
  FileDown,
  CheckCircle2,
  CreditCard,
  Phone,
  MapPinned,
  User,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PropertyCard from "../../components/PropertyCard";
import PropertyLocationMap from "../../components/PropertyLocationMap";
import PropertySoldProgress, {
  SoldOutBadge,
} from "../../components/PropertySoldProgress";
import { getPropertyCardImage } from "../../lib/property-types";
import { formatPrice, siteContact, statusStyles } from "../../lib/data";
import { fetchAllCatalogProperties, getListingById } from "../../lib/flora-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getListingById(id);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return {
    title: property.title,
    description: property.description,
    alternates: { canonical: `/properties/${property.id}` },
    openGraph: {
      title: `${property.title} | Jazã & Sakeenah`,
      description: property.description,
      url: `/properties/${property.id}`,
      images: [{ url: property.image, alt: property.title }],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getListingById(id);

  if (!property) notFound();

  const catalog = await fetchAllCatalogProperties();
  const sameSource =
    property.source === "ours" ? catalog.ours : catalog.customerListing;
  const related = sameSource.filter((p) => p.id !== property.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/properties"
              className="transition-colors hover:text-primary"
            >
              Properties
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">
              {property.title}
            </span>
          </nav>

          <Link
            href="/properties"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All properties
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5">
                <Image
                  src={getPropertyCardImage(property)}
                  alt={property.title}
                  width={1200}
                  height={720}
                  priority
                  className="aspect-[5/3] w-full object-cover"
                />
                {property.isSoldOut ? (
                  <SoldOutBadge className="absolute left-4 top-4 text-xs" />
                ) : property.badge ? (
                  <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-foreground shadow-sm">
                    {property.badge}
                  </span>
                ) : null}
                {!property.isSoldOut && (
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[property.status]}`}
                  >
                    {property.status}
                  </span>
                )}
              </div>

              {property.images.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {property.images.slice(1, 4).map((img, i) => (
                    <div
                      key={img}
                      className="relative overflow-hidden rounded-xl ring-1 ring-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${property.title} view ${i + 2}`}
                        width={400}
                        height={260}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-3xl border border-brdr bg-surface/50 p-6 shadow-sm sm:p-7">
                {property.isSoldOut ? (
                  <SoldOutBadge />
                ) : (
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[property.status]}`}
                  >
                    {property.status}
                  </span>
                )}

                <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {property.title}
                </h1>

                <p className="mt-2 flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {property.location}, {property.state}
                </p>

                {property.listedBy && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    <User className="h-4 w-4 shrink-0 text-primary" />
                    Listed by {property.listedBy}
                  </p>
                )}

                <div className="mt-5 border-t border-brdr pt-5">
                  {property.oldPrice && (
                    <p className="text-sm font-medium text-muted line-through">
                      {formatPrice(property.oldPrice)}
                    </p>
                  )}
                  <p className="font-display text-3xl font-extrabold text-primary">
                    {formatPrice(property.price)}
                  </p>
                  <p className="mt-1 text-sm text-muted">{property.size}</p>
                </div>

                <PropertySoldProgress property={property} className="mt-5" />

                <dl className="mt-5 space-y-3 border-t border-brdr pt-5 text-sm">
                  <DetailRow label="Title document" value={property.titleDoc} />
                  {property.planNumber && (
                    <DetailRow
                      label="Plan number"
                      value={property.planNumber}
                    />
                  )}
                  {property.coordinatesWGS84 && (
                    <DetailRow
                      label="WGS84 coordinates"
                      value={property.coordinatesWGS84}
                    />
                  )}
                  {property.coordinatesUTM && (
                    <DetailRow
                      label="UTM coordinates"
                      value={property.coordinatesUTM}
                    />
                  )}
                  {property.percentageSold !== undefined && (
                    <DetailRow
                      label="Estate sold"
                      value={`${property.percentageSold}%`}
                    />
                  )}
                </dl>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://app.jaza.ng"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
                  >
                    Buy this property
                  </a>
                  <a
                    href={`tel:${siteContact.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brdr bg-white px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    Speak to an advisor
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground">
                  About this property
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">
                  {property.description}
                </p>
              </section>

              {property.features.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Key features
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {property.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl border border-brdr bg-surface/40 px-4 py-3 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {property.amenities.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Estate amenities
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-brdr bg-surface/50 p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <FileDown className="h-5 w-5 text-primary" />
                  Documents you receive
                </h2>
                <p className="mt-2 text-sm text-muted">
                  The documents that comes with this property
                </p>
                <ul className="mt-4 space-y-2">
                  {property.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </section>

              {(property?.otherFee ||
                property.surveyFee ||
                property.deedFee) && (
                <section className="rounded-2xl border border-brdr bg-surface/50 p-6">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Other Fees & Charges
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    These fees are not included in the listing price.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {property.otherFee !== undefined &&
                      property.otherFeeTitle !== undefined && (
                        <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          {property.otherFeeTitle} -{" "}
                          {formatPrice(property.otherFee)}
                        </li>
                      )}

                    {property.surveyFee !== undefined && (
                      <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Survey Fee - {formatPrice(property.surveyFee)}
                      </li>
                    )}

                    {property?.deedFee !== undefined && (
                      <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Deed Fee - {formatPrice(property.deedFee)}
                      </li>
                    )}

                    {property?.deedFee !== undefined && (
                      <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Development Fee - {formatPrice(property.deedFee)}
                      </li>
                    )}
                  </ul>
                </section>
              )}

              <section className="rounded-2xl border border-brdr bg-primary-50 p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <MapPinned className="h-5 w-5 text-primary" />
                  Verified location
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  View the exact plot location on the map before you pay. Drive
                  straight to your allocated plot after purchase.
                </p>
                {property.lat !== undefined && property.lng !== undefined ? (
                  <div className="mt-4">
                    <PropertyLocationMap
                      lat={property.lat}
                      lng={property.lng}
                      title={property.title}
                    />
                  </div>
                ) : (
                  <p className="mt-4 text-sm font-medium text-muted">
                    Map coordinates are not available for this listing yet.
                  </p>
                )}
              </section>
            </div>
          </div>

          <section
            id="purchase"
            className="mt-16 overflow-hidden rounded-3xl bg-primary px-6 py-10 text-white sm:px-10 sm:py-12"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                  Own {property.title} in 5 minutes
                </h2>
                <p className="mt-3 text-white/85">
                  Browse, sign your agreement digitally, pay securely and
                  download all {property.documents.length} documents instantly.
                  No hidden charges. No allocation delays.
                </p>
              </div>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: MapPin, text: "Confirm plot on map" },
                  { icon: ShieldCheck, text: "Review agreement upfront" },
                  { icon: CreditCard, text: "Pay securely online" },
                  { icon: FileDown, text: "Download documents instantly" },
                ].map((step) => (
                  <li
                    key={step.text}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
                  >
                    <step.icon className="h-5 w-5 text-secondary-light" />
                    {step.text}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://app.jaza.ng/"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-secondary-light"
              >
                Start purchase — {formatPrice(property.price)}
              </a>
              <a
                href={`tel:${siteContact.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Talk to an advisor first
              </a>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-extrabold text-foreground">
                Similar properties
              </h2>
              <p className="mt-2 text-muted">
                Other verified land you may want to explore.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function Badge({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary-100 bg-white px-2.5 py-1 text-[11px] font-semibold text-primary">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
