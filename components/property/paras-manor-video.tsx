// @ts-nocheck
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ParasManorDetailsButton, ParasManorImageGalleryButton } from './paras-manor-buttons'
import ParasManorImageCarousel from './paras-manor/pm-image-carousel'
import ParasManorVideosCarousel from './paras-manor/pm-video-carousel'

const ParasManorVideos = () => {

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <ParasManorVideosCarousel />
      <div className='flex flex-col sm:flex-row gap-2 pt-2'>
        <ParasManorImageGalleryButton />
        <ParasManorDetailsButton />
      </div>
    </div>
  )
}

export default ParasManorVideos