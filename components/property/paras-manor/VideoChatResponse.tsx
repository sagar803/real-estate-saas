// @ts-nocheck
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from 'react-intersection-observer';

const VideoChatResponse = ({ content }) => {
  const {text, time, url } = content;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;

      if (inView) {
        videoRef.current.play().catch(error => {
          console.error("Autoplay was prevented:", error);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [inView, time]);

  return (
    <div ref={containerRef} className="w-full h-full max-w-2xl mx-auto space-y-6">
      <Card className='border-none shadow-lg bg-transparent'>
        <CardContent className="p-0">
          <video 
            ref={videoRef}
            width="100%" 
            controls
            playsInline
            className="focus:outline-none rounded-lg"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default VideoChatResponse;