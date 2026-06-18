import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertiesCatalog from "../components/PropertiesCatalog";
import { fetchAllCatalogProperties } from "../lib/flora-api";

export const metadata: Metadata = {
  title: "All Properties",
  description:
    "Browse titled land for sale on Jazã & Sakeenah. Fully titled, surveyed and ready for instant allocation across Lagos, Ogun, Abuja, Oyo and more.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "All Verified Land Properties | Jazã & Sakeenah",
    description:
      "Explore every verified land listing — instant allocation, transparent pricing, digital purchase.",
    url: "/properties",
  },
};

export default async function PropertiesPage() {
  const { ours, customerListing } = await fetchAllCatalogProperties();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-6 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
              Property Catalogue
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              Well titled, fenced and gated estate land
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              Every listing is documented, surveyed and ready for instant
              allocation. Select a property, review the agreement, pay securely
              and download your documents in minutes.
            </p>
          </div>

          <div className="mt-10">
            <PropertiesCatalog ours={ours} customerListing={customerListing} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
