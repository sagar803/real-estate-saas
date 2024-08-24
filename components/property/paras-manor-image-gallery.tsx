// @ts-nocheck
'use client'

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ParasManorVideoButton } from './paras-manor-buttons';
import ParasManorImageCarousel from './paras-manor/pm-image-carousel';

const ParasManorImageGallery = () => {

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ParasManorImageCarousel />
      <hr className="mt-10 m-2 font-bold" />
      <ParasManorVideoButton layout='elegant' />
    </div>
  );
};


export default ParasManorImageGallery;