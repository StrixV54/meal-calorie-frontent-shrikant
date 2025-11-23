"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const features = [
  {
    title: "Fast Lookup",
    description:
      "Search any dish and get calorie info instantly from the USDA database.",
  },
  {
    title: "History Tracking",
    description:
      "Keep track of your meal searches and review them anytime.",
  },
  {
    title: "Secure",
    description:
      "Your data is protected with secure authentication.",
  },
];

export function FeaturesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = features.length;

  useEffect(() => {
    if (!api) {
      return;
    }

    // set initial values
    const updateCurrent = () => setCurrent(api.selectedScrollSnap());
    updateCurrent();

    // listen for changes
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-0">
        <h2 className="mb-10 text-center text-2xl font-bold">Features</h2>

        {/* Mobile: Carousel */}
        <div className="md:hidden -mx-4">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className={`pl-4 ${index === 0 ? "basis-[80%]" : "basis-[85%]"}`}
                >
                  <div className="rounded-lg border bg-card p-6 shadow-sm h-full">
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
