// @ts-nocheck
'use client'

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home, Bed, Calendar, Bath, IndianRupee, Building, Compass } from 'lucide-react';

const PropertyDetails = ({ listings }) => {
  // Settings for the feature slider
  const featureSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rows: 2, // Only one row for features
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Settings for the image slider
  const imageSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1, // Show 2 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Add arrows for navigation
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1, // Show 1 image at a time on smaller screens
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      {listings.map((listing, idx) => {
        const {
          meta,
          images,
          ratings,
          furnishingDetails,
          features
        } = listing;

        // Slice the images array to only show the first 2 images
        const limitedImages = images.slice(0, 2);

        return (
          <div key={idx} className="mb-8">
            <div className='pb-6'>
                <h2 className="text-xl font-semibold">{meta.location}</h2>
                <p className="text-gray-600 text-sm">{meta.address}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Home size={18} className="text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.builtUpArea}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bed size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.bedrooms}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.bathrooms}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.floorNumber}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Compass size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.facing}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className=" text-gray-700" />
                    <p className="text-sm text-gray-700">{meta.possessionDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <Slider {...imageSettings}>
                  {limitedImages.map((image, index) => (
                    <div key={index} className="p-2">
                      <img src={image} alt={`Property ${index + 1}`} className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Features:</h3>
              <Slider {...featureSettings}>
                {features.map((feature, index) => (
                  <div key={index} className="p-1">
                    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  </div>
                ))}
              </Slider>
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
            {idx < listings.length - 1 && <hr className="my-8" />}
          </div>
        );
      })}
    </div>
  );
};

export default PropertyDetails;
