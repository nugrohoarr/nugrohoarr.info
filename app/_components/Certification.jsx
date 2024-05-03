import * as React from "react"
import { certicate } from "@/lib/certificates";
import { Link } from "next/link";
import { ArrowUpRight } from "lucide-react";


import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Certification() {
  return (
    <div className="relative grid place-content-center py-12 px-4 sm:py-12 sm:px-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="flex gap-2 sm:gap-3 flex-wrap items-center justify-center rounded-md max-w-3xl mx-auto relative"
      >
        <CarouselContent>
          {certicate.map((item, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 p-1">
              <Card className="border bg-background dark:bg-secondary card-mobile-small">
                <CardContent className="flex flex-col items-center justify-center p-2 sm:p-5">
                  <img src={item.image} alt={item.title} className="w-3/4 sm:w-full max-w-xs h-auto mb-2 img-mobile-small"/>
                  <p className="text-xs text-center">{item.description}</p>
                  <p className="text-xs sm:text-sm text-primary mt-5">
                    <a href={item.credential || "/"} target="_blank" rel="noopener noreferrer">Credential</a>
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="CarouselPrevious" />
        <CarouselNext className="CarouselNext" />
      </Carousel>
    </div>
  );
}



