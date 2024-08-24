// @ts-nocheck
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ParasManorImageGalleryButton } from './paras-manor-buttons'
import ParasManorImageCarousel from './paras-manor/pm-image-carousel'
import ParasManorVideosCarousel from './paras-manor/pm-video-carousel'


const ParasManorVideos = () => {

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <ParasManorVideosCarousel />
      <hr className="border-t border-gray-200" />
      <ParasManorImageGalleryButton />
    </div>
  )
}

export default ParasManorVideos