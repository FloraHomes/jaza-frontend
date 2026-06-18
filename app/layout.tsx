import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { siteContact } from "./lib/data";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://jazasakeenah.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jazã & Sakeenah | Own Verified Land in Africa in 5 Minutes",
    template: "%s | Jazã & Sakeenah",
  },
  description:
    "Jazã & Sakeenah is a secure digital real estate platform for buying verified, titled and surveyed land across Africa. Browse, sign, pay and get instant allocation in minutes — secure, transparent and instant.",
  keywords: [
    "buy land in Nigeria",
    "verified land for sale",
    "digital real estate Africa",
    "land allocation",
    "titled land Lagos",
    "real estate investment Africa",
    "surveyed land for sale",
    "secure land purchase",
    "Jaza Sakeenah",
  ],
  authors: [{ name: "Jazã & Sakeenah" }],
  creator: "Jazã & Sakeenah",
  publisher: "Jazã & Sakeenah",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Jazã & Sakeenah",
    title: "Own Verified Land in Africa in 5 Minutes | Jazã & Sakeenah",
    description:
      "Secure, transparent and instant digital real estate. Browse verified land, sign digitally, pay securely and download your documents instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jazã & Sakeenah — Own verified land in 5 minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Own Verified Land in Africa in 5 Minutes | Jazã & Sakeenah",
    description:
      "Secure, transparent and instant digital real estate. Own verified land across Africa in minutes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Jazã & Sakeenah",
  description:
    "A secured digital real estate asset trading and management platform for owning verified landed property across Africa.",
  url: SITE_URL,
  telephone: siteContact.phone,
  email: siteContact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteContact.address,
    addressLocality: "Lekki",
    addressCountry: "NG",
  },
  areaServed: "Africa",
  knowsAbout: [
    "Land sales",
    "Real estate",
    "Property allocation",
    "Digital land titling",
  ],
  slogan: "Own verified Land in 5 Minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}

        <script
          src="https://widget.zorachat.ai/zora-widget/universalWidget.js"
          data-key="zc_live_VJVAP1MVWkbfX3X1iU9Cr5LG"
          data-api-base="https://api.zorachat.ai"
          defer
        ></script>
      </body>
    </html>
  );
}
