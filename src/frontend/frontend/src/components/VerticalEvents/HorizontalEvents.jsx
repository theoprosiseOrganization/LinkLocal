/**
 * Horizontal Component
 *
 * This component displays a horizontal carousel of events.
 * Each event is represented by an EventCard component.
 * The carousel allows users to scroll through events horizontally.
 * If there are no events, a message is displayed indicating that there are no events to show
 *
 * @component
 * @example
 * <HorizontalEvents events={eventsArray} />
 * * @param {Array} events - An array of event objects to be displayed in the carousel.
 * * @returns {JSX.Element} The JSX element representing the horizontal events carousel.
 */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import EventCard from "../EventCard/EventCard";
import Autoplay from "embla-carousel-autoplay"


export default function HorizontalEvents({ events = [] }) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      orientation="horizontal"
      className="w-full h-full max-w-xs"
      plugins={[
        Autoplay({ delay: 2000, stopOnInteraction: true }),
      ]}
    >
      <CarouselContent className="-mt-1" style={{ height: "100%" }}>
        {events.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No events to display
          </div>
        ) : (
          events.map((event, index) => (
            <CarouselItem
              key={event.id || index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <EventCard event={event} />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
