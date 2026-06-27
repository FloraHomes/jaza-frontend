import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";
import {
  getLegalDocument,
  getLegalDocumentMeta,
} from "../lib/legal-documents";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund, cancellation, and value recovery rules for property transactions on the platform.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  const meta = getLegalDocumentMeta("refund-policy");
  const document = getLegalDocument("refund-policy");

  return <LegalDocumentPage document={document} description={meta.description} />;
}
