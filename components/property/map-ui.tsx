"use client"
import React, { useState, useEffect } from 'react';
import { locationMap } from '@/lib/propertyUtils';

type Props = {
  areaId: number;
};

const PropertyMap = ({ areaId }: Props) => {
  const [loading, setLoading] = useState(true); // Track loading state
  const data = locationMap.get(areaId);  
  if (!data) return <p>Something went wrong</p>;
  
  const { iframeSrc } = data;
  const handleIframeLoad = () => setLoading(false);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
          <p>Loading map...</p>
        </div>
      )}
      <iframe
        src={iframeSrc}
        className="w-full h-full"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleIframeLoad} // Set loading to false when iframe finishes loading
      />
    </div>
  );
};

export default PropertyMap;
