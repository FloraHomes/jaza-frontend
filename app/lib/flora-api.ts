import type { PropertyCategory, Review } from "./data";
import {
  isValidPropertyImageUrl,
  type ListingProperty,
  type ListingStatus,
  type PropertySource,
} from "./property-types";

const OWN_EARNER_URL =
  "https://florahomes-backend.herokuapp.com/api/properties/ownEarner";
const CUSTOMER_LISTINGS_URL =
  "https://florahomes-backend.herokuapp.com/api/property-resell/onsale";
const APPROVED_REVIEWS_URL =
  "https://florahomes-backend.herokuapp.com/api/review/approved-reviews";

const REVALIDATE_SECONDS = 300;

interface ApiFeature {
  feature: string;
}

interface ApiPropertyBase {
  _id: string;
  name: string;
  caption?: string;
  content?: string;
  features?: ApiFeature[];
  area?: string;
  title?: string;
  photo?: string;
  coverPhoto?: string;
  otherPhotos?: string[];
  currentPricePerPlot?: string | number;
  promoPrice?: string | number;
  unitsPerPlot?: string | number;
  landSize?: string | number;
  status?: string;
  otherDocuments?: string;
  otherFee?: string | number;
  otherFeeTitle?: string;
  surveyFee?: string | number;
  deedFee?: string | number;
  devLevy?: string | number;
  updatedAt?: string;
  createdAt?: string;
  percentageProperty?: number;
  buyerOptions?: string[];
  planNumber?: string;
  coordinatesWGS84?: string;
  coordinatesUTM?: string;
  lat?: string | number;
  lng?: string | number;
}

interface OwnEarnerProperty extends ApiPropertyBase {
  visibility?: boolean;
  info?: { infoFeature?: string[] }[];
}

interface CustomerListingItem {
  _id: string;
  price: string;
  status: string;
  landSize: string;
  property: ApiPropertyBase;
  listedBy?: { firstName?: string; lastName?: string };
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseArea(area: string): { location: string; state: string } {
  const cleaned = area.replace(/\.\s*$/, "").trim();
  const parts = cleaned.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const state = parts[parts.length - 1].replace(/\s*Nigeria\s*/i, "").trim();
    const location = parts.slice(0, -1).join(", ");
    return { location, state };
  }
  return { location: cleaned || "Nigeria", state: "Nigeria" };
}

function parseNumber(value: string | number | undefined): number {
  if (value === undefined || value === "") return 0;
  const n = typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function parseGeoCoord(value: string | number | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  return Number.isFinite(n) ? n : undefined;
}

function mapLocationFields(raw: ApiPropertyBase) {
  const lat = parseGeoCoord(raw.lat);
  const lng = parseGeoCoord(raw.lng);
  const coordinatesWGS84 = raw.coordinatesWGS84?.trim();
  const coordinatesUTM = raw.coordinatesUTM?.trim();
  const planNumber = raw.planNumber?.trim();

  return {
    planNumber: planNumber || undefined,
    coordinatesWGS84: coordinatesWGS84 || undefined,
    coordinatesUTM: coordinatesUTM || undefined,
    lat: lat !== undefined && lng !== undefined ? lat : undefined,
    lng: lat !== undefined && lng !== undefined ? lng : undefined,
  };
}

function mapListingStatus(apiStatus?: string, source?: PropertySource): ListingStatus {
  if (apiStatus === "On sale") return "On sale";
  if (apiStatus === "Active") return source === "customer-listing" ? "Selling Fast" : "Verified";
  if (apiStatus === "Closed") return "Few Plots Left";
  return "Verified";
}

const FALLBACK_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

/** Main image is coverPhoto || photo; gallery lists all unique images with main first. */
function resolvePropertyImages(
  coverPhoto?: string,
  photo?: string,
  otherPhotos: string[] = []
): { image: string; images: string[] } {
  const image =
    (isValidPropertyImageUrl(coverPhoto) && coverPhoto) ||
    (isValidPropertyImageUrl(photo) && photo) ||
    FALLBACK_PROPERTY_IMAGE;

  const images: string[] = [];
  const seen = new Set<string>();
  const push = (url?: string) => {
    if (isValidPropertyImageUrl(url) && !seen.has(url)) {
      seen.add(url);
      images.push(url);
    }
  };

  push(image);
  push(coverPhoto);
  push(photo);
  otherPhotos.forEach(push);

  return {
    image,
    images: images.length > 0 ? images : [FALLBACK_PROPERTY_IMAGE],
  };
}

function buildDocuments(titleDoc?: string, otherDocuments?: string): string[] {
  const docs = [
    "Allocation Letter",
    "Purchase Agreement",
    "Payment Receipt",
  ];
  if (titleDoc) docs.push(titleDoc);
  if (otherDocuments) {
    otherDocuments.split(",").forEach((d) => {
      const trimmed = d.trim();
      if (trimmed && !docs.includes(trimmed)) docs.push(trimmed);
    });
  }
  return docs;
}

/** First N items in API response order. */
export function takeFirst(items: ListingProperty[], count: number): ListingProperty[] {
  return items.slice(0, count);
}

/** Round sold percentage to nearest 10 (e.g. 99.4 → 100, 27 → 30). */
export function roundPercentageSold(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value / 10) * 10));
}

