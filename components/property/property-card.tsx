// @ts-nocheck
'use client'

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home, Bed, Calendar, Bath, IndianRupee, Building, Compass, Star, StarHalfIcon, StarIcon } from 'lucide-react';
import { StarFilledIcon } from '@radix-ui/react-icons';

const PropertyCard = ({listing, idx}) => {

  console.log(listing)
    let isImagesInfinite = listing.images.length > 1;
    let isFeatureInfinite = listing.features.length > 1;

    const featureSettings = {
        dots: false,
        infinite: isFeatureInfinite,
        autoplay: true,
        variableWidth: true,
        pauseOnHover: true,
        autoplaySpeed: 2000,
        speed: 2000,
    };
    
    const imageSettings = {
        dots: false,
        infinite: isImagesInfinite,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        arrows: true,
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

    const {
        meta,
        images,
        ratings,
        features
    } = listing;

    return (
        <div key={idx} className="mb-2 p-4 border rounded-lg shadow-lg">
          <div>
              <h2 className="text-md font-semibold inline mr-2">{meta.location}</h2>
              <p className="text-gray-600 text-sm inline">{meta.address}</p>
          </div>
          <div className="py-4 scale-105">
            {
                images && images.length > 0 ? (
                    <Slider {...imageSettings}>
                      {images.map((image, index) => (
                          <img key={index} src={image} alt={`Property ${index + 1}`} className="px-1 rounded-lg w-full h-44 object-cover" />
                      ))}
                    </Slider>
                ) : (
                    <img src="https://static.99acres.com/universalapp/img/projectnoimage.webp" className="px-1 rounded-lg w-full h-44 object-cover" />
                )
            }
          </div>

          {/* Meta */}
          <div className="grid grid-cols-1 gap-1 text-sm text-gray-500">
                {meta.bedrooms && (
                    <div className="flex items-center space-x-2 h-4">
                    <Bed size={16} />
                    <p>{meta.bedrooms}</p>
                    </div>
                )}
                {meta.bathrooms && (
                    <div className="flex items-center space-x-2">
                    <Bath size={16} />
                    <p>{meta.bathrooms}</p>
                    </div>
                )}
                {meta.price && (
                    <div className="flex items-center space-x-2">
                    <IndianRupee size={16} />
                    <p>{meta.price}</p>
                    </div>
                )}
                {meta.floorNumber && (
                    <div className="flex items-center space-x-2">
                    <Building size={16} />
                    <p>{meta.floorNumber}</p>
                    </div>
                )}
                {meta.facing && (
                    <div className="flex items-center space-x-2">
                    <Compass size={16} />
                    <p>{meta.facing}</p>
                    </div>
                )}
            </div>

          {/* Features */}
          <div className="mt-2">
            <Slider {...featureSettings}>
              {features.map((feature, index) => (
                <div key={index} className="p-1">
                    <p key={index} className="text-sm px-2 text-gray-700 p-1 border border-blue-300 rounded-sm shadow-sm">{feature}</p>
                </div>
              ))}
            </Slider>
          </div>

          <div className="mt-2">
            <ul className="grid grid-cols-1 gap-1 text-gray-500">
              {Object.entries(ratings).map(([key, value], index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                    <StarFilledIcon className='text-orange-400'/>
                  <span className="text-gray-700">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default PropertyCard