import { Star } from "lucide-react";
import {
  computeAverageRating,
  fetchApprovedReviews,
} from "../lib/flora-api";
import ReviewsGrid from "./ReviewsGrid";

export default async function Reviews() {
  const reviews = await fetchApprovedReviews();
  const averageRating = computeAverageRating(reviews);

  return (
    <section id="reviews" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-dark">
            Customer Reviews
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Buyers who own with confidence
          </h2>
          {reviews.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating)
                        ? "fill-secondary text-secondary"
                        : "text-brdr"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-muted">
                <span className="font-bold text-foreground">
                  {averageRating.toFixed(1)}/5
                </span>{" "}
                from {reviews.length} verified{" "}
                {reviews.length === 1 ? "buyer" : "buyers"}
              </p>
            </div>
          )}
        </div>

        <ReviewsGrid reviews={reviews} />
      </div>
    </section>
  );
}
