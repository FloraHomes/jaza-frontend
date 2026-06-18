import { fetchHomepageProperties } from "../lib/flora-api";
import PropertyListingsClient from "./PropertyListingsClient";

export default async function PropertyListings() {
  const { ours, customerListing } = await fetchHomepageProperties();

  return (
    <PropertyListingsClient ours={ours} customerListing={customerListing} />
  );
}
