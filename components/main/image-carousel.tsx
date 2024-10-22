// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';

const ImageCarousel = ({ route, title, description}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('images')
        .eq('route', route);

      if (error) {
        setError(error.message);
      } else {
        if(data.length > 0) {
          const allImages = data.flatMap(row => row.images);
          setImages(allImages.length > 0 ? allImages : []);
        }
      }
      setLoading(false);
    };

    fetchImages();
  }, [route]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p className='font-semibold pb-2'>{title}</p>
      <p className='pb-4'>{description}</p>
      <div className="w-full max-w-2xl mx-auto h-full">
        <Card className='border-none shadow-none bg-transparent'>
          <CardContent className="p-1">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image 
                      src={image.url} 
                      alt={`Image ${index + 1}`} 
                      width={700}
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
    </>
  );
};

export default ImageCarousel;
