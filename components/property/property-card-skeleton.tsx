
// @ts-nocheck
'use client'

import { Skeleton } from "../ui/skeleton";
import React from 'react';
import PropertyCard from '../main/property-card';

const PropertyDetailsSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-2 p-4 border rounded-lg shadow-lg">
            {/* Header Skeleton */}
            <div className="flex items-center">
                <Skeleton className="w-full h-10 bg-gray-300 rounded" />
            </div>

            {/* Image Skeleton */}
            <div className="py-4">
                <Skeleton className="w-full h-44 bg-gray-300 rounded-lg" />
            </div>

            {/* Meta Skeleton */}
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
            </div>

            {/* Features Skeleton */}
            <div className="mt-2">
                <Skeleton className="w-full h-6 bg-gray-300 rounded" />
                <Skeleton className="w-full h-6 bg-gray-300 rounded mt-2" />
            </div>

            {/* Ratings Skeleton */}
            <div className="mt-2">
                <Skeleton className="w-full h-6 bg-gray-300 rounded" />
                <Skeleton className="w-full h-6 bg-gray-300 rounded mt-2" />
            </div>
        </div>

        <div className="hidden md:block mb-2 p-4 border rounded-lg shadow-lg">
            {/* Header Skeleton */}
            <div className="flex items-center">
                <Skeleton className="w-full h-10 bg-gray-300 rounded" />
            </div>

            {/* Image Skeleton */}
            <div className="py-4">
                <Skeleton className="w-full h-44 bg-gray-300 rounded-lg" />
            </div>

            {/* Meta Skeleton */}
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
                <Skeleton className="flex items-center space-x-2 h-4 w-24 bg-gray-300 rounded" />
            </div>

            {/* Features Skeleton */}
            <div className="mt-2">
                <Skeleton className="w-full h-6 bg-gray-300 rounded" />
                <Skeleton className="w-full h-6 bg-gray-300 rounded mt-2" />
            </div>

            {/* Ratings Skeleton */}
            <div className="mt-2">
                <Skeleton className="w-full h-6 bg-gray-300 rounded" />
                <Skeleton className="w-full h-6 bg-gray-300 rounded mt-2" />
            </div>
        </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
