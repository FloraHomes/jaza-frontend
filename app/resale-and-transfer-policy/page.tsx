import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";
import {
  getLegalDocument,
  getLegalDocumentMeta,
} from "../lib/legal-documents";

export const metadata: Metadata = {
  title: "Resale & Transfer Policy",
  description:
    "Procedures for reselling and transferring property ownership acquired through the platform.",
  alternates: { canonical: "/resale-and-transfer-policy" },
};

export default function ResaleAndTransferPolicyPage() {
  const meta = getLegalDocumentMeta("resale-and-transfer-policy");
  const document = getLegalDocument("resale-and-transfer-policy");

  return <LegalDocumentPage document={document} description={meta.description} />;
}
