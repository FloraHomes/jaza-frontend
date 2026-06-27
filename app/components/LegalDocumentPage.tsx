import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import LegalDocumentContent from "./LegalDocumentContent";
import type { LegalDocument } from "../lib/legal-documents";
import { LEGAL_DOCUMENTS } from "../lib/legal-documents";

interface LegalDocumentPageProps {
  document: LegalDocument;
  description: string;
}

export default function LegalDocumentPage({
  document,
  description,
}: LegalDocumentPageProps) {
  const otherDocuments = LEGAL_DOCUMENTS.filter(
    (doc) => doc.slug !== document.slug
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-6">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
              Legal
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {document.title}
            </h1>
            {document.effectiveDate && (
              <p className="mt-3 text-sm font-medium text-muted">
                {document.effectiveDate}
              </p>
            )}
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              {description}
            </p>
          </div>

          <article className="mt-10 rounded-3xl border border-brdr bg-white p-6 shadow-sm sm:p-10">
            <LegalDocumentContent intro={document.intro} sections={document.sections} />
          </article>

          <aside className="mt-10 rounded-2xl border border-brdr bg-white/70 p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
              Related policies
            </h2>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {otherDocuments.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/${doc.slug}`}
                    className="inline-flex rounded-full border border-brdr bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
