/**
 * HorizontalScroll Component
 *
 * This component displays a horizontal scrollable area for images.
 * It takes an array of images and renders them in a flex container.
 * Each image is displayed in a figure element with an optional caption.
 * It uses the ScrollArea and ScrollBar components for horizontal scrolling.
 *
 *  @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.images - An array of image objects or URLs to be displayed
 * @returns {JSX.Element|null} The rendered HorizontalScroll component or null if no images are provided.
 */

import React from "react";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

export default function HorizontalScroll({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <div
        className="flex w-max space-x-4 p-4"
        style={{ background: "var(--card)" }}
      >
        {images.map((img, idx) => (
          <figure key={img.url || img} className="shrink-0 h-64 w-48">
            <div className="overflow-hidden rounded-md h-full w-full">
              <img
                src={typeof img === "string" ? img : img.url}
                alt={img.alt || `Event image ${idx + 1}`}
                className="object-cover h-full w-full"
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
