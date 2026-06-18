import type { ListingStatus } from "./property-types";

export type PropertyCategory = "ours" | "customer-listing";

export const siteContact = {
  phone: "+2347017085158",
  phoneDisplay: "+234 701 708 5158",
  email: "app.jaza.ng@gmail.com",
  address: "Suite 796 Block A-4 HFP Eastline Complex, Lekki, Lagos State.",
} as const;

export const propertyTabs: { key: PropertyCategory; label: string }[] = [
  { key: "ours", label: "Our Properties" },
  { key: "customer-listing", label: "Customer Listing" },
];

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  body: string;
  initials: string;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export const statusStyles: Record<ListingStatus, string> = {
  Verified: "bg-primary-50 text-primary",
  "Selling Fast": "bg-secondary/15 text-secondary-dark",
  "New Launch": "bg-primary text-white",
  "Few Plots Left": "bg-red-50 text-red-600",
  "On sale": "bg-secondary/15 text-secondary-dark",
};
