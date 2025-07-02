import React from "react";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

// Accepts an array of image URLs and (optionally) alt text or captions
export default function HorizontalScroll({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {images.map((img, idx) => (
          <figure key={img.url || img} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={typeof img === "string" ? img : img.url}
                alt={img.alt || `Event image ${idx + 1}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            {img.caption && (
              <figcaption className="text-muted-foreground pt-2 text-xs">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}