"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function Carousel({ children, className }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={emblaRef}>
      {children}
    </div>
  );
}

export function CarouselContent({ children }) {
  return (
    <div className="flex">
      {React.Children.map(children, (child) => (
        <div className="min-w-full">{child}</div>
      ))}
    </div>
  );
}

export function CarouselItem({ children }) {
  return <div className="relative w-full">{children}</div>;
}

export function CarouselPrevious() {
  return (
    <button
      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70 transition"
    >
      ‹
    </button>
  );
}

export function CarouselNext() {
  return (
    <button
      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70 transition"
    >
      ›
    </button>
  );
}
