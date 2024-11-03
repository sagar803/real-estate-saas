// @ts-nocheck
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useInView } from 'react-intersection-observer';
import { supabase } from '@/lib/supabaseClient';

const VideoCarousel = ({ route, title, description }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(undefined);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const { ref: containerRef, inView } = useInView({ threshold: 0.5 });
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('videos')
        .eq('route', route)

      if (error) {
        setError(error.message);
      } else {
        if(data.length > 0) {
          const allVideos = data.flatMap(row => row.videos);
          setVideos(allVideos.length > 0 ? allVideos : []);
        }
      }
      setLoading(false);
    };

    fetchVideos();
  }, [route]);

  useEffect(() => {
    if (carouselApi) {
      const handleSelect = () => {
        setCurrentSlide(carouselApi.selectedScrollSnap());
      };

      carouselApi.on("select", handleSelect);

      // Cleanup on component unmount
      return () => {
        carouselApi.off("select", handleSelect);
      };
    }
  }, [carouselApi]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentSlide && video && inView) {
        video.play().catch(error => {
          console.error("Autoplay was prevented:", error);
        });
      } else if (video) {
        video.pause();
      }
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, [currentSlide, inView]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div ref={containerRef} className="w-full h-full max-w-2xl mx-auto space-y-6">
      <Card className='border-none shadow-none bg-transparent'>
        <CardContent className="p-1">
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={index}>
                  <video 
                    ref={el => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    width="100%" 
                    controls
                    playsInline
                    className="focus:outline-none rounded-lg"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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

export default VideoCarousel;
