// @ts-nocheck

import React from 'react';

const PropertyDetails = ({ listings }) => {
  const {
    meta,
    images,
    ratings,
    furnishingDetails,
    features
  } = listings;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{meta.location}</h2>
            <p className="text-gray-600 text-sm">{meta.address}</p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              <p className="text-gray-700">{meta.builtUpArea}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              <p className="text-gray-700">{meta.bedrooms}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              <p className="text-gray-700">{meta.bathrooms}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <p className="text-gray-700">{meta.price}</p>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <p className="text-gray-700">{meta.floorNumber}</p>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <p className="text-gray-700">{meta.facing}</p>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <p className="text-gray-700">{meta.possessionDate}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {images.slice(0, 2).map((image, index) => (
            <img key={index} src={image} alt={`Property ${index + 1}`} className="rounded-lg shadow-lg" />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700">{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Ratings:</h3>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(ratings).map(([key, value], index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-gray-700">{key}:</span>
              <span className="text-gray-700">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Furnishing Details:</h3>
        <p className="text-gray-700">{furnishingDetails}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
