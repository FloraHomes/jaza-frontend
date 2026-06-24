export interface FAQBulletGroup {
  title?: string;
  items: string[];
}

export interface FAQItem {
  question: string;
  answer: string[];
  bulletGroups?: FAQBulletGroup[];
}

export interface FAQGroup {
  eyebrow: string;
  title: string;
  description: string;
  items: FAQItem[];
}

export const faqGroups: FAQGroup[] = [
  {
    eyebrow: "Platform and trust",
    title: "Everything buyers ask before they commit",
    description:
      "Clear answers on titles, allocations, verification, and what makes the buying process secure.",
    items: [
      {
        question: "What is Jaza & Sakeenah?",
        answer: [
          "Jaza & Sakeenah is a technology-driven estate land platform that lets you complete your land purchase online in minutes. You can browse available properties, verify location details, sign agreements digitally before payment, pay securely, download documents instantly, and receive allocation immediately from your mobile device.",
          "Properties listed on the platform are verified, surveyed, titled, designed, pre-allocated, and fenced within pre-developed estate environments with road networks. They are suited for residential use, development, short-let projects, commercial use, investment, land banking, and other legitimate real estate purposes.",
        ],
      },
      {
        question:
          "Why should I buy through the web app instead of offline channels that can be risky?",
        answer: [
          "Jaza & Sakeenah is built on a verifiable physical estate system where every property is tied to real land with identifiable plot addresses that can be confirmed before purchase. The estates are physically accessible, and the company details are visible for accountability beyond the digital experience.",
          "The platform also includes real-time property availability tracking, so listings cannot be oversold. Once a property reaches full subscription, it is automatically closed to further purchases.",
          "That combination means ownership is not only digitally processed, but also physically verifiable, traceable, and secured for immediate possession after purchase.",
        ],
      },
      {
        question: "Who is the developer of Jaza & Sakeenah Estates?",
        answer: [
          "Jaza & Sakeenah Company Limited is the property development and real estate investment company behind the platform. The company focuses on making land ownership transparent, secure, and accessible through technology-driven solutions, with its head office at Suite 796, Block A-4, HFP Eastline Complex, Lekki, Lagos State, Nigeria.",
        ],
      },
      {
        question: "Are the lands titled?",
        answer: [
          "Yes. Every property listed on Jaza & Sakeenah comes with verifiable title, and the applicable title is stated on the property's information page before purchase.",
        ],
      },
      {
        question: "Are the properties free from encumbrances?",
        answer: [
          "Yes. Listed properties are verified, surveyed, gated, fenced, and secured within organized estate environments with road networks. They are free from known government acquisition, adverse third-party claims, and other encumbrances.",
        ],
      },
      {
        question: "When will I receive my allocation?",
        answer: [
          'Allocation is issued immediately once the purchase process is successfully completed through the first download of allocation documents. There is no "allocation coming soon" waiting period.',
        ],
      },
      {
        question:
          "How do I know my plot will not be issued to someone else now or later?",
        answer: [
          "The web app uses an automated tracking and allocation system that records every sale in real time and ensures immediate allocation on purchase, including installment purchases.",
          "It also tracks progress up to 100% completion, so once an estate is sold out, no further allocations can be made beyond the available inventory. Every allocation letter carries a unique reference number, and your plot remains yours unless you formally initiate a transfer.",
        ],
      },
    ],
  },
  {
    eyebrow: "Payments and process",
    title: "How the purchase flow works from first click to documents",
    description:
      "Straight answers on payment structure, inspections, hidden fees, document delivery, refunds, and how to get started.",
    items: [
      {
        question: "Do you offer installment payment plans?",
        answer: [
          "Yes. Depending on the property, buyers may have outright purchase options, installment payment plans, or both. Each property page shows its available payment structure.",
        ],
      },
      {
        question: "What plot sizes are available?",
        answer: [
          "Available plot sizes vary by estate and property category. The specific property page shows the sizes and pricing available for that listing.",
        ],
      },
      {
        question: "Can I inspect the property location before purchasing?",
        answer: [
          "Yes. Every property includes accurate location information and map references, so you can verify the estate location through physical inspection or online navigation before making payment.",
        ],
      },
      {
        question: "Are the estates accessible?",
        answer: [
          "Yes. All properties are within accessible locations and estate environments with planned or existing road networks that serve each plot.",
        ],
      },
      {
        question: "Are there hidden charges after payment?",
        answer: [
          "No. Jaza & Sakeenah is built on transparency, and all applicable fees connected to a property are disclosed before payment and agreement execution.",
        ],
      },
      {
        question: "What documents do I receive after purchase?",
        answer: [
          "The exact documents depend on the transaction type, but buyers receive the applicable purchase records and ownership documents tied to their purchase stage.",
        ],
        bulletGroups: [
          {
            title: "Documents that may apply",
            items: [
              "Purchase Agreement",
              "Payment Receipt",
              "Allocation Letter",
              "Registered Survey",
              "Deed of Assignment",
            ],
          },
          {
            title: "Ready for immediate download on installment purchases",
            items: ["Purchase Agreement", "Payment Receipt"],
          },
          {
            title: "Ready for immediate download on outright or fully completed purchases",
            items: [
              "Purchase Agreement",
              "Payment Receipt",
              "Allocation Letter",
            ],
          },
          {
            title: "Post-completion processing",
            items: [
              "Registered Survey: original copy dispatched and scanned copy uploaded to your account",
              "Deed of Assignment: original copy dispatched and scanned copy uploaded to your account",
            ],
          },
        ],
      },
      {
        question: "How do I make payment securely?",
        answer: [
          "All payments must be made through the official Jaza & Sakeenah purchase process on the app. Buyers should never pay individuals outside the approved payment channels shown during checkout.",
        ],
      },
      {
        question:
          "What happens if I cannot continue with the payment? Can I get a refund?",
        answer: [
          "Whether purchased outright or on installment, transactions are treated as completed land purchases because plots are allocated immediately upon purchase, even when an installment buyer's allocation letter is still pending on the dashboard.",
          "Refunds are not issued directly. Value recovery is only possible through resale of the allocated plot. Self-resale is available for fully completed purchases, while the company may facilitate resale for incomplete and outright purchase types. In every case, resale depends on market demand and availability.",
        ],
      },
      {
        question: "How do I get started?",
        answer: [
          "Browse available properties, select your preferred plot, confirm its verified location, review and sign the agreement digitally, complete payment, download your documents, and receive allocation instantly from your mobile device.",
        ],
      },
    ],
  },
  {
    eyebrow: "Ownership after purchase",
    title: "What happens once the land is yours",
    description:
      "Guidance on development, estate rules, resale options, and what ownership allows after allocation.",
    items: [
      {
        question: "Can I begin development on my property?",
        answer: [
          "Yes. Subject to the estate's development guidelines and regulatory requirements, landowners may begin development after meeting the necessary ownership and compliance requirements.",
        ],
      },
      {
        question: "Is there a deadline to start building?",
        answer: [
          "No. There is generally no mandatory construction deadline unless a specific estate or property states otherwise.",
        ],
      },
      {
        question: "Are there building design restrictions?",
        answer: [
          "Development guidelines may vary from one estate to another. Any restrictions or requirements are detailed in the information section of each property before purchase.",
        ],
      },
      {
        question: "Can I resell my property?",
        answer: [
          'Yes. Property owners can resell their plots. Once your purchase is completed, a "Resell" option becomes available in your account so you can generate and copy your property listing link for sharing.',
        ],
      },
      {
        question: "Can Jaza & Sakeenah assist me in reselling my property?",
        answer: [
          "Yes. Property owners may request help from Jaza & Sakeenah in connecting with prospective buyers and facilitating a smooth transfer process. However, resale still depends on market demand and availability, so immediate resale is not guaranteed.",
        ],
      },
    ],
  },
];
