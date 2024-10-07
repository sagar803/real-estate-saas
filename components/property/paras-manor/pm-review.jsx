import React from 'react';
import { Star, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { parasManorData } from '@/lib/propertyUtils';

const ParasManorReview = () => {
  if (!parasManorData) {
    return <ErrorMessage message="No property data available." />;
  }

  const {
    name = "Paras Manor",
    projectDetails = {},
    contactNumber = "N/A",
    features = []
  } = parasManorData;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg text-sm">
      {/* <Header name={name} /> */}
      <Overview description={projectDetails.description} />
      <ProsAndCons />
      <KeyFeatures features={features} />
      <PotentialDrawbacks />
      <BuyingRecommendation />
      <ContactInfo contactNumber={contactNumber} />
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{message}</div>
);

const Header = ({ name }) => (
  <h2 className="text-2xl font-bold mb-3">{name} - Review</h2>
);

const Overview = ({ description }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-1">Overview</h3>
    <p className="text-sm">{description || "No description available."}</p>
  </div>
);

const ProsAndCons = () => {
  const pros = [
    "Luxurious 4BHK apartments with 4750 sq. ft. area",
    "Prime location near Gurgaon-Faridabad Expressway",
    "Extensive amenities (gym, pool, fine dining)",
    "IGBC Platinum certification",
    "Developed by reputable Paras BuildTech"
  ];

  const cons = [
    "High starting price of ₹8.55 Cr",
    "Only 60 units in Phase 2",
    "20 minutes from IGI Airport",
    "Potentially high maintenance costs"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <PointList title="Pros" icon={CheckCircle} iconColor="text-green-500" points={pros} />
      <PointList title="Cons" icon={XCircle} iconColor="text-red-500" points={cons} />
    </div>
  );
};

const PointList = ({ title, icon: Icon, iconColor, points }) => (
  <div>
    <h3 className="text-base font-semibold mb-1 flex items-center">
      <Icon className={`w-4 h-4 ${iconColor} mr-1`} />
      {title}
    </h3>
    <ul className="list-disc pl-5 text-xs space-y-1">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

const KeyFeatures = ({ features }) => (
  <div className="mb-4">
    <h3 className="text-base font-semibold mb-1">Key Features</h3>
    {features.length > 0 ? (
      <ul className="grid grid-cols-2 gap-1 text-xs">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            {feature}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xs">No features available.</p>
    )}
  </div>
);

const PotentialDrawbacks = () => (
  <div className="mb-4">
    <h3 className="text-base font-semibold mb-1 flex items-center">
      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
      Potential Drawbacks
    </h3>
    <p className="text-xs mb-1">
      Potential buyers should be aware of:
    </p>
    <ul className="list-disc pl-5 text-xs space-y-1">
      <li>High price point limiting affordability</li>
      <li>Limited availability in Phase 2</li>
      <li>Location may not suit all commute needs</li>
      <li>High maintenance costs for luxury amenities</li>
    </ul>
  </div>
);

const BuyingRecommendation = () => {
  const recommendation = typeof window !== 'undefined' && window.innerWidth < 768
    ? "Recommended for high-net-worth individuals, but consider costs and drawbacks."
    : (
      <>
        <p className="font-semibold mb-1">Buying Recommendation:</p>
        <p className="mb-1">
          Recommended for high-net-worth individuals seeking luxury in Gurgaon. Consider:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>High investment and maintenance costs</li>
          <li>Limited unit availability</li>
          <li>Location suitability for your needs</li>
        </ul>
        <p className="mt-1">
          Excellent choice if budget and location align with your requirements.
        </p>
      </>
    );

  return (
    <div className="bg-gray-100 p-3 rounded-lg text-xs">
      {recommendation}
    </div>
  );
};

const ContactInfo = ({ contactNumber }) => (
  <div className="mt-4 text-xs text-gray-600">
    <p>For more information or to schedule a visit, contact: {contactNumber}</p>
  </div>
);

export default ParasManorReview;