// @ts-nocheck
'use client'

import React from 'react';
import PropertyCard from './property-card';

const PropertyDetails = ({ listings }) => {
  console.log(listings)
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {listings?.map((listing, idx) => <PropertyCard key={idx} listing={listing} idx={idx}/>)}
    </div>
  );
};

export default PropertyDetails;
