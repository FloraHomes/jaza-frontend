import type { PropertyCategory } from "./data";

export type PropertySource = "ours" | "customer-listing";

export type ListingStatus =
  | "Verified"
  | "Selling Fast"
  | "New Launch"
  | "Few Plots Left"
  | "On sale";

export interface ListingProperty {
  id: string;
  source: PropertySource;
  apiId: string;
  title: string;
  location: string;
  state: string;
  price: number;
  oldPrice?: number;
  size: string;
  coverPhoto?: string;
  photo?: string;
  image: string;
  images: string[];
  badge?: string;
  status: ListingStatus;
  categories: PropertyCategory[];
  titleDoc: string;
  rating?: number;
  description: string;
  features: string[];
  documents: string[];
  amenities: string[];
  plotsAvailable?: number;
  paymentPlan?: string;
  planNumber?: string;
  coordinatesWGS84?: string;
  coordinatesUTM?: string;
  lat?: number;
  lng?: number;
  instantAllocation: boolean;
  fenced?: boolean;
  surveyed?: boolean;
  preDeveloped?: boolean;
  listedBy?: string;
  otherFee?: number;
  otherFeeTitle?: string;
  surveyFee?: number;
  deedFee?: number;
  /** Percentage of estate sold (Our Properties only, 0–100). */
  percentageSold?: number;
  isSoldOut?: boolean;
  updatedAt: string;
}

const FALLBACK_CARD_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

/**
 * Flora/Cloudinary sometimes use filenames like `null.jpg` (valid).
 * Only reject empty values and broken placeholders (e.g. path ending in `/null`).
 */
export function isValidPropertyImageUrl(url?: string): url is string {
  const u = url?.trim();
  if (!u || u === "null") return false;
  if (/undefined/i.test(u)) return false;
  if (/\/null$/i.test(u)) return false;
  return true;
}

/** Main image on property cards: coverPhoto || photo */
export function getPropertyCardImage(property: ListingProperty): string {
  if (isValidPropertyImageUrl(property.coverPhoto)) return property.coverPhoto.trim();
  if (isValidPropertyImageUrl(property.photo)) return property.photo.trim();

  return property.image || FALLBACK_CARD_IMAGE;
}
