// @ts-nocheck
'use client'

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ParasManorFloorCarousel = () => {
    const imageSrc = [
        "/images/paras-manor/floor_plan_1.jpg",
        "/images/paras-manor/floor_plan_2.jpg",
        // "/images/paras-manor/fp.jpg",
    ]

  return (
    <div className= "w-full max-w-2xl mx-auto">
      <Card className='border-none shadow-none'>
        <CardContent className="p-1">
          <Carousel className="w-full">
            <CarouselContent>
              {imageSrc.map((url, index) => (
                <CarouselItem key={index}>
                    <Image 
                      src={url} 
                      alt={`Paras Manor Floor Plan ${index + 1}`} 
                      width={600}
                      height={300}
                      className="rounded-lg object-cover" 
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="relative -bottom-10 left-0 right-auto translate-x-5" />
            <CarouselNext className="relative -bottom-10 left-0 right-auto translate-x-10" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};


export default ParasManorFloorCarousel;