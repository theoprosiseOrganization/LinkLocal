import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import EventCard from "../EventCard/EventCard";

export default function VerticalEvents({ events = [] }) {
  let carouselLength = events.length ? events.length <3 : 3;
  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className={`-mt-${carouselLength} h-[600px}`}>
        {events.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No events to display</div>
        ) : (
          events.map((event, index) => (
            <CarouselItem key={event.id || index} className="pt-1 md:basis-1/3">
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