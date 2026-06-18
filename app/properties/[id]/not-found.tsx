import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PropertyNotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-foreground">
          Property not found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          This listing may have been removed or the link is incorrect. Browse our
          verified properties instead.
        </p>
        <Link
          href="/properties"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          View all properties
        </Link>
      </main>
      <Footer />
    </>
  );
}
