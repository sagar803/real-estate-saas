// @ts-nocheck
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useInView } from 'react-intersection-observer'
import { ParasManorImageGalleryButton } from './paras-manor-buttons'

const ParasManorVideosCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
  })

  const videos = [
    "https://www.themanorparas.com/video/paras-Movie-whatsapp.mp4",
    "https://www.themanorparas.com/video/Paras-Drone-Whatsapp.mp4"
  ]

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentSlide && video && inView) {
        video.play().catch(error => {
          console.error("Autoplay was prevented:", error)
        })
      } else if (video) {
        video.pause()
        // video.currentTime = 0
      }
    })

    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause()
          // video.currentTime = 0
        }
      })
    }
  }, [currentSlide, inView])

  return (
    <div ref={containerRef} className="w-full h-full max-w-2xl mx-auto space-y-6">
      <Card className='border-none shadow-none'>
        <CardContent className="p-1">
          <Carousel 
            className="w-full"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={index}>
                  <video 
                    ref={el => {
                      if (el) videoRefs.current[index] = el
                    }}
                    width="100%" 
                    controls
                    playsInline
                    className="focus:outline-none rounded-lg"
                  >
                    <source src={video} type="video/mp4" />
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
  )
}
export default ParasManorVideosCarousel;

