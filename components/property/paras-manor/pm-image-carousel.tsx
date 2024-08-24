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
import { ParasManorVideoButton } from './paras-manor-buttons';

const ParasManorImageCarousel = () => {
  const imageUrls = Array.from({ length: 8 }, (_, i) => 
    `https://www.themanorparas.com/assets/img/gallery/gallery-n${i + 1}.jpg`
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className='border-none shadow-none'>
        <CardContent className="p-1">
          <Carousel className="w-full">
            <CarouselContent>
              {imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                    <Image 
                      src={url} 
                      alt={`Paras Manor Gallery Image ${index + 1}`} 
                      width={600}
                      height={300}
                      layout="responsive"
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


export default ParasManorImageCarousel;