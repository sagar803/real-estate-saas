// @ts-nocheck
'use client'

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ParasManorDetailsButton, ParasManorVideoButton } from './paras-manor-buttons';
import ParasManorImageCarousel from './paras-manor/pm-image-carousel';

const ParasManorImageGallery = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <ParasManorImageCarousel />
      <div className='flex flex-col sm:flex-row gap-2 pt-2'>
        <ParasManorVideoButton />
        <ParasManorDetailsButton />
      </div>
    </div>
  );
};


export default ParasManorImageGallery;