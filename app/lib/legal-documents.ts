import fs from "node:fs";
import path from "node:path";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  slug: LegalDocumentSlug;
  title: string;
  effectiveDate?: string;
  intro: LegalBlock[];
  sections: LegalSection[];
}

export type LegalDocumentSlug =
  | "privacy-policy"
  | "terms-of-service"
  | "refund-policy"
  | "resale-and-transfer-policy";

const DOCUMENT_FILES: Record<LegalDocumentSlug, string> = {
  "privacy-policy": "privacy policy.txt",
  "terms-of-service": "TERMS OF SERVICE.txt",
  "refund-policy": "REFUND POLICY.txt",
  "resale-and-transfer-policy": "RESALE & TRANSFER POLICY.txt",
};

export const LEGAL_DOCUMENTS: {
  slug: LegalDocumentSlug;
  title: string;
  description: string;
}[] = [
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description:
      "Terms governing access to and use of the Jazã & Sakeenah platform and services.",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How Jazã & Sakeenah collects, uses, stores, and protects your personal information.",
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description:
      "Refund, cancellation, and value recovery rules for property transactions on the platform.",
  },
  {
    slug: "resale-and-transfer-policy",
    title: "Resale & Transfer Policy",
    description:
      "Procedures for reselling and transferring property ownership acquired through the platform.",
  },
];

function normalizeText(text: string): string {
  return text.replace(/\[Insert Date\]/gi, formatEffectiveDate());
}

function formatEffectiveDate(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isSectionHeader(line: string): boolean {
  // Section headings use "1. TITLE" (space after the period).
  // In-body numbered lists use "1.Item" (no space), e.g. purchase steps.
  const match = line.match(/^\d+\.\s+(.+)$/);
  if (!match) return false;

  const rest = match[1].trim();
  return !rest.endsWith(";");
}

function isBulletLine(line: string): boolean {
  return line.startsWith("●");
}

function isNumberedListItem(line: string): boolean {
  return /^\d+\./.test(line) && !/^\d+\.\s+/.test(line);
}

function stripBullet(line: string): string {
  return line.replace(/^●\s*/, "").trim();
}

function stripNumberedPrefix(line: string): string {
  return line.replace(/^\d+\.\s*/, "").trim();
}

function parseLegalText(raw: string): Omit<LegalDocument, "slug"> {
  const lines = raw.split(/\r?\n/);
  let index = 0;

  while (index < lines.length && !lines[index]?.trim()) index += 1;
  const title = normalizeText(lines[index]?.trim() ?? "Legal Document");
  index += 1;

  while (index < lines.length && !lines[index]?.trim()) index += 1;

  let effectiveDate: string | undefined;
  if (lines[index]?.trim().toLowerCase().startsWith("effective date")) {
    effectiveDate = normalizeText(lines[index]!.trim());
    index += 1;
  }

  const intro: LegalBlock[] = [];
  const sections: LegalSection[] = [];

  let currentSection: LegalSection | null = null;
  let paragraph = "";
  let currentList: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (!paragraph.trim()) return;
    const block: LegalBlock = {
      type: "paragraph",
      text: normalizeText(paragraph.trim()),
    };
    if (currentSection) currentSection.blocks.push(block);
    else intro.push(block);
    paragraph = "";
  };

  const flushList = () => {
    if (!currentList?.items.length) {
      currentList = null;
      return;
    }
    const block: LegalBlock = {
      type: "list",
      ordered: currentList.ordered,
      items: currentList.items.map(normalizeText),
    };
    if (currentSection) currentSection.blocks.push(block);
    else intro.push(block);
    currentList = null;
  };

  for (; index < lines.length; index += 1) {
    const trimmed = lines[index]?.trim() ?? "";

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (isSectionHeader(trimmed)) {
      flushParagraph();
      flushList();
      currentSection = {
        heading: normalizeText(trimmed),
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (isBulletLine(trimmed)) {
      flushParagraph();
      if (!currentList || currentList.ordered) {
        flushList();
        currentList = { ordered: false, items: [] };
      }
      currentList.items.push(stripBullet(trimmed));
      continue;
    }

    if (isNumberedListItem(trimmed)) {
      flushParagraph();
      if (!currentList || !currentList.ordered) {
        flushList();
        currentList = { ordered: true, items: [] };
      }
      currentList.items.push(stripNumberedPrefix(trimmed));
      continue;
    }

    flushList();
    paragraph += paragraph ? ` ${trimmed}` : trimmed;
  }

  flushParagraph();
  flushList();

  return { title, effectiveDate, intro, sections };
}

export function getLegalDocument(slug: LegalDocumentSlug): LegalDocument {
  const filename = DOCUMENT_FILES[slug];
  const filePath = path.join(process.cwd(), filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = parseLegalText(raw);

  return {
    slug,
    ...parsed,
  };
}

export function getLegalDocumentMeta(slug: LegalDocumentSlug) {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug)!;
}

export function isLegalDocumentSlug(value: string): value is LegalDocumentSlug {
  return value in DOCUMENT_FILES;
}
