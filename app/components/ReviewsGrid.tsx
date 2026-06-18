"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import type { Review } from "../lib/data";
import Reveal from "./Reveal";

interface ReviewsGridProps {
  reviews: Review[];
}

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  if (reviews.length === 0) {
    return (
      <p className="mt-12 text-center text-muted">
        No reviews to display yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <Reveal
          as="article"
          key={review.id}
          delay={(i % 3) * 90}
          className="relative flex h-full flex-col rounded-2xl border border-brdr bg-surface/60 p-6 transition-shadow hover:shadow-lg"
        >
          <ReviewCardContent review={review} />
        </Reveal>
      ))}
    </div>
  );
}

function ReviewCardContent({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || expanded) return;

    const checkOverflow = () => {
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.body, expanded]);

  return (
    <>
      <Quote className="h-8 w-8 text-primary-100" aria-hidden />
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-secondary text-secondary" />
        ))}
      </div>

      <div className="mt-3 flex-1">
        <p
          ref={bodyRef}
          id={`review-body-${review.id}`}
          className={`text-[15px] leading-7 text-foreground/90 ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          &ldquo;{review.body}&rdquo;
        </p>

        {(isTruncated || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
            aria-expanded={expanded}
            aria-controls={`review-body-${review.id}`}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-brdr pt-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {review.initials}
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{review.name}</p>
          <p className="text-xs text-muted">{review.role}</p>
        </div>
      </div>
    </>
  );
}
