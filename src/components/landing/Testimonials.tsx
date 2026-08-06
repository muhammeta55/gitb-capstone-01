import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";

// Local to this section — not shared UI, so it doesn't live in
// components/ui/. Renders `rating` filled stars out of 5.
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "h-4 w-4 fill-accent text-accent"
              : "h-4 w-4 text-border"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("landing.testimonials");
  const featured = testimonials.slice(0, 6);

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
          {t("title")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col gap-4">
              <StarRating rating={testimonial.rating} />
              <p className="text-sm text-text">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
