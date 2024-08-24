"use client"

import React, { useState} from 'react'
import { MapPin, MessageCircle, Phone, PhoneCall } from 'lucide-react';
import { Home, Play, Image as ImageIcon, } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParasManorVideos from './paras-manor-video';
import ParasManorImageGallery from './paras-manor-image-gallery';
import { LucideDumbbell, Waves, Coffee, Utensils, ChefHat, Scissors, Activity, Calendar, Building,  } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import ParasManorVideosCarousel from './paras-manor/pm-video-carousel';
import ParasManorImageCarousel from './paras-manor/pm-image-carousel';

const ParasManorPropertyDetails = () => {
  const [activeTab, setActiveTab] = useState("home")
  const tabData = [
    { value: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
    { value: "video", icon: <Play className="h-5 w-5" />, label: "Video" },
    { value: "images", icon: <ImageIcon className="h-5 w-5" />, label: "Images" },
    { value: "floorplan", icon: <Building className="h-5 w-5" />, label: "Floor Plan" },
    { value: "contact", icon: <PhoneCall className="h-5 w-5" />, label: "Contact Us" },
  ]


  const AmenitiesSection = () => {
      return (
          <div>
              <h3 className="font-bold mb-2">Amenities</h3>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                  <li className="flex items-center">
                      <LucideDumbbell size={30} className="w-4 h-4 mr-2 text-gray-600" />
                      Professional&nbsp;Gym
                  </li>
                  <li className="flex items-center">
                      <Waves className="w-4 h-4 mr-2 text-gray-600" />
                      All&nbsp;Weather&nbsp;Pool
                  </li>
                  <li className="flex items-center">
                      <Coffee className="w-4 h-4 mr-2 text-gray-600" />
                      Café,&nbsp;Lounge
                  </li>
                  <li className="flex items-center">
                      <Utensils className="w-4 h-4 mr-2 text-gray-600" />
                      Fine&nbsp;Dining
                  </li>
                  <li className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-2 text-gray-600" />
                      Chef&nbsp;On&nbsp;Call
                  </li>
                  <li className="flex items-center">
                      <Scissors className="w-4 h-4 mr-2 text-gray-600" />
                      Salon
                  </li>
                  {/* <li className="flex items-center">
                      <Spa className="w-4 h-4 mr-2 text-gray-600" />
                      Spa And Sauna
                  </li> */}
                  <li className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-gray-600" />
                      Sports&nbsp;Centre
                  </li>
                  {/* <li className="flex items-center">
                      <Billiard className="w-4 h-4 mr-2 text-gray-600" />
                      Pool Table
                  </li>
                  <li className="flex items-center">
                      <TableTennis className="w-4 h-4 mr-2 text-gray-600" />
                      Table Tennis
                  </li> */}
                  {/* <li className="flex items-center">
                      <Cards className="w-4 h-4 mr-2 text-gray-600" />
                      Card Room
                  </li> */}
                  <li className="flex items-center">
                      <Home className="w-4 h-4 mr-2 text-gray-600" />
                      Recreation&nbsp;Areas
                  </li>
                  <li className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                      Banquet&nbsp;Hall
                  </li>
              </ul>
          </div>
      );
  };
  const HomeContent = () => (
        <div className="h-full flex flex-col sm:flex-row gap-4 bg-white rounded-lg">
            {/* Left Card */}
            <div className="w-full sm:w-[60%] pb-2 shadow-lg rounded-lg">
                <div className="relative mb-2">
                    <img src="https://www.themanorparas.com/assets/img/gallery/gallery-n1.jpg" alt="Property" className="w-full h-48 object-cover rounded-lg" />
                    {/* <span className="absolute top-2 left-2 bg-white text-gray-800 px-2 py-1 rounded-full text-sm">$2,500 / month</span> */}
                </div>
                <div className='px-4 py-2'>
                    <h2 className="text-xl font-bold mb-2">Paras Manor - Paras Buildtech</h2>
                    <p className="text-gray-600 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> Gwal Pahari, Gurgaon
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Near Gurgaon-Faridabad Expressway, 5 mins from Golf Course Road, 20 mins to IGI Airport, with schools and healthcare within 10-12 km.
                    </p>
                    <div className="flex items-center">
                        <div>
                        <div className="flex items-center gap-1 border-b-2 border-transparent hover:border-gray-200 cursor-pointer">
                            <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                            <Phone className="w-4 h-4 mr-1 text-green-500" />
                            <p className="font-normal">+91 7045099995</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Right Card */}
            <div className="w-full sm:w-[40%] px-4 py-2 shadow-lg rounded-lg">
                <AmenitiesSection />
                <h3 className="font-bold mb-2">Open House</h3>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full w-full">Schedule a Tour</button>
            </div>
        </div>
  )

  return (
    <Card className="w-full max-w-2xl shadow-none border-none p-0">
      <CardContent className="p-2 ps-0">
        <div className="min-h-[400px] flex flex-col sm:flex-row">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            // orientation="vertical"
            // className="sm:flex-shrink-0 sm:flex-col sm:space-y-2"
          >
            <TabsList className="flex h-full sm:flex-col flex-row justify-start space-y-2 rounded-l-lg p-2 bg-white shadow-md">
              {tabData.map(({ value, icon, label }) => (
                <HoverCard openDelay={100} closeDelay={100} key={value}>
                  <HoverCardTrigger>
                    <TabsTrigger
                      value={value}
                      className={`relative flex items-center justify-center rounded-md px-4 py-3 transition-all ${
                        activeTab === value
                          ? "bg-white text-primary border border-gray shadow-sm"
                          : "text-muted-foreground border border-transparent hover:bg-gray-200 hover:text-primary"
                      }`}
                    >
                      {icon}
                    </TabsTrigger>
                  </HoverCardTrigger>
                  <HoverCardContent className="absolute -left-6 sm:left-10 sm:top-[-45px] w-fit bg-gray-800 text-white rounded-md px-2 py-1 text-xs">
                    {label}
                  </HoverCardContent>
                </HoverCard>
              ))}
            </TabsList>
          </Tabs>
          <div className="transition-transform mt-4 sm:mt-0 sm:ml-6 sm:flex-grow">
            {activeTab === "home" && <HomeContent />}
            {activeTab === "video" && <ParasManorVideosCarousel />}
            {activeTab === "images" && <ParasManorImageCarousel />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ParasManorPropertyDetails


//   const VideoContent = () => (
//     <div className="space-y-4">
//       <div className="relative aspect-video">
//         <Image
//           src={videos[currentVideoIndex]}
//           alt={`Property video ${currentVideoIndex + 1}`}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Play className="h-16 w-16 text-white opacity-75" />
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1))}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0))}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const ImageContent = () => (
//     <div className="space-y-4">
//       <div className="relative aspect-video">
//         <Image
//           src={imageUrls[currentImageIndex]}
//           alt={`Property image ${currentImageIndex + 1}`}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//         />
//       </div>
//       <div className="flex justify-between">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1))}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentImageIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : 0))}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//       <div className="flex space-x-2 overflow-x-auto py-2">
//         {imageUrls.map((image, index) => (
//           <Image
//             key={index}
//             src={image}
//             alt={`Thumbnail ${index + 1}`}
//             width={96}
//             height={64}
//             className={`cursor-pointer rounded-md object-cover transition-opacity ${
//               index === currentImageIndex ? "opacity-100" : "opacity-50 hover:opacity-75"
//             }`}
//             onClick={() => setCurrentImageIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   )