import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";
import {
  getLegalDocument,
  getLegalDocumentMeta,
} from "../lib/legal-documents";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing access to and use of the Jazã & Sakeenah platform and services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  const meta = getLegalDocumentMeta("terms-of-service");
  const document = getLegalDocument("terms-of-service");

  return <LegalDocumentPage document={document} description={meta.description} />;
}