export function mapOwnEarnerProperty(raw: OwnEarnerProperty): ListingProperty {
  const promo = parseNumber(raw.promoPrice);
  const current = parseNumber(raw.currentPricePerPlot);
  const price = promo > 0 ? promo : current;
  const oldPrice = promo > 0 && current > promo ? current : undefined;
  const { location, state } = parseArea(raw.area ?? "");
  const { image, images } = resolvePropertyImages(
    raw.coverPhoto,
    raw.photo,
    raw.otherPhotos ?? []
  );
  const description =
    stripHtml(raw.content ?? "") ||
    raw.caption ||
    "Verified land listed by Jazã & Sakeenah.";
  const features =
    raw.features?.map((f) => f.feature).filter(Boolean) ??
    raw.info?.[0]?.infoFeature ??
    [];

  const percentageSold =
    raw.percentageProperty !== undefined
      ? roundPercentageSold(Number(raw.percentageProperty))
      : undefined;
  const isSoldOut = percentageSold !== undefined && percentageSold >= 100;

  return {
    id: `ours-${raw._id}`,
    source: "ours",
    apiId: raw._id,
    title: raw.name,
    location,
    state,
    price,
    oldPrice,
    size: `${raw.unitsPerPlot ?? raw.landSize ?? "—"} sqm`,
    coverPhoto: raw.coverPhoto,
    photo: raw.photo,
    image,
    images,
    badge: isSoldOut ? undefined : oldPrice ? "PROMO" : undefined,
    isSoldOut,
    percentageSold,
    status: isSoldOut ? "Few Plots Left" : mapListingStatus(raw.status, "ours"),
    categories: ["ours"],
    titleDoc: raw.title ?? "Title Document",
    description,
    features: features.slice(0, 8),
    documents: buildDocuments(raw.title, raw.otherDocuments),
    amenities: features.slice(0, 6),
    otherFee: parseNumber(raw.otherFee),
    otherFeeTitle: raw.otherFeeTitle?.trim() || undefined,
    surveyFee: parseNumber(raw.surveyFee),
    deedFee: parseNumber(raw.deedFee),
    devLevy: parseNumber(raw.devLevy),
    plotsAvailable: raw.percentageProperty
      ? Math.round(parseNumber(raw.landSize) * (1 - raw.percentageProperty / 100))
      : undefined,
    paymentPlan:
      raw.buyerOptions?.length
        ? `Options: ${raw.buyerOptions.join(", ")}`
        : "Outright or instalment plans available",
    instantAllocation: true,
    fenced: true,
    surveyed: Boolean(raw.otherDocuments?.toLowerCase().includes("survey")),
    preDeveloped: true,
    ...mapLocationFields(raw),
    updatedAt: raw.updatedAt ?? raw.createdAt ?? new Date().toISOString(),
  };
}

