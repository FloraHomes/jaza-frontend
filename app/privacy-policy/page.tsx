import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";
import {
  getLegalDocument,
  getLegalDocumentMeta,
} from "../lib/legal-documents";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Jazã & Sakeenah collects, uses, stores, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const meta = getLegalDocumentMeta("privacy-policy");
  const document = getLegalDocument("privacy-policy");

  return <LegalDocumentPage document={document} description={meta.description} />;
}
