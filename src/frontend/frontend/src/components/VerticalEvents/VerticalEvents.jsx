import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

export default function VerticalEvents() {
  return (
    <Carousel orientation="vertical | horizontal">
      <CarouselContent>
        <CarouselItem>Event 1</CarouselItem>
        <CarouselItem>Event 2</CarouselItem>
        <CarouselItem>Event 3</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
