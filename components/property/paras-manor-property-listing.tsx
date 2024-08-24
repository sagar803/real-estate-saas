"use client"

import React, { useState} from 'react'
import { DollarSign, Handshake, MapPin, MessageCircle, Phone, PhoneCall, Ruler } from 'lucide-react';
import { Home, Play, Image as ImageIcon, } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideDumbbell, Waves, Coffee, Utensils, ChefHat, Scissors, Activity, Calendar, Building, MapPinned } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import ParasManorVideosCarousel from './paras-manor/pm-video-carousel';
import ParasManorImageCarousel from './paras-manor/pm-image-carousel';
import ParasManorFloorCarousel from './paras-manor/pm-floor-plan-carousel';
import ContactForm from './paras-manor/pm-contact-us';

const ParasManorPropertyDetails = () => {
  const [activeTab, setActiveTab] = useState("home")
  const tabData = [
    { value: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
    { value: "video", icon: <Play className="h-5 w-5" />, label: "Video" },
    { value: "images", icon: <ImageIcon className="h-5 w-5" />, label: "Images" },
    { value: "floorplan", icon: <Building className="h-5 w-5" />, label: "Floor Plan" },
    { value: "contact", icon: <PhoneCall className="h-5 w-5" />, label: "Contact Us" },
    { value: "aboutus", icon: <Handshake className="h-5 w-5" />, label: "About Us" },
  ]


  const AmenitiesSection = () => {
      return (
        <>
          <div>
              <h3 className="font-bold mb-2">Key Metrics</h3>
                <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li className="flex items-center">
                      <Home className="w-4 h-4 mr-2 text-gray-600" />
                      4BHK
                    </li>
                    <li className="flex items-center">
                    <Ruler className="h-5 w-5 text-gray-600 mr-2" />
                      4750 Sq. Ft.
                    </li>
                </ul>
          </div>
          <div>
              <h3 className="font-bold mb-2">Amenities</h3>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                  <li className="flex items-center">
                      <LucideDumbbell className="w-4 h-4 mr-2 text-gray-600" />
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
                  <li className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-gray-600" />
                      Sports&nbsp;Centre
                  </li>
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
          </>
      );
  };
  const HomeContent = () => (
        <div className="h-full flex flex-col sm:flex-row gap-4 bg-white rounded-lg">
            {/* Left Card */}
            <div className="w-full sm:w-[60%] pb-2 shadow-lg rounded-lg">
                <div className="relative mb-2">
                    <img src="https://www.themanorparas.com/assets/img/gallery/gallery-n1.jpg" alt="Property" className="w-full h-48 object-cover rounded-lg" />
                    <span className="absolute top-2 left-2 bg-white text-gray-800 px-2 py-1 rounded-full text-sm">Starting @ ₹ 8.55 Cr*</span>
                </div>
                <div className='px-4 py-2'>
                    <h2 className="text-xl font-bold mb-1">The Manor - 2 Towers</h2>
                    <p className="text-gray-600 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> Gwal Pahari, Gurgaon
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Near Gurgaon-Faridabad Expressway, 5 mins from Golf Course Road, 20 mins to IGI Airport, with schools and healthcare within 10-12 km.
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <div className='flex justify-between items-center gap-2 bg-green-500 cursor-pointer text-white px-4 py-2 rounded-full text-sm'>
                        <Phone className="w-4 h-4 text-white" />
                        <p>+91&nbsp;7045099995</p>
                      </div>
                      <button onClick={() => setActiveTab("contact")} className="bg-blue-500 text-white cursor-pointer px-2 py-2 rounded-full text-sm">Schedule a Tour</button>
                    </div>
                </div>
            </div>

            {/* Right Card */}
            <div className="w-full sm:w-[40%] shadow-lg rounded-lg px-4 py-2 border">
                <AmenitiesSection />
            </div>
        </div>
  )
  const About = () => {
    return (
      <Card className="h-full max-w-2xl mx-auto p-6">        
        <h2 className="text-xl font-semibold mb-2">Paras The Manor, Gurgaon</h2>
        <p className="mb-4 text-gray-700 leading-relaxed text-sm">
          Paras The Manor is a luxury 4BHK apartment complex in Gwal Pahari, Gurgaon, spanning 4.26 acres with two towers and 120 units.
          Located in a serene area, Paras Quartier features private elevators and 24/7 concierge service, embodying superior living just steps from Delhi.
          Offering private lift lobbies and stunning Aravalli views, Phase 1 is sold out, and Phase 2 offers 60 exclusive units with IGBC Platinum certification.
        </p>
        
        <h2 className="text-xl font-semibold mb-2">About the Developer</h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          Paras BuildTech is a leading real estate developer in India, part of the PARAS GROUP. With a legacy spanning over five decades, the company is known for crafting modern residential, commercial, and retail spaces that redefine lifestyles.
        </p>
      </Card>
    );
  };
  

  return (
    <Card className="w-full max-w-2xl shadow-none border-none p-0">
      <CardContent className="p-2 ps-0">
        <div className="min-h-[400px] flex flex-col sm:flex-row">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="flex h-full sm:flex-col flex-row justify-around sm:space-y-2 rounded-l-lg bg-white border shadow-md">
              {tabData.map(({ value, icon, label }) => (
                <HoverCard openDelay={100} closeDelay={100} key={value}>
                  <HoverCardTrigger>
                    <TabsTrigger
                      value={value}
                      className={`relative flex items-center justify-center rounded-md p-4 transition-all ${
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
            {activeTab === "aboutus" && <About />}
            {activeTab === "floorplan" && <ParasManorFloorCarousel />}
            {activeTab === "contact" && <ContactForm />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ParasManorPropertyDetails