export function mapCustomerListing(raw: CustomerListingItem): ListingProperty {
  const p = raw.property;
  const { location, state } = parseArea(p.area ?? "");
  const { image, images } = resolvePropertyImages(
    p.coverPhoto,
    p.photo,
    p.otherPhotos ?? []
  );
  const price = parseNumber(raw.price);
  const description =
    stripHtml(p.content ?? "") ||
    p.caption ||
    `Customer listing at ${p.name}.`;
  const features = p.features?.map((f) => f.feature).filter(Boolean) ?? [];
  const listedBy = raw.listedBy
    ? `${raw.listedBy.firstName ?? ""} ${raw.listedBy.lastName ?? ""}`.trim()
    : undefined;

  return {
    id: `customer-${raw._id}`,
    source: "customer-listing",
    apiId: raw._id,
    title: p.name,
    location,
    state,
    price,
    size: `${raw.landSize} sqm`,
    coverPhoto: p.coverPhoto,
    photo: p.photo,
    image,
    images,
    badge: "CUSTOMER LISTING",
    status: mapListingStatus(raw.status, "customer-listing"),
    categories: ["customer-listing"],
    titleDoc: p.title ?? "Title Document",
    description,
    features: features.slice(0, 8),
    documents: buildDocuments(p.title, p.otherDocuments),
    amenities: features.slice(0, 6),
    otherFee: parseNumber(p.otherFee),
    otherFeeTitle: p.otherFeeTitle?.trim() || undefined,
    surveyFee: parseNumber(p.surveyFee),
    deedFee: parseNumber(p.deedFee),
    devLevy: parseNumber(p.devLevy),
    listedBy,
    paymentPlan: "Contact advisor for transfer details",
    instantAllocation: true,
    ...mapLocationFields(p),
    updatedAt: raw.updatedAt ?? raw.createdAt ?? new Date().toISOString(),
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchOurProperties(): Promise<ListingProperty[]> {
  const json = await fetchJson<ApiResponse<OwnEarnerProperty[]>>(OWN_EARNER_URL);
  if (!json?.status || !Array.isArray(json.data)) return [];
  return json.data
    .filter((p) => p.status === "Active" && p.visibility !== false)
    .map(mapOwnEarnerProperty);
}

export async function fetchCustomerListings(): Promise<ListingProperty[]> {
  const json = await fetchJson<ApiResponse<CustomerListingItem[]>>(
    CUSTOMER_LISTINGS_URL
  );
  if (!json?.status || !Array.isArray(json.data)) return [];
  return json.data
    .filter((item) => item.status === "On sale" && item.property)
    .map(mapCustomerListing);
}

export async function fetchHomepageProperties(): Promise<{
  ours: ListingProperty[];
  customerListing: ListingProperty[];
}> {
  const [ours, customerListing] = await Promise.all([
    fetchOurProperties(),
    fetchCustomerListings(),
  ]);
  return {
    ours: takeFirst(ours, 3),
    customerListing: takeFirst(customerListing, 3),
  };
}

export async function fetchAllCatalogProperties(): Promise<{
  ours: ListingProperty[];
  customerListing: ListingProperty[];
}> {
  const [ours, customerListing] = await Promise.all([
    fetchOurProperties(),
    fetchCustomerListings(),
  ]);
  return { ours, customerListing };
}

export function parseListingId(
  id: string
): { source: PropertySource; apiId: string } | null {
  if (id.startsWith("ours-")) {
    return { source: "ours", apiId: id.slice(5) };
  }
  if (id.startsWith("customer-")) {
    return { source: "customer-listing", apiId: id.slice(9) };
  }
  return null;
}

export async function getListingById(id: string): Promise<ListingProperty | null> {
  const parsed = parseListingId(id);
  if (!parsed) return null;

  if (parsed.source === "ours") {
    const items = await fetchOurProperties();
    return items.find((p) => p.apiId === parsed.apiId) ?? null;
  }

  const items = await fetchCustomerListings();
  return items.find((p) => p.apiId === parsed.apiId) ?? null;
}

export async function getAllListingIds(): Promise<string[]> {
  const { ours, customerListing } = await fetchAllCatalogProperties();
  return [...ours, ...customerListing].map((p) => p.id);
}

interface ApiReviewUser {
  firstName?: string;
  lastName?: string;
}

interface ApiReview {
  _id: string;
  review: string;
  ratings?: number;
  plan?: string;
  createdAt?: string;
  user?: ApiReviewUser;
}

function buildInitials(firstName?: string, lastName?: string): string {
  const first = (firstName ?? "").trim().charAt(0);
  const last = (lastName ?? "").trim().charAt(0);
  const initials = `${first}${last}`.toUpperCase();
  return initials || "?";
}

function buildReviewerName(user?: ApiReviewUser): string {
  if (!user) return "Verified buyer";
  return `${user.firstName ?? ""} ${user.lastName ?? ""}`.replace(/\s+/g, " ").trim() || "Verified buyer";
}

function mapApiReview(raw: ApiReview): Review {
  const rating = Math.min(5, Math.max(1, Math.round(raw.ratings ?? 5)));
  return {
    id: raw._id,
    name: buildReviewerName(raw.user),
    role: raw.plan?.trim() || "Verified buyer",
    rating,
    body: raw.review.trim(),
    initials: buildInitials(raw.user?.firstName, raw.user?.lastName),
  };
}

export function computeAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 5;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  const json = await fetchJson<ApiResponse<ApiReview[]>>(APPROVED_REVIEWS_URL);
  if (!json?.status || !Array.isArray(json.data)) return [];

  const seen = new Set<string>();
  const sorted = [...json.data].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  );

  const reviews: Review[] = [];
  for (const item of sorted) {
    if (!item._id || !item.review?.trim() || seen.has(item._id)) continue;
    seen.add(item._id);
    reviews.push(mapApiReview(item));
  }

  return reviews;
}
