import type { LegalBlock, LegalSection } from "../lib/legal-documents";

interface LegalDocumentContentProps {
  intro: LegalBlock[];
  sections: LegalSection[];
}

export default function LegalDocumentContent({
  intro,
  sections,
}: LegalDocumentContentProps) {
  return (
    <div className="space-y-8 text-base leading-8 text-foreground/90">
      {intro.length > 0 && (
        <div className="space-y-4">
          {intro.map((block, index) => (
            <LegalBlockView key={`intro-${index}`} block={block} />
          ))}
        </div>
      )}

      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.blocks.map((block, index) => (
              <LegalBlockView key={`${section.heading}-${index}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return <p>{block.text}</p>;
  }

  const ListTag = block.ordered ? "ol" : "ul";

  return (
    <ListTag
      className={
        block.ordered
          ? "list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary"
          : "list-disc space-y-2 pl-6 marker:text-primary"
      }
    >
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
}
